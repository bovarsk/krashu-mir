const NAV = {
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
    switchMusic(screenId);
    this.updateHomeButton(target);

    const doneBtn = document.getElementById('doneBtn');
    if (doneBtn && target.querySelector('[id^="painting-"]')) {
      doneBtn.classList.remove('hidden');
      doneBtn.disabled = false;
      target.appendChild(doneBtn);   // кнопка теперь ВНУТРИ экрана раскраски
    }

    const isPainting = !!target.querySelector('[id^="painting-"]');
    const tools = document.getElementById('toolsPanel');
    const pal = document.getElementById('paletteGlobal');
    if (tools) tools.classList.toggle('hidden', !isPainting);
    if (pal) pal.classList.toggle('hidden', !isPainting);
    if (isPainting) {
      const key = target.querySelector('[id^="painting-"]').id.replace('painting-', '');
      const cfg = PAINTINGS[key];
      if (cfg) ENGINE.buildPalette(key, cfg, pal); // палитра текущей раскраски
    }


    ENGINE.onScreenShown(target); // копировые оверлеи + кэш геометрии
    const level = Number(target?.getAttribute('data-level')) || 1;
    if (level >= 4) gameplayStart(); else gameplayStop();
    const pc = target.querySelector('[id^="painting-"]');
    if (pc) {
      const key = pc.id.replace('painting-', '');
      const cfg = PAINTINGS[key];
      if (cfg) setTimeout(() => {
        ENGINE.createBrushCanvas(key, cfg);
        ENGINE.setActiveCanvas(key);
        ENGINE.bindParts(key, cfg);
      }, 150);
    }
  },
  updateHomeButton(target) {
    const homeBtn = document.getElementById('homeBtn');
    if (!homeBtn || !target) return;
    const level = Number(target.getAttribute('data-level')) || 1;
    homeBtn.classList.toggle('hidden', level === 1);
  }
};

const confirmExit = document.getElementById('confirmExit');
document.getElementById('homeBtn').addEventListener('click', () => { playSound('click'); confirmExit.classList.remove('hidden'); });
document.getElementById('confirmYes').addEventListener('click', () => { playSound('click'); confirmExit.classList.add('hidden'); NAV.showScreen('screen-menu'); });
document.getElementById('confirmNo').addEventListener('click', () => { playSound('click'); confirmExit.classList.add('hidden'); });
confirmExit.addEventListener('click', e => { if (e.target === confirmExit) confirmExit.classList.add('hidden'); });

document.addEventListener('click', e => {
  // ВЕТКА 0: кнопка «👁 Посмотреть» на экране победы
  const dismissBtn = e.target.closest('[data-action="dismiss-win"]');
  if (dismissBtn) {
    playSound('click');
    document.querySelectorAll('.win-overlay.visible').forEach(o => o.classList.remove('visible'));
    if (typeof gameplayStart === 'function') gameplayStart();
    return;
  }
  // ВЕТКА 1: кнопки перехода (data-goto)
  const gotoBtn = e.target.closest('[data-goto]');
  if (gotoBtn) { playSound('click'); NAV.showScreen(gotoBtn.dataset.goto); return; }
});

// Кнопка «Готово!»
document.getElementById('doneBtn')?.addEventListener('click', () => {
  const key = ENGINE.activeCanvasKey ||
    document.querySelector('.screen.active [id^="painting-"]')?.id.replace('painting-', '');
  if (key && PAINTINGS[key] && typeof ENGINE.finishPainting === 'function') {
    ENGINE.finishPainting(key, PAINTINGS[key]);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  Object.keys(PAINTINGS).forEach(key => ENGINE.init(key));
  ENGINE.restoreAll(); // цвета + копии + мазки после F5
  switchMusic('screen-menu');
  const menu = document.getElementById('screen-menu');
  if (menu) NAV.updateHomeButton(menu);
  signalGameReady();
});

function initScrollHints() {
  document.addEventListener('scroll', e => {
    const hints = document.querySelectorAll('.scroll-hint');
    hints.forEach(h => h.classList.toggle('hidden', e.target.scrollTop > 50));
  }, true);
}
initScrollHints();