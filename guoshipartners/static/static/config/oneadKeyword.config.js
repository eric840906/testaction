/*!  oneadKeyword.config.js 2024-06-18 4:02:50 PM */
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./keyword/oneadKeyword.config.ts ***!
  \****************************************/
const KeyWordConfig = [
    ///// 不用加參數的關鍵字們

    {
        name: '手機隱藏音量鍵',
        command: 'hideVolumeButton',
    },
    {
        name: '手機隱藏播放鍵',
        command: 'hidePlayButton',
    },
    {
        name: 'IP+/IP的landscape 格式時，只上純影片素材時使用',
        command: 'landscape',
    },
    {
        name: 'IP/IR的 only video 專用格式時使用',
        command: 'onlyVideo',
    },
    {
        name: 'IP/IR的 only banner 格式時，沒有放影片時使用',
        command: 'onlybanner',
    },
    {
        name: '設定後, 將固定使用 assign() 進行開啟網頁的行為',
        command: 'openUrlWithAssign',
    },

    {
        name: '隱藏 coach mark (Ex.Gallery)',
        command: 'hideTips',
    },
    {
        name: '放大關閉鍵範圍，讓使用者準確關閉廣告（MIB GALLERY/PAGE 適用）',
        command: 'closeAreaSet',
    },
    {
        name: '放大關閉鍵範圍，讓使用者準確關閉廣告（FLASH BANNER 專用）',
        command: 'flashCloseAreaSet',
    },
    {
        name: '隱藏 Replay & More 鍵',
        command: 'hideReplayMore',
    },
    {
        name: '廣告板位出現在螢幕範圍50%後才開放點擊，開放後不再關閉，不能與 pageClickInSightAfterward 同時使用',
        command: 'pageClickInSightOnly',
    },
    {
        name: '監聽 Iframe 內的 Banner Click',
        command: 'listenClickOnBannerIframe',
    },
    {
        name: '延遲 Impression  (IAB規格 IMP: 廣告露出 50%+1s)',
        command: 'useIabImpression',
    },
    {
        name: 'VAST 使用第一個廣告素材',
        command: 'useFirstBanner',
    },
    {
        name: '播放不 loop，停在最後一 cut 且不出現 EndWrapper',
        command: 'stopInLoopLast',
    },
    {
        name: '隱藏 Flash 關閉鍵',
        command: 'hideFlashCloseBtn',
    },
    {
        name: 'MIB 與 MIR 同時出現時，屏敝 MIR',
        command: 'isUniGroup',
    },
    {
        name: ' VPAID 支援 顯示現在氣溫資訊',
        command: 'showTempInfo',
    },
    {
        name: 'VPAID 支援 顯示今日氣溫資訊',
        command: 'showTodayTempInfo',
    },
    {
        name: 'VPAID 支援 顯示現在濕度資訊',
        command: 'showHumiInfo',
    },
    {
        name: 'VPAID 支援 顯示空氣品質 AQI 資訊',
        command: 'showAqiInfo',
    },
    {
        name: 'VPAID 支援 顯示紫外線 UVI 資訊',
        command: 'showUviInfo',
    },
    {
        name: '使用新版樣式設定',
        command: 'newUI',
    },
    {
        name: '監聽 Document 傳送導外 banner click 事件',
        command: 'documentClick',
    },
    {
        name: 'FlashDrive 加入 bannerClickArea 監聽點擊導外事件',
        command: 'addBannerClickArea',
    },
    {
        name: 'pageV2系列 CPC',
        command: 'useCpcHeight',
    },
    {
        name: 'Reels 系列客製 CTA 區域',
        command: 'reelsCustomCtaArea',
    },
    {
        name: '使用 replace 方式打開導外連結',
        command: 'replaceUrlWithLink',
    },
    ///// 下為帶參數的關鍵字們
    {
        name: '設定關閉鍵位置與尺寸',
        command: 'closeUISet',
        desc: '全格式可用',
        params: [
            {
                key: 'align',
                desc: '左/右，left/right',
                options: ['left', 'right'],
            },
            {
                key: 'top',
                desc: '定位由上往下算的比例，這裡給數字',
            },
            {
                key: 'around',
                desc: '根據 align，從左/右開始推算的比例，這裡給數字',
            },
            {
                key: 'posUnit',
                desc: '位置的單位',
                options: ['%'],
            },
            {
                key: 'width',
                desc: '寬度，給數字',
            },
            {
                key: 'height',
                desc: '寬高的高，這裡給數字',
            },
            {
                key: 'sizeUnit',
                desc: '寬高的單位',
                options: ['%'],
            },
        ],
    },
    {
        name: '設定影片位置',
        command: 'movePlayer',
        desc: '全格式可用',
        params: [
            {
                key: 'margin',
                desc: 'ex.94% 0 0 0',
            },
        ],
    },
    {
        name: '設定部分 UI 位置',
        command: 'setUiPos',
        desc: '可設定音量,更多,重播,播放,LOGO',
        params: [
            {
                key: 'name',
                desc: '要設定的元件',
                options: ['MUTE_BUTTON', 'MORE_BUTTON', 'ICON_BUTTON', 'REPLAY_BUTTON', 'PLAY_BUTTON'],
            },
            {
                key: 'x',
                desc: '往左右的比例',
            },
            {
                key: 'y',
                desc: '往上下的比例',
            },
            {
                key: 'unit',
                desc: '位置的單位',
                options: ['%'],
            },
        ],
    },
    {
        name: '設定格式避讓',
        command: 'uniGroup',
        desc: 'Main 會保留，dodge 則會 passback',
        params: [
            {
                key: 'main',
                desc: '主要格式',
                options: ['MIR', 'MIC', 'MFS', 'MS'],
            },
            {
                key: 'dodge',
                desc: '遇到主要格式就會被 passback 的格式',
                options: ['MIR', 'MIC', 'MFS', 'MS'],
            },
        ],
    },
    {
        name: '修改 Cube 背景顏色',
        command: 'setBackgroundColor',
        desc: '限定 MIB 系列',
        params: [
            {
                key: 'color',
                desc: '使用 % 可以設定漸層，ex.#e66465 0%, #9198e5 70%',
            },
        ],
    },
    {
        name: '設定按鈕文字',
        command: 'addBtnText',
        desc: '限定 MIRV LOCK & MIB CUBE',
        params: [
            {
                key: 'text',
                desc: '最多可輸入六個字',
            },
            {
                key: 'text2',
                desc: '最多可輸入六個字',
            },
        ],
    },
    {
        name: '新增環境變因資訊',
        command: 'setWeatherInfoNew',
        desc: '限定 MIR PAGE/MIR PAGEBANNER/MFS COVER VIDEO',
        params: [
            {
                key: 'temp',
                desc: '選擇是否需要顯示現在氣溫',
                options: [
                    { value: 'yes', label: '顯示現在氣溫', selected: false },
                    { value: 'no', label: '不顯示現在氣溫', selected: true },
                ],
            },
            {
                key: 'todayTemp',
                desc: '選擇是否需要顯示今日氣溫',
                options: [
                    { value: 'yes', label: '顯示今日氣溫', selected: false },
                    { value: 'no', label: '不顯示今日氣溫', selected: true },
                ],
            },
            {
                key: 'uvi',
                desc: '選擇是否需要顯示紫外線指數',
                options: [
                    { value: 'yes', label: '顯示紫外線指數', selected: false },
                    { value: 'no', label: '不顯示紫外線指數', selected: true },
                ],
            },
            {
                key: 'humi',
                desc: '選擇是否需要顯示現在濕度',
                options: [
                    { value: 'yes', label: '顯示現在濕度', selected: false },
                    { value: 'no', label: '不顯示現在濕度', selected: true },
                ],
            },
            {
                key: 'aqi',
                desc: '選擇是否需要顯示空氣品質',
                options: [
                    { value: 'yes', label: '顯示空氣品質', selected: false },
                    { value: 'no', label: '不顯示空氣品質', selected: true },
                ],
            },
            {
                key: 'pop',
                desc: '選擇是否需要顯示降雨機率',
                options: [
                    { value: 'yes', label: '顯示降雨機率', selected: false },
                    { value: 'no', label: '不顯示降雨機率', selected: true },
                ],
            },
            {
                key: 'top',
                desc: '選填，定位由上往下算，這裡給數字，單位是 vw(螢幕可視範圍寬度的百分比)',
            },
            {
                key: 'showDate',
                desc: '預設顯示，選擇日期是否顯示',
                options: [
                    { value: 'show', label: '顯示日期', selected: true },
                    { value: 'hide', label: '不顯示日期', selected: false },
                ],
            },
            {
                key: 'templateSize',
                desc: '選擇顯示大小',
                options: [
                    { value: '1', label: '模板預設大小', selected: true },
                    { value: '1.25', label: '模板高度 1.25 倍', selected: false },
                ],
            },
        ],
    },
    {
        name: 'page 系列長度倍率',
        command: 'newPage',
        desc: "page and pagebanner's experimental height variable",
        params: [
            {
                key: 'variable',
                desc: '長度倍率',
                options: [1, 1.5, 2, 2.5],
            },
        ],
    },
    {
        name: '設定 CTA 文字內容',
        command: 'setCTAText',
        desc: '限定 FlashDrive 系列',
        params: [
            {
                key: 'text',
                desc: '最多可輸入 15 個字',
            },
        ],
    },
    {
        name: 'SIMID QR Code 設定',
        command: 'setSimidQrcode',
        params: [
            {
                key: 'url',
                desc: 'QR Code導頁短網址',
            },
            {
                key: 'startTime',
                desc: 'QR Code出現時間，使用秒數',
            },
            {
                key: 'endTime',
                desc: 'QR Code退場時間，使用秒數',
            },
            {
                key: 'background',
                desc: 'QR Code底圖顏色，使用顏色代碼',
            },
            {
                key: 'text',
                desc: 'QR Code顯示文字（限制中文6個字，英文12字元）',
            },
            {
                key: 'textColor',
                desc: 'QR Code文字顏色，使用顏色代碼',
            },
            {
                key: 'position',
                desc: 'QR Code顯示位置',
                options: [
                    { value: 'upper_right', label: '右上', selected: true },
                    { value: 'lower_right', label: '右下', selected: false },
                    { value: 'lower_left', label: '左下', selected: false },
                ],
            },
        ],
    },
    // {
    //     name: '設定倒數文字顏色',
    //     command: 'countDownColor',
    //     desc: '限定 Desktop 有倒數計時的格式使用，可使用轉換工具，詳見說明網頁',
    //     params: [
    //         {
    //             key: 'filter',
    //             desc: 'ex.invert(43%) sepia(93%) saturate(999%) hue-rotate(201deg) brightness(91%) contrast(98%)',
    //         }
    //     ]
    // },
];

window.KeyWordConfig = KeyWordConfig;

/******/ })()
;