/* ============================================================
   ДВИЖОК РАСКРАСКИ — финальная консолидированная версия
   ============================================================ */
const OVERLAY_BLEND = 'multiply'; // 'multiply' = обводка неприкосновенна;
// 'normal'  = цвет мазков точный, но обводка перекрывается


const ENGINE = {
  currentColor: {},
  currentTool: 'star',
  canvases: {},
  contexts: {},
  _masters: {},
  _isClipped: false,
  _masterClipped: false,

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  init(paintingKey) {
    const cfg = PAINTINGS[paintingKey];
    if (!cfg) { console.error('❌ Конфиг не найден:', paintingKey); return; }
    this.buildPalette(paintingKey, cfg);
    this.bindParts(paintingKey, cfg);
    this.currentColor[paintingKey] = cfg.palette[0];
    this.initTools(paintingKey, cfg);
    this.updatePreview(cfg);
    this.refreshProgressUI(paintingKey, cfg);
  },

  initTools(paintingKey, cfg) {
    document.querySelectorAll('.tool-btn').forEach(btn => {
      if (btn._toolBound) return;
      btn._toolBound = true;
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (tool === 'bucket') {
          playSound('click');
          const key = this.getActivePaintingKey();
          this.showConfirm('Полностью стереть?', 'Рисунок будет удалён',
            () => this.clearAll(key, PAINTINGS[key]));
          return;
        }
        playSound('click');
        this.currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  getActivePaintingKey() {
    if (this.activeCanvasKey) return this.activeCanvasKey;
    const vis = document.querySelector('.screen.active [id^="painting-"]');
    return vis ? vis.id.replace('painting-', '') : Object.keys(PAINTINGS)[0];
  },

  showConfirm(title, subtitle, onYes) {
    document.getElementById('confirm-overlay')?.remove();
    const ov = document.createElement('div');
    ov.id = 'confirm-overlay';
    Object.assign(ov.style, { position: 'fixed', inset: '0', zIndex: '9999', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' });
    ov.innerHTML = `<div style="background:#fff;border-radius:22px;padding:24px 30px;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.25);max-width:82vw;font-family:inherit;">
      <div style="font-size:22px;font-weight:700;color:#3a3a3a;">${title}</div>
      <div style="font-size:15px;color:#9a9a9a;margin:8px 0 20px;">${subtitle}</div>
      <div style="display:flex;gap:8px;justify-content:center;">
        <button data-c="yes" style="min-width:96px;padding:10px 18px;font-size:18px;font-weight:700;color:#3a3a3a;background:#F9C9D4;border:2px solid #E79BAC;border-radius:14px;cursor:pointer;font-family:inherit;">Да</button>
        <button data-c="no" style="min-width:96px;padding:10px 18px;font-size:18px;font-weight:700;color:#3a3a3a;background:#CBE8A8;border:2px solid #9ACB6E;border-radius:14px;cursor:pointer;font-family:inherit;">Нет</button>
      </div></div>`;
    document.body.appendChild(ov);
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
    ov.querySelector('[data-c="yes"]').onclick = () => { playSound('click'); ov.remove(); onYes(); };
    ov.querySelector('[data-c="no"]').onclick = () => { playSound('click'); ov.remove(); };
  },

  // ==================== CANVAS + МАСТЕР-СЛОЙ ====================
  createBrushCanvas(paintingKey, cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;
    if (this.canvases[paintingKey]) {
      this.setActiveCanvas(paintingKey);
      this.updateCanvasSize(paintingKey);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'brush-canvas-' + paintingKey;
    Object.assign(canvas.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '10' });
    container.style.position = 'relative';
    container.appendChild(canvas);
    this.createOutlineOverlay(paintingKey, cfg);
    this.canvases[paintingKey] = canvas;
    this.contexts[paintingKey] = canvas.getContext('2d');
    this.masterOf(paintingKey);
    this.setActiveCanvas(paintingKey);
    const trySetSize = a => {
      if (this.updateCanvasSize(paintingKey)) return;
      if (a < 3) setTimeout(() => trySetSize(a + 1), [100, 300, 500][a]);
    };
    trySetSize(0);
    window.addEventListener('resize', () => this.updateCanvasSize(paintingKey));
    this.setupBrushEvents(paintingKey, cfg);
  },

  createOutlineOverlay(paintingKey, cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container || container.querySelector('.outline-overlay')) return;
    const svg = container.querySelector('svg:not(.outline-overlay)');
    if (!svg) return;
    const ov = svg.cloneNode(true);
    ov.querySelectorAll('[id^="part-"]').forEach(el => el.remove());
    ov.querySelectorAll('defs').forEach(el => el.remove());
    ov.removeAttribute('id');
    ov.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    ov.classList.add('outline-overlay');
    Object.assign(ov.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '11' });
    container.appendChild(ov);
  },

  setActiveCanvas(key) {
    if (this.canvases[key]) {
      this.canvas = this.canvases[key];
      this.ctx = this.contexts[key];
      this.activeCanvasKey = key;
    }
  },

  masterOf(key) {
    if (this._masters[key]) return this._masters[key];
    const cfg = PAINTINGS[key];
    const container = cfg && document.getElementById(cfg.containerId);
    const svg = container && container.querySelector('svg');
    if (!svg) return null;
    const vb = svg.viewBox.baseVal;
    const m = document.createElement('canvas');
    m.width = Math.round(vb.width * 2);
    m.height = Math.round(vb.height * 2);
    m._q = m.width / vb.width;
    const ctx = m.getContext('2d');
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    this._masters[key] = m;
    return m;
  },

  viewOf(key) {
    const cfg = PAINTINGS[key];
    const container = cfg && document.getElementById(cfg.containerId);
    const svg = container && container.querySelector('svg');
    const canvas = this.canvases[key];
    if (!svg || !canvas) return null;
    const vb = svg.viewBox.baseVal;
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    return { vb, r, scale, ox: (r.width - vb.width * scale) / 2, oy: (r.height - vb.height * scale) / 2 };
  },

  blit(key) {
    const canvas = this.canvases[key], m = this._masters[key], v = this.viewOf(key);
    if (!canvas || !m || !v) return;
    const ctx = this.contexts[key];
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(m, 0, 0, m.width, m.height, v.ox, v.oy, v.vb.width * v.scale, v.vb.height * v.scale);
    ctx.restore();
  },

  updateCanvasSize(key) {
    const canvas = this.canvases[key];
    if (!canvas) return false;
    const r = canvas.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      canvas.width = r.width; canvas.height = r.height;
      this.blit(key); // мазки не теряются и не кривятся при ресайзе/зуме
      return true;
    }
    return false;
  },

  toMaster(key, cx, cy) {
    const v = this.viewOf(key);
    if (!v) return null;
    return { x: (cx - v.r.left - v.ox) / v.scale, y: (cy - v.r.top - v.oy) / v.scale };
  },

  // ==================== СОБЫТИЯ (контейнер, тач-безопасно) ====================
  setupBrushEvents(paintingKey, cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container) return;
    const h = {
      mousedown: e => this.startDrawing(e, cfg, paintingKey),
      mousemove: e => this.draw(e),
      mouseup: () => this.stopDrawing(),
      touchstart: e => {
        if (this.currentTool === 'star') return; // не съедаем click звёздочки
        e.preventDefault();
        this.startDrawing(e.touches[0], cfg, paintingKey);
      },
      touchmove: e => {
        if (this.currentTool === 'star') return;
        e.preventDefault();
        this.draw(e.touches[0]);
      },
      touchend: () => this.stopDrawing()
    };
    this._handlers = this._handlers || {};
    const old = this._handlers[paintingKey];
    if (old) Object.keys(old).forEach(ev => container.removeEventListener(ev, old[ev]));
    this._handlers[paintingKey] = h;
    container.addEventListener('mousedown', h.mousedown);
    container.addEventListener('mousemove', h.mousemove);
    container.addEventListener('mouseup', h.mouseup);
    container.addEventListener('touchstart', h.touchstart, { passive: false });
    container.addEventListener('touchmove', h.touchmove, { passive: false });
    container.addEventListener('touchend', h.touchend);
  },

  startDrawing(e, cfg, paintingKey) {
    if (this.currentTool !== 'brush' && this.currentTool !== 'eraser') return;
    this.setActiveCanvas(paintingKey);
    const cx = e.clientX ?? e.touches?.[0]?.clientX;
    const cy = e.clientY ?? e.touches?.[0]?.clientY;
    if (cx === undefined || cy === undefined) return;
    const stack = document.elementsFromPoint(cx, cy) || [];
    let part = null;
    for (const el of stack) {
      if (el.id && el.id.startsWith('part-')) { part = el; break; }
      const near = el.closest && el.closest('[id^="part-"]');
      if (near) { part = near; break; }
    }
    if (!part) { console.warn('⚠️ Часть не найдена — отмена'); return; }
    // Ластик: тык по закрашенной области снимает заливку
    if (this.currentTool === 'eraser') {
      const f = (part.style.fill || part.getAttribute('fill') || '').trim();
      if (f && !/^(#fff{0,3}|#ffffff|white)$/i.test(f)) { this.unfillPart(part, paintingKey, cfg); return; }
    }
    const m = this.masterOf(paintingKey);
    if (!m) return;
    // clip ТОЛЬКО на мастере (живой контекст не трогаем!)
    const svg = part.closest('svg');
    const local = part.getScreenCTM(), root = svg.getScreenCTM();
    if (!local || !root) return;
    const mat = root.inverse().multiply(local);

    const ctx = m.getContext('2d');
    // 🆕 сброс зависших клипов от прерванных штрихов
    while (this._clipDepth > 0) { ctx.restore(); this._clipDepth--; }
    ctx.save();
    this._clipDepth = 1;
    ctx.setTransform(m._q || 1, 0, 0, m._q || 1, 0, 0);
    const p = new Path2D();
    p.addPath(new Path2D(part.getAttribute('d')), mat);
    ctx.clip(p);
    this._masterClipped = true;

    const pt = this.toMaster(paintingKey, cx, cy);
    if (!pt) return;
    ctx.lineWidth = this.currentTool === 'eraser' ? 12 : 12;
    ctx.strokeStyle = this.currentTool === 'eraser' ? 'rgba(0,0,0,1)' : this.currentColor[paintingKey];
    ctx.globalCompositeOperation = this.currentTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
    this.isDrawing = true;
    this._drawKey = paintingKey;
    playSound('paint');
  },

  draw(e) {
    if (!this.isDrawing) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX;
    const cy = e.clientY ?? e.touches?.[0]?.clientY;
    if (cx === undefined || cy === undefined) return;
    const m = this._masters[this._drawKey];
    if (!m) return;
    const pt = this.toMaster(this._drawKey, cx, cy);
    if (!pt) return;
    const ctx = m.getContext('2d');
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    this.blit(this._drawKey);
  },

  stopDrawing() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    const key = this._drawKey;
    const m = this._masters[key];
    if (m) {
      const ctx = m.getContext('2d');
      ctx.closePath();
      while (this._clipDepth > 0) { ctx.restore(); this._clipDepth--; }
      this._masterClipped = false;
      ctx.globalCompositeOperation = 'source-over';
      this.blit(key);
      this._hasStrokes = this._hasStrokes || {};
      this._hasStrokes[key] = true;
      this._strokeTime = this._strokeTime || {};
      this._strokeTime[key] = Date.now();
      // 🆕 СВЕЖИЙ снимок для копий СРАЗУ (не ждать дебаунс)
      this._strokeUrls = this._strokeUrls || {};
      try { this._strokeUrls[key] = m.toDataURL('image/png'); } catch (e) { }
      if (this._headUrls) delete this._headUrls[key]; // 🆕 ИНВАЛИДИРУЕМ СНИМОК ГОЛОВЫ
      this.scheduleSave();
    }
  },

  unfillPart(el, key, cfg) {
    el.style.removeProperty('fill');
    el.removeAttribute('class');
    el.setAttribute('fill', '#ffffff');
    try {
      const saved = JSON.parse(localStorage.getItem('colors-' + key) || '{}');
      delete saved[el.id];
      localStorage.setItem('colors-' + key, JSON.stringify(saved));
    } catch (e) { }
    playSound('click');
    this.updatePreview(cfg);
    this.copyColorsToLocation(cfg);
  },

  // ==================== ЗВЁЗДОЧКА / ЧАСТИ ====================
  bindParts(paintingKey, cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container) return;
    container.querySelectorAll('[id^="part-"]').forEach(part => {
      if (part._starBound) return;
      part._starBound = true;
      part.addEventListener('click', () => {
        if (this.currentTool !== 'star') return;
        playSound('paint');
        part.setAttribute('fill', this.currentColor[paintingKey]);
        this.saveColors(paintingKey, cfg);
        this.checkComplete(paintingKey, cfg);
      });
    });
  },

  buildPalette(paintingKey, cfg, elOverride) {
    const paletteEl = elOverride || document.getElementById(cfg.paletteId);
    if (!paletteEl) return;
    paletteEl.innerHTML = '';
    cfg.palette.forEach((color) => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      if (color === this.currentColor[paintingKey]) swatch.classList.add('selected');
      swatch.style.background = color;
      swatch.addEventListener('click', () => {
        playSound('color');
        this.currentColor[paintingKey] = color;
        paletteEl.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
      });
      paletteEl.appendChild(swatch);
    });
  },

  // ==================== СОХРАНЕНИЕ ЦВЕТОВ / ПРОГРЕССА ====================
  saveColors(key, cfg) {
    const painting = document.getElementById(cfg.containerId);
    if (!painting) return;
    const colors = {};
    painting.querySelectorAll('[id^="part-"]').forEach(p => { colors[p.id] = p.getAttribute('fill'); });
    localStorage.setItem('colors-' + key, JSON.stringify(colors));
    this.updatePreview(cfg);
    this.copyColorsToLocation(cfg);
  },

  loadColors(key, cfg) {
    const saved = localStorage.getItem('colors-' + key);
    if (!saved) return;
    try {
      const colors = JSON.parse(saved);
      const container = document.getElementById(cfg.containerId);
      if (!container) return;
      Object.keys(colors).forEach(id => {
        const p = container.querySelector('#' + id);
        if (p) p.setAttribute('fill', colors[id]);
      });
      this.updatePreview(cfg);
      this.copyColorsToLocation(cfg);
    } catch (e) { }
  },

  restoreAll() {
    Object.keys(PAINTINGS).forEach(key => {
      const cfg = PAINTINGS[key];
      this._applyingSave = true;
      this.loadColors(key, cfg);
      this._applyingSave = false;
      this.refreshProgressUI(key, cfg);
      this.restoreStrokes(key);
    });
  },


  checkComplete(key, cfg) {
    // Авто-завершения больше нет: закрасил все зоны — ничего не происходит.
    // Праздник, флаг «готово» и разблокировки выдаёт ТОЛЬКО кнопка «Готово!»
    // через finishPainting(). Метод оставлен пустым, чтобы вызовы из bindParts
    // не ломались.
  },

  onComplete(key, cfg) {
    playSound('win');
    this.launchFireworks();
    this.saveColors(key, cfg);
    this.refreshProgressUI(key, cfg);
    if (typeof gameplayStop === 'function') gameplayStop();
    setTimeout(() => {
      const ov = document.getElementById(cfg.winOverlayId);
      if (ov) ov.classList.add('visible');
    }, 1200);
    this.scheduleSave();
  },

  finishPainting(key, cfg) { // кнопка «Готово!»
    if (!cfg) return;
    this.saveColors(key, cfg);
    const all = this.isFullyPainted(key, cfg);
    const first = !(this._doneFlags && this._doneFlags[key]);
    if (all && first) { playSound('win'); this.launchFireworks(); } else playSound('click');
    this._doneFlags = this._doneFlags || {};
    this._doneFlags[key] = 1;
    localStorage.setItem('done-' + key, '1');
    this.refreshProgressUI(key, cfg);
    if (typeof gameplayStop === 'function') gameplayStop();
    setTimeout(() => {
      const ov = document.getElementById(cfg.winOverlayId);
      if (ov) ov.classList.add('visible');
    }, all && first ? 1200 : 300);
    this.scheduleSave();
  },

  isFullyPainted(key, cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container) return false;
    let all = true;
    container.querySelectorAll('[id^="part-"]').forEach(p => {
      const f = (p.getAttribute('fill') || '').toLowerCase();
      if (!f || f === '#fff' || f === '#ffffff' || f === 'white') all = false;
    });
    return all;
  },

  refreshProgressUI(key, cfg) {
    const done = (this._doneFlags && this._doneFlags[key]) || localStorage.getItem('done-' + key) === '1';
    if (!done) return;
    this._doneFlags = this._doneFlags || {};
    this._doneFlags[key] = 1;
    const preview = document.getElementById(cfg.previewId);
    const tile = preview && preview.closest('.menu-tile');
    if (tile) { const b = tile.querySelector('.star-badge'); if (b) b.classList.add('visible'); }
    (cfg.unlocks || []).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('locked');
        const l = el.querySelector('.lock-icon');
        if (l) l.style.display = 'none';
      }
    });
  },

  // ==================== ОБЛАКО + INDEXEDDB ====================
  scheduleSave() {
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this.persistNow(), 1500);
  },

  persistNow() {
    Object.keys(this._masters).forEach(key => {
      if (!(this._hasStrokes && this._hasStrokes[key])) return;
      try {
        STROKES_DB.put(key, this._masters[key].toDataURL('image/png'));
      } catch (e) { }
    });
    if (typeof saveGameData === 'function') {
      const recent = Object.keys(this._hasStrokes || {})
        .sort((a, b) => (this._strokeTime?.[b] || 0) - (this._strokeTime?.[a] || 0))
        .slice(0, 5);
      const allow = new Set(recent);
      let state = this.getCloudState('full', allow);
      let size = JSON.stringify(state).length;
      if (size > 90000) { state = this.getCloudState('tiny', allow); size = JSON.stringify(state).length; }
      if (size > 90000) state = this.getCloudState('colors');
      saveGameData(state);
    }
  },

  getCloudState(mode, allowSet) {
    const state = { paintings: {} };
    Object.keys(PAINTINGS).forEach(key => {
      const cfg = PAINTINGS[key];
      const container = document.getElementById(cfg.containerId);
      if (!container) return;
      const colors = {};
      container.querySelectorAll('[id^="part-"]').forEach(p => {
        const f = (p.getAttribute('fill') || '').toLowerCase();
        if (f && f !== '#ffffff' && f !== '#fff' && f !== 'white') colors[p.id] = p.getAttribute('fill');
      });
      const entry = {};
      if (Object.keys(colors).length) entry.colors = colors;
      if (this._doneFlags && this._doneFlags[key]) entry.done = 1;
      if (mode !== 'colors' && this._hasStrokes && this._hasStrokes[key] && (!allowSet || allowSet.has(key))) {
        const m = this._masters[key];
        if (m) {
          const tmp = document.createElement('canvas');
          const k = Math.min(1, (mode === 'full' ? 384 : 160) / Math.max(m.width, m.height));
          tmp.width = Math.max(1, Math.round(m.width * k));
          tmp.height = Math.max(1, Math.round(m.height * k));
          tmp.getContext('2d').drawImage(m, 0, 0, tmp.width, tmp.height);
          entry.stroke = tmp.toDataURL('image/png');
        }
      }
      if (Object.keys(entry).length) state.paintings[key] = entry;
    });
    return state;
  },

  applySave(data) {
    if (!data || !data.paintings) return;
    Object.keys(data.paintings).forEach(key => {
      const cfg = PAINTINGS[key];
      if (!cfg) return;
      const e = data.paintings[key];
      this._applyingSave = true;
      const container = document.getElementById(cfg.containerId);
      if (container && e.colors) {
        Object.keys(e.colors).forEach(id => {
          const p = container.querySelector('#' + id);
          if (p) p.setAttribute('fill', e.colors[id]);
        });
        this.updatePreview(cfg);
        this.copyColorsToLocation(cfg);
      }
      if (e.done) { this._doneFlags = this._doneFlags || {}; this._doneFlags[key] = 1; }
      this._applyingSave = false;
      this.refreshProgressUI(key, cfg);
      if (e.stroke) {
        const img = new Image();
        img.onload = () => {
          const m = this.masterOf(key);
          if (!m) return;
          const ctx = m.getContext('2d');
          ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, m.width, m.height);
          ctx.drawImage(img, 0, 0, m.width, m.height);
          ctx.restore();
          this._hasStrokes = this._hasStrokes || {}; this._hasStrokes[key] = true;
          this._strokeUrls = this._strokeUrls || {}; this._strokeUrls[key] = m.toDataURL('image/png');
          this.blit(key);
        };
        img.src = e.stroke;
      }
    });
  },

  restoreStrokes(key) {
    STROKES_DB.get(key).then(url => {
      if (!url) return;
      const img = new Image();
      img.onload = () => {
        const m = this.masterOf(key);
        if (!m) return;
        const square = Math.abs(img.width - img.height) <= 2;
        if (square && Math.abs(m.width / m.height - 1) > 0.01) {
          console.log('🧹 Старый доклиповый снимок удалён:', key);
          STROKES_DB.del(key);
          return;
        }
        const ctx = m.getContext('2d');
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, m.width, m.height);
        ctx.drawImage(img, 0, 0, m.width, m.height);
        ctx.restore();
        this._hasStrokes = this._hasStrokes || {}; this._hasStrokes[key] = true;
        this._strokeUrls = this._strokeUrls || {}; this._strokeUrls[key] = url;
        this.blit(key);
      };
      img.src = url;
    });
  },

  // ==================== КОПИИ: КАРТА И МЕНЮ ====================
  cacheFracs(key) {
    const cfg = PAINTINGS[key];
    const container = cfg && document.getElementById(cfg.containerId);
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;
    const run = () => {
      const vb = svg.viewBox.baseVal;
      const sr = svg.getBoundingClientRect();
      if (!sr.width) return;
      const scale = Math.min(sr.width / vb.width, sr.height / vb.height);
      const vx = sr.left + (sr.width - vb.width * scale) / 2;
      const vy = sr.top + (sr.height - vb.height * scale) / 2;
      const union = scope => {
        let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9, ok = false;
        scope.querySelectorAll('[id^="part-"]').forEach(p => {
          const r = p.getBoundingClientRect();
          if (r.width > 0) { ok = true; x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top); x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom); }
        });
        return ok ? { x: (x1 - vx) / (vb.width * scale), y: (y1 - vy) / (vb.height * scale), w: (x2 - x1) / (vb.width * scale), h: (y2 - y1) / (vb.height * scale) } : null;
      };
      const c = union(container);
      if (c) { this._charFrac = this._charFrac || {}; this._charFrac[key] = c; }
      const head = container.querySelector('#head-group');
      if (head) {
        const h = union(head);
        if (h) { this._headFrac = this._headFrac || {}; this._headFrac[key] = h; }
        try {
          const bb = head.getBBox();
          this._headUser = this._headUser || {};
          this._headUser[key] = { x: bb.x, y: bb.y, w: bb.width, h: bb.height };
        } catch (e) { }
      }
    };
    const screen = container.closest('.screen');
    if (screen && getComputedStyle(screen).display === 'none') {
      const restore = screen.getAttribute('style') || '';
      screen.style.display = 'block'; screen.style.position = 'absolute';
      screen.style.visibility = 'hidden'; screen.style.left = '-9999px';
      try { run(); } finally { screen.setAttribute('style', restore); }
    } else run();
  },

  refreshMapOverlays(target) {
    if (!target) return;
    target.querySelectorAll('.strokes-overlay, .strokes-overlay-clip').forEach(el => el.remove());
    Object.keys(this._strokeUrls || {}).forEach(key => {
      const url = this._strokeUrls[key];
      if (!url) return;
      if (!this._charFrac || !this._charFrac[key]) this.cacheFracs(key);
      const frac = (this._charFrac || {})[key];
      if (!frac) return;
      const cfg = PAINTINGS[key];
      const container = cfg && document.getElementById(cfg.containerId);
      if (!container) return;
      const tails = [...container.querySelectorAll('[id^="part-"]')].map(p => p.id.replace('part-', ''));
      // копии, сгруппированные по svg И по родительской группе (body-group / head-group)
      const bySvg = new Map();
      tails.forEach(t => {
        target.querySelectorAll('[id$="-' + t + '"]').forEach(el => {
          const svg = el.closest('svg');
          if (!svg) return;
          const r = el.getBoundingClientRect();
          if (!r.width) return;
          if (!bySvg.has(svg)) bySvg.set(svg, { all: [], byParent: new Map() });
          const S = bySvg.get(svg);
          S.all.push(el);
          const parent = el.parentNode;
          if (!S.byParent.has(parent)) S.byParent.set(parent, []);
          S.byParent.get(parent).push(el);
        });
      });
      bySvg.forEach((S, svg) => {
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const inv = ctm.inverse();
        // общий прямоугольник персонажа — для посадки снимка
        let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9;
        S.all.forEach(el => {
          const r = el.getBoundingClientRect();
          x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top);
          x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
        });
        const p1 = new DOMPoint(x1, y1).matrixTransform(inv);
        const p2 = new DOMPoint(x2, y2).matrixTransform(inv);
        const iw = (p2.x - p1.x) / frac.w, ih = (p2.y - p1.y) / frac.h;
        const ix = p1.x - frac.x * iw, iy = p1.y - frac.y * ih;
        let n = 0;
        S.byParent.forEach((fills, parent) => {
          // клип ТОЛЬКО по заливкам этой группы
          const clipId = 'strokes-clip-' + key + '-' + (n++);
          const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
          clip.setAttribute('id', clipId);
          clip.setAttribute('class', 'strokes-overlay-clip');
          fills.forEach(f => {
            const c = f.cloneNode(false);   // геометрия-клон, без id
            c.removeAttribute('id');
            c.removeAttribute('class');
            clip.appendChild(c);
          });
          svg.appendChild(clip);
          const anchor = fills[fills.length - 1]; // последняя заливка группы
          const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          img.setAttribute('href', url);
          img.setAttribute('x', ix); img.setAttribute('y', iy);
          img.setAttribute('width', iw); img.setAttribute('height', ih);
          img.setAttribute('preserveAspectRatio', 'none');
          img.setAttribute('clip-path', 'url(#' + clipId + ')');
          img.setAttribute('class', 'strokes-overlay');
          img.style.pointerEvents = 'none';
          parent.insertBefore(img, anchor.nextSibling); // перед обводкой СВОЕЙ группы
        });
      });
    });
  },
  // Вставка SVG-<image> ВНУТРЬ svg: между заливками и обводкой
  _insertStrokeImage(svgRoot, anchor, url, x, y, w, h) {
    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttribute('href', url);
    img.setAttribute('x', x); img.setAttribute('y', y);
    img.setAttribute('width', w); img.setAttribute('height', h);
    img.setAttribute('preserveAspectRatio', 'none');
    img.setAttribute('class', 'strokes-overlay');
    img.style.pointerEvents = 'none';
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(img, anchor.nextSibling);
    else svgRoot.appendChild(img);
  },

  // Обрезанный снимок ТОЛЬКО головы — для плитки меню
  buildHeadUrl(key) {
    const m = this._masters[key];
    if (!m) return;
    if (!this._headUser || !this._headUser[key]) this.cacheFracs(key);
    const hu = this._headUser && this._headUser[key];
    const cfg = PAINTINGS[key];
    const svg = cfg && document.getElementById(cfg.containerId)?.querySelector('svg');
    if (!hu || !svg) return;
    const q = m.width / svg.viewBox.baseVal.width; // пикселей мастера на user-единицу
    const tmp = document.createElement('canvas');
    tmp.width = Math.max(1, Math.round(hu.w * q));
    tmp.height = Math.max(1, Math.round(hu.h * q));
    tmp.getContext('2d').drawImage(m,
      Math.round(hu.x * q), Math.round(hu.y * q), tmp.width, tmp.height,
      0, 0, tmp.width, tmp.height);
    this._headUrls = this._headUrls || {};
    this._headUrls[key] = tmp.toDataURL('image/png');
  },


  refreshMenuOverlays() {
    document.querySelectorAll('.menu-preview').forEach(pv =>
      pv.querySelectorAll('.strokes-overlay').forEach(el => el.remove()));
    Object.keys(PAINTINGS).forEach(key => {
      if (!this._headUrls || !this._headUrls[key]) this.buildHeadUrl(key);
      const url = this._headUrls && this._headUrls[key];
      const hu = this._headUser && this._headUser[key];
      if (!url || !hu) return;
      const cfg = PAINTINGS[key];
      const preview = cfg && document.getElementById(cfg.previewId);
      if (!preview) return;
      const svgEl = preview.querySelector('svg');
      if (!svgEl) return;
      const parts = [...svgEl.querySelectorAll('[id^="part-"]')];
      const anchor = parts[parts.length - 1] || null; // после заливок головы, до её обводки
      this._insertStrokeImage(svgEl, anchor, url, hu.x, hu.y, hu.w, hu.h);
    });
  },

  onScreenShown(target) {
    setTimeout(() => {
      if (!target) return;
      const pc = target.querySelector('[id^="painting-"]');
      if (pc) { this.cacheFracs(pc.id.replace('painting-', '')); return; }
      if (target.id === 'screen-menu') this.refreshMenuOverlays();
      else this.refreshMapOverlays(target);
    }, 250);
  },

  // ==================== ПРЕВЬЮ МЕНЮ (квадратный кадр) ====================
  updatePreview(cfg) {
    const container = document.getElementById(cfg.containerId);
    const preview = document.getElementById(cfg.previewId);
    if (!container || !preview) return;
    const svg = container.querySelector('svg');
    const head = svg && svg.querySelector('#head-group');
    if (!head) return;
    const screen = container.closest('.screen');
    let restore = null;
    if (screen && getComputedStyle(screen).display === 'none') {
      restore = screen.getAttribute('style') || '';
      screen.style.display = 'block'; screen.style.position = 'absolute';
      screen.style.visibility = 'hidden'; screen.style.left = '-9999px';
    }
    const bbox = head.getBBox();
    if (restore !== null) screen.setAttribute('style', restore);
    const pad = 20;
    const side = Math.max(bbox.width, bbox.height) + pad * 2;
    const vx = bbox.x + bbox.width / 2 - side / 2;
    const vy = bbox.y + bbox.height / 2 - side / 2;
    preview.innerHTML = '';
    const ns = 'http://www.w3.org/2000/svg';
    const newSvg = document.createElementNS(ns, 'svg');
    newSvg.setAttribute('xmlns', ns);
    newSvg.appendChild(head.cloneNode(true));
    newSvg.setAttribute('viewBox', `${vx} ${vy} ${side} ${side}`);
    preview.appendChild(newSvg);
  },

  copyColorsToLocation(cfg) {
    const painting = document.getElementById(cfg.containerId);
    if (!painting) return;
    painting.querySelectorAll('[id^="part-"]').forEach(part => {
      const color = part.getAttribute('fill');
      if (!color) return;
      const tail = part.id.replace('part-', '');
      document.querySelectorAll(`[id$="-${tail}"]`).forEach(copy => {
        if (copy !== part) copy.setAttribute('fill', color);
      });
    });
  },

  // ==================== ОЧИСТКА ====================
  restart(key) {
    const cfg = PAINTINGS[key];
    if (!cfg) return;
    this.clearAll(key, cfg);
  },

  clearAll(key, cfg) {
    cfg = cfg || PAINTINGS[key];
    const container = cfg && document.getElementById(cfg.containerId);
    if (!container) return;
    container.querySelectorAll('[id^="part-"]').forEach(el => {
      el.style.removeProperty('fill');
      el.removeAttribute('class');
      el.setAttribute('fill', '#ffffff');
    });
    container.querySelectorAll('g[id]').forEach(g => { g.style.removeProperty('fill'); g.removeAttribute('class'); });
    const m = this._masters[key];
    if (m) m.getContext('2d').clearRect(0, 0, m.width, m.height);
    if (this._hasStrokes) delete this._hasStrokes[key];
    if (this._strokeUrls) delete this._strokeUrls[key];
    if (this._headUrls) delete this._headUrls[key]; // 🆕 ЧИСТИМ СНИМОК ГОЛОВЫ
    STROKES_DB.del(key);
    localStorage.removeItem('colors-' + key);
    localStorage.removeItem('canvas-' + key);
    this.blit(key);
    document.querySelectorAll('.strokes-overlay').forEach(el => el.remove());
    const ov = document.getElementById(cfg.winOverlayId);
    if (ov) ov.classList.remove('visible');
    this.updatePreview(cfg);
  },

  // ==================== САЛЮТ (хлопушки из нижних углов) ====================
  launchFireworks() {
    const host = document.createElement('div');
    Object.assign(host.style, {
      position: 'fixed', inset: '0', overflow: 'hidden',
      pointerEvents: 'none', zIndex: '2500'
    });
    document.body.appendChild(host);
    const colors = ['#F8C8DC', '#FFE066', '#B2E0C5', '#A8D8FF', '#D4A5E8', '#FFB380', '#FF8FA3', '#7ED957'];
    const W = window.innerWidth, H = window.innerHeight;
    const parts = [];
    const spawn = (x, y, dirX) => {
      for (let i = 0; i < 70; i++) {
        const el = document.createElement('div');
        const w = 6 + Math.random() * 8;
        el.style.cssText = 'position:absolute;left:0;top:0;border-radius:2px;will-change:transform;';
        el.style.width = w + 'px';
        el.style.height = (w * (0.4 + Math.random() * 0.5)) + 'px';
        el.style.background = colors[(Math.random() * colors.length) | 0];
        host.appendChild(el);
        const speed = 10 + Math.random() * 9;
        parts.push({
          el, x, y,
          vx: (0.55 + Math.random() * 0.5) * dirX * speed * 0.55,
          vy: -(1.15 + Math.random() * 0.55) * speed,
          rot: Math.random() * 360,
          vr: (Math.random() - 0.5) * 24,
          delay: (Math.random() * 12) | 0
        });
      }
    };
    spawn(0, H, 1);
    spawn(W, H, -1);
    const g = 0.32;
    let frame = 0;
    const tick = () => {
      frame++;
      let alive = false;
      parts.forEach(p => {
        if (frame < p.delay) { alive = true; return; }
        p.vy += g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        const fade = frame > 70 ? Math.max(0, 1 - (frame - 70) / 35) : 1;
        p.el.style.opacity = fade;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
        if (fade > 0 && p.y < H + 40) alive = true;
      });
      if (alive && frame < 140) requestAnimationFrame(tick);
      else host.remove();
    };
    requestAnimationFrame(tick);
  },
};

