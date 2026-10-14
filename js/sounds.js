/* ============================================
   ИНИЦИАЛИЗАЦИЯ WEB AUDIO API
   ============================================ */
let audioCtx = null;
let masterGainNode = null;

function initAudioContext() {
  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = masterVolume;
}

const soundBuffers = {};
const musicBuffers = {};

async function loadAudioFile(url, bufferObj, key) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    bufferObj[key] = audioBuffer;
  } catch (error) {
    console.error(`Ошибка загрузки аудио ${url}:`, error);
  }
}

async function loadAllAudio() {
  initAudioContext();

  const soundFiles = {
    color: 'sounds/color.mp3',
    paint: 'sounds/paint.mp3',
    win: 'sounds/win.mp3',
    click: 'sounds/click.mp3'
  };
  for (const [key, url] of Object.entries(soundFiles)) {
    await loadAudioFile(url, soundBuffers, key);
  }

  const musicFiles = {
    'screen-menu': 'sounds/music-menu.mp3',
    'screen-farm': 'sounds/music-farm.mp3',
    'screen-magazine': 'sounds/music-magazine.mp3',
    'screen-clubs': 'sounds/music-clubs.mp3',
    
  };
  for (const [key, url] of Object.entries(musicFiles)) {
    await loadAudioFile(url, musicBuffers, key);
  }

  console.log('✅ Аудио загружено');

  // Пытаемся запустить музыку сразу
  switchMusic('screen-menu');
}

/* ============================================
   ЗВУКИ (ЭФФЕКТЫ)
   ============================================ */
const baseVolumes = {
  color: 0.2,
  paint: 0.3,
  win: 0.8,
  click: 0.7
};

function playSound(name) {
  if (!audioCtx || !soundBuffers[name]) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const source = audioCtx.createBufferSource();
  source.buffer = soundBuffers[name];
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = baseVolumes[name];
  source.connect(gainNode);
  gainNode.connect(masterGainNode);
  source.start(0);
}

/* ============================================
   МУЗЫКА ДЛЯ РАЗНЫХ ЭКРАНОВ
   ============================================ */
const baseMusicVolume = 0.2;
let currentMusicSource = null;
let currentMusicId = null;
let musicStartedAt = 0;  // момент старта (по часам аудио-контекста)
let musicPausedAt = 0;   // на какой секунде трека встали на паузу


function stopMusicSource() {
  if (currentMusicSource) {
    // запоминаем, где остановились, чтобы продолжить с этого места
    if (audioCtx && musicStartedAt && currentMusicSource.buffer) {
      musicPausedAt = (musicPausedAt + (audioCtx.currentTime - musicStartedAt))
        % currentMusicSource.buffer.duration;
    }
    try { currentMusicSource.stop(); } catch (e) { }
    currentMusicSource = null;
  }
}

