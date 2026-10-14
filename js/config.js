/* ============================================ */
/* КОНФИГИ ВСЕХ РАСКРАСОК                       */
/* ============================================ */
/* Чтобы добавить новую раскраску — см. ИНСТРУКЦИЯ.txt */

const PAINTINGS = {



    // ============ ДЕРЕВНЯ ============
    farmer: {
        containerId: "painting-farmer", // где лежит SVG раскраски
        paletteId: "palette-farmer", // где рисовать палитру
        winOverlayId: "win-farmer", // экран победы
        previewId: "preview-farmer", // куда клонировать превью в меню 
        palette: [
            "#007AFF", // ярко-синий — джинсовый комбинезон
            "#FFD60A", // яркий жёлтый — шляпа и солома
            "#FF3B30", // яркий красный — рубашка, косынка
            "#34C759", // яркий зелёный — трава, акценты
            "#FF9500", // яркий оранжевый — волосы, морковка
            "#00C7BE", // бирюзовый — рукава, акценты
            "#AF52DE", // яркий фиолетовый — лента шляпы
            "#FF4F9A", // малиново-розовый — щёчки, акценты
            "#FFCBA4", // телесный персик — лицо и руки (единственный мягкий, он такой и нужен)
            "#A0522D", // насыщенный коричневый — ботинки, волосы
            "#FFFFFF", // белый — рубашка, блики
            "#1D1D1D", // чёрный — контур, ботинки
        ],
    },

    coop: {
        containerId: 'painting-coop',
        paletteId: 'palette-coop',
        winOverlayId: 'win-coop',
        previewId: null,
        starId: null,
        palette: [
            '#8B5A3C', // дерево курятника
            '#D4A574', // светлое дерево
            '#FFE066', // солома и зерно
            '#FF3B30', // гребешок
            '#FF9500', // клюв
            '#FFD60A', // цыплята
            '#34C759', // трава
            '#007AFF', // акцент
            '#AF52DE', // акцент
            '#FF4F9A', // акцент
            '#FFFFFF', // белый
            '#1D1D1D', // контур
        ],
    },

    ryaba: {
        containerId: 'painting-ryaba',
        paletteId: 'palette-ryaba',
        winOverlayId: 'win-ryaba',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // золотое яйцо
            '#FF9500', // перья
            '#8B5A3C', // гнездо
            '#FF3B30', // гребешок
            '#34C759', // трава
            '#007AFF', // небо
            '#AF52DE', // акцент
            '#FF4F9A', // щёчки
            '#00C7BE', // акцент
            '#D4A574', // дерево
            '#1D1D1D', // контур
            '#FFFFFF', // белое яйцо
        ],
    },

    pete: {
        containerId: 'painting-pete',
        paletteId: 'palette-pete',
        winOverlayId: 'win-pete',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // гребень
            '#FF9500', // хвост
            '#FFD60A', // перья
            '#34C759', // трава
            '#007AFF', // небо
            '#AF52DE', // хвостовое перо
            '#00C7BE', // акцент
            '#FF4F9A', // бородка
            '#8B5A3C', // земля
            '#D4A574', // жёрдочка
            '#FFFFFF', // белый
            '#1D1D1D', // контур
        ],
    },

    pipi: {
        containerId: 'painting-pipi',
        paletteId: 'palette-pipi',
        winOverlayId: 'win-pipi',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // жёлтый пух
            '#FF9500', // крылышки
            '#FFE066', // светлый пух
            '#FF3B30', // гребешок
            '#FF4F9A', // щёчки
            '#34C759', // трава
            '#007AFF', // акцент
            '#AF52DE', // акцент
            '#00C7BE', // акцент
            '#FFCBA4', // лапки
            '#FFFFFF', // белый
            '#1D1D1D', // контур

        ],
    },

    egi: {
        containerId: 'painting-egi',
        paletteId: 'palette-egi',
        winOverlayId: 'win-egi',
        previewId: null,
        starId: null,
        palette: [
            '#F5E6D3', // кремовое
            '#FFD60A', // золотое
            '#FF4F9A', // розовое
            '#007AFF', // синее
            '#34C759', // зелёное
            '#AF52DE', // фиолетовое
            '#00C7BE', // бирюзовое
            '#FF3B30', // красное
            '#FF9500', // оранжевое
            '#8B5A3C', // корзина
            '#1D1D1D', // контур
            '#FFFFFF', // белое яйцо
        ],
    },

    farmhome: {
        containerId: 'painting-farmhome',
        paletteId: 'palette-farmhome',
        winOverlayId: 'win-farmhome',
        previewId: null,
        starId: null,
        palette: [
            '#A0522D', // тёмное дерево
            '#8B5A3C', // среднее дерево
            '#D4A574', // светлое дерево
            '#FF3B30', // черепица
            '#FFD60A', // ставни
            '#34C759', // трава
            '#007AFF', // небо/окна
            '#AF52DE', // цветы
            '#FF9500', // дверь
            '#00C7BE', // акцент
            '#1D1D1D', // контур
            '#FFFFFF', // стены
        ],
    },

    barn: {
        containerId: 'painting-barn',
        paletteId: 'palette-barn',
        winOverlayId: 'win-barn',
        previewId: null,
        starId: null,
        palette: [
            '#E53935', // красный сарай
            '#8B5A3C', // тёмное дерево
            '#A0522D', // балки
            '#D4A574', // светлое дерево
            '#FFD60A', // солома
            '#34C759', // трава
            '#007AFF', // небо
            '#FF9500', // дверь
            '#AF52DE', // акцент
            '#FFCBA4', // акцент
            '#1D1D1D', // контур
            '#FFFFFF', // окна/облака
        ],
    },

    hive: {
        containerId: 'painting-hive',
        paletteId: 'palette-hive',
        winOverlayId: 'win-hive',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // мёд
            '#F5A623', // воск
            '#FF9500', // соты тёмные
            '#8B5A3C', // дерево улья
            '#D4A574', // светлое дерево
            '#34C759', // трава
            '#007AFF', // небо
            '#FF3B30', // цветы
            '#AF52DE', // цветы
            '#FFCBA4', // акцент
            '#FFFFFF', // облака
            '#1D1D1D', // контур
        ],
    },

    tractor: {
        containerId: 'painting-tractor',
        paletteId: 'palette-tractor',
        winOverlayId: 'win-tractor',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красный корпус
            '#007AFF', // синий акцент
            '#FFD60A', // жёлтые фары
            '#FF9500', // оранжевый
            '#AF52DE', // фиолетовый акцент
            '#00C7BE', // бирюза
            '#95A5A6', // металл светлый
            '#607D8B', // металл тёмный
            '#8B5A3C', // земля
            '#FF4F9A', // акцент
            '#1D1D1D', // шины
            '#FFFFFF', // блики
        ],
    },

    garden: {
        containerId: 'painting-garden',
        paletteId: 'palette-garden',
        winOverlayId: 'win-garden',
        previewId: null,
        starId: null,
        palette: [
            '#34C759', // листья
            '#8BC34A', // светлая зелень
            '#2E7D32', // тёмная зелень
            '#FF3B30', // цветы/помидоры
            '#FFD60A', // подсолнухи
            '#FF9500', // морковь
            '#AF52DE', // цветы
            '#FF4F9A', // розы
            '#007AFF', // лейка
            '#8B5A3C', // земля
            '#FFFFFF', // облака
            '#1D1D1D', // контур
        ],
    },

    greenhouse: {
        containerId: 'painting-greenhouse',
        paletteId: 'palette-greenhouse',
        winOverlayId: 'win-greenhouse',
        previewId: null,
        starId: null,
        palette: [
            '#34C759', // зелень внутри
            '#8BC34A', // светлая зелень
            '#00C7BE', // стёкла
            '#A8D8FF', // отражения
            '#FFD60A', // солнце
            '#FF3B30', // помидоры
            '#FF9500', // цветы
            '#8B5A3C', // каркас
            '#AF52DE', // акцент
            '#FF4F9A', // акцент
            '#FFFFFF', // стекло
            '#1D1D1D', // контур
        ],
    },

    honeycombs: {
        containerId: 'painting-honeycombs',
        paletteId: 'palette-honeycombs',
        winOverlayId: 'win-honeycombs',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // мёд светлый
            '#F5A623', // мёд средний
            '#FF9500', // мёд тёмный
            '#8B5A3C', // рамка
            '#D4A574', // дерево
            '#FFCBA4', // воск
            '#34C759', // листья
            '#007AFF', // акцент
            '#FF3B30', // акцент
            '#AF52DE', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    bee: {
        containerId: 'painting-bee',
        paletteId: 'palette-bee',
        winOverlayId: 'win-bee',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // тело пчелы
            '#007AFF', // небо
            '#34C759', // цветы-стебли
            '#FF3B30', // маки
            '#FF9500', // акцент
            '#AF52DE', // цветы
            '#00C7BE', // акцент
            '#FF4F9A', // цветы
            '#8B5A3C', // улей
            '#F5A623', // пыльца
            '#1D1D1D', // полосы
            '#FFFFFF', // крылья
        ],
    },

    raspberry: {
        containerId: 'painting-raspberry',
        paletteId: 'palette-raspberry',
        winOverlayId: 'win-raspberry',
        previewId: null,
        starId: null,
        palette: [
            '#E91E63', // малина яркая
            '#C2185B', // малина тёмная
            '#FF4F9A', // малина светлая
            '#34C759', // листья
            '#8BC34A', // светлые листья
            '#2E7D32', // стебли
            '#FFD60A', // солнце
            '#8B5A3C', // ветка
            '#FF9500', // акцент
            '#AF52DE', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    pear: {
        containerId: 'painting-pear',
        paletteId: 'palette-pear',
        winOverlayId: 'win-pear',
        previewId: null,
        starId: null,
        palette: [
            '#CDDC39', // лайм-жёлтая груша
            '#8BC34A', // зелёная груша
            '#34C759', // листья
            '#FFD60A', // спелая
            '#FF9500', // румянец
            '#8B5A3C', // ветка
            '#D4A574', // светлое дерево
            '#FF3B30', // акцент
            '#AF52DE', // акцент
            '#FF4F9A', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    plum: {
        containerId: 'painting-plum',
        paletteId: 'palette-plum',
        winOverlayId: 'win-plum',
        previewId: null,
        starId: null,
        palette: [
            '#9C27B0', // слива яркая
            '#7B1FA2', // слива тёмная
            '#AF52DE', // слива светлая
            '#4A148C', // самая тёмная
            '#34C759', // листья
            '#8BC34A', // светлые листья
            '#FFD60A', // солнце
            '#FF3B30', // акцент
            '#8B5A3C', // ветка
            '#FF4F9A', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    currant: {
        containerId: 'painting-currant',
        paletteId: 'palette-currant',
        winOverlayId: 'win-currant',
        previewId: null,
        starId: null,
        palette: [
            '#4A148C', // чёрная смородина
            '#7B1FA2', // фиолетовая
            '#9C27B0', // светлая
            '#34C759', // листья
            '#8BC34A', // светлые листья
            '#FF3B30', // красная смородина
            '#FFD60A', // солнце
            '#FF4F9A', // акцент
            '#8B5A3C', // ветка
            '#007AFF', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    apple: {
        containerId: 'painting-apple',
        paletteId: 'palette-apple',
        winOverlayId: 'win-apple',
        previewId: null,
        starId: null,
        palette: [
            '#E53935', // красное яблоко
            '#FF3B30', // светлее
            '#34C759', // листья
            '#8BC34A', // зелёное яблоко
            '#FFD60A', // жёлтое яблоко
            '#FF9500', // румянец
            '#FF4F9A', // розовое
            '#8B5A3C', // ветка
            '#AF52DE', // акцент
            '#FFCBA4', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    bake: {
        containerId: 'painting-bake',
        paletteId: 'palette-bake',
        winOverlayId: 'win-bake',
        previewId: null,
        starId: null,
        palette: [

            '#D4A574', // тесто
            '#A0522D', // корочка тёмная
            '#8B5A3C', // корочка
            '#FFCBA4', // мякиш
            '#FFD60A', // блики
            '#FF9500', // румянец
            '#FF3B30', // джем/вишня
            '#34C759', // мята/акцент
            '#AF52DE', // акцент
            '#FF4F9A', // крем
            '#FFFFFF', // сахарная пудра
            '#1D1D1D', // контур        
        ],
    },

    shovel: {
        containerId: 'painting-shovel',
        paletteId: 'palette-shovel',
        winOverlayId: 'win-shovel',
        previewId: null,
        starId: null,
        palette: [
            '#95A5A6', // металл светлый
            '#607D8B', // металл тёмный
            '#8B5A3C', // черенок тёмный
            '#D4A574', // черенок светлый
            '#FFD60A', // акцент
            '#FF3B30', // ручка
            '#34C759', // земля/трава
            '#007AFF', // акцент
            '#AF52DE', // акцент
            '#FF4F9A', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур

        ],
    },

    rake: {
        containerId: 'painting-rake',
        paletteId: 'palette-rake',
        winOverlayId: 'win-rake',
        previewId: null,
        starId: null,
        palette: [
            '#95A5A6', // металл светлый
            '#607D8B', // металл тёмный
            '#8B5A3C', // черенок
            '#D4A574', // черенок светлый
            '#FFD60A', // листья
            '#34C759', // трава
            '#FF3B30', // ручка
            '#007AFF', // акцент
            '#AF52DE', // акцент
            '#FF4F9A', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    leica: {
        containerId: 'painting-leica',
        paletteId: 'palette-leica',
        winOverlayId: 'win-leica',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // корпус синий
            '#00C7BE', // вода
            '#A8D8FF', // капли светлые
            '#95A5A6', // металл
            '#607D8B', // носик тёмный
            '#FFD60A', // акцент
            '#34C759', // трава
            '#FF3B30', // ручка
            '#8B5A3C', // акцент
            '#AF52DE', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур

        ],
    },

    peas: {
        containerId: 'painting-peas',
        paletteId: 'palette-peas',
        winOverlayId: 'win-peas',
        previewId: null,
        starId: null,
        palette: [
            '#8BC34A', // стручок
            '#34C759', // горошины
            '#2E7D32', // тёмная зелень
            '#CDDC39', // светлые стручки
            '#FFD60A', // солнце
            '#FF9500', // акцент
            '#FF3B30', // акцент
            '#8B5A3C', // стебель
            '#AF52DE', // цветы гороха
            '#007AFF', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    cabbage: {
        containerId: 'painting-cabbage',
        paletteId: 'palette-cabbage',
        winOverlayId: 'win-cabbage',
        previewId: null,
        starId: null,
        palette: [
            '#8BC34A', // листья светлые
            '#34C759', // листья яркие
            '#2E7D32', // внешние листья
            '#CDDC39', // кочерыжка
            '#00C7BE', // капли воды
            '#FFD60A', // солнце
            '#FF3B30', // акцент
            '#8B5A3C', // земля
            '#D4A574', // акцент
            '#AF52DE', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    pepper: {
        containerId: 'painting-pepper',
        paletteId: 'palette-pepper',
        winOverlayId: 'win-pepper',
        previewId: null,
        starId: null,
        palette: [
            '#E53935', // красный перец
            '#FF3B30', // светлее
            '#FF9500', // оранжевый перец
            '#FFD60A', // жёлтый перец
            '#34C759', // зелёный перец
            '#8BC34A', // листья
            '#2E7D32', // стебель
            '#FF4F9A', // акцент
            '#8B5A3C', // земля
            '#AF52DE', // акцент
            '#FFFFFF', // блики
            '#1D1D1D', // контур
        ],
    },

    eggplant: {
        containerId: 'painting-eggplant',
        paletteId: 'palette-eggplant',
        winOverlayId: 'win-eggplant',
        previewId: null,
        starId: null,
        palette: [
            '#4A148C', // баклажан тёмный
            '#7B1FA2', // средний
            '#9C27B0', // яркий
            '#AF52DE', // светлый
            '#34C759', // листья
            '#8BC34A', // чашечка
            '#FFD60A', // солнце
            '#FF3B30', // акцент
            '#8B5A3C', // земля
            '#FFFFFF', // блики
            '#1D1D1D', // контур
            '#FF4F9A', // акцент
        ],
    },

    corn: {
        containerId: 'painting-corn',
        paletteId: 'palette-corn',
        winOverlayId: 'win-corn',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // зёрна яркие
            '#F5A623', // зёрна средние
            '#FF9500', // зёрна тёмные
            '#34C759', // листья
            '#8BC34A', // светлые листья
            '#2E7D32', // стебель
            '#8B5A3C', // земля
            '#FF3B30', // акцент
            '#007AFF', // небо
            '#FFFFFF', // блики
            '#1D1D1D', // контур
            '#FFCBA4', // акцент
        ],
    },

    onion: {
        containerId: 'painting-onion',
        paletteId: 'palette-onion',
        winOverlayId: 'win-onion',
        previewId: null,
        starId: null,
        palette: [
            '#D4A574', // золотистый лук
            '#FFD60A', // светлый
            '#FF9500', // румянец
            '#7B1FA2', // красный лук
            '#9C27B0', // светлее
            '#34C759', // перья
            '#8BC34A', // светлые перья
            '#FF3B30', // акцент
            '#FFCBA4', // шелуха
            '#FFFFFF', // блики
            '#1D1D1D', // контур
            '#AF52DE', // акцент
        ],
    },

    cow: {
        containerId: 'painting-cow',
        paletteId: 'palette-cow',
        winOverlayId: 'win-cow',
        previewId: null,
        starId: null,
        palette: [
            '#F8C8DC', // вымя
            '#FFCBA4', // мордочка
            '#FF3B30', // колокольчик
            '#34C759', // трава
            '#8BC34A', // светлая трава
            '#FFD60A', // солнце
            '#007AFF', // небо
            '#8B5A3C', // земля
            '#AF52DE', // цветы
            '#FF4F9A', // акцент
            '#FFFFFF', // белая шерсть
            '#1D1D1D', // чёрные пятна
        ],
    },

    sheep: {
        containerId: 'painting-sheep',
        paletteId: 'palette-sheep',
        winOverlayId: 'win-sheep',
        previewId: null,
        starId: null,
        palette: [
            '#1D1D1D', // мордочка
            '#FFCBA4', // нос
            '#F8C8DC', // ушки
            '#FF3B30', // бант
            '#34C759', // трава
            '#FFD60A', // солнце
            '#007AFF', // небо
            '#8B5A3C', // земля
            '#AF52DE', // цветы
            '#FF4F9A', // акцент
            '#FFFFFF', // шерсть
            '#F0F0F0', // шерсть тень
        ],
    },

    rabit: {
        containerId: 'painting-rabit',
        paletteId: 'palette-rabit',
        winOverlayId: 'win-rabit',
        previewId: null,
        starId: null,
        palette: [
            '#E8E8E8', // серый мех
            '#BDBDBD', // тень меха
            '#1D1D1D', // глазки/носик
            '#F8C8DC', // ушки внутри
            '#FFCBA4', // лапки
            '#FF3B30', // морковка
            '#34C759', // ботва
            '#FFD60A', // солнце
            '#007AFF', // акцент
            '#AF52DE', // цветы
            '#8B5A3C', // земля
            '#FFFFFF', // белый животик
        ],
    },

    goat: {
        containerId: 'painting-goat',
        paletteId: 'palette-goat',
        winOverlayId: 'win-goat',
        previewId: null,
        starId: null,
        palette: [
            '#E8E8E8', // серый мех
            '#1D1D1D', // копытца
            '#8B5A3C', // рожки
            '#D4A574', // рожки светлые
            '#FFCBA4', // мордочка
            '#FF3B30', // бант
            '#34C759', // трава
            '#FFD60A', // солнце
            '#007AFF', // небо
            '#AF52DE', // цветы
            '#FF4F9A', // акцент
            '#FFFFFF', // белый
        ],
    },

    pig: {
        containerId: 'painting-pig',
        paletteId: 'palette-pig',
        winOverlayId: 'win-pig',
        previewId: null,
        starId: null,
        palette: [
            '#F8C8DC', // розовое тело
            '#FF9EC4', // светлее
            '#FF4F9A', // ярче
            '#FFCBA4', // пятачок
            '#1D1D1D', // копытца
            '#FF3B30', // бант
            '#34C759', // трава
            '#FFD60A', // солнце
            '#8B5A3C', // земля
            '#007AFF', // акцент
            '#AF52DE', // цветы
            '#FFFFFF', // блики
        ],
    },


    kassir: {
        containerId: "painting-kassir", // где лежит SVG раскраски
        paletteId: "palette-kassir", // где рисовать палитру
        winOverlayId: "win-kassir", // экран победы
        previewId: "preview-kassir", // куда клонировать превью в меню 
        palette: [
            '#FF9500', // оранжевый жилет — форма магазина
            '#007AFF', // синяя рубашка
            '#FFD60A', // жёлтый бейдж/каска
            '#34C759', // зелёный фартук
            '#FF3B30', // красный платок/акцент
            '#AF52DE', // фиолетовые волосы/акцент
            '#FF4F9A', // розовые щёчки
            '#00C7BE', // бирюзовый акцент
            '#FFCBA4', // телесный — лицо и руки
            '#A0522D', // коричневые волосы
            '#FFFFFF', // белый
            '#1D1D1D', // чёрный контур
        ],
    },


    magbag: {
        containerId: 'painting-magbag',
        paletteId: 'palette-magbag',
        winOverlayId: 'win-magbag',
        previewId: null,
        starId: null,
        palette: [
            '#F8C8DC', // розовое тело
            '#FF9EC4', // светлее
            '#FF4F9A', // ярче
            '#FFCBA4', // пятачок
            '#1D1D1D', // копытца
            '#FF3B30', // бант
            '#34C759', // трава
            '#FFD60A', // солнце
            '#8B5A3C', // земля
            '#007AFF', // акцент
            '#AF52DE', // цветы
            '#FFFFFF', // блики
        ],
    },


    himia: {
        containerId: 'painting-himia',
        paletteId: 'palette-himia',
        winOverlayId: 'win-himia',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // синий флакон
            '#34C759', // зелёный флакон
            '#FF4F9A', // розовый флакон
            '#AF52DE', // фиолетовый флакон
            '#00C7BE', // бирюзовый флакон
            '#FFD60A', // жёлтые крышки
            '#FF9500', // оранжевые этикетки
            '#FF3B30', // красные этикетки
            '#95A5A6', // металл полки светлый
            '#607D8B', // металл полки тёмный
            '#FFFFFF', // белый
            '#1D1D1D', // чёрный контур
        ],
    },

    milkfrige: {
        containerId: 'painting-milkfrige',
        paletteId: 'palette-milkfrige',
        winOverlayId: 'win-milkfrige',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // синие пакеты молока
            '#FFD60A', // жёлтый сыр
            '#FF9500', // оранжевая упаковка
            '#FF4F9A', // розовый йогурт
            '#34C759', // зелёная упаковка
            '#AF52DE', // фиолетовая упаковка
            '#00C7BE', // бирюзовая упаковка
            '#FFCBA4', // кремовый — масло, ряженка
            '#A0522D', // шоколадное молоко
            '#A8D8FF', // холод/стекло
            '#1D1D1D', // чёрный контур
            '#FFFFFF', // белое молоко/творог
        ],
    },

    candybox: {
        containerId: 'painting-candybox',
        paletteId: 'palette-candybox',
        winOverlayId: 'win-candybox',
        previewId: null,
        starId: null,
        palette: [
            '#FF4F9A', // розовая глазурь пончиков
            '#A0522D', // шоколад
            '#FFD60A', // жёлтые конфеты
            '#FF3B30', // красные леденцы
            '#FF9500', // карамель
            '#AF52DE', // фиолетовые обёртки
            '#00C7BE', // бирюзовые обёртки
            '#34C759', // зелёные конфеты
            '#FFCBA4', // кремовая начинка
            '#007AFF', // синие обёртки
            '#FFFFFF', // сахарная пудра
            '#1D1D1D', // чёрный контур
        ],
    },

    back: {
        containerId: 'painting-back',
        paletteId: 'palette-back',
        winOverlayId: 'win-back',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красная корзина
            '#007AFF', // синие акценты
            '#95A5A6', // металл ручки
            '#607D8B', // тёмные колёса
            '#FFD60A', // жёлтые продукты внутри
            '#34C759', // зелёные продукты
            '#FF9500', // оранжевые продукты
            '#AF52DE', // фиолетовые продукты
            '#FF4F9A', // розовые продукты
            '#00C7BE', // бирюзовый акцент
            '#FFFFFF', // белый
            '#1D1D1D', // чёрный контур
        ],
    },

    drinkfrige: {
        containerId: 'painting-drinkfrige',
        paletteId: 'palette-drinkfrige',
        winOverlayId: 'win-drinkfrige',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // синий корпус/вода
            '#00C7BE', // бирюзовое стекло
            '#FF3B30', // кола/красный сок
            '#FF9500', // апельсиновый сок
            '#FFD60A', // лимонад
            '#34C759', // яблочный напиток
            '#AF52DE', // виноградный
            '#FF4F9A', // ягодный
            '#A8D8FF', // лёд/стекло (единственный мягкий — он про холод)
            '#8B5A3C', // коричневые бутылки
            '#FFFFFF', // белый
            '#1D1D1D', // чёрный контур
        ],
    },

    juice: {
        containerId: 'painting-juice',
        paletteId: 'palette-juice',
        winOverlayId: 'win-juice',
        previewId: null,
        starId: null,
        palette: [
        '#FF9500', // яркий оранжевый (основной цвет сока)
        '#FF3B30', // красный (яблоко/ягода на этикетке)
        '#FFD60A', // жёлтый (лимон/солнце)
        '#34C759', // зелёный (эко-листик, крышка)
        '#007AFF', // синий (акцент на упаковке)
        '#00C7BE', // бирюзовый (свежесть)
        '#AF52DE', // фиолетовый (виноградный акцент)
        '#FF4F9A', // розовый (деталь этикетки)
        '#FFCBA4', // мягкий персиковый (тень на картоне)
        '#8B5A3C', // коричневый (текст или дно)
        '#FFFFFF', // белый (блики, бумага)
        '#1D1D1D', // чёрный (контур, надпись)
        ],
    },

    gazirovka: {
        containerId: 'painting-gazirovka',
        paletteId: 'palette-gazirovka',
        winOverlayId: 'win-gazirovka',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // жёлтый (лимонный ломтик)
            '#34C759', // зелёный (лайм/мята)
            '#FF9500', // оранжевый (апельсин)
            '#AF52DE', // фиолет007AFF', // синий (вода, этикетка)
            '#00C7BE', // бирюзовый (свежесть, вода)
            '#A8D8FF', // светло-голубой (блик на пластике)
            '#34C759', // зелёный (эко-этикетка)
            '#FFD60A', // жёлтый (солнце/акцент)
            '#FF4F9A', // розовый (яркий акцент)
            '#FFFFFF', // белый (блики, прозрачность)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    water: {
        containerId: 'painting-water',
        paletteId: 'palette-water',
        winOverlayId: 'win-water',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // синий корпус/этикетка (основной)
            '#00C7BE', // бирюзовый (вода, свежесть)
            '#A8D8FF', // светло-голубой (блик на пластике, крышка)
            '#FFCBA4', // мягкий персиковый (тень на картоне)
            '#34C759', // зелёный (эко-этикетка, горный луг)
            '#FFD60A', // жёлтый (солнце на этикетке, акцент)
            '#FF3B30', // красный (яблоко/ягода на этикетке)
            '#607D8B', // тёмно-серый (тень крышки)
            '#FF4F9A', // розовый (яркий акцент на этикетке)
            '#FF9500', // оранжевый (акцент)
            '#FFFFFF', // белый
            '#1D1D1D', // чёрный (контур, текст)
        ],
    },

    bagle: {
        containerId: 'painting-bagle',
        paletteId: 'palette-bagle',
        winOverlayId: 'win-bagle',
        previewId: null,
        starId: null,
        palette: [
            '#D4A574', // золотистая корочка (основной)
            '#A0522D', // тёмно-коричневый (поджаристые места)
            '#607D8B', // тёмно-серый (тень крышки)
            '#FFCBA4', // светлый беж (мякиш)
            '#F5E6D3', // кремовый (сливочный сыр внутри)
            '#FFD60A', // жёлтый (масло/кукурузные зерна)
            '#34C759', // зелёный (кунжут/травы)
            '#FF3B30', // красный (лосось/джем акцент)
            '#FF9500', // оранжевый (акцент)
            '#FF4F9A', // розовый (акцент)
            '#FFFFFF', // белый (блики на сыре)
            '#1D1D1D', // чёрный (контур, мак)
        ],
    },

    bread: {
        containerId: 'painting-bread',
        paletteId: 'palette-bread',
        winOverlayId: 'win-bread',
        previewId: null,
        starId: null,
        palette: [
            '#D4A574', // золотистая корка (основной)
            '#A0522D', // тёмная корка (надрезы)
            '#8B5A3C', // коричневый (хлебная масса)
            '#FFCBA4', // светлый мякиш
            '#F5E6D3', // кремовый (мягкая часть)
            '#FFD60A', // жёлтый (пшеничные колосья на упаковке)
            '#FF3B30', // красный (акцент упаковки)
            '#34C759', // зелёный (эко-знак)
            '#FF9500', // оранжевый (акцент)
            '#FF4F9A', // розовый (акцент)
            '#FFFFFF', // белый (мука, блики)
            '#1D1D1D', // чёрный (контур, семена)
        ],
    },

    cruasan: {
        containerId: 'painting-cruasan',
        paletteId: 'palette-cruasan',
        winOverlayId: 'win-cruasan',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // ярко-жёлтый (основной, сливочный)
            '#F5A623', // золотисто-оранжевый (корочка)
            '#FFCBA4', // мягкий беж (тень)
            '#A0522D', // тёмно-коричневый (глубокие слои)
            '#AF52DE', // фиолетовый (акцент)
            '#00C7BE', // бирюзовый (мятный)
            '#FF3B30', // красный (джем внутри)
            '#34C759', // зелёный (листик мяты для украшения)
            '#FF9500', // оранжевый (акцент)
            '#FF4F9A', // розовый (акцент)
            '#FFFFFF', // белый (сахарная пудра)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    pie: {
        containerId: 'painting-pie',
        paletteId: 'palette-pie',
        winOverlayId: 'win-pie',
        previewId: null,
        starId: null,
        palette: [
            '#D4A574', // золотистая корочка (основной)
            '#00C7BE', // бирюзовый (мятный)
            '#8B5A3C', // коричневый (тесто)
            '#FFCBA4', // светлый беж (мякиш)
            '#FF3B30', // красный (вишнёвая/мясная начинка)
            '#34C759', // зелёный (капустная начинка)
            '#FFD60A', // жёлтый (картофельная начинка)
            '#F5E6D3', // кремовый (творожная начинка)
            '#FF9500', // оранжевый (акцент)
            '#FF4F9A', // розовый (акцент)
            '#FFFFFF', // белый (блики на жирной корочке)
            '#1D1D1D', // чёрный (контур, защип)
        ],
    },

    zefir: {
        containerId: 'painting-zefir',
        paletteId: 'palette-zefir',
        winOverlayId: 'win-zefir',
        previewId: null,
        starId: null,
        palette: [
            '#FF4F9A', // ярко-розовый (основной, клубничный)
            '#F8C8DC', // нежно-розовый (объем)
            '#007AFF', // ярко-синий (голубичный)
            '#A8D8FF', // светло-голубой (объем)
            '#FFD60A', // ярко-жёлтый (лимонный)
            '#00C7BE', // бирюзовый (мятный)
            '#AF52DE', // фиолетовый (акцент)
            '#FF9500', // оранжевый (акцент)
            '#FFCBA4', // мягкий персиковый (тень)
            '#F5E6D3', // кремовый (ванильный)
            '#FFFFFF', // белый (сахарная пудра сверху)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    lolypop: {
        containerId: 'painting-lolypop',
        paletteId: 'palette-lolypop',
        winOverlayId: 'win-lolypop',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красный (основной сектор)
            '#FF4F9A', // розовый (сектор)
            '#FFD60A', // жёлтый (сектор)
            '#FF9500', // оранжевый (сектор)
            '#007AFF', // синий (сектор)
            '#AF52DE', // фиолетовый (сектор)
            '#34C759', // зелёный (сектор)
            '#00C7BE', // бирюзовый (сектор)
            '#FFCBA4', // мягкий беж (тень на леденце)
            '#F5E6D3', // кремовый (палочка)
            '#FFFFFF', // белый (блики на стекловидной поверхности)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    chocolate: {
        containerId: 'painting-chocolate',
        paletteId: 'palette-chocolate',
        winOverlayId: 'win-chocolate',
        previewId: null,
        starId: null,
        palette: [
            '#8B5A3C', // молочный шоколад (основной)
            '#A0522D', // тёмный шоколад (тень долек)
            '#D4A574', // светлый шоколад (блик)
            '#FFD60A', // золотой (фольга/обёртка)
            '#FF3B30', // красный (акцент обёртки)
            '#007AFF', // синий (акцент обёртки)
            '#AF52DE', // фиолетовый (акцент обёртки)
            '#34C759', // зелёный (акцент обёртки)
            '#FFCBA4', // мягкий беж (тень обёртки)
            '#F5E6D3', // кремовый (белый шоколад)
            '#FFFFFF', // белый (блик на фольге)
            '#1D1D1D', // чёрный (контур, надпись)
        ],
    },

    candy: {
        containerId: 'painting-candy',
        paletteId: 'palette-candy',
        winOverlayId: 'win-candy',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красный (основной цвет фантика)
            '#FF4F9A', // розовый (узор фантика)
            '#FFD60A', // жёлтый (узор)
            '#007AFF', // синий (узор)
            '#F5A623', // золотистый (фольга на хвостиках)
            '#AF52DE', // фиолетовый (акцент)
            '#00C7BE', // бирюзовый (акцент)
            '#34C759', // зелёный (акцент)
            '#8B5A3C', // коричневый (шоколад, виднеющийся сбоку)
            '#FFCBA4', // мягкий беж (тень фантика)
            '#FFFFFF', // белый (блик на фольге)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    chize: {
        containerId: 'painting-chize',
        paletteId: 'palette-chize',
        winOverlayId: 'win-chize',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // ярко-жёлтый (основной цвет сыра)
            '#F5A623', // оранжево-жёлтый (тень)
            '#FF9500', // оранжевый (корочка или акцент)
            '#FFCBA4', // светло-бежевый (мягкий сыр)
            '#FFFFFF', // белый (дырочки, блики)
            '#FF3B30', // красный (восковая оболочка или этикетка)
            '#34C759', // зелёный (этикетка, травы)
            '#007AFF', // синий (этикетка)
            '#AF52DE', // фиолетовый (акцент)
            '#8B5A3C', // коричневый (текст, деревянная доска)
            '#F5F5F5', // светло-серый (мягкая тень)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    yogurt: {
        containerId: 'painting-yogurt',
        paletteId: 'palette-yogurt',
        winOverlayId: 'win-yogurt',
        previewId: null,
        starId: null,
        palette: [
            '#FF4F9A', // ярко-розовый (клубничный, основной)
            '#FFD60A', // жёлтый (банановый/лимонный)
            '#007AFF', // синий (черничный)
            '#34C759', // зелёный (яблочный/киви)
            '#FF9500', // оранжевый (персиковый)
            '#AF52DE', // фиолетовый (акцент этикетки)
            '#00C7BE', // бирюзовый (акцент этикетки)
            '#FFFFFF', // белый (сам йогурт, крышка)
            '#FFCBA4', // мягкий персиковый (тень стаканчика)
            '#F5F5F5', // светло-серый (объем)
            '#8B5A3C', // коричневый (текст, ложка)
            '#1D1D1D', // чёрный (контур, надпись)
        ],
    },

    milk: {
        containerId: 'painting-milk',
        paletteId: 'palette-milk',
        winOverlayId: 'win-milk',
        previewId: null,
        starId: null,
        palette: [
            '#A8D8FF', // светло-голубой (дизайн пакета, небо)
            '#007AFF', // синий (надписи, крышка)
            '#34C759', // зелёный (лужайка, эко-знак)
            '#FFD60A', // жёлтый (солнце, акцент)
            '#FF4F9A', // розовый (корова/акцент)
            '#8B5A3C', // коричневый (корова, текст)
            '#FF9500', // оранжевый (акцент)
            '#00C7BE', // бирюзовый (акцент)
            '#F5F5F5', // светло-серый (тень на белом пакете)
            '#FFCBA4', // мягкий беж (тень)
            '#1D1D1D', // чёрный (контур, текст)
            '#FFFFFF', // белый (основной цвет пакета/молока)
        ],
    },

    kefir: {
        containerId: 'painting-kefir',
        paletteId: 'palette-kefir',
        winOverlayId: 'win-kefir',
        previewId: null,
        starId: null,
        palette: [
            '#34C759', // ярко-зелёный (основной цвет пачки)
            '#8BC34A', // светло-зелёный (объем, узор)
            '#FFFFFF', // белый (фон пачки, кефир)
            '#007AFF', // синий (надписи, акцент)
            '#FFD60A', // жёлтый (солнце, акцент)
            '#FF4F9A', // розовый (акцент)
            '#00C7BE', // бирюзовый (акцент)
            '#AF52DE', // фиолетовый (акцент)
            '#8B5A3C', // коричневый (текст)
            '#F5F5F5', // светло-серый (тень на белой части)
            '#FFCBA4', // мягкий беж (тень)
            '#1D1D1D', // чёрный (контур, текст)
        ],
    },

    aerozol: {
        containerId: 'painting-aerozol',
        paletteId: 'palette-aerozol',
        winOverlayId: 'win-aerozol',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // ярко-синий (основной цвет баллона)
            '#00C7BE', // бирюзовый (свежесть, узор)
            '#FFD60A', // жёлтый (лимонная свежесть, акцент)
            '#34C759', // зелёный (эко-чистота, узор)
            '#007AFF', // синий (надписи, акцент)
            '#8B5A3C', // коричневый (текст)
            '#607D8B', // тёмно-серый (тень металла, колпачок)
            '#FF9500', // оранжевый (акцент)
            '#FF4F9A', // розовый (акцент)
            '#AF52DE', // фиолетовый (акцент)
            '#FFCBA4', // мягкий беж (тень)
            '#1D1D1D', // чёрный (контур, текст)
        ],
    },

    paper: {
        containerId: 'painting-paper',
        paletteId: 'palette-paper',
        winOverlayId: 'win-paper',
        previewId: null,
        starId: null,
        palette: [
            '#FFCBA4', // мягкий беж (тень)
            '#F5F5F5', // светло-серый (тень между рулонами)
            '#FFD60A', // жёлтый (цвет упаковки/этикетки)
            '#007AFF', // синий (узор на упаковке)
            '#FF4F9A', // розовый (узор на упаковке)
            '#34C759', // зелёный (эко-знак на упаковке)
            '#8B5A3C', // коричневый (картонная втулка внутри)
            '#FF9500', // оранжевый (акцент)
            '#00C7BE', // бирюзовый (акцент)
            '#AF52DE', // фиолетовый (акцент)
            '#FFCBA4', // мягкий беж (тень на белом)
            '#1D1D1D', // чёрный (контур)
        ],
    },

    shampo: {
        containerId: 'painting-shampo',
        paletteId: 'palette-shampo',
        winOverlayId: 'win-shampo',
        previewId: null,
        starId: null,
        palette: [
            '#AF52DE', // фиолетовый (основной цвет жидкости/флакона)
            '#FF4F9A', // розовый (градиент, узор)
            '#007AFF', // синий (узор, этикетка)
            '#00C7BE', // бирюзовый (узор, свежесть)
            '#FFD60A', // жёлтый (блик на пластике, акцент)
            '#FFFFFF', // белый (текст, блики)
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый (тень крышки)
            '#34C759', // зелёный (акцент, алоэ)
            '#FF9500', // оранжевый (акцент)
            '#8B5A3C', // коричневый (картонная втулка внутри)
            '#1D1D1D', // чёрный (контур, текст)
        ],
    },

    soap: {
        containerId: 'painting-soap',
        paletteId: 'palette-soap',
        winOverlayId: 'win-soap',
        previewId: null,
        starId: null,
        palette: [
            '#FF4F9A', // ярко-розовый (основной цвет диспенсера)
            '#FF9500', // оранжевый (градиент, цитрус)
            '#FFD60A', // жёлтый (лимон, акцент)
            '#FFFFFF', // белый (пена наверху, этикетка)
            '#8B5A3C', // коричневый (картонная втулка внутри)
            '#607D8B', // тёмно-серый (тень помпы)
            '#007AFF', // синий (акцент этикетки)
            '#34C759', // зелёный (акцент, мята)
            '#00C7BE', // бирюзовый (акцент)
            '#AF52DE', // фиолетовый (акцент)
            '#FFCBA4', // мягкий беж (тень)
            '#1D1D1D', // чёрный (контур, текст)
        ],
    },


    vahta: {
        containerId: 'painting-vahta',
        paletteId: 'palette-vahta',
        winOverlayId: 'win-vahta',
        previewId: "preview-vahta", // куда клонировать превью в меню 
        palette: [
            '#FFCBA4', // телесный — лицо и руки (главный)
            '#FF3B30', // яркий красный — рубашка, косынка
            '#FF9500', // оранжевое
            '#FF4F9A', // розовый кардиган/кофта
            '#007AFF', // синяя юбка/брюки
            '#95A5A6', // очки (оправа)
            '#FFD60A', // настольная лампа (абажур)
            '#FFFFFF', // белая блузка/воротник
            '#AF52DE', // фиолетовый (акцент)
            '#A0522D', // книга на столе
            '#34C759', // растение на столе (акцент)
            '#1D1D1D', // чёрный контур
        ],
    },

   
    dor1: {
        containerId: 'painting-dor1',
        paletteId: 'palette-dor1',
        winOverlayId: 'win-dor1',
        
        previewId: null,
        starId: null,
        palette: [
        '#FF4F9A', // розовые цветы (главный)
        '#FFD60A', // жёлтые цветы
        '#007AFF', // синие цветы
        '#AF52DE', // фиолетовые цветы
        '#FF9500', // оранжевые цветы
        '#34C759', // зелёные листья/стебли
        '#FF3B30', // красные цветы
        '#00C7BE', // бирюзовые цветы
        '#FFFFFF', // белая дверь
        '#FFCBA4', // мордочка двери
        '#95A5A6', // ручка-кисть (металл)
        '#1D1D1D', // чёрный контур
        ],
    },

    dor2: {
        containerId: 'painting-dor2',
        paletteId: 'palette-dor2',
        winOverlayId: 'win-dor2',
        previewId: null,
        starId: null,
        palette: [
        '#1D1D1D', // чёрные клавиши
        '#8B5A3C', // деревянная дверь
        '#D4A574', // светлое дерево
        '#FFD60A', // ноты/акцент
        '#FF3B30', // красный акцент
        '#007AFF', // синий акцент
        '#AF52DE', // фиолетовый акцент
        '#FF4F9A', // розовый акцент
        '#34C759', // зелёный акцент
        '#FFCBA4', // мордочка двери (щёчки)
        '#FFFFFF', // белые клавиши (главный)
        '#95A5A6', // ручка-камертон (металл)
    ],
       
    },

    dor3: {
        containerId: 'painting-dor3',
        paletteId: 'palette-dor3',
        winOverlayId: 'win-dor3',
        previewId: null,
        starId: null,
        palette: [
        '#007AFF', // синий экран/корпус (главный)
        '#00C7BE', // бирюзовый неон
        '#AF52DE', // фиолетовый неон
        '#FF4F9A', // розовый неон
        '#34C759', // зелёный неон
        '#FFD60A', // жёлтый акцент
        '#FF3B30', // красный акцент
        '#FF9500', // оранжевый акцент
        '#95A5A6', // серый металл
        '#607D8B', // тёмный металл
        '#FFCBA4', // мордочка двери
        '#1D1D1D', // чёрный контур
        ],
    },

    dor4: {
        containerId: 'painting-dor4',
        paletteId: 'palette-dor4',
        winOverlayId: 'win-dor4',
        previewId: null,
        starId: null,
        palette: [
        '#1D1D1D', // чёрные клетки
        '#8B5A3C', // деревянная дверь
        '#D4A574', // светлое дерево
        '#A0522D', // тёмное дерево
        '#FFD60A', // золотая фигура/акцент
        '#95A5A6', // серебряная фигура
        '#607D8B', // тёмный металл
        '#FF3B30', // красный акцент
        '#007AFF', // синий акцент
        '#FFCBA4', // мордочка двери
        '#AF52DE', // фиолетовый акцент
        '#FFFFFF', // белые клетки (главный)
        ],
    },

    dor5: {
        containerId: 'painting-dor5',
        paletteId: 'palette-dor5',
        winOverlayId: 'win-dor5',
        previewId: null,
        starId: null,
        palette: [
        '#34C759', // зелёная дверь/листья (главный)
        '#8BC34A', // светлая зелень
        '#FF4F9A', // розовые цветы
        '#FFD60A', // жёлтые цветы
        '#FF9500', // оранжевые цветы
        '#AF52DE', // фиолетовые цветы
        '#007AFF', // синие цветы
        '#FF3B30', // красные цветы
        '#8B5A3C', // горшок/земля
        '#FFCBA4', // мордочка двери
        '#00C7BE', // бирюзовая лейка
        '#1D1D1D', // чёрный контур
        ],
    },

    dor6: {
        containerId: 'painting-dor6',
        paletteId: 'palette-dor6',
        winOverlayId: 'win-dor6',
        previewId: null,
        starId: null,
        palette: [
        '#007AFF', // синий экран/корпус (главный)
        '#00C7BE', // бирюзовый неон
        '#AF52DE', // фиолетовый неон
        '#FF4F9A', // розовый неон
        '#34C759', // зелёный неон
        '#FFD60A', // жёлтый акцент
        '#FF3B30', // красный акцент
        '#FF9500', // оранжевый акцент
        '#95A5A6', // серый металл
        '#607D8B', // тёмный металл
        '#FFCBA4', // мордочка двери
        '#1D1D1D', // чёрный контур
        ],
    },

    molbert: {
        containerId: 'painting-molbert',
        paletteId: 'palette-molbert',
        winOverlayId: 'win-molbert',
        previewId: null,
        starId: null,
        palette: [
        '#8B5A3C', // коричневое дерево (основной)
        '#D4A574', // светлое дерево
        '#A0522D', // тёмное дерево
        '#FFFFFF', // белый холст
        '#FFD60A', // жёлтая рама
        '#FF3B30', // красный акцент
        '#007AFF', // синий акцент
        '#34C759', // зелёный акцент
        '#FF9500', // оранжевый акцент
        '#AF52DE', // фиолетовый акцент
        '#FFCBA4', // бежевый холст
        '#1D1D1D', // чёрный контур
        ],
    },

    
    color: {
        containerId: 'painting-color',
        paletteId: 'palette-color',
        winOverlayId: 'win-color',
        previewId: null,
        starId: null,
        palette: [
        '#FF3B30', // красный тюбик (основной)
        '#007AFF', // синий тюбик
        '#FFD60A', // жёлтый тюбик
        '#34C759', // зелёный тюбик
        '#FF9500', // оранжевый тюбик
        '#AF52DE', // фиолетовый тюбик
        '#FF4F9A', // розовый тюбик
        '#00C7BE', // бирюзовый тюбик
        '#FFFFFF', // белые крышки
        '#95A5A6', // серебристые колпачки
        '#FFCBA4', // бежевый фон
        '#1D1D1D', // чёрный контур
        ],
    },

    pen: {
        containerId: 'painting-pen',
        paletteId: 'palette-pen',
        winOverlayId: 'win-pen',
        previewId: null,
        starId: null,
        palette: [
        '#FF3B30', // красный карандаш (основной)
        '#007AFF', // синий карандаш
        '#FFD60A', // жёлтый карандаш
        '#34C759', // зелёный карандаш
        '#FF9500', // оранжевый карандаш
        '#AF52DE', // фиолетовый карандаш
        '#FF4F9A', // розовый карандаш
        '#8B5A3C', // коричневые грифели
        '#FFFFFF', // белый стакан
        '#FFCBA4', // бежевый стакан
        '#95A5A6', // серый карандаш
        '#1D1D1D', // чёрный контур
        ],
    },

    palitra: {
        containerId: 'painting-palitra',
        paletteId: 'palette-palitra',
        winOverlayId: 'win-palitra',
        previewId: null,
        starId: null,
        palette: [
        '#FFCBA4', // деревянная палитра (основной)
        '#D4A574', // светлое дерево
        '#8B5A3C', // тёмное дерево
        '#FF3B30', // красная краска
        '#007AFF', // синяя краска
        '#FFD60A', // жёлтая краска
        '#34C759', // зелёная краска
        '#FF9500', // оранжевая краска
        '#AF52DE', // фиолетовая краска
        '#FF4F9A', // розовая краска
        '#FFFFFF', // белая краска
        '#1D1D1D', // чёрный контур
        ],
    },

    buben: {
        containerId: 'painting-buben',
        paletteId: 'palette-buben',
        winOverlayId: 'win-buben',
        previewId: null,
        starId: null,
        palette: [
        '#FFD60A', // ярко-жёлтый — обод бубна (главный)
        '#FF9500', // оранжевый — обод (вариант)
        '#FF3B30', // красный — акцент на ободе
        '#007AFF', // синий — акцент
        '#34C759', // зелёный — акцент
        '#AF52DE', // фиолетовый — акцент
        '#FF4F9A', // розовый — акцент
        '#00C7BE', // бирюзовый — акцент
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — тени колокольчиков
        '#FFFFFF', // белый — блики на колокольчиках
        '#1D1D1D', // чёрный — контур
        ],
    },

    gitar: {
        containerId: 'painting-gitar',
        paletteId: 'palette-gitar',
        winOverlayId: 'win-gitar',
        previewId: null,
        starId: null,
        palette: [
        '#FF9500', // оранжево-коричневый — корпус (главный, тёплое дерево)
        '#D4A574', // светлое дерево — верх деки
        '#8B5A3C', // тёмное дерево — гриф
        '#00C7BE', // бирюзовый (мятный)
        '#FFCBA4', // телесный — мордочка (щёчки)
        '#FFD60A', // жёлтый — акцент, розетка
        '#FF3B30', // красный — акцент
        '#007AFF', // синий — акцент
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — тени струн
        '#FFFFFF', // белый — блики
        '#1D1D1D', // чёрный — контур, звукосниматель
        ],
    },

    micro: {
        containerId: 'painting-micro',
        paletteId: 'palette-micro',
        winOverlayId: 'win-micro',
        previewId: null,
        starId: null,
        palette: [
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — сетка, тени
        '#FF3B30', // красный — акцент на стойке
        '#007AFF', // синий — акцент
        '#FFD60A', // жёлтый — акцент
        '#34C759', // зелёный — акцент
        '#AF52DE', // фиолетовый — акцент
        '#FF4F9A', // розовый — акцент
        '#00C7BE', // бирюзовый — акцент
        '#FFCBA4', // телесный — мордочка (щёчки)
        '#FFFFFF', // белый — блики на металле
        '#1D1D1D', // чёрный — контур, подставка
        ],
    },

    monic: {
        containerId: 'painting-monic',
        paletteId: 'palette-monic',
        winOverlayId: 'win-monic',
        previewId: null,
        starId: null,
        palette: [
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — подставка, тени
        '#007AFF', // синий экран
        '#00C7BE', // бирюзовый экран
        '#34C759', // зелёный экран
        '#FFD60A', // жёлтый акцент на экране
        '#FF3B30', // красный акцент
        '#AF52DE', // фиолетовый акцент
        '#FF4F9A', // розовый акцент
        '#FFCBA4', // мордочка (щёчки)
        '#FFFFFF', // белый блик на экране
        '#1D1D1D', // чёрный контур
        ],
    },

    robot: {
        containerId: 'painting-robot',
        paletteId: 'palette-robot',
        winOverlayId: 'win-robot',
        previewId: null,
        starId: null,
        palette: [
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — тени, антенна
        '#007AFF', // синий акцент (глаза/кнопки)
        '#FF3B30', // красный акцент
        '#FFD60A', // жёлтый акцент
        '#34C759', // зелёный акцент
        '#AF52DE', // фиолетовый акцент
        '#FF4F9A', // розовый акцент
        '#00C7BE', // бирюзовый акцент
        '#FFCBA4', // мордочка (щёчки)
        '#1D1D1D', // чёрный контур
        '#FFFFFF', // белый корпус (главный)
    ],
       
    },

    headphone: {
        containerId: 'painting-headphone',
        paletteId: 'palette-headphone',
        winOverlayId: 'win-headphone',
        previewId: null,
        starId: null,
        palette: [
        '#007AFF', // синий корпус (главный)
        '#FF3B30', // красный вариант
        '#FF4F9A', // розовый вариант
        '#AF52DE', // фиолетовый вариант
        '#00C7BE', // бирюзовый вариант
        '#FFD60A', // жёлтый акцент
        '#FFCBA4', // мягкий беж (тень)
        '#607D8B', // тёмно-серый — тени
        '#FFCBA4', // мягкие подушечки (телесный)
        '#34C759', // зелёный акцент
        '#1D1D1D', // чёрный контур
        '#FFFFFF', // белые детали
        ],
    },

    djostic: {
        containerId: 'painting-djostic',
        paletteId: 'palette-djostic',
        winOverlayId: 'win-djostic',
        previewId: null,
        starId: null,
        palette: [
            '#007AFF', // синие кнопки
            '#FF3B30', // красные кнопки
            '#34C759', // зелёные кнопки
            '#FFD60A', // жёлтые кнопки
            '#AF52DE', // фиолетовые кнопки
            '#FF4F9A', // розовые кнопки
            '#00C7BE', // бирюзовые кнопки
            '#95A5A6', // серый крестовина/D-pad
            '#FFCBA4', // мягкий беж (тень)
            '#FFCBA4', // мордочка (щёчки)
            '#1D1D1D', // чёрный контур
            '#FFFFFF', // белый корпус (главный)
        ],
    },

    lord: {
        containerId: 'painting-lord',
        paletteId: 'palette-lord',
        winOverlayId: 'win-lord',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // золотая корона (главный акцент)
            '#F5A623', // тёмное золото — тень короны
            '#FF3B30', // красный камень на короне
            '#007AFF', // синий камень на короне
            '#34C759', // зелёный камень на короне
            '#AF52DE', // фиолетовый камень на короне
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — глубокие тени
            '#FFCBA4', // мордочка (щёчки)
            '#FF4F9A', // розовый акцент
            '#FFFFFF', // белый корпус (главный)
            '#1D1D1D', // чёрный — основание, контур
        ],
    },

    eli: {
        containerId: 'painting-eli',
        paletteId: 'palette-eli',
        winOverlayId: 'win-eli',
        previewId: null,
        starId: null,
        palette: [

            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — глубокие тени
            '#FFD60A', // золотой — корона/акцент
            '#FF3B30', // красный — акцент (лента/камень)
            '#007AFF', // синий — акцент
            '#34C759', // зелёный — акцент
            '#AF52DE', // фиолетовый — акцент
            '#FF4F9A', // розовый — акцент
            '#FFCBA4', // мордочка (щёчки)
            '#FF9500', // оранжевый — акцент
            '#FFFFFF', // белый корпус (главный)
            '#1D1D1D', // чёрный — основание, контур
        ],
    },

    cup: {
        containerId: 'painting-cup',
        paletteId: 'palette-cup',
        winOverlayId: 'win-cup',
        previewId: null,
        starId: null,
        palette: [
            '#FFD60A', // ярко-жёлтый — золото кубка (главный)
            '#F5A623', // золотисто-оранжевый — тень золота
            '#FF9500', // оранжевый — ободок
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — тени
            '#FF3B30', // красный акцент (лента/камень)
            '#007AFF', // синий акцент (камень)
            '#34C759', // зелёный акцент (камень)
            '#AF52DE', // фиолетовый акцент (камень)
            '#FF4F9A', // розовый акцент
            '#FFCBA4', // мордочка (щёчки)
            '#1D1D1D', // чёрный контур
        ],
    },

    timerchess: {
        containerId: 'painting-timerchess',
        paletteId: 'palette-timerchess',
        winOverlayId: 'win-timerchess',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красная кнопка (часы красных)
            '#007AFF', // синяя кнопка (часы синих)
            '#FFD60A', // жёлтый акцент на корпусе
            '#34C759', // зелёный акцент
            '#FF9500', // оранжевый акцент
            '#AF52DE', // фиолетовый акцент
            '#FF4F9A', // розовый акцент
            '#FFCBA4', // мягкий беж (тень)
            '#FFCBA4', // мордочка (щёчки)
            '#607D8B', // тёмно-серый — тени
            '#FFFFFF', // белый корпус (главный)
            '#1D1D1D', // чёрные циферблаты и стрелки
        ],
    },

        seed: {
        containerId: 'painting-seed',
        paletteId: 'palette-seed',
        winOverlayId: 'win-seed',
        previewId: null,
        starId: null,
        palette: [
            '#8B5A3C', // коричневое семечко на этикетке
            '#D4A574', // светлое семечко
            '#34C759', // зелёный росток на этикетке
            '#FFD60A', // жёлтый акцент (солнце на этикетке)
            '#FF9500', // оранжевый акцент
            '#FF3B30', // красный акцент
            '#007AFF', // синий акцент
            '#AF52DE', // фиолетовый акцент
            '#FF4F9A', // розовый акцент
            '#FFCBA4', // мордочка пачки (щёчки)
            '#1D1D1D', // чёрный контур
            '#FFFFFF', // белая пачка (главный, как на скрине)
        ],
    },

    pot: {
        containerId: 'painting-pot',
        paletteId: 'palette-pot',
        winOverlayId: 'win-pot',
        previewId: null,
        starId: null,
        palette: [
            '#34C759', // ярко-зелёные ростки
            '#8BC34A', // светлая зелень
            '#2E7D32', // тёмная зелень (стебли)
            '#8B5A3C', // коричневая земля в горшке
            '#D4A574', // светлая земля
            '#FFD60A', // жёлтый акцент (солнце/цветок)
            '#FF4F9A', // розовый акцент (цветок)
            '#007AFF', // синий акцент (полив)
            '#00C7BE', // бирюзовый акцент
            '#FFCBA4', // мордочка горшка (щёчки)
            '#FFFFFF', // белый горшок (главный, как на скрине)
            '#1D1D1D', // чёрный контур
        ],
    },

    sekator: {
        containerId: 'painting-sekator',
        paletteId: 'palette-sekator',
        winOverlayId: 'win-sekator',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красный — ручки секатора (главный, яркий)
            '#007AFF', // синий — альтернативные ручки
            '#34C759', // зелёный — альтернативные ручки
            '#FF9500', // оранжевый — альтернативные ручки
            '#AF52DE', // фиолетовый — альтернативные ручки
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — тени лезвий
            '#FFCBA4', // мордочка (щёчки)
            '#FFFFFF', // белый блик на лезвии
            '#FFD60A', // жёлтый акцент (винтик)
            '#FF4F9A', // розовый акцент
            '#1D1D1D', // чёрный контур
        ],
    },

    rake: {
        containerId: 'painting-rake',
        paletteId: 'palette-rake',
        winOverlayId: 'win-rake',
        previewId: null,
        starId: null,
        palette: [
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — тени металла
            '#8B5A3C', // коричневая ручка
            '#D4A574', // светлое дерево ручки
            '#A0522D', // тёмное дерево
            '#34C759', // зелёный акцент (трава/листья)
            '#FFD60A', // жёлтый акцент
            '#FF9500', // оранжевый акцент
            '#007AFF', // синий акцент
            '#FF4F9A', // розовый акцент
            '#FFCBA4', // мордочка (щёчки)
            '#1D1D1D', // чёрный контур
        ],
    },
    
    clohe: {
        containerId: 'painting-clohe',
        paletteId: 'palette-clohe',
        winOverlayId: 'win-clohe',
        previewId: null,
        starId: null,
        palette: [
            '#8B5A3C', // коричневая плетёная корзина (главный)
            '#D4A574', // светлое плетение
            '#A0522D', // тёмное плетение
            '#FF3B30', // красная ткань
            '#007AFF', // синяя ткань
            '#FFD60A', // жёлтая ткань
            '#34C759', // зелёная ткань
            '#AF52DE', // фиолетовая ткань
            '#FF4F9A', // розовая ткань
            '#FF9500', // оранжевая ткань
            '#FFCBA4', // мордочка корзины (щёчки)
            '#1D1D1D', // чёрный контур
        ],
    },

    smacine: {
        containerId: 'painting-smacine',
        paletteId: 'palette-smacine',
        winOverlayId: 'win-smacine',
        previewId: null,
        starId: null,
        palette: [
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — тени, колесо
            '#FF3B30', // красный акцент (кнопка/нитка)
            '#FFD60A', // жёлтый акцент
            '#007AFF', // синий акцент
            '#34C759', // зелёный акцент
            '#AF52DE', // фиолетовый акцент
            '#FFCBA4', // мордочка (щёчки)
            '#FF4F9A', // розовая нитка
            '#8B5A3C', // коричневый стол
            '#FFFFFF', // белый корпус (главный)
            '#1D1D1D', // чёрный контур
        ],
    },

    nidlq: {
        containerId: 'painting-nidlq',
        paletteId: 'palette-nidlq',
        winOverlayId: 'win-nidlq',
        previewId: null,
        starId: null,
        palette: [
            '#FF4F9A', // розовая подушечка (главный)
            '#FF3B30', // красная подушечка
            '#007AFF', // синяя подушечка
            '#34C759', // зелёная подушечка
            '#FFD60A', // жёлтая подушечка
            '#AF52DE', // фиолетовая подушечка
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — кончики иголок
            '#FFCBA4', // мордочка (щёчки)
            '#FFFFFF', // белый блик
            '#FF9500', // оранжевая бусинка на иголке
            '#1D1D1D', // чёрный контур
        ],
    },

    sizurs: {
        containerId: 'painting-sizurs',
        paletteId: 'palette-sizurs',
        winOverlayId: 'win-sizurs',
        previewId: null,
        starId: null,
        palette: [
            '#FF3B30', // красные ручки (главный, классика)
            '#007AFF', // синие ручки
            '#34C759', // зелёные ручки
            '#FF9500', // оранжевые ручки
            '#AF52DE', // фиолетовые ручки
            '#FF4F9A', // розовые ручки
            '#FFCBA4', // мягкий беж (тень)
            '#607D8B', // тёмно-серый — тени лезвий
            '#FFFFFF', // белый блик на лезвии
            '#FFCBA4', // мордочка (щёчки)
            '#FFD60A', // жёлтый винтик
            '#1D1D1D', // чёрный контур
        ],
    },





















};
