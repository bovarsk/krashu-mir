// ============================================
// ИНИЦИАЛИЗАЦИЯ VK BRIDGE
// ============================================
window.vkBridge = null;
window.gameLang = 'ru';
window.vkPlayer = null;

// Подключаем VK Bridge
if (typeof vkBridge !== 'undefined') {
    vkBridge.send('VKWebAppInit')
        .then(() => {
            console.log('✅ VK Bridge готов');
            // Определяем язык
            return vkBridge.send('VKWebAppGetUserInfo');
        })
        .then(user => {
            console.log('👤 Игрок:', user.first_name);
        })
        .catch(err => {
            console.log('⚠️ Ошибка VK Bridge:', err);
        });
} else {
    console.log('🖥️ Локальный режим — VK Bridge не подключён');
}

// ============================================
// GAME READY (в VK не нужен, но оставим заглушку)
// ============================================
function signalGameReady() {
    console.log('✅ Игра готова (VK режим)');
}

// ============================================
// GAMEPLAY API (в VK не требуется, но оставим для совместимости)
// ============================================
let isGameplayActive = false;

function gameplayStart() {
    isGameplayActive = true;
    console.log('▶️ Геймплей начался');
}

function gameplayStop() {
    isGameplayActive = false;
    console.log('⏸️ Геймплей остановлен');
}

/* ============================================
   СИСТЕМА СОХРАНЕНИЙ (VK WebApp Storage)
   ============================================ */

function saveGameData(gameState) {
    const dataToSave = {
        ...gameState,
        savedAt: Date.now(),
        version: '1.0'
    };
    console.log('💾 Сохраняем прогресс:', dataToSave);

    // 1. Сохраняем в облако VK
    if (typeof vkBridge !== 'undefined') {
        vkBridge.send('VKWebAppStorageSet', {
            key: 'gameSave',
            value: JSON.stringify(dataToSave)
        }).then(() => {
            console.log('✅ Прогресс сохранён в облако VK');
        }).catch(err => {
            console.error('❌ Ошибка сохранения в облако VK:', err);
        });
    }

    // 2. Дублируем в localStorage (подстраховка)
    localStorage.setItem('gameSave', JSON.stringify(dataToSave));
}

function loadGameData() {
    window.getGameState = function () {
        if (window.ENGINE && typeof ENGINE.getCloudState === 'function') {
            return ENGINE.getCloudState(true);
        }
        return null;
    };

    return new Promise((resolve) => {
        // Пытаемся загрузить из облака VK
        if (typeof vkBridge !== 'undefined') {
            vkBridge.send('VKWebAppStorageGet', { keys: ['gameSave'] })
                .then(data => {
                    if (data.keys && data.keys.length > 0 && data.keys[0].value) {
                        try {
                            const parsed = JSON.parse(data.keys[0].value);
                            console.log('☁️ Загружено из облака VK:', parsed);
                            applyGameData(parsed);
                            resolve(parsed);
                        } catch (e) {
                            console.error(' Ошибка парсинга:', e);
                            loadFromLocalStorage(resolve);
                        }
                    } else {
                        console.log('📭 Нет сохранения в облаке VK');
                        loadFromLocalStorage(resolve);
                    }
                })
                .catch(err => {
                    console.error('❌ Ошибка загрузки из облака VK:', err);
                    loadFromLocalStorage(resolve);
                });
        } else {
            loadFromLocalStorage(resolve);
        }
    });
}

function loadFromLocalStorage(resolveCallback) {
    const saved = localStorage.getItem('gameSave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            console.log(' Загружено из localStorage:', data);
            applyGameData(data);
            resolveCallback(data);
        } catch (e) {
            console.error('❌ Ошибка чтения localStorage:', e);
            resolveCallback(null);
        }
    } else {
        console.log('📭 Нет локального сохранения');
        resolveCallback(null);
    }
}

function applyGameData(data) {
    if (data && data.paintings && window.ENGINE && typeof ENGINE.applySave === 'function') {
        ENGINE.applySave(data);
    }
    console.log(' Применяем сохранение:', data);

    if (data.level) window.currentLevel = data.level;
    if (data.score) window.totalScore = data.score;
    if (data.coins) window.coins = data.coins;
    if (data.unlockedItems) window.unlockedItems = data.unlockedItems;
    if (data.settings) {
        if (data.settings.musicEnabled !== undefined) window.musicEnabled = data.settings.musicEnabled;
        if (data.settings.masterVolume !== undefined) window.masterVolume = data.settings.masterVolume;
    }

    window.dispatchEvent(new CustomEvent('gameDataLoaded', { detail: data }));
    console.log('✅ Прогресс загружен и применён');
}

function resetGameData() {
    console.log('🗑️ Сброс сохранения...');
    if (typeof vkBridge !== 'undefined') {
        vkBridge.send('VKWebAppStorageSet', {
            key: 'gameSave',
            value: '{}'
        }).then(() => {
            console.log('✅ Облачное сохранение VK очищено');
        }).catch(err => {
            console.error('❌ Ошибка очистки облака VK:', err);
        });
    }
    localStorage.removeItem('gameSave');
    console.log('✅ Локальное сохранение очищено');
}

/* ============================================
   АВТОСОХРАНЕНИЕ
   ============================================ */
setInterval(() => {
    if (window.getGameState) {
        const state = window.getGameState();
        if (state) saveGameData(state);
    }
}, 30000);

window.addEventListener('beforeunload', () => {
    if (window.getGameState) {
        const state = window.getGameState();
        if (state) {
            localStorage.setItem('gameSave', JSON.stringify({
                ...state,
                savedAt: Date.now()
            }));
            console.log('💾 Быстрое сохранение перед выходом');
        }
    }
});

/* ============================================
   РЕКЛАМА (опционально — можно добавить позже)
   ============================================ */
let lastAdTime = 0;
const AD_INTERVAL = 5 * 60000;
let adShowing = false;

function showInterstitialAd(callback) {
    // Пока реклама отключена — можно включить позже через VKWebAppShowNativeAds
    if (callback) callback();
}

function showAdOnMenuTransition(callback) {
    if (callback) callback();
}

function showAdOnScreenChange(callback) {
    if (callback) callback();
}

// Запрашиваем постоянное хранилище
if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(ok => {
        console.log(ok ? '💾 Хранилище объявлено постоянным' : '⚠️ Постоянное хранилище не выдано');
    });
}