function switchMusic(screenId) {
  if (!audioCtx || !musicBuffers[screenId]) return;
  if (currentMusicId === screenId && currentMusicSource) return;
  stopMusicSource();
  const changed = currentMusicId !== screenId;
  currentMusicId = screenId;
  if (changed) musicPausedAt = 0;          // новый экран — новый трек с нуля
  if (!musicEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const source = audioCtx.createBufferSource();
  source.buffer = musicBuffers[screenId];
  source.loop = true;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = baseMusicVolume;
  source.connect(gainNode);
  gainNode.connect(masterGainNode);
  const offset = Math.min(musicPausedAt, Math.max(0, source.buffer.duration - 0.1));
  source.start(0, offset);                 // ← старт с секунды паузы
  currentMusicSource = source;
  musicStartedAt = audioCtx.currentTime;
  console.log('🎵 Играет музыка:', screenId, 'с', offset.toFixed(1) + ' сек');
}

/* ============================================
   УПРАВЛЕНИЕ UI И ГРОМКОСТЬЮ
   ============================================ */
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const soundPanel = document.querySelector('.sound-panel');
const volumeSlider = document.getElementById('volumeSlider');

let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
let masterVolume = parseFloat(localStorage.getItem('masterVolume'));
if (isNaN(masterVolume)) masterVolume = 1;

// SVG иконки
const ICON_SOUND_ON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="M45.5,11.5A19,19,0,0,0,41,4.2a9.28,9.28,0,0,0-5.2-2.4,14.39,14.39,0,0,0-7.4,2,30.61,30.61,0,0,0-7,4.1,22.9,22.9,0,0,1-8,4.6.92.92,0,0,0-.6.4A28.74,28.74,0,0,0,11,21a33.25,33.25,0,0,0,1.6,14.7,1.49,1.49,0,0,0,.9.4,20.16,20.16,0,0,1,6.8,3.2,30.67,30.67,0,0,0,6.5,4c.3.3,1,.3,1.3.5,5.4,2.7,9.6,2.5,12.4-.1a13.69,13.69,0,0,0,3.4-4.2,28.42,28.42,0,0,0,3.3-10.2A36.13,36.13,0,0,0,45.5,11.5Z" fill="#b7c3d7"/>
  <path d="M12.1,35.6c-1.9-.5-3.8-.4-5.5-1.1a8.19,8.19,0,0,1-5.1-5.6,14.12,14.12,0,0,1,.1-9.3,8.57,8.57,0,0,1,7.5-6.1c.9-.1,1.7-.3,2.6-.4.1,0,.2-.1.3,0s0,.2,0,.3a33,33,0,0,0-1.7,14.3A33.4,33.4,0,0,0,12,35.3.37.37,0,0,0,12.1,35.6Z" fill="#9bacc7"/>
  <path d="M45.4,23.4a34.31,34.31,0,0,1-2.1,11.4,15.87,15.87,0,0,1-3,5,7.37,7.37,0,0,1-5.8,2.6,6.56,6.56,0,0,1-3.9-1.7,13.72,13.72,0,0,1-3.8-5.2,30.53,30.53,0,0,1-2.2-10.7,29.29,29.29,0,0,1,1.5-10.6,17.32,17.32,0,0,1,3-5.7,9.31,9.31,0,0,1,3.3-2.6,6.67,6.67,0,0,1,6.8.9,13.85,13.85,0,0,1,4,6.1C44.2,15.5,45.5,20.2,45.4,23.4Z" fill="#5d7fa8"/>
  <g>
    <path d="M47.9,20.7A29.52,29.52,0,0,0,45,9.4a15.44,15.44,0,0,0-5-6.3,8.43,8.43,0,0,0-8.1-1.2,59.6,59.6,0,0,0-5.8,2.5,23.59,23.59,0,0,0-5.7,3.5,21,21,0,0,1-11.6,5,9,9,0,0,0-7.7,5.9A15.23,15.23,0,0,0,.7,28.9a9,9,0,0,0,4,5.5,14.76,14.76,0,0,0,3.5,1.3c1.3.3,2.6.4,3.9.6a21.46,21.46,0,0,1,7.6,3.3c1.1.8,2.2,1.6,3.4,2.4a27,27,0,0,0,3.8,1.9l.3.1c1.8.7,3.6,1.2,5.4,1.8a6.7,6.7,0,0,0,4.2,0,11.35,11.35,0,0,0,5.9-4.2,24.34,24.34,0,0,0,4.1-8.4A40.23,40.23,0,0,0,47.9,20.7ZM6.6,34.5a8.19,8.19,0,0,1-5.1-5.6,14.12,14.12,0,0,1,.1-9.3,8.57,8.57,0,0,1,7.5-6.1c.9-.1,1.7-.3,2.6-.4.1,0,.2-.1.3,0s0,.2,0,.3a33,33,0,0,0-1.7,14.3A33.4,33.4,0,0,0,12,35.3a.37.37,0,0,0,.1.3C10.2,35.1,8.3,35.2,6.6,34.5Zm21.1,9a32,32,0,0,1-7.6-4.4,18.52,18.52,0,0,0-6.8-3.2c-.2,0-.4-.2-.5-.5A32.91,32.91,0,0,1,11,20.8a34.45,34.45,0,0,1,1.8-7.7.82.82,0,0,1,.5-.5,21.57,21.57,0,0,0,7.8-4.4,30,30,0,0,1,6.7-3.9H28l-.1.1c-3.2,3.4-4.8,7.5-5.7,12.1-.2,1.1-.4,2.2-.5,3.3a36.32,36.32,0,0,0,.4,10.4,27.11,27.11,0,0,0,4.3,10.9,22,22,0,0,0,2,2.3,1.21,1.21,0,0,1,.5.5,8.4,8.4,0,0,0-1.2-.4ZM46.8,29.1a29.46,29.46,0,0,1-3.3,10,13.57,13.57,0,0,1-3.6,4.3,7.72,7.72,0,0,1-10,.2,14.75,14.75,0,0,1-4.2-5.1,29.91,29.91,0,0,1-3.2-10.4,34,34,0,0,1-.3-4.5A35.49,35.49,0,0,1,24,12.4a18.18,18.18,0,0,1,4.9-7.9,8.21,8.21,0,0,1,6.3-2.4,8.34,8.34,0,0,1,5,2.1,17,17,0,0,1,4.7,7.1A32.76,32.76,0,0,1,46.8,29.1Z" fill="#262727"/>
    <path d="M24,24a30.79,30.79,0,0,1,2-11.2,15.1,15.1,0,0,1,4-6,7.37,7.37,0,0,1,5.5-2,7.47,7.47,0,0,1,5.2,2.9,19.25,19.25,0,0,1,4.2,8.6A31.38,31.38,0,0,1,44,34a16.27,16.27,0,0,1-4.5,7.1A7.53,7.53,0,0,1,35.6,43a7.36,7.36,0,0,1-5.5-1.8,15.78,15.78,0,0,1-4.3-6.5A32.93,32.93,0,0,1,24,24Zm21,0a26.2,26.2,0,0,0-.1-2.8,28,28,0,0,0-1.8-8.1,13.75,13.75,0,0,0-4.1-6A6,6,0,0,0,32.6,6a7.68,7.68,0,0,0-3.3,2.6,18.36,18.36,0,0,0-3,5.7,31.64,31.64,0,0,0-1.5,10.6,28.28,28.28,0,0,0,2.1,10.3,13,13,0,0,0,3.8,5.4,6.2,6.2,0,0,0,3.9,1.6,7.16,7.16,0,0,0,5.5-2.7A15.14,15.14,0,0,0,43,34.6,29,29,0,0,0,45,24Z" fill="#262727"/>
  </g>
  <path d="M34.9,28.1a1.71,1.71,0,0,1-1.6-1.2c-.1-.2-.1-.4.2-.5s.3.1.4.3a1.05,1.05,0,0,0,1,.8,1,1,0,0,0,1-.8c.1-.2.1-.4.4-.3a.4.4,0,0,1,.2.4A1.53,1.53,0,0,1,34.9,28.1Z" fill="#1d1d1d"/>
  <circle cx="29.2" cy="20.8" r="3" fill="#262727"/>
  <circle cx="28.3" cy="20.1" r="1" fill="#fefefd"/>
  <circle cx="30" cy="21.6" r="0.5" fill="#fefefd"/>
  <circle cx="40.6" cy="20.6" r="3" fill="#262727"/>
  <circle cx="39.7" cy="19.9" r="1" fill="#fefefd"/>
  <circle cx="41.4" cy="21.4" r="0.5" fill="#fefefd"/>
</svg>
`;
const ICON_SOUND_OFF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="M45.4,11.5a19,19,0,0,0-4.5-7.3,9.28,9.28,0,0,0-5.2-2.4,14.39,14.39,0,0,0-7.4,2,30.61,30.61,0,0,0-7,4.1,22.9,22.9,0,0,1-8,4.6.92.92,0,0,0-.6.4A28.74,28.74,0,0,0,10.9,21a33.25,33.25,0,0,0,1.6,14.7,1.49,1.49,0,0,0,.9.4,20.16,20.16,0,0,1,6.8,3.2,30.67,30.67,0,0,0,6.5,4c.3.3,1,.3,1.3.5,5.4,2.7,9.6,2.5,12.4-.1a13.69,13.69,0,0,0,3.4-4.2,28.42,28.42,0,0,0,3.3-10.2A36.13,36.13,0,0,0,45.4,11.5Z" fill="#b7c3d7"/>
  <path d="M45.2,23.2a34.31,34.31,0,0,1-2.1,11.4,15.87,15.87,0,0,1-3,5,7.37,7.37,0,0,1-5.8,2.6,6.56,6.56,0,0,1-3.9-1.7,13.72,13.72,0,0,1-3.8-5.2,30.53,30.53,0,0,1-2.2-10.7A29.29,29.29,0,0,1,25.9,14a17.32,17.32,0,0,1,3-5.7,9.31,9.31,0,0,1,3.3-2.6,6.67,6.67,0,0,1,6.8.9,14.5,14.5,0,0,1,4.3,6.1A31.63,31.63,0,0,1,45.2,23.2Z" fill="#5d7fa8"/>
  <path d="M47.9,20.7A29.52,29.52,0,0,0,45,9.4a15.44,15.44,0,0,0-5-6.3,8.43,8.43,0,0,0-8.1-1.2,59.6,59.6,0,0,0-5.8,2.5,23.59,23.59,0,0,0-5.7,3.5,21,21,0,0,1-11.6,5,9,9,0,0,0-7.7,5.9A15.23,15.23,0,0,0,.7,28.9a9,9,0,0,0,4,5.5,14.76,14.76,0,0,0,3.5,1.3c1.3.3,2.6.4,3.9.6a21.46,21.46,0,0,1,7.6,3.3c1.1.8,2.2,1.6,3.4,2.4a27,27,0,0,0,3.8,1.9l.3.1c1.8.7,3.6,1.2,5.4,1.8a6.7,6.7,0,0,0,4.2,0,11.35,11.35,0,0,0,5.9-4.2,24.34,24.34,0,0,0,4.1-8.4A40.23,40.23,0,0,0,47.9,20.7ZM6.6,34.5a8.19,8.19,0,0,1-5.1-5.6,14.12,14.12,0,0,1,.1-9.3,8.57,8.57,0,0,1,7.5-6.1c.9-.1,1.7-.3,2.6-.4.1,0,.2-.1.3,0s0,.2,0,.3a33,33,0,0,0-1.7,14.3A33.4,33.4,0,0,0,12,35.3a.37.37,0,0,0,.1.3C10.2,35.1,8.3,35.2,6.6,34.5Zm21.1,9a32,32,0,0,1-7.6-4.4,18.52,18.52,0,0,0-6.8-3.2.82.82,0,0,1-.5-.5A32.91,32.91,0,0,1,11,20.8a34.45,34.45,0,0,1,1.8-7.7c.1-.3.3-.5.5-.5a21.57,21.57,0,0,0,7.8-4.4,30,30,0,0,1,6.7-3.9H28l-.1.1c-3.2,3.4-4.8,7.5-5.7,12.1-.2,1.1-.4,2.2-.5,3.3a36.32,36.32,0,0,0,.4,10.4,27.11,27.11,0,0,0,4.3,10.9,22,22,0,0,0,2,2.3,1.21,1.21,0,0,1,.5.5,8.4,8.4,0,0,0-1.2-.4ZM46.8,29.1a29.46,29.46,0,0,1-3.3,10,13.57,13.57,0,0,1-3.6,4.3,7.72,7.72,0,0,1-10,.2,14.75,14.75,0,0,1-4.2-5.1A29.78,29.78,0,0,1,22.5,28a34,34,0,0,1-.3-4.5A35.49,35.49,0,0,1,24,12.3a18.18,18.18,0,0,1,4.9-7.9A8.21,8.21,0,0,1,35.2,2a8.34,8.34,0,0,1,5,2.1,17,17,0,0,1,4.7,7.1A33.22,33.22,0,0,1,46.8,29.1Z" fill="#262727"/>
  <path d="M12.1,35.6c-1.9-.5-3.8-.4-5.5-1.1a8.19,8.19,0,0,1-5.1-5.6,14.12,14.12,0,0,1,.1-9.3,8.57,8.57,0,0,1,7.5-6.1c.9-.1,1.7-.3,2.6-.4.1,0,.2-.1.3,0s0,.2,0,.3a33,33,0,0,0-1.7,14.3A33.4,33.4,0,0,0,12,35.3.77.77,0,0,0,12.1,35.6Z" fill="#9bacc7"/>
  <path d="M27.8,4.3H28l-.1.1Z" fill="#b7c3d7"/>
  <path d="M23.9,23.8a30.79,30.79,0,0,1,2-11.2,15.1,15.1,0,0,1,4-6,7.37,7.37,0,0,1,5.5-2,7.51,7.51,0,0,1,5.2,2.8A19.25,19.25,0,0,1,44.8,16,32.28,32.28,0,0,1,44,33.7a16.27,16.27,0,0,1-4.5,7.1,7.53,7.53,0,0,1-3.9,1.9,7.36,7.36,0,0,1-5.5-1.8,15.78,15.78,0,0,1-4.3-6.5A31.55,31.55,0,0,1,23.9,23.8Zm21,0a25.28,25.28,0,0,0-.1-2.8A28,28,0,0,0,43,12.9a13.75,13.75,0,0,0-4.1-6,6,6,0,0,0-6.4-1.1,8.51,8.51,0,0,0-3.3,2.6,18.36,18.36,0,0,0-3,5.7,31.64,31.64,0,0,0-1.5,10.6A28.28,28.28,0,0,0,26.8,35a13,13,0,0,0,3.8,5.4A6.2,6.2,0,0,0,34.5,42,7.16,7.16,0,0,0,40,39.3a15.14,15.14,0,0,0,2.9-4.9,29,29,0,0,0,2-10.6Z" fill="#262727"/>
  <path d="M6.9,3h0a1.43,1.43,0,0,1,2,.2L44.8,45.3a1.43,1.43,0,0,1-.2,2h0a1.43,1.43,0,0,1-2-.2L6.8,5A1.34,1.34,0,0,1,6.9,3Z" fill="#f55"/>
  <path d="M30.7,21.9a2.76,2.76,0,0,1-2.6-1.7c-.2-.3-.2-.6.3-.7s.5.1.7.4a1.71,1.71,0,0,0,1.6,1.2,1.46,1.46,0,0,0,1.6-1.2c.2-.3.2-.6.7-.4.3.1.3.4.3.6C33.2,21.2,32,21.9,30.7,21.9Z" fill="#1d1d1d"/>
  <path d="M40.4,21.9a2.76,2.76,0,0,1-2.6-1.7c-.2-.3-.2-.6.3-.7s.5.1.7.4a1.71,1.71,0,0,0,1.6,1.2A1.46,1.46,0,0,0,42,19.9c.2-.3.2-.6.7-.4.3.1.3.4.3.6C42.9,21.2,41.7,21.9,40.4,21.9Z" fill="#1d1d1d"/>
  <circle cx="35.8" cy="24.4" r="0.7" fill="#1d1d1d"/>
</svg>
`;

function updateMusicState() {
  if (musicEnabled) {
    musicIcon.innerHTML = ICON_SOUND_ON;
    musicToggle.classList.remove('muted');
    if (currentMusicId && !currentMusicSource && musicBuffers[currentMusicId]) {
      switchMusic(currentMusicId);
    }
  } else {
    musicIcon.innerHTML = ICON_SOUND_OFF;
    musicToggle.classList.add('muted');
    stopMusicSource();                // жёсткая остановка
  }
}

function applyVolume() {
  if (masterGainNode) {
    masterGainNode.gain.value = masterVolume;
  }
  if (masterVolume === 0) {
    musicIcon.innerHTML = ICON_SOUND_OFF;
  } else if (musicEnabled) {
    musicIcon.innerHTML = ICON_SOUND_ON;
  }
}

volumeSlider.value = masterVolume * 100;
applyVolume();

volumeSlider.addEventListener('input', function () {
  masterVolume = this.value / 100;
  localStorage.setItem('masterVolume', masterVolume);
  applyVolume();
});

musicToggle.addEventListener('click', function (e) {
  e.stopPropagation();
  e.preventDefault();
  musicEnabled = !musicEnabled;
  localStorage.setItem('musicEnabled', musicEnabled);
  console.log('🔊 musicEnabled =', musicEnabled);
  if (!musicEnabled) {
    stopMusicSource();                // СТОП: тихо и окончательно
    musicIcon.innerHTML = ICON_SOUND_OFF;
    musicToggle.classList.add('muted');
  } else {
    musicIcon.innerHTML = ICON_SOUND_ON;
    musicToggle.classList.remove('muted');
    if (currentMusicId && musicBuffers[currentMusicId]) {
      stopMusicSource();              // страховка от двойного источника
      switchMusic(currentMusicId);    // старт (с начала — буфер не умеет паузу)
    }
  }
});

/* ============================================
   АВТОЗАПУСК + ЗАПАСНОЙ ЗАПУСК ПЕРВЫМ КЛИКОМ
   ============================================ */
// Пытаемся запустить сразу (может не сработать из-за политики браузера)
document.addEventListener('click', function firstClick() {
  initAudioContext();
  if (musicEnabled && currentMusicId && musicBuffers[currentMusicId] && !currentMusicSource) {
    switchMusic(currentMusicId);
  }
  document.removeEventListener('click', firstClick);
}, { once: true });

document.addEventListener('touchstart', function firstTouch() {
  initAudioContext();
  if (musicEnabled && currentMusicId && musicBuffers[currentMusicId] && !currentMusicSource) {
    switchMusic(currentMusicId);
  }
  document.removeEventListener('touchstart', firstTouch);
}, { once: true });

/* ============================================
   ПАУЗА ЗВУКА ПРИ СВОРАЧИВАНИИ
   ============================================ */
document.addEventListener('visibilitychange', () => {
  if (!audioCtx) return;
  if (document.hidden) {
    audioCtx.suspend();
  } else {
    if (musicEnabled) {
      audioCtx.resume();
    }
  }
});

window.addEventListener('blur', () => {
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
});

window.addEventListener('focus', () => {
  if (audioCtx && musicEnabled) {
    audioCtx.resume();
  }
});

/* ============================================
   ЗАПУСК
   ============================================ */
loadAllAudio();
updateMusicState();