/* ============ IndexedDB для мазков ============ */
(function () {
  const DB = 'strokes-db', STORE = 'strokes';
  const open = () => new Promise((res, rej) => {
    const rq = indexedDB.open(DB, 1);
    rq.onupgradeneeded = () => rq.result.createObjectStore(STORE);
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
  window.STROKES_DB = {
    async put(key, url) { try { const db = await open(); await new Promise((res, rej) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(url, key); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); } catch (e) { } },
    async get(key) { try { const db = await open(); return await new Promise(res => { const rq = db.transaction(STORE).objectStore(STORE).get(key); rq.onsuccess = () => res(rq.result || null); rq.onerror = () => res(null); }); } catch (e) { return null; } },
    async del(key) { try { const db = await open(); await new Promise(res => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(key); tx.oncomplete = res; }); } catch (e) { } }
  };
})();

/* ============ Мост к сохранениям Яндекса ============ */
window.getGameState = () => (window.ENGINE ? ENGINE.getCloudState('full') : null);
window.addEventListener('gameDataLoaded', e => ENGINE.applySave(e.detail));

/* ============ Пересчёт копий при ресайзе/зуме ============ */
(function () {
  let t = null;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => ENGINE.onScreenShown(document.querySelector('.screen.active')), 250);
  });
})();

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
/* 🆕 Страховка: жест завершился вне контейнера раскраски */
['mouseup', 'touchend', 'touchcancel', 'pointercancel'].forEach(ev =>
  window.addEventListener(ev, () => ENGINE.stopDrawing()));
window.addEventListener('blur', () => ENGINE.stopDrawing());