/*!  tracking_code.config.js 2024-06-17 3:05:28 PM */
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const trackingCodeTemplates = [
    // platform: 下拉選單時顯示的名稱
    // initTemplate: 有這個欄位的話, 會自動產生 CV 時觸發的初始化用的追蹤碼

    // FB
    {
        platform: 'FB',
        initTemplate: "<script>\n(function () {\nvar topHead = window.top.document.head;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"!function (f, b, e, v, n, t, s) {if (f.fbq) return; n = f.fbq = function () {n.callMethod ?n.callMethod.apply(n, arguments) : n.queue.push(arguments)};if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';n.queue = []; t = b.createElement(e); t.async = !0;t.src = v; s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s)}(window, document, 'script','https://connect.facebook.net/en_US/fbevents.js');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(initializationScript);\n})();\n</script>",
        template: "<script>\n(function () {\nvar account = __ACCOUNT__;\nvar eventName = '$$EVENT_NAME';\nvar topHead = window.top.document.head;\nvar eventScript = document.createElement('script');\nvar eventCode = \"fbq('init', '\" + account + \"');fbq('trackSingleCustom', '\" + account + \"', '\" + eventName + \"');\";\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: '一串數字',
            },
        ],
    },
    // FB(Instream)
    {
        platform: 'FB(Instream)',
        template: "<script>\n(function () {\nvar topHead = parent.window.document.head;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"!function (f, b, e, v, n, t, s) {if (f.fbq) return; n = f.fbq = function () {n.callMethod ?n.callMethod.apply(n, arguments) : n.queue.push(arguments)};if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';n.queue = []; t = b.createElement(e); t.async = !0;t.src = v; s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s)}(window, document, 'script','https://connect.facebook.net/en_US/fbevents.js');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(initializationScript);\n})();\n</script> <script>\n(function () {\nvar account = __ACCOUNT__;\nvar eventName = '$$EVENT_NAME';\nvar topHead = parent.window.document.head;\nvar eventScript = document.createElement('script');\nvar eventCode = \"fbq('init', '\" + account + \"');fbq('trackSingleCustom', '\" + account + \"', '\" + eventName + \"');\";\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: '一串數字',
            },
        ],
    },
    // GA - AW
    {
        platform: 'GA-AW ',
        initTemplate: "<script>\n(function () {\nvar account = 'AW-__ACCOUNT__';\nvar topHead = window.top.document.head;\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"window.dataLayer = top.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n</script>",
        template: "<script>\n(function () {\nvar account = 'AW-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar topHead = window.top.document.head;\nvar eventCode = \"gtag('event', '\" + eventName + \"', { 'send_to': '\" + account + \"', '\" + eventName + \"': '\" + eventName + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n}) ();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'AW- 後面的那串數字',
            },
        ],
    },

    // GA - AW (Instream)
    {
        platform: 'GA-AW(Instream)',
        template: "<script>\n(function () {\nvar account = 'AW-__ACCOUNT__';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"if(!window.dataLayer){window.dataLayer = [];};function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n(function () {\nvar account = 'AW-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar eventCode = \"gtag('event', '\" + eventName + \"', { 'send_to': '\" + account + \"', '\" + eventName + \"': '\" + eventName + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n}) ();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'AW- 後面的那串數字',
            },
        ],
    },

    // GA - UA (Google Analytics)
    {
        platform: 'GA-UA ',
        initTemplate: "<script>\n(function () {\nvar account = '__ACCOUNT__';\nvar topHead = window.top.document.head;\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"window.dataLayer = top.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n</script>",
        template: "<script>\n(function () {\nvar account = 'UA-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar category = 'OneAD';\nvar topHead = window.top.document.head;\nvar eventCode = \"gtag('event', '\" + eventName + \"', {'send_to': '\" + account + \"', 'event_category': '\" + category + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'UA- 後面的那串數字',
            },
        ],
    },

    // GA - UA (Instream)
    {
        platform: 'GA-UA(Instream)',
        template: "<script>\n(function () {\nvar account = 'UA-__ACCOUNT__';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"if(!window.dataLayer){window.dataLayer = [];};function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n(function () {\nvar account = 'UA-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar category = 'OneAD';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar eventCode = \"gtag('event', '\" + eventName + \"', {'send_to': '\" + account + \"', 'event_category': '\" + category + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'UA- 後面的那串數字',
            },
        ],
    },

    // GA - G (GA4)
    {
        platform: 'GA-G (GA4)',
        initTemplate: "<script>\n(function () {\nvar account = 'G-__ACCOUNT__';\nvar topHead = window.top.document.head;\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"window.dataLayer = top.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n</script>",
        template: "<script>\n(function () {\nvar account = 'G-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar category = 'OneAD';\nvar topHead = window.top.document.head;\nvar eventCode = \"gtag('event', '\" + eventName + \"', {'send_to': '\" + account + \"', 'event_category': '\" + category + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'G- 後面的那串數字',
            },
        ],
    },

    // GA - GA4
    {
        platform: 'GA-G (GA4) (instream)',
        template: "<script>\n(function () {\nvar account = 'G-__ACCOUNT__';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"if(!window.dataLayer){window.dataLayer = [];};function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n(function () {\nvar account = 'G-__ACCOUNT__';\nvar eventName = '$$EVENT_NAME';\nvar category = 'OneAD';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar eventCode = \"gtag('event', '\" + eventName + \"', {'send_to': '\" + account + \"', 'event_category': '\" + category + \"' });\";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'G- 後面的那串數字',
            },
        ],
    },

    // GA - DC
    {
        platform: 'GA-DC (DV360)',
        initTemplate: "<script>\n(function () {\nvar account = 'DC-__ACCOUNT____ADDRESS__';\nvar topHead = window.top.document.head;\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"window.dataLayer = top.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n</script>",
        template: "<script>\n(function () {\nvar account = 'DC-__ACCOUNT____ADDRESS__';\nvar eventName = '$$EVENT_NAME';\nvar allow_custom_scripts = true;\nvar topHead = window.top.document.head;\nvar eventCode = \"gtag('event', '\" + eventName + \"', { 'allow_custom_scripts': \" + allow_custom_scripts + \", 'send_to': '\" + account + \"' }); \";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        isSingleEvent: true,
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'DC- 後面到斜線前的數字們',
            },
            {
                label: 'Account Address',
                find: '__ADDRESS__',
                placeholder: '接續前面，從斜線到雙引號之間的那串文字',
            },
        ],
    },

    // GA - DC (Instream)
    {
        platform: 'GA-DC(Instream)',
        template: "<script>\n(function () {\nvar account = 'DC-__ACCOUNT____ADDRESS__';\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar scriptDiv = document.createElement('script');\nscriptDiv.src = 'https://www.googletagmanager.com/gtag/js?id=' + account;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"if(!window.dataLayer){window.dataLayer = [];};function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '\" + account + \"');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(scriptDiv);\ntopHead.appendChild(initializationScript);\n}) ();\n(function () {\nvar account = 'DC-__ACCOUNT____ADDRESS__';\nvar eventName = '$$EVENT_NAME';\nvar allow_custom_scripts = true;\nvar topHead = parent.window.document.getElementById('onead-layout');\nvar eventCode = \"gtag('event', '\" + eventName + \"', { 'allow_custom_scripts': \" + allow_custom_scripts + \", 'send_to': '\" + account + \"' }); \";\nvar eventScript = document.createElement('script');\neventScript.innerHTML = eventCode;\ntopHead.appendChild(eventScript);\n})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: 'DC- 後面到斜線前的數字們',
            },
            {
                label: 'Account Address',
                find: '__ADDRESS__',
                placeholder: '接續前面，從斜線到雙引號之間的那串文字',
            },
        ],
    },

    // IAS (A)
    {
        platform: 'IAS(A) - TextDrive 使用',
        template: "<script>\nfunction append() {var slot_id = `__position__` + isipIndex;var parentElement = parent.window.document.getElementById(slot_id);var s = document.createElement('script');s.type = 'application/javascript';s.async = true;s.src = '__JSSRC__';parentElement.appendChild(s);}var intervalListener = setInterval(function () {if (parent.document.readyState === 'complete') {append();clearInterval(intervalListener)}},100)</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead-text-li', 'onead-layout', 'onead-text-layout-${uniqueID}-', 'tracking-banner-wrapper'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },

    // IAS-D 測試
    {
        platform: 'IAS(D) - 全格式統一使用',
        template: '__position__,__JSSRC__,100vw,100vh,bottom,0,0,100vw,100vh',
        defaultValueOption: {},
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead_ias_templateD'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },
    //IAS(Nestle)
    {
        platform: 'IAS(Nestle) - MIB / Cover 使用',
        template: '__position__,__JSSRC__',
        defaultValueOption: {},
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead_ias_nestle'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },
    //IAS(test) - MIB/ Cover 使用
    {
        platform: 'IAS(test) - 此為測試使用模板',
        template: '__position__,__JSSRC__,__WIDTH__,__HEIGHT__,__locateType__,__range__,__leftRange__,__ImgWidth__,__ImgHeight__',
        defaultValueOption: {},
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead_ias_test'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
            {
                label: 'Width',
                find: '__WIDTH__',
                placeholder: '量測區塊的寬度，請加上單位',
            },
            {
                label: 'Height',
                find: '__HEIGHT__',
                placeholder: '量測區塊的高度，請加上單位',
            },
            {
                label: '定位',
                find: '__locateType__',
                placeholder: '',
                options: ['top', 'bottom'],
            },
            {
                label: '距離',
                find: '__range__',
                placeholder: '請加上單位',
            },
            {
                label: '左側距離',
                find: '__leftRange__',
                placeholder: '請加上單位',
            },
            {
                label: '圖片寬度',
                find: '__ImgWidth__',
                placeholder: '圖片寬度，請加上單位',
            },
            {
                label: '圖片高度',
                find: '__ImgHeight__',
                placeholder: '圖片高度，請加上單位',
            },
        ],
    },

    // MOAT
    {
        platform: 'Moat',
        template: "<script>\nvar slot_id = '__position__' + isipIndex;\nvar parentElement = parent.window.document.getElementById(slot_id);\nvar s = document.createElement('script');\ns.type = 'text/javascript';\ns.async = true;\ns.src = '__JSSRC__';\nparentElement.appendChild(s);\n</script>",
        defaultValueOption: {},
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead-layout', 'onead-text-li', 'onead_vertical_fixed_container', 'tracking-banner-wrapper'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },
    // DoubleVerify(new)
    {
        platform: 'DoubleVerify (new)',
        template: 'DVGeneratorNEW,__JSSRC__',
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },

    // DoubleVerify
    {
        platform: 'DoubleVerify (棄用)',
        template: "<script> const DVGenerator = (url) => { const urlWithoutBtreg = url.replace(/&btreg=.*?(&|$)/, '$1'); const btreg = `&btreg=${slot_id}`; return urlWithoutBtreg + btreg}; var slot_id = '__position__' + isipIndex;var parentElement = parent.window.document.getElementById(slot_id);var js = '__JSSRC__'; var dvTag = DVGenerator(js); var s = document.createElement('script');s.src = dvTag; parentElement.appendChild(s); </script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: '量測位置',
                find: '__position__',
                placeholder: '',
                options: ['onead-layout', 'onead-text-li', 'vertical-fixed-container', 'tracking-banner-wrapper'],
            },
            {
                label: 'Js',
                find: '__JSSRC__',
                placeholder: '客戶的 JS',
            },
        ],
    },

    // Taboola
    {
        platform: 'Taboola',
        initTemplate: "<script>\n(function (){\nvar topHead = window.document.head;\nvar initializationScript = document.createElement('script');\nvar initializationCode = \"!function (t, f, a, x) { if (!document.getElementById(x)) { t.async = 1; t.src = a; t.id = x; f.parentNode.insertBefore(t, f); }}(document.createElement('script'),document.getElementsByTagName('script')[0],'//cdn.taboola.com/libtrc/unip/__ACCOUNT__/tfa.js','tb_tfa_script');\";\ninitializationScript.innerHTML = initializationCode;\ntopHead.appendChild(initializationScript);})();\n</script>",
        template: "<script>\n(function () {\nwindow._tfa = window._tfa || [];\nvar topHead = window.document.head;\nvar eventScript = document.createElement('script');\nvar eventCode = \"window._tfa.push({ notify: 'event', name: '$$EVENT_NAME', id: __ACCOUNT__ });\";\neventScript.innerHTML = eventCode;topHead.appendChild(eventScript);})();\n</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: '一串數字',
            },
        ],
    },
    // TikTok
    {
        platform: 'TikTok',
        template: "<script>if (typeof ttqMethodArray === 'undefined') { window.ttqMethodArray = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'] } if (typeof ttqSetAndDefer === 'undefined') { window.ttqSetAndDefer = (t, e) => { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } } if (typeof ttqInstance === 'undefined') { window.ttqInstance = () => { const ttq = window.ttq; const e = ttq._i['CPK0U53C77U57258LAC0'] || []; for (let n = 0; n < ttq.methods.length; n++) { ttqSetAndDefer(e, ttq.methods[n]) } return e } } if (typeof ttqLoad === 'undefined') { window.ttqLoad = (e, n) => { const ttq = window.ttq; const r = 'https://analytics.tiktok.com/i18n/pixel/events.js'; const o = n && n.partner; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = n || {}; n = document.createElement('script'); n.type = 'text/javascript'; n.async = !0; n.src = r + '?sdkid=' + e + '&lib=' + 'ttq'; e = document.getElementsByTagName('script')[0]; e.parentNode.insertBefore(n, e); } } if (![...window.document.getElementsByTagName('script')].some(script => script.src.includes('https://analytics.tiktok.com/i18n/pixel/events.js'))) { !(function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = (w[t] = w[t] || []); ttq.methods = w.ttqMethodArray; ttq.setAndDefer = w.ttqSetAndDefer; for (var i = 0; i < ttq.methods.length; i++) { ttq.setAndDefer(ttq, ttq.methods[i]) } ttq.instance = w.ttqInstance; ttq.load = w.ttqLoad; ttq.load('__ACCOUNT__'); ttq.page(); })(window, document, 'ttq') } ttq.track('$$EVENT_NAME')</script>",
        defaultValueOption: {
            eventName: {
                find: '$$EVENT_NAME',
            },
        },
        macros: [
            {
                label: 'Account ID',
                find: '__ACCOUNT__',
                placeholder: '一串數字',
            },
        ],
    },
];

window.trackingCodeTemplates = trackingCodeTemplates;

/******/ })()
;