if (window.ONEAD_version === undefined) {
    window.ONEAD_version = '20180914_042628';

}


//@zone FRON-604 調整常數
if (window.ONEAD_CONST === undefined) {
    window.ONEAD_CONST = {
        // default_mobile_external_url : 'http://mob.onead.com.tw/',
        default_wrapper_html: '<center><a href="#onead"></a><div style="width:%spx"><div id="%s" style="text-align: center; margin-left: auto; margin-right: auto;"></div></div></center>',
        fade_block_id: 'ONEAD_fade',
        loadMode_windowDOMContentLoaded: 'windowDOMContentLoaded',
        loadMode_windowsLoaded: 'windowLoaded',
        DISPLAY_TYPE: {
            IN_PAGE: 'inpage',
            IN_STREAM: 'instream'
        },
        PLAY_MODE: {
            DEFAULT: 'default',
            IR: 'inread',
            IC: 'incover',
            IP: 'inpage',
            IN_STREAM: 'instream',
            MIC: 'mobile-incover',
            MAIC: 'mobile-app-incover',
            MIF: 'inflip',
            MIR: 'mobile-inread',
            MAIR: 'mobile-app-inread',
            MIT: 'mobile-intop',
            IAB_VAST: 'iab-vast',
            DPR: 'desktop-pre-roll',
            MPR: 'mobile-pre-roll',
            APR: 'app-pre-roll'
        },
        PLAYER_TYPE: {
            //@zone FRON-604 因為不再使用 flash, 所以前面的 HTML5 就拿掉以縮短常數長度
            IS_DF: 'HTML5_IS_DF',
            IS_INSYNC: 'HTML5_IS_INSYNC',
            //@zone FRON-604 加入新增 player type
            IS_FOLLOW_INSYNC: 'HTML5_IS_FOLLOW_INSYNC',
            IS_FOLLOW_DF: 'HTML5_IS_FOLLOW_DF',
            SCROLLER: 'SCROLLER',
            MOBILE: 'MOBILE',
            INSTANT: 'INSTANT',
            TRANSFORMER: 'TRANSFORMER',
            VERTICAL: 'VERTICAL',
            SKIRT: 'SKIRT',
            BNB: 'BNB',
            BOTTOM: 'BOTTOM',
            STORY: 'STORY',
            H5_320X480: 'H5_320X480',
            H5_640X480: 'H5_640X480',
            H5_970X250: 'H5_970X250',
            TRANSFORMER_GALLERY: 'TRANSFORMER_GALLERY',
        },
        //SERV url value do'nt change
        ETAG_SERVICE: {
            TARGET: "https://onead.onevision.com.tw/v2/push?",
            SERV: "v2/et/oid?cb=window.ONEAD_etag_cscb",
            HOST: 'https://onead.onevision.com.tw/',
            EVENT_TYPE_NORMAL: "7001",
            FP: "",
            OID: "",
            INDEX: 0,
        },
        ONEAD_1ST_COOKIE: {
            vision: "20201117"
        },
        UID: {
            DCARD: 1000110,
            CNYES: 1000045,
            TVBS: '1000084',
            BNEXT: '1000012',
        },
        HOST: {
            STAGING: 'https://staging.onead.com.tw/',
            TEST: 'https://test.onead.com.tw/',
            DEMO: 'https://demo.onead.com.tw/',
            RD: 'https://rd.guoshi.com.tw/'
        }
    };

}
var ONEAD_CONST = window.ONEAD_CONST;
//FRON-990 onead-pixel share params
if (window.ONEAD_PIXEL_ISIP === undefined) {
    window.ONEAD_PIXEL_ISIP = {
        cscb_ary: [],
        oid: ""
    };
}
var ONEAD_PIXEL_ISIP = window.ONEAD_PIXEL_ISIP;


/* jshint ignore:start */
//@zone FRON-944 調整 Fingerprint2 到 ONEAD_CONST 物件下
(function (ONEAD_CONST) {
    "use strict";
    var DEBUG = false;
    ONEAD_CONST.Fingerprint2 = function (options) {
        var defaultOptions = {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf"
        };
        this.options = this.extend(options, defaultOptions);
        this.nativeForEach = Array.prototype.forEach;
        this.nativeMap = Array.prototype.map;
    };
    ONEAD_CONST.Fingerprint2.prototype = {
        extend: function (source, target) {
            if (source == null) { return target; }
            for (var k in source) {
                if (source[k] != null && target[k] !== source[k]) {
                    target[k] = source[k];
                }
            }
            return target;
        },
        log: function (msg) {
            if (window.console) {
                console.log(msg);
            }
        },
        get: function (done) {
            var keys = [];
            keys = this.userAgentKey(keys);
            keys = this.languageKey(keys);
            keys = this.colorDepthKey(keys);
            keys = this.screenResolutionKey(keys);
            keys = this.timezoneOffsetKey(keys);
            keys = this.sessionStorageKey(keys);
            keys = this.localStorageKey(keys);
            keys = this.indexedDbKey(keys);
            keys = this.addBehaviorKey(keys);
            keys = this.openDatabaseKey(keys);
            keys = this.cpuClassKey(keys);
            keys = this.platformKey(keys);
            keys = this.doNotTrackKey(keys);
            keys = this.pluginsKey(keys);
            keys = this.canvasKey(keys);
            keys = this.webglKey(keys);
            keys = this.adBlockKey(keys);
            keys = this.hasLiedLanguagesKey(keys);
            keys = this.hasLiedResolutionKey(keys);
            keys = this.hasLiedOsKey(keys);
            keys = this.hasLiedBrowserKey(keys);
            keys = this.touchSupportKey(keys);
            var that = this;
            //   this.fontsKey(keys, function(newKeys){
            var murmur = that.x64hash128(keys.join("~~~"), 31);
            done(murmur);
            //   });
        },

        userAgentKey: function (keys) {
            if (!this.options.excludeUserAgent) {
                keys.push(navigator.userAgent);
            }
            return keys;
        },
        languageKey: function (keys) {
            if (!this.options.excludeLanguage) {
                keys.push(navigator.language);
            }
            return keys;
        },
        colorDepthKey: function (keys) {
            if (!this.options.excludeColorDepth) {
                keys.push(screen.colorDepth);
            }
            return keys;
        },
        screenResolutionKey: function (keys) {
            if (!this.options.excludeScreenResolution) {
                var resolution = this.getScreenResolution();
                if (typeof resolution !== "undefined") { // headless browsers, such as phantomjs
                    keys.push(resolution.join("x"));
                }
            }
            return keys;
        },
        getScreenResolution: function () {
            var resolution;
            if (this.options.detectScreenOrientation) {
                resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
            } else {
                resolution = [screen.height, screen.width];
            }
            return resolution;
        },
        timezoneOffsetKey: function (keys) {
            if (!this.options.excludeTimezoneOffset) {
                keys.push(new Date().getTimezoneOffset());
            }
            return keys;
        },
        sessionStorageKey: function (keys) {
            if (!this.options.excludeSessionStorage && this.hasSessionStorage()) {
                keys.push("sessionStorageKey");
            }
            return keys;
        },
        localStorageKey: function (keys) {
            if (!this.options.excludeSessionStorage && this.hasLocalStorage()) {
                keys.push("localStorageKey");
            }
            return keys;
        },
        indexedDbKey: function (keys) {
            if (!this.options.excludeIndexedDB && this.hasIndexedDB()) {
                keys.push("indexedDbKey");
            }
            return keys;
        },
        addBehaviorKey: function (keys) {
            //body might not be defined at this point or removed programmatically
            if (document.body && !this.options.excludeAddBehavior && document.body.addBehavior) {
                keys.push("addBehaviorKey");
            }
            return keys;
        },
        openDatabaseKey: function (keys) {
            if (!this.options.excludeOpenDatabase && window.openDatabase) {
                keys.push("openDatabase");
            }
            return keys;
        },
        cpuClassKey: function (keys) {
            if (!this.options.excludeCpuClass) {
                keys.push(this.getNavigatorCpuClass());
            }
            return keys;
        },
        platformKey: function (keys) {
            if (!this.options.excludePlatform) {
                keys.push(this.getNavigatorPlatform());
            }
            return keys;
        },
        doNotTrackKey: function (keys) {
            if (!this.options.excludeDoNotTrack) {
                keys.push(this.getDoNotTrack());
            }
            return keys;
        },
        canvasKey: function (keys) {
            if (!this.options.excludeCanvas && this.isCanvasSupported()) {
                keys.push(this.getCanvasFp());
            }
            return keys;
        },
        webglKey: function (keys) {
            if (!this.options.excludeWebGL && this.isCanvasSupported()) {
                keys.push(this.getWebglFp());
            }
            return keys;
        },
        adBlockKey: function (keys) {
            if (!this.options.excludeAdBlock) {
                keys.push({ key: "adblock", value: this.getAdBlock() });
            }
            return keys;
        },
        hasLiedLanguagesKey: function (keys) {
            if (!this.options.excludeHasLiedLanguages) {
                keys.push({ key: "has_lied_languages", value: this.getHasLiedLanguages() });
            }
            return keys;
        },
        hasLiedResolutionKey: function (keys) {
            if (!this.options.excludeHasLiedResolution) {
                keys.push({ key: "has_lied_resolution", value: this.getHasLiedResolution() });
            }
            return keys;
        },
        hasLiedOsKey: function (keys) {
            if (!this.options.excludeHasLiedOs) {
                keys.push({ key: "has_lied_os", value: this.getHasLiedOs() });
            }
            return keys;
        },
        hasLiedBrowserKey: function (keys) {
            if (!this.options.excludeHasLiedBrowser) {
                keys.push({ key: "has_lied_browser", value: this.getHasLiedBrowser() });
            }
            return keys;
        },
        touchSupportKey: function (keys) {
            if (!this.options.excludeTouchSupport) {
                keys.push({ key: "touch_support", value: this.getTouchSupport() });
            }
            return keys;
        },
        fontsKey: function (keys, done) {
            if (this.options.excludeFlashFonts) {
                if (DEBUG) {
                    this.log("Skipping flash fonts detection per excludeFlashFonts configuration option");
                }
                if (this.options.excludeJsFonts) {
                    if (DEBUG) {
                        this.log("Skipping js fonts detection per excludeJsFonts configuration option");
                    }
                    return done(keys);
                }
                return done(this.jsFontsKey(keys));
            }
            // we do flash if swfobject is loaded
            if (!this.hasSwfObjectLoaded()) {
                if (DEBUG) {
                    this.log("Swfobject is not detected, Flash fonts enumeration is skipped");
                }
                return done(this.jsFontsKey(keys));
            }
            if (!this.hasMinFlashInstalled()) {
                if (DEBUG) {
                    this.log("Flash is not installed, skipping Flash fonts enumeration");
                }
                return done(this.jsFontsKey(keys));
            }
            if (typeof this.options.swfPath === "undefined") {
                if (DEBUG) {
                    this.log("To use Flash fonts detection, you must pass a valid swfPath option, skipping Flash fonts enumeration");
                }
                return done(this.jsFontsKey(keys));
            }
            return this.flashFontsKey(keys, done);
        },
        // flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)
        flashFontsKey: function (keys, done) {
            this.loadSwfAndDetectFonts(function (fonts) {
                keys.push(fonts.join(";"));
                done(keys);
            });
        },
        // kudos to http://www.lalit.org/lab/javascript-css-font-detect/
        jsFontsKey: function (keys) {
            // a font will be compared against all the three default fonts.
            // and if it doesn't match all 3 then that font is not available.
            var baseFonts = ["monospace", "sans-serif", "serif"];

            //we use m or w because these two characters take up the maximum width.
            // And we use a LLi so that the same matching fonts can get separated
            var testString = "mmmmmmmmmmlli";

            //we test using 72px font size, we may use any size. I guess larger the better.
            var testSize = "72px";

            var h = document.getElementsByTagName("body")[0];

            // create a SPAN in the document to get the width of the text we use to test
            var s = document.createElement("span");
            s.style.fontSize = testSize;
            s.innerHTML = testString;
            var defaultWidth = {};
            var defaultHeight = {};
            for (var index in baseFonts) {
                //get the default width for the three base fonts
                s.style.fontFamily = baseFonts[index];
                h.appendChild(s);
                defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
                defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
                h.removeChild(s);
            }
            var detect = function (font) {
                var detected = false;
                for (var index in baseFonts) {
                    s.style.fontFamily = font + "," + baseFonts[index]; // name of the font along with the base font for fallback.
                    h.appendChild(s);
                    var matched = (s.offsetWidth !== defaultWidth[baseFonts[index]] || s.offsetHeight !== defaultHeight[baseFonts[index]]);
                    h.removeChild(s);
                    detected = detected || matched;
                }
                return detected;
            };
            var fontList = [
                "Abadi MT Condensed Light", "Academy Engraved LET",
                "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO",
                "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium",
                "Algerian", "Amazone BT", "American Typewriter",
                "American Typewriter Condensed", "AmerType Md BT", "Andale Mono",
                "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita",
                "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo",
                "Arabic Typesetting", "ARCHER", "Arial", "Arial Black", "Arial Hebrew",
                "Arial MT", "Arial Narrow", "Arial Rounded MT Bold",
                "Arial Unicode MS", "ARNO PRO", "Arrus BT", "Aurora Cn BT",
                "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy",
                "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville",
                "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni",
                "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT",
                "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed",
                "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD",
                "Bitstream Vera Sans Mono", "Blackadder ITC", "BlairMdITC TT",
                "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT",
                "Bodoni MT Black", "Bodoni MT Condensed",
                "Bodoni MT Poster Compressed", "Book Antiqua", "Bookman Old Style",
                "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC",
                "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New",
                "BrowalliaUPC", "Brush Script MT", "Calibri", "Californian FB",
                "Calisto MT", "Calligrapher", "Cambria", "Cambria Math", "Candara",
                "CaslonOpnface BT", "Castellar", "Centaur", "Century",
                "Century Gothic", "Century Schoolbook", "Cezanne", "CG Omega",
                "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster",
                "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer",
                "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed",
                "CloisterBlack BT", "Cochin", "Colonna MT", "Comic Sans",
                "Comic Sans MS", "Consolas", "Constantia", "Cooper Black",
                "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold",
                "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel",
                "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Courier",
                "Courier New", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David",
                "DB LCD Temp", "DELICIOUS", "Denmark", "Devanagari Sangam MN",
                "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum",
                "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant",
                "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT",
                "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC",
                "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Euphemia UCAS",
                "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys",
                "FONTIN", "Footlight MT Light", "Forte", "Franklin Gothic",
                "Franklin Gothic Book", "Franklin Gothic Demi",
                "Franklin Gothic Demi Cond", "Franklin Gothic Heavy",
                "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "FrankRuehl",
                "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script",
                "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER",
                "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT",
                "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT",
                "Garamond", "Gautami", "Geeza Pro", "Geneva", "Geometr231 BT",
                "Geometr231 Hv BT", "Geometr231 Lt BT", "Georgia", "GeoSlab 703 Lt BT",
                "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT",
                "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold",
                "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha",
                "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD",
                "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT",
                "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe",
                "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington",
                "Heather", "Heiti SC", "Heiti TC", "HELV", "Helvetica",
                "Helvetica Neue", "Herald", "High Tower Text",
                "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text",
                "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Impact",
                "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT",
                "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT",
                "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET",
                "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT",
                "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN",
                "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC",
                "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script",
                "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT",
                "LilyUPC", "Lithograph", "Lithograph Light", "Long Island",
                "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax",
                "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans",
                "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lydian BT",
                "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic",
                "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett",
                "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI",
                "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue",
                "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le",
                "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU",
                "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion",
                "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern",
                "Modern No. 20", "Mona Lisa Solid ITC TT", "Monaco", "Mongolian Baiti",
                "MONO", "Monotype Corsiva", "MoolBoran", "Mrs Eaves", "MS Gothic",
                "MS LineDraw", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho",
                "MS Reference Sans Serif", "MS Reference Specialty", "MS Sans Serif",
                "MS Serif", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "MYRIAD",
                "MYRIAD PRO", "Nadeem", "Narkisim", "NEVIS", "News Gothic",
                "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid",
                "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century",
                "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN",
                "OSAKA", "OzHandicraft BT", "Palace Script MT", "Palatino",
                "Palatino Linotype", "Papyrus", "Parchment", "Party LET", "Pegasus",
                "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick",
                "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB",
                "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET",
                "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic",
                "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed",
                "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla",
                "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold",
                "SCRIPTINA", "Segoe Print", "Segoe Script", "Segoe UI",
                "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Serifa",
                "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood",
                "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard",
                "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed",
                "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell",
                "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket",
                "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook",
                "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen",
                "Symbol", "Synchro LET", "System", "Tahoma", "Tamil Sangam MN",
                "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC",
                "Terminal", "Thonburi", "Times", "Times New Roman",
                "Times New Roman PS", "Traditional Arabic", "Trajan", "TRAJAN PRO",
                "Trebuchet MS", "Tristan", "Tubular", "Tunga", "Tw Cen MT",
                "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold",
                "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium",
                "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Verdana", "Vijaya",
                "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda",
                "Webdings", "Westminster", "WHITNEY", "Wide Latin", "Wingdings",
                "Wingdings 2", "Wingdings 3", "ZapfEllipt BT", "ZapfHumnst BT",
                "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT",
                "ZWAdobeF"];

            var available = [];
            for (var i = 0, l = fontList.length; i < l; i++) {
                if (detect(fontList[i])) {
                    available.push(fontList[i]);
                }
            }
            keys.push(available.join(";"));
            return keys;
        },
        pluginsKey: function (keys) {
            if (this.isIE()) {
                keys.push(this.getIEPluginsString());
            } else {
                keys.push(this.getRegularPluginsString());
            }
            return keys;
        },
        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (p) {
                var mimeTypes = this.map(p, function (mt) {
                    return [mt.type, mt.suffixes].join("~");
                }).join(",");
                return [p.name, p.description, mimeTypes].join("::");
            }, this).join(";");
        },
        getIEPluginsString: function () {
            if (window.ActiveXObject) {
                var names = [
                    "AcroPDF.PDF", // Adobe PDF reader 7+
                    "Adodb.Stream",
                    "AgControl.AgControl", // Silverlight
                    "DevalVRXCtrl.DevalVRXCtrl.1",
                    "MacromediaFlashPaper.MacromediaFlashPaper",
                    "Msxml2.DOMDocument",
                    "Msxml2.XMLHTTP",
                    "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
                    "QuickTime.QuickTime", // QuickTime
                    "QuickTimeCheckObject.QuickTimeCheck.1",
                    "RealPlayer",
                    "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
                    "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
                    "Scripting.Dictionary",
                    "SWCtl.SWCtl", // ShockWave player
                    "Shell.UIHelper",
                    "ShockwaveFlash.ShockwaveFlash", //flash plugin
                    "Skype.Detection",
                    "TDCCtl.TDCCtl",
                    "WMPlayer.OCX", // Windows media player
                    "rmocx.RealPlayer G2 Control",
                    "rmocx.RealPlayer G2 Control.1"
                ];
                // starting to detect plugins in IE
                return this.map(names, function (name) {
                    try {
                        new ActiveXObject(name);
                        return name;
                    } catch (e) {
                        return null;
                    }
                }).join(";");
            } else {
                return "";
            }
        },
        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it exists
            }
        },
        // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
        hasLocalStorage: function () {
            try {
                return !!window.localStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it exists
            }
        },
        hasIndexedDB: function () {
            return !!window.indexedDB;
        },
        getNavigatorCpuClass: function () {
            if (navigator.cpuClass) {
                return "navigatorCpuClass: " + navigator.cpuClass;
            } else {
                return "navigatorCpuClass: unknown";
            }
        },
        getNavigatorPlatform: function () {
            if (navigator.platform) {
                return "navigatorPlatform: " + navigator.platform;
            } else {
                return "navigatorPlatform: unknown";
            }
        },
        getDoNotTrack: function () {
            if (navigator.doNotTrack) {
                return "doNotTrack: " + navigator.doNotTrack;
            } else {
                return "doNotTrack: unknown";
            }
        },
        getTouchSupport: function () {
            var maxTouchPoints = 0;
            var touchEvent = false;
            if (typeof navigator.maxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.maxTouchPoints;
            } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.msMaxTouchPoints;
            }
            try {
                document.createEvent("TouchEvent");
                touchEvent = true;
            } catch (_) { /* squelch */ }
            var touchStart = "ontouchstart" in window;
            return [maxTouchPoints, touchEvent, touchStart];
        },
        getCanvasFp: function () {
            // Very simple now, need to make it more complex (geo shapes etc)
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            // https://www.browserleaks.com/canvas#how-does-it-work
            var txt = "Cwm fjordbank glyphs vext quiz, https://github.com/valve ὠ";
            ctx.textBaseline = "top";
            ctx.font = "70px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            return canvas.toDataURL();
        },

        getWebglFp: function () {
            var gl;
            var fa2s = function (fa) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                return "[" + fa[0] + ", " + fa[1] + "]";
            };
            var maxAnisotropy = function (gl) {
                var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
            };
            gl = this.getWebglCanvas();
            if (!gl) { return null; }
            // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
            // First it draws a gradient object with shaders and convers the image to the Base64 string.
            // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
            // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
            var result = [];
            var canvas = document.createElement("canvas");
            var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
            var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
            var vertexPosBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
            var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            vertexPosBuffer.itemSize = 3;
            vertexPosBuffer.numItems = 3;
            var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vshader, vShaderTemplate);
            gl.compileShader(vshader);
            var fshader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fshader, fShaderTemplate);
            gl.compileShader(fshader);
            gl.attachShader(program, vshader);
            gl.attachShader(program, fshader);
            gl.linkProgram(program);
            gl.useProgram(program);
            program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
            program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
            gl.enableVertexAttribArray(program.vertexPosArray);
            gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
            gl.uniform2f(program.offsetUniform, 1, 1);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
            result.push(canvas.toDataURL());
            result.push("extensions:" + gl.getSupportedExtensions().join(";"));
            result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
            result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
            result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
            result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
            result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
            result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
            result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
            result.push("webgl max anisotropy:" + maxAnisotropy(gl));
            result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
            result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
            result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
            result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
            result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
            result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
            result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
            result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
            result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
            result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
            result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
            result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
            result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
            result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
            result.push("webgl version:" + gl.getParameter(gl.VERSION));
            //TODO: implement vertex shader & fragment shader precision
            return result.join("§");
        },
        getAdBlock: function () {
            var ads = document.createElement("div");
            ads.innerHTML = "&nbsp;";
            ads.className = "adsbox";
            var result = false;
            try {
                // body may not exist, that's why we need try/catch
                document.body.appendChild(ads);
                result = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
                document.body.removeChild(ads);
            } catch (e) {
                result = false;
            }
            return result;
        },
        getHasLiedLanguages: function () {
            //We check if navigator.language is equal to the first language of navigator.languages
            if (typeof navigator.languages !== "undefined") {
                try {
                    var firstLanguages = navigator.languages[0].substr(0, 2);
                    if (firstLanguages !== navigator.language.substr(0, 2)) {
                        return true;
                    }
                } catch (err) {
                    return true;
                }
            }
            return false;
        },
        getHasLiedResolution: function () {
            if (screen.width < screen.availWidth) {
                return true;
            }
            if (screen.height < screen.availHeight) {
                return true;
            }
            return false;
        },
        getHasLiedOs: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            var oscpu = navigator.oscpu;
            var platform = navigator.platform.toLowerCase();
            var os;
            //We extract the OS from the user agent (respect the order of the if else if statement)
            if (userAgent.indexOf("windows phone") >= 0) {
                os = "Windows Phone";
            } else if (userAgent.indexOf("win") >= 0) {
                os = "Windows";
            } else if (userAgent.indexOf("android") >= 0) {
                os = "Android";
            } else if (userAgent.indexOf("linux") >= 0) {
                os = "Linux";
            } else if (userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0) {
                os = "iOS";
            } else if (userAgent.indexOf("mac") >= 0) {
                os = "Mac";
            } else {
                os = "Other";
            }
            // We detect if the person uses a mobile device
            var mobileDevice;
            if (("ontouchstart" in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0)) {
                mobileDevice = true;
            } else {
                mobileDevice = false;
            }

            if (mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other") {
                return true;
            }

            // We compare oscpu with the OS extracted from the UA
            if (typeof oscpu !== "undefined") {
                oscpu = oscpu.toLowerCase();
                if (oscpu.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
                    return true;
                } else if (oscpu.indexOf("linux") >= 0 && os !== "Linux" && os !== "Android") {
                    return true;
                } else if (oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
                    return true;
                } else if (oscpu.indexOf("win") === 0 && oscpu.indexOf("linux") === 0 && oscpu.indexOf("mac") >= 0 && os !== "other") {
                    return true;
                }
            }

            //We compare platform with the OS extracted from the UA
            if (platform.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
                return true;
            } else if ((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && os !== "Linux" && os !== "Android") {
                return true;
            } else if ((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS") {
                return true;
            } else if (platform.indexOf("win") === 0 && platform.indexOf("linux") === 0 && platform.indexOf("mac") >= 0 && os !== "other") {
                return true;
            }

            if (typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone") {
                //We are are in the case where the person uses ie, therefore we can infer that it's windows
                return true;
            }

            return false;
        },
        getHasLiedBrowser: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            var productSub = navigator.productSub;

            //we extract the browser from the user agent (respect the order of the tests)
            var browser;
            if (userAgent.indexOf("firefox") >= 0) {
                browser = "Firefox";
            } else if (userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0) {
                browser = "Opera";
            } else if (userAgent.indexOf("chrome") >= 0) {
                browser = "Chrome";
            } else if (userAgent.indexOf("safari") >= 0) {
                browser = "Safari";
            } else if (userAgent.indexOf("trident") >= 0) {
                browser = "Internet Explorer";
            } else {
                browser = "Other";
            }

            if ((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107") {
                return true;
            }

            var tempRes = eval.toString().length;
            if (tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other") {
                return true;
            } else if (tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other") {
                return true;
            } else if (tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other") {
                return true;
            }

            //We create an error to see how it is handled
            var errFirefox;
            try {
                throw "a";
            } catch (err) {
                try {
                    err.toSource();
                    errFirefox = true;
                } catch (errOfErr) {
                    errFirefox = false;
                }
            }
            if (errFirefox && browser !== "Firefox" && browser !== "Other") {
                return true;
            }
            return false;
        },
        isCanvasSupported: function () {
            var elem = document.createElement("canvas");
            return !!(elem.getContext && elem.getContext("2d"));
        },
        isIE: function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true;
            } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) { // IE 11
                return true;
            }
            return false;
        },
        hasSwfObjectLoaded: function () {
            return typeof window.swfobject !== "undefined";
        },
        hasMinFlashInstalled: function () {
            return swfobject.hasFlashPlayerVersion("9.0.0");
        },
        addFlashDivNode: function () {
            var node = document.createElement("div");
            node.setAttribute("id", this.options.swfContainerId);
            document.body.appendChild(node);
        },
        loadSwfAndDetectFonts: function (done) {
            var hiddenCallback = "___fp_swf_loaded";
            window[hiddenCallback] = function (fonts) {
                done(fonts);
            };
            var id = this.options.swfContainerId;
            this.addFlashDivNode();
            var flashvars = { onReady: hiddenCallback };
            var flashparams = { allowScriptAccess: "always", menu: "false" };
            swfobject.embedSWF(this.options.swfPath, id, "1", "1", "9.0.0", false, flashvars, flashparams, {});
        },
        getWebglCanvas: function () {
            var canvas = document.createElement("canvas");
            var gl = null;
            try {
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            } catch (e) { }
            if (!gl) { gl = null; }
            return gl;
        },
        each: function (obj, iterator, context) {
            if (obj === null) {
                return;
            }
            if (this.nativeForEach && obj.forEach === this.nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) { return; }
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) { return; }
                    }
                }
            }
        },

        map: function (obj, iterator, context) {
            var results = [];
            // Not using strict equality so that this acts as a
            // shortcut to checking for `null` and `undefined`.
            if (obj == null) { return results; }
            if (this.nativeMap && obj.map === this.nativeMap) { return obj.map(iterator, context); }
            this.each(obj, function (value, index, list) {
                results[results.length] = iterator.call(context, value, index, list);
            });
            return results;
        },

        /// MurmurHash3 related functions

        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // added together as a 64bit int (as an array of two 32bit ints).
        //
        x64Add: function (m, n) {
            m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
            n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
            var o = [0, 0, 0, 0];
            o[3] += m[3] + n[3];
            o[2] += o[3] >>> 16;
            o[3] &= 0xffff;
            o[2] += m[2] + n[2];
            o[1] += o[2] >>> 16;
            o[2] &= 0xffff;
            o[1] += m[1] + n[1];
            o[0] += o[1] >>> 16;
            o[1] &= 0xffff;
            o[0] += m[0] + n[0];
            o[0] &= 0xffff;
            return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
        },

        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // multiplied together as a 64bit int (as an array of two 32bit ints).
        //
        x64Multiply: function (m, n) {
            m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
            n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
            var o = [0, 0, 0, 0];
            o[3] += m[3] * n[3];
            o[2] += o[3] >>> 16;
            o[3] &= 0xffff;
            o[2] += m[2] * n[3];
            o[1] += o[2] >>> 16;
            o[2] &= 0xffff;
            o[2] += m[3] * n[2];
            o[1] += o[2] >>> 16;
            o[2] &= 0xffff;
            o[1] += m[1] * n[3];
            o[0] += o[1] >>> 16;
            o[1] &= 0xffff;
            o[1] += m[2] * n[2];
            o[0] += o[1] >>> 16;
            o[1] &= 0xffff;
            o[1] += m[3] * n[1];
            o[0] += o[1] >>> 16;
            o[1] &= 0xffff;
            o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
            o[0] &= 0xffff;
            return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
        },
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) rotated left by that number of positions.
        //
        x64Rotl: function (m, n) {
            n %= 64;
            if (n === 32) {
                return [m[1], m[0]];
            }
            else if (n < 32) {
                return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
            }
            else {
                n -= 32;
                return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
            }
        },
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) shifted left by that number of positions.
        //
        x64LeftShift: function (m, n) {
            n %= 64;
            if (n === 0) {
                return m;
            }
            else if (n < 32) {
                return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
            }
            else {
                return [m[1] << (n - 32), 0];
            }
        },
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // xored together as a 64bit int (as an array of two 32bit ints).
        //
        x64Xor: function (m, n) {
            return [m[0] ^ n[0], m[1] ^ n[1]];
        },
        //
        // Given a block, returns murmurHash3's final x64 mix of that block.
        // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
        // only place where we need to right shift 64bit ints.)
        //
        x64Fmix: function (h) {
            h = this.x64Xor(h, [0, h[0] >>> 1]);
            h = this.x64Multiply(h, [0xff51afd7, 0xed558ccd]);
            h = this.x64Xor(h, [0, h[0] >>> 1]);
            h = this.x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
            h = this.x64Xor(h, [0, h[0] >>> 1]);
            return h;
        },

        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
        //
        x64hash128: function (key, seed) {
            key = key || "";
            seed = seed || 0;
            var remainder = key.length % 16;
            var bytes = key.length - remainder;
            var h1 = [0, seed];
            var h2 = [0, seed];
            var k1 = [0, 0];
            var k2 = [0, 0];
            var c1 = [0x87c37b91, 0x114253d5];
            var c2 = [0x4cf5ad43, 0x2745937f];
            for (var i = 0; i < bytes; i = i + 16) {
                k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
                k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];
                k1 = this.x64Multiply(k1, c1);
                k1 = this.x64Rotl(k1, 31);
                k1 = this.x64Multiply(k1, c2);
                h1 = this.x64Xor(h1, k1);
                h1 = this.x64Rotl(h1, 27);
                h1 = this.x64Add(h1, h2);
                h1 = this.x64Add(this.x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
                k2 = this.x64Multiply(k2, c2);
                k2 = this.x64Rotl(k2, 33);
                k2 = this.x64Multiply(k2, c1);
                h2 = this.x64Xor(h2, k2);
                h2 = this.x64Rotl(h2, 31);
                h2 = this.x64Add(h2, h1);
                h2 = this.x64Add(this.x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
            }
            k1 = [0, 0];
            k2 = [0, 0];
            switch (remainder) {
                case 15:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 14)], 48));
                case 14:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 13)], 40));
                case 13:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 12)], 32));
                case 12:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 11)], 24));
                case 11:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 10)], 16));
                case 10:
                    k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 9)], 8));
                case 9:
                    k2 = this.x64Xor(k2, [0, key.charCodeAt(i + 8)]);
                    k2 = this.x64Multiply(k2, c2);
                    k2 = this.x64Rotl(k2, 33);
                    k2 = this.x64Multiply(k2, c1);
                    h2 = this.x64Xor(h2, k2);
                case 8:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 7)], 56));
                case 7:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 6)], 48));
                case 6:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 5)], 40));
                case 5:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 4)], 32));
                case 4:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 3)], 24));
                case 3:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 2)], 16));
                case 2:
                    k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 1)], 8));
                case 1:
                    k1 = this.x64Xor(k1, [0, key.charCodeAt(i)]);
                    k1 = this.x64Multiply(k1, c1);
                    k1 = this.x64Rotl(k1, 31);
                    k1 = this.x64Multiply(k1, c2);
                    h1 = this.x64Xor(h1, k1);
            }
            h1 = this.x64Xor(h1, [0, key.length]);
            h2 = this.x64Xor(h2, [0, key.length]);
            h1 = this.x64Add(h1, h2);
            h2 = this.x64Add(h2, h1);
            h1 = this.x64Fmix(h1);
            h2 = this.x64Fmix(h2);
            h1 = this.x64Add(h1, h2);
            h2 = this.x64Add(h2, h1);
            return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
        }
    };
})(ONEAD_CONST);
/* jshint ignore:end */
// // http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
// // - window.innerWidth
// // - window.innerHeight
// // - window.scrollX
// // - window.scrollY
// // - document.width
// // - document.height


// (function (window, html, body) {
//     if (!window.innerWidth) Object.defineProperty(window, 'innerWidth', {
//         get: function () { return html.clientWidth }
//     });

//     if (!window.innerHeight) Object.defineProperty(window, 'innerHeight', {
//         get: function () { return html.clientHeight }
//     });


//     if (!document.width) Object.defineProperty(document, 'width', {
//         get: function () { return Math.max(html.clientWidth, html.scrollWidth, body.scrollWidth) }
//     });

//     if (!document.height) Object.defineProperty(document, 'height', {
//         get: function () { return Math.max(html.clientHeight, html.scrollHeight, body.scrollHeight) }
//     });


//     if (!window.scrollY) Object.defineProperty(window, 'scrollY', {
//         get: function () { return html.scrollTop || body.scrollTop }
//     });

//     if (!window.scrollX) Object.defineProperty(window, 'scrollX', {
//         get: function () { return html.scrollLeft || body.scrollLeft }
//     });
// }(this, document.documentElement, document.body));


if (typeof this.ONEAD === 'undefined') {
    var ONEAD = {}; // for jshint
}


// prevent, IE
if (!window.console) {
    var noop = function () { }; // no-op function
    window.console = {
        log: noop,
        warn: noop,
        error: noop
    };
}





// end of isip_function.js








/* START_OF_ISIP_JS */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Query Ad from Onevision





//給媒體調用的函式
//關閉廣告 api
/**
//03/25 ver.  媒體用法
try {
    setTimeout(() => {
        ONEAD_closeAd("mobile-incover")
    }, 1000);
} catch (e) {}
*/

//目前使用: MIC 系列
if (typeof window.ONEAD_closeAd !== 'function') {
    window.ONEAD_closeAd = function (playMode) {
        if (window.ONEADs !== undefined) {
            for (var index = 0; index < window.ONEADs.length; index++) {
                var tempOneadObj = window.ONEADs[index];
                if (playMode === tempOneadObj.play_mode) {
                    var otherLayouts = document.getElementById('onead-layout' + tempOneadObj.isip_index);
                    if (otherLayouts) {
                        otherLayouts.remove();
                    }

                }

            }
        }

    };
}

if (window.ONEAD_checkIsCompatible === undefined) {
    window.ONEAD_checkIsCompatible = function () {

        //FRON-468 hotfix 濾掉 Flipboard app
        if (navigator.userAgent.toLowerCase().indexOf("flipboard") > -1 || navigator.userAgent.toLowerCase().indexOf('baiduspider') > -1) {
            return false;
        }

        var is_iphone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
        var is_ipad = navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
        var is_ipod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1;


        var is_ios = false;

        //@Shuu 共用block function 移到程式最上面
        var blockPlaymode = function (playMode) {
            if (ONEAD.response_freq_multiple !== undefined && ONEAD.response_freq_multiple[playMode] !== undefined) {
                ONEAD.response_freq_multiple[playMode] = '';
                ONEAD.dedicated_pid = 0;
            }
        };

        //@zone FRON-142 版本比對函式
        var versionCompare = function (v1, v2, splitSign, options) {
            function isValidPart(x) {
                return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
            }

            var lexicographical = options && options.lexicographical;
            var zeroExtend = options && options.zeroExtend;

            var v1parts = v1.split(splitSign);
            var v2parts = v2.split(splitSign);

            if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
                return NaN;
            }

            if (zeroExtend) {
                while (v1parts.length < v2parts.length) {
                    v1parts.push("0");
                }

                while (v2parts.length < v1parts.length) {
                    v2parts.push("0");
                }
            }

            if (!lexicographical) {
                v1parts = v1parts.map(Number);
                v2parts = v2parts.map(Number);
            }

            for (var i = 0; i < v1parts.length; ++i) {
                if (v2parts.length === i) {
                    return 1;
                }

                if (v1parts[i] === v2parts[i]) {
                    continue;
                }
                else if (v1parts[i] > v2parts[i]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }

            if (v1parts.length !== v2parts.length) {
                return -1;
            }

            return 0;
        };

        //@zone FRON-142 抓到版本字串進行比較
        var isAboveBaseVersion = function (param) {
            var regularEx = param.regularEx;
            var user_agent = param.user_agent;
            var firstStr = param.firstStr;
            var splitStr = param.splitStr;
            var baseVersionStr = param.baseVersionStr;
            var options = param.options || { extendZero: true };

            regularEx.exec(user_agent);
            var last = regularEx.lastIndex;
            var first = user_agent.indexOf(firstStr);
            var len = last - first - firstStr.length;
            var currentIOSVersionStr = user_agent.substr(first + firstStr.length, len);
            return (versionCompare(currentIOSVersionStr, baseVersionStr, splitStr, options) >= 0);
        };

        // filter ios crash issue
        if (is_ipod || is_ipad || is_iphone) {
            is_ios = true;
        }
        var is_explorer = navigator.userAgent.indexOf('Trident') > -1;
        if (is_explorer) {
            return false;
        }
        // var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        var is_safari = window.ONEAD_is_safari();
        // var is_Opera = navigator.userAgent.indexOf("Presto") > -1;

        var user_agent = navigator.userAgent.toLowerCase();
        var is_windows = navigator.platform.toLowerCase().indexOf("win") > -1;
        var is_android = user_agent.indexOf("android") > -1;
        var is_blackberry = user_agent.indexOf("blackberry") > -1;
        var is_chrome = user_agent.indexOf("chrome") > -1;
        var is_fb = user_agent.indexOf("fb_iab") > -1 || user_agent.indexOf("fbav") > -1 || user_agent.indexOf("fbios") > -1 || user_agent.indexOf("fbsv") > -1;
        var is_line = user_agent.indexOf("line") > -1;
        var is_ios_chrome = (user_agent.indexOf('crios') > -1);
        var is_xiaomi = user_agent.indexOf("xiaomi") > -1 || user_agent.indexOf("mi ") > -1 || user_agent.indexOf("redmi") > -1;

        //FRON-2042 IC,MIC block Chrome browser
        switch (ONEAD.uid) {
            case "1000018":
            case "1000054":
            case "1000056":
            case "1000076":
            //case "1000081"://FRON-2066
            case "1000089":
            // case "1000107":
            case "1000115":
            case "1000199": //pb+運動專欄 new
                if (is_chrome || is_ios_chrome) {
                    if (!is_fb || !is_line) {
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.IC);
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                    }
                }
                break;
            default:
                break;
        }

        var is_instream = false;
        var is_IE6 = navigator.appVersion.indexOf('MSIE 6') > 0;

        try {
            if (parent !== undefined && parent.ONEAD !== undefined) {
                if (parent.ONEAD.display_type !== undefined && parent.ONEAD.display_wrapper !== undefined) {
                    if (parent.ONEAD.display_type === 'instream') {
                        is_instream = true;
                    }
                }
            }
        } catch (err) { }



        if (is_android) {

            ONEAD.device = {
                mobile: true,
                platform: 'android',
                platform_version: user_agent.match(/android\s([\d\.]+)/)[1],
            };

            // debugger;
            // FRON-2766 手機全格式 封小米, 紅米
            if (is_xiaomi) {
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIT);
            }

            // if not webkit and version lower than android 4.0
            if (user_agent.indexOf('applewebkit') === -1 || parseFloat(ONEAD.device.platform_version) < 4) {
                return false;
            }
            //@Shuu FRON-123 MIC 鎖 android 4.1
            if (parseFloat(ONEAD.device.platform_version) < 4.2) {
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
            }

            //@zone FRON-181 有用 system webview chrome/56.0.2924.87 這個版本的都先封鎖 MIR
            var platform_version = parseFloat(ONEAD.device.platform_version);
            var use_system_webview = user_agent.indexOf(" wv") > -1;
            if (platform_version >= 5.0 && platform_version < 8.0) {
                if (use_system_webview) {
                    if (user_agent.indexOf("chrome/56.0.2924.87") > -1) {
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                    }
                }
            }

            var black_list = {
                android: [
                    { device_name: 'SM-T235Y', chrome_version: '>=40' }
                    // { device_name : 'SM-T235Y' }
                ]
            };

            var operators = {
                '<=': function (a, b) {
                    return a <= b;
                },
                '<': function (a, b) {
                    return a < b;
                },
                '>=': function (a, b) {
                    return a >= b;
                },
                '>': function (a, b) {
                    return a > b;
                },
            };

            var chrome_version;
            (function () {
                var match = user_agent.match(/chrome\/([\d+\.]+)/);
                if (match) {
                    chrome_version = match[1];
                }
            })();

            var in_list = false;

            black_list.android.forEach(function (v) {
                // find the device name in black list
                if (user_agent.indexOf(v.device_name.toLowerCase()) > -1) {

                    if (typeof v.chrome_version === 'string' && typeof chrome_version !== 'undefined') {
                        // match 1 is operator , match 2 is chrome version
                        var match = v.chrome_version.match(/(\D*)(\d*)/);
                        in_list = operators[match[1]](chrome_version, match[2]);
                        return;
                    } else {
                        in_list = true;
                        return;
                    }
                }
            });

            return !in_list;
        }

        // if (device === "iphone" || device === "ipad" || device === "ipod" || is_Android || is_IE6 || (is_safari && is_windows)) {
        // not support android version less than 4
        // not support all Black Berry
        // TODO safari in windows is supported, or not ? use 1st-party cookie ?

        //@Zone FRON-74 ipad 影片播放有問題, 先封版
        if (is_IE6 || (is_safari && is_windows) || is_blackberry) {
            //

            // maybe windows chrome using ios user agent simulation
            if (is_ios === false) {
                return false;
            }
        }
        var is_wechat = /micromessenger/.test(navigator.userAgent.toLowerCase());
        //FRON-81 hotfix Chrome 只檔 iOS 10.0.x 的版本, 其餘依舊
        if (is_iphone || is_ipad) {

            var is_ios_8 = (user_agent.indexOf('os 8') > -1);
            var is_IOS_10 = (user_agent.indexOf('os 10') > -1);
            var is_IOS_10_0 = (user_agent.indexOf('os 10_0') > -1);
            var is_IOS_10_1 = (user_agent.indexOf('10_1') > -1);
            var is_IOS_10_2 = (user_agent.indexOf('10_2') > -1);
            // var is_IOS_13_1 = (user_agent.indexOf('13_1') > -1);

            var is_webkit_line = (user_agent.indexOf('line') > -1);
            var is_firefox = (user_agent.indexOf('fxios') > -1);
            //@shuu FRON-884 block wechat all ad format
            //FRON-2189
            // if (is_IOS_13_1 && is_fb) {
            //     blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
            //     blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
            //     blockPlaymode(ONEAD_CONST.PLAY_MODE.MIT);
            // }
            if (is_wechat) {
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIT);
            }
            if (is_ipad) {
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
            }
            if (is_ios_8) {
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIF);
                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
            }
            if (is_IOS_10) {
                //@shuu block ios 10.1, 10.2 all ad format
                if (is_IOS_10_1 || is_IOS_10_2) {
                    blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                    blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                    blockPlaymode(ONEAD_CONST.PLAY_MODE.MIT);
                } else {
                    if (is_ios_chrome && is_IOS_10_0) {
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                    } else if (is_firefox) {
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                        blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                    } else if (is_webkit_line) {
                        if (is_IOS_10_0) {
                            blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                            blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                        } else {
                            //FRON-83 hotfix iOS 10.1.1 + Line 6.8.0 版本解鎖
                            //FRON-113 hotfix Line 6.8.0 以上解鎖
                            //FRON-142 hotfix iOS 10.1.1以上 + Line 6.8.0 以上解鎖
                            var is_IOS_above_10_1_1 = isAboveBaseVersion({
                                user_agent: user_agent,
                                regularEx: /iphone\sos\s\w+/g,
                                firstStr: 'iphone os ',
                                splitStr: '_',
                                baseVersionStr: '10_1_1'
                            });

                            var is_Line_above_6_8_0 = isAboveBaseVersion({
                                user_agent: user_agent,
                                regularEx: /line\/[0-9]+\.[0-9]+\.[0-9]+/g,
                                firstStr: 'line/',
                                splitStr: '.',
                                baseVersionStr: '6.8.0'
                            });

                            if (is_IOS_above_10_1_1 && is_Line_above_6_8_0) {
                                //
                            } else {
                                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIR);
                                blockPlaymode(ONEAD_CONST.PLAY_MODE.MIC);
                            }
                        }
                    }
                }
            }
        }

        return true;
    };
}

if (window.ONEAD_is_ios === undefined) {
    window.ONEAD_is_ios = function () {
        var is_iphone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
        var is_ipad = navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
        var is_ipod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1;
        var is_ios = (is_iphone || is_ipod || is_ipad);
        return is_ios;
    };
    window.ONEAD_is_fb = function () {
        var is_fb = false;
        var user_agent = navigator.userAgent.toLowerCase();
        if (user_agent.indexOf("fb_iab") > -1 || user_agent.indexOf("fbav") > -1 || user_agent.indexOf("fbios") > -1 || user_agent.indexOf("fbsv") > -1) {
            return is_fb = true;
        }

    };
    window.ONEAD_is_chrome = function () {
        var is_chrome = false;
        var user_agent = navigator.userAgent.toLowerCase();
        if (user_agent.indexOf("crios") > -1) {
            return is_chrome = true;
        }

    };
    window.ONEAD_is_ios14 = function () {
        var is_ios14 = false;
        if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1 && navigator.userAgent.toLowerCase().indexOf("14_0") > -1) {
            return is_ios14 = true;
        } else {
            return is_ios14;
        }
    };

    window.iOSversion = function () {
        var vear;
        if (navigator.appVersion) {
            vear = navigator.appVersion;
        } else {
            vear = navigator.platform;
        }

        if (/iP(hone|od|ad)/.test(vear)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    };
}

if (window.ONEAD_is_mobile === undefined) {
    window.ONEAD_is_mobile = function () {


        var is_iphone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
        var is_ipad = navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
        var is_ipod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1;

        var is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;

        // check is mobile
        var is_mobile = false;

        if (is_iphone || is_ipod || is_ipad || is_android) {
            is_mobile = true;
        }

        // if debug, set ONEAD.debug_mobile = true
        if (ONEAD.debug_mobile !== undefined && ONEAD.debug_mobile === true) {
            is_mobile = true;
        }

        return is_mobile;
    };
}

if (ONEAD.cookie_sync === undefined) {
    ONEAD.cookie_sync = function () {
        //FRON-2160
        if (ONEAD.uid === "1000016") {
            return;
        }
        //@sam FRON-2119
        var cookieSyncTTD = function () {
            var _ttd_pid = "r1jlltl";
            var _ttd_tpi = "1";
            var _img = new Image();
            _img.src = "https://match.adsrvr.org/track/cmf/generic?ttd_pid=" + _ttd_pid + "&ttd_tpi=" + _ttd_tpi;
        };
        var cookieSyncSpotX = function () {
            // (new Image()).src = "https://sync.search.spotxchange.com/partner?source=172614";
            //FRON-2163
            window["spotxDataLayer"] = [{
                source: "172614",
                sync_limit: 7,
                "gtm.start": new Date().getTime(), event: "gtm.js"
            }];
            var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
            s.src = "https://www.googletagmanager.com/gtm.js?id=GTM-NH3RQL3&l=spotxDataLayer";
            el.parentNode.insertBefore(s, el);

        };
        // var cookieSyncUc = function () {
        //     (new Image()).src = "https://sync.aralego.com/idsync?src=oneAd";
        // };
        //FRON-2319
        var cookieNielsen = function () {
            (new Image()).src = "https://loadus.exelator.com/load/?p=1385&g=1&j=0";
        };
        //FRON-2379
        var cookieVerizon = function () {
            (new Image()).src = "https://cms.analytics.yahoo.com/cms?partner_id=OneDATA";
        };
        //FRON-2584
        var cookieLotame = function () {
            (new Image()).src = "https://bcp.crwdcntrl.net/map/c=15135/tp=ONEA/?https://onead.onevision.com.tw/v2/pixel/ltm?id=${profile_id}";
        };
        cookieVerizon();
        cookieNielsen();
        cookieSyncTTD();
        cookieLotame();
        cookieSyncSpotX();
        // cookieSyncUc();
    };

}

if (typeof ONEAD.ONEAD_str_repeat !== 'function') {
    ONEAD.ONEAD_str_repeat = function (i, m) {
        for (var o = []; m > 0; o[--m] = i) { }
        return o.join('');
    };
}

if (typeof ONEAD.ONEAD_is_above !== 'function') {
    ONEAD.ONEAD_is_above = function (_threshold) {


        if (ONEAD.play_mode === 'incover') {
            return false;
        }

        try {
            var threshold = (_threshold === undefined || _threshold < 0) ? ONEAD.slot_limit.height / 2 : _threshold;
            var obj = document.getElementById(ONEAD.wrapper);
            var scrollTop = ONEAD.ONEAD_scrollTop(); // (typeof(window.pageYOffset) == 'number') ? window.pageYOffset : document.body.scrollTop;
            if (scrollTop > (ONEAD.ONEAD_offsetTop(obj) + threshold)) {
                return true;
            }
        } catch (e) { }

        return false;
    };
    window.ONEAD_is_above = ONEAD.ONEAD_is_above;
}



// checkCookie
if (typeof window.ONEAD_checkCookie !== 'function') {
    window.ONEAD_checkCookie = function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
            document.cookie = "onevision_testcookie";
            cookieEnabled = (document.cookie.indexOf("onevision_testcookie") !== -1) ? true : false;
        }
        return cookieEnabled;
    };
}


if (ONEAD.ONEAD_stringify === undefined) {
    ONEAD.ONEAD_stringify = function (obj) {
        // var self = arguments.callee;
        var self = ONEAD.ONEAD_stringify;
        try {
            if (window.JSON) {
                return JSON.stringify(obj);
            }
            var t = typeof (obj);
            if (t !== "object" || obj === null) {
                // simple data type
                if (t === "string") {
                    obj = '"' + obj + '"';
                }
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor === Array);

                // fix. avoid arguments.callee
                // var self = arguments.callee;

                for (n in obj) {
                    v = obj[n];
                    t = typeof (v);
                    if (obj.hasOwnProperty(n)) {
                        if (t === "string") {
                            v = '"' + v + '"';
                        } else if (t === "object" && v !== null) {
                            // v = jQuery.stringify(v);
                            v = self(v);
                        }
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        } catch (e) {
            return "";
        }
    };
}

if (window.ONEAD_is_safari === undefined) {
    window.ONEAD_is_safari = function () {
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var is_safari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;

        if ((is_chrome) && (is_safari)) {
            is_safari = false;
        }
        return is_safari;
    };
}



// for firefox
if (ONEAD.ONEAD_setfocus === undefined) {
    ONEAD.ONEAD_setfocus = function (index) {

        var tag_array, i, len;

        //@Vic FRON-1000 IR 不使用 setfocus
        if (ONEAD.play_mode === ONEAD_CONST.PLAY_MODE.IR && ONEAD.vastResult && ONEAD.vastResult.hasVPAIDAd) {
            return;
        }
        // #onead_active
        try {
            tag_array = window.document.getElementsByTagName("a");
            for (i = 0, len = tag_array.length; i < len; i++) {
                if (tag_array[i].localName === 'a' && tag_array[i].href.indexOf('#onead_active' + index) !== -1) {
                    tag_array[i].focus();
                    return;
                }
            }
        } catch (e) { }

        // #onead
        try {
            tag_array = window.document.getElementsByTagName("a");
            for (i = 0, len = tag_array.length; i < len; i++) {
                if (tag_array[i].localName === 'a' && tag_array[i].href.indexOf('#onead') !== -1) {
                    tag_array[i].focus();
                    return;
                }
            }
        } catch (e) { }
    };
    window.ONEAD_setfocus = ONEAD.ONEAD_setfocus;
}


if (window.ONEAD_css === undefined) {
    ONEAD.ONEAD_css = function (id, doc, css) {
        var upper_case = function (v, a) {
            return a.toUpperCase();
        };
        if (typeof doc !== 'undefined' && typeof doc.getElementById(id) !== 'undefined') {
            for (var key in css) {
                var property = key.replace(/-([a-z])/g, upper_case);

                var attr = doc.getElementById(id).getAttribute('style');
                if (attr == null) {
                    attr = '';
                }

                if (property === 'top' || property === 'left') {

                    var attrs = attr.split(';');
                    var new_attr = '';
                    // IE8, attribute is all uppercase
                    for (var i = 0; i < attrs.length; i++) {
                        if (attrs[i].toLowerCase().indexOf(property + ':') < 0) {
                            new_attr += attrs[i] + ';';
                        }
                    }
                    // console.log(id + ' set ' + property + ':' + css[key] + ';' + new_attr);
                    doc.getElementById(id).setAttribute('style', property + ':' + css[key] + ';' + new_attr);

                } else {
                    // console.log('doc.getElementById("' + id +'").style.' + property + '="' + css[key] + '";');
                    eval('doc.getElementById("' + id + '").style.' + property + '="' + css[key] + '";');
                }


            }
        } else {
            // console.log('ONEAD_css, doc/id is undefined');
        }
    };
}

//@zone FRON-277 降低動畫更新頻率, 從 1 豪秒降低到 30 豪秒(約 30 fps)

if (ONEAD.ONEAD_slide === undefined) {
    ONEAD.ONEAD_slide = function (slider, show, callback) {

        //
        // DON'T use style.top and style.left
        //

        if (!slider) {
            return;
        }

        var minheight = 0;
        var maxheight = parseInt(slider.style.height, 10);
        var time = 600;
        var timer = null;
        var toggled = !show;

        if (show) {
            slider.style.height = minheight + 'px';
            slider.style.display = 'block';
        }

        clearInterval(timer);
        var instanceheight = parseInt(slider.style.height, 10);
        var init = (new Date()).getTime();
        var height = (toggled = !toggled) ? maxheight : minheight;
        // var height = maxheight;
        var disp = height - parseInt(slider.style.height, 10);

        timer = setInterval(function () {
            var instance = (new Date()).getTime() - init;
            if (instance < time) {
                var pos = Math.floor(disp * instance / time);
                var result = instanceheight + pos;
                slider.style.height = result + 'px';
                // document.getElementById('log').innerHTML = 'Current Height : <b>' + result + '</b><br /> Current Time : <b>' + instance + '</b>';
            } else {
                slider.style.height = height + 'px'; //safety side ^^
                clearInterval(timer);
                if (typeof callback === 'function') {
                    callback();
                }
                // controler.value = toggled ? ' Slide Up ' :' Slide Down ';
                // document.getElementById('log').innerHTML = 'Current Height : <b>' + height + '</b><br /> Current Time : <b>' + time + '</b>';
            }
        }, 30);
    };
}


/*
** ONEAD_cleanup, called within changeADState
*/
if (ONEAD.ONEAD_cleanup === undefined) {
    ONEAD.ONEAD_cleanup = function (play_mode) {
        //@zone FRON-420 MIR 在 VPAID 的時候, 撥完會被 player 關閉, 但是自由沒有給 ONEAD.wrapper, 會有問題, 在這邊先排除
        //@zone FRON-441 MIF MIC 不需要進入 這邊也可以關閉
        if (ONEAD.play_mode === ONEAD_CONST.PLAY_MODE.MIF || ONEAD.play_mode === ONEAD_CONST.PLAY_MODE.MIC || ONEAD.play_mode === ONEAD_CONST.PLAY_MODE.MIR) {
            return;
        }

        var index = ONEAD.wrapper.split('');
        index = index[index.length - 1];
        // console.log(index);

        //@zone FRON-1022 都不需要執行 setfocus
        // ONEAD.ONEAD_setfocus(index);

        if (typeof play_mode === 'undefined') {
            // default
            play_mode = ONEAD_CONST.PLAY_MODE.IN_STREAM;
        }
        if (play_mode === ONEAD_CONST.PLAY_MODE.IC) {

            if (document.getElementById(ONEAD.wrapper) != null) {
                //FRON-891 將 slot 隱藏
                document.getElementById(ONEAD.wrapper).parentNode.style.display = 'none';
                document.getElementById(ONEAD.wrapper).innerHTML = '';
                document.getElementById(ONEAD.wrapper).parentNode.removeChild(document.getElementById(ONEAD.wrapper));
            }
        } else {

            ONEAD.ONEAD_slide(document.getElementById(ONEAD.wrapper), false, function () {
                //FRON-979 增加 if 判斷，若 tmpWrapper 已為 null 則不再執行 removeChild.
                var tmpWrapper = document.getElementById(ONEAD.wrapper);
                if (tmpWrapper) {
                    tmpWrapper.innerHTML = '';
                    tmpWrapper.parentNode.removeChild(tmpWrapper);
                }
            });
        }
        if (ONEAD.flashInterval !== undefined) {
            clearInterval(ONEAD.flashInterval);
        }
    };
    if (ONEAD.oldMedia !== undefined && ONEAD.oldMedia) {
        parent.ONEAD_cleanup = ONEAD.ONEAD_cleanup;
    }
}





if (ONEAD.ONEAD_offsetTop === undefined) {
    ONEAD.ONEAD_offsetTop = function (obj) {
        // var left = 0;
        var top = 0;

        while (obj !== document.body && obj !== null) {
            // left = obj.offsetLeft;
            top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return top;
    };
}

if (ONEAD.ONEAD_scrollTop === undefined) {
    ONEAD.ONEAD_scrollTop = function () {
        return typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
    };
}

if (ONEAD.ONEAD_innerWidth === undefined) {
    ONEAD.ONEAD_innerWidth = function () {
        return document.documentElement.clientWidth;
    };
}

if (ONEAD.ONEAD_innerHeight === undefined) {
    ONEAD.ONEAD_innerHeight = function () {
        // there is no window.innerHeight in IE8
        if (typeof window.innerHeight === 'undefined') {
            return document.documentElement.clientHeight;
        }
        return window.innerHeight;
    };
}
if (ONEAD.get_cookie === undefined) {
    ONEAD.get_cookie = function (_name, isNeedEncode) {
        var getFromStr = function (__name, _text) {
            if (typeof _text !== "string") {
                return;
            }
            var _nameEQ = __name + "=",
                ca = document.cookie.split(/[;&]/),
                i, c;
            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(_nameEQ) === 0) {
                    return c.substring(_nameEQ.length, c.length);
                }
            }
        };
        // return getFromStr(name, document.cookie);
        var _str = getFromStr(_name, document.cookie);
        if (_str === undefined) {
            return undefined;
        }

        var _tojson = decodeURIComponent(decodeURIComponent(_str));
        //FRON-2443 TVBS 客製化 one_fp value noNeedEncode
        if (_str.charAt(0) === "%" && isNeedEncode === false && isNeedEncode !== undefined) {
            var noNeedEncodeParams = _tojson.substring(1, _tojson.length - 1);
            ONEAD.set_cookie('one_fp', noNeedEncodeParams, false);
        }

        if (/^[\],:{}\s]*$/.test(_tojson.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            //the json is ok
            var _obj = "";
            try {
                _obj = JSON.parse(_tojson);
            } catch (error) {
                //the json is not ok
                // console.error("cookie error")
            }
            if (_obj.oid === "") {
                return undefined;
            }
            return _obj;
        } else {

            //the json is not ok
            return undefined;
        }
    };
}
if (ONEAD.set_cookie === undefined) {
    ONEAD.set_cookie = function (_name, _params, isNeedEncode) {
        if (_params !== undefined) {
            _params.v = ONEAD_CONST.ONEAD_1ST_COOKIE.vision;
            var _now = new Date();
            var _time = _now.getTime();
            var _expireTime = _time + 365 * 86400000;
            _now.setTime(_expireTime);
            var _value;
            // isNeedEnode 防呆, 一般情況都需 encode
            if (isNeedEncode || isNeedEncode === undefined) {
                _value = encodeURIComponent(encodeURIComponent(JSON.stringify(_params)));
            } else {
                _value = _params;
            }
            // expire the cookie first
            document.cookie = _name + "=" + _value + ";samesite=none;secure;expires=" + _now.toGMTString() + ";path=/";
        }
    };

}

if (ONEAD.ONEAD_adQuery === undefined) {
    ONEAD.ONEAD_adQuery = function (_params) {
        if (ONEAD.ad_queryed) {
            return;
        }
        ONEAD.ad_queryed = true;
        var _s = ONEAD.external_url + 'external.php?' + ONEAD.to_param(_params);
        ONEAD.appned_tag(_s);

    };
}
if (ONEAD.appned_tag === undefined) {
    ONEAD.appned_tag = function (_params) {
        var s = document.createElement('script');
        // s.type = 'text/javascript';
        s.src = _params;
        s.async = true;

        //@zone FRON-1133
        var node;
        switch (ONEAD.uid) {
            case "1000055":
                node = document.getElementsByTagName('body')[0];
                break;
            default:
                node = document.getElementsByTagName('script')[0];
                break;
        }

        if (node) {
            node.parentNode.insertBefore(s, node);
        } else {
            //console.log('ONEAD: no <script> tag');
        }
    };
}

if (ONEAD.paramToString === undefined) {
    ONEAD.paramToString = function (obj) {
        var r20 = /%20/g;
        var s = [];
        if (obj.length === undefined) {
            var name;
            for (name in obj) {
                if (obj[name].constructor === Array) {
                    // array
                    // console.log('obj[name].length:' + obj[name].length);
                    for (var i = 0; i < obj[name].length; i++) {
                        var tmp = obj[name][i];
                        // console.log("tmp:",tmp);
                        var v = tmp;
                        if (isNaN(v)) {
                            v = encodeURIComponent(tmp);
                        }
                        s[s.length] = encodeURIComponent(name + "[]") + "=" + v;
                    }
                } else {
                    s[s.length] = encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]);
                }
            }
        }
        return s.join("&").replace(r20, "+");
    };

}
//FRON-990
//FRON-1193
if (ONEAD.oid_call === undefined) {
    ONEAD.oid_call = function (_params) {

        var _cookieValue = {
            "oid": _params.guid, //FRON-2560
            "ts": _params.ts || new Date().getTime(),
        };
        //ONEAD.replace_cookie("oid"); // 為了不洗掉先前的 cookie value, 用 replace 的方式，將 json 的資料轉成 encode
        var _1stCookie = ONEAD.get_cookie('oid');
        if (!_1stCookie) {// 1st cookie 不存在，就直接寫入
            ONEAD.set_cookie('oid', _cookieValue);
        } else if (_cookieValue.ts > 0 && _cookieValue.ts < _1stCookie.ts) {//如果存在，就比 ts 看誰舊
            ONEAD.set_cookie('oid', _cookieValue);
        }
        if (_params.dnt === 0) {
            if (_1stCookie) {
                ONEAD.request.guid = _1stCookie.oid;
            } else {
                ONEAD.request.guid = _params.guid;
            }
        } else {
            ONEAD.request.guid = ONEAD_CONST.ETAG_SERVICE.FP;
        }
        ONEAD.ONEAD_adQuery(ONEAD.request);
    };

}
//@zone FRON-1173 VAST tag 有影片和 VPAID 的混合型判斷邏輯
var checkIfUseVpaid = function (_vastResult) {
    var _result = false;

    if (_vastResult) {
        //@zone FRON-1173 因為 player 還沒有完全依賴 dataCenter, 還是抓 vastResult.hasVPAIDAd 來判斷
        _result = _vastResult.hasVPAIDAd;
        _vastResult.useVpaidCheckedByIsip = _result;
    }
    return _result;
};
/*
if (typeof ONEAD.ONEAD_sprintf !== 'function') {
    ONEAD.ONEAD_sprintf = function () {
        var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
        while (f) {
            if (m = /^[^\x25]+/.exec(f)) {
                o.push(m[0]);
            }
            else if (m = /^\x25{2}/.exec(f)) {
                o.push('%');
            }
            else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
                if (((a = arguments[m[1] || i++]) == null) || (a === undefined)) {
                    throw ('Too few arguments.');
                }
                if (/[^s]/.test(m[7]) && (typeof (a) !== 'number')) {
                    throw ('Expecting number but found ' + typeof (a));
                }
                switch (m[7]) {
                    case 'b': a = a.toString(2); break;
                    case 'c': a = String.fromCharCode(a); break;
                    case 'd': a = parseInt(a); break;
                    case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                    case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                    case 'o': a = a.toString(8); break;
                    case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                    case 'u': a = Math.abs(a); break;
                    case 'x': a = a.toString(16); break;
                    case 'X': a = a.toString(16).toUpperCase(); break;
                }
                a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
                c = m[3] ? m[3] === '0' ? '0' : m[3].charAt(1) : ' ';
                x = m[5] - String(a).length - s.length;
                p = m[5] ? ONEAD.ONEAD_str_repeat(c, x) : '';
                o.push(s + (m[4] ? a + p : p + a));
            }
            else {
                throw ('Huh ?!');
            }
            f = f.substring(m[0].length);
        }
        return o.join('');
    };
}
*/
// if (typeof ONEAD.ONEAD_trim !== 'function') {
//     ONEAD.ONEAD_trim = function (str) {
//         str = str.replace(/^\s\s*/, '');
//         var ws = /\s/,
//             i = str.length;
//         while (ws.test(str.charAt(--i))) { }
//         return str.slice(0, i + 1);
//     };
// }


//@zone FRON-243 Array.isArray polyfill
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

// publisher can overwrite this function by their js
if (window.ONEAD_get_response === undefined) {
    window.ONEAD_get_response = [];
}
//FRON-903
//callback 無法判斷目前的 index

window.ONEAD_etag_cscb = function (_params) {
    var _element;
    while (_element = ONEAD_PIXEL_ISIP.cscb_ary.shift()) {
        _element(_params);
    }
};

//@zone FRON-95 輸出 log
/*
function log2(msg){
    console.log('[' + (+(new Date()))+  '][get_response] ' + msg);
}
*/

//@zone FRON-155 加上顏色的 LOG
/*
function colorLog(msg, color){
    color = color || 'yellow';
    console.log('%c'+'[' + (+(new Date()))+'][get_response] ' + msg, 'color:' + color);
}
*/

//@zone FRON-95 判斷 vastResult 內容是否為空再呼叫 callback
// 因為對於 空白以及錯誤的處理方式, RON 與非 RON 可能會有不同, 這邊傳入 error first 的 callback 增加使用上的彈性
var getVastParseResult = function (vastUrl, param, callbackAfterCheckVastResponse, sourceUrl) {
    //log2('getVastParseResult');
    var vastObj = new ONEAD.ONEAD_VAST();

    //@zone FRON-155 因為查詢 VAST 需要額外的參數( 目前有 SpotX)
    vastObj.data.extend({
        width: param.width,
        height: param.height
    });

    //@zone FRON-1223 檢查有哪些來源需要在送 report 時帶 cookie 出去
    if (sourceUrl) {
        (function () {
            var sendReportWithCookieSources = [
                "aralego.com",
            ];
            var sendReportWithCookie = sendReportWithCookieSources.some(function (el) {
                return sourceUrl.indexOf(el) > -1;
            });
            vastObj.util.sendReportWithCookie(sendReportWithCookie);
        })();
    }

    //colorLog('request VAST response [' + vastUrl + ']');
    vastObj.client.askForVastResponse({ vast_url: vastUrl, asset_url: window.location.href },
        function (error, result) {
            ////log2('got Vast Result');
            //colorLog(' got VAST response [' + vastUrl + ']');
            if (error) {
                callbackAfterCheckVastResponse(error);
            } else {
                //@zone FRON-523 空內容的情形, vast-client 會判定為 error
                callbackAfterCheckVastResponse(null, result);
            }
        }
    );
};

//@zone FRON-194 REPORTING 用物件, scope 在 isip 中都可以讀到, 後續就不使用傳參數的方式處理
var reporting = {};

//@zone FRON-194 新增事件 1-6
//@zone FRON-205 新增事件 7
/** 事件種類
 --------使用者點擊 UI ------
 略過廣告點擊 skip
 開聲音 unmute
 靜音 mute
 再看一次 replay
 了解更多 more
 MIR vertical 展開 expand
 create view
 --------- 廣告階段事件 取代 warroom 事件--------
 click
 impression
 2s view
 5s view
 30s view
 4 階 : Q0 Q25 Q50 Q75 Q100
 */
//FIXME: @Zone 事件名稱代號有待確認 這邊我先寫自己的定義
reporting.events = {
    UI_SKIP: 'skip',
    UI_UNMUTE: 'unmute',
    UI_MUTE: 'mute',
    UI_REPLAY: 'replay',
    UI_MORE: 'more',
    UI_VERTICAL_EXPAND: 'expand',
    CREATE_VIEW: 'cv',
    VIDEO_CLICK: 'videoClick',
    BANNER_CLICK: 'bannerClick',
    IMPRESSION: 'impression',
    VIEW_2S: 'view2s',
    VIEW_5S: 'view5s',
    VIEW_30S: 'view30s',
    Q0: 'q0',
    Q25: 'q25',
    Q50: 'q50',
    Q75: 'q75',
    Q100: 'q100'
};

//@zone FRON-194 把送事件的函式拆出來放在 reporting 物件底下
//@zone FRON-161 把送事件的部分集中成一個函式
reporting.sendHttpRequestToServer = function (url, errorCallback) {
    if (url !== undefined && url !== '' && url.indexOf('http') > -1) {
        var img = new Image();
        img.src = url;
    } else {
        if (errorCallback && typeof errorCallback === 'function') {
            errorCallback();
        }
    }
};

//@zone FRON-194 新增送事件函式, 預設為非 vast 模式; 避免查廣告沒有給 trackUrl 等參數,  這邊先做防呆
reporting.sendTrackingEvent = function (eventType) {
    var url;
    try {
        url = this.trackUrl.replace('[EVENT]', eventType);
        this.sendHttpRequestToServer(url);
    } catch (e) {
        //console.log(' no tracking url');
    }
};

//@zone FRON-95 存放 RON 流程相關變數：
//  1. vast 查詢回來解析之後的結果陣列 2. 目前是否已經拿到可以播放的 vast reesponse 3.目前優先等級最高的 index (預設為 0 ) 5. 記錄是否超過設定的 timeout 時間
var ronProcessState = {
    vastResultArr: [],
    getUsableVastResponse: false,
    highestPriorityIndex: 0,
    countdownTimeout: undefined,
    alreadyTimeout: false,
    alreadyStartPlayingAd: false
};

//@zone FRON-95 為了 VAST 這種非同步的情形, 將流程先在這邊暫停, 傳入物件{param, vastResult, vastResultError}
var continueGetResponseProcess = function (data) {
    //log2('continueGetResponseProcess, param=' + data.param);
    var param = data.param;

    //@zone FRON-194 相關資料邏輯寫在 reporting 物件當中, 以免後續處理不知道要到那邊拿資料
    if (!!param) {
        //@zone ARE-61 vast 和 direct speed 的區別
        if (param.is_vast !== undefined && param.is_vast === 'true') {
            //is_vast = true;
            param.trackUrl = reporting.vastTrackUrl;
        } else {
            //is_vast = false;
            param.trackUrl = param.tracking;
        }
    }

    //@zone 把 VAST 存起來給後面流程用
    if (data.vastResult !== undefined) {
        //@zone FRON-920 傳入 vastResult 到 param 當中
        param.vastResult = data.vastResult;
        ONEAD.vastResult = data.vastResult;
        //@zone FRON-523 因為 vastTrackerCenter 種類增加, 改批次處理
        //@zone FRON-165 在這邊先更新 MARCO 資料, 之後 MARCO 就可以處理得少一些
        ONEAD.vastResult.util.initURLTemplatesOfVastTrackerCenter(data.vastResult);
        //@zone FRON-798 執行 Survey
        ONEAD.vastResult.executeAllSurvey();
    }

    // debugger;
    if (param !== null) {
        if (ONEAD.exclude) {
            param.exclude = ONEAD.exclude;
        }
        ONEAD.AD_PARAM = param;

        var overwriteToMIRILayout = function () {
            param.play_mode = ONEAD_CONST.PLAY_MODE.MIR;
            param.player_type = ONEAD_CONST.PLAYER_TYPE.INSTANT;
        };
        var overwriteToIPLayout = function () {
            param.play_mode = ONEAD_CONST.PLAY_MODE.IN_STREAM;//In-Page
            param.player_type = ONEAD_CONST.PLAYER_TYPE.IS_DF;
        };
        var overwriteToIRPlusLayout = function () {
            param.play_mode = ONEAD_CONST.PLAY_MODE.IR;//In-Read
            param.player_type = ONEAD_CONST.PLAYER_TYPE.IS_FOLLOW_DF;
        };

        switch (param.play_mode) {
            case ONEAD_CONST.PLAY_MODE.IAB_VAST:
                //@zone FRON-1040 iab-vast 根據環境調整參數給 preview 頁使用
                if (window.ONEAD_is_mobile()) {
                    overwriteToMIRILayout();
                } else {
                    overwriteToIPLayout();
                }
                break;
            case ONEAD_CONST.PLAY_MODE.DPR:
                overwriteToIRPlusLayout();
                break;
            case ONEAD_CONST.PLAY_MODE.MPR:
            case ONEAD_CONST.PLAY_MODE.APR:
                overwriteToMIRILayout();
                break;
        }
    }

    // ONEAD_on_get_response, if no pid, out_param is null
    var continue_ad = true;
    try {
        // var stop_ad = false;
        // console.log('%ccall ONEAD_on_get_response', 'font-size:2em; color: #FF0000;');
        if (typeof ONEAD.isDfpMode !== undefined && ONEAD.isDfpMode) {
            if (window.ONEAD_on_get_response[ONEAD.isip_index] !== undefined && typeof window.ONEAD_on_get_response[ONEAD.isip_index] === 'function') {
                continue_ad = window.ONEAD_on_get_response[ONEAD.isip_index](param);
            } else if (parent.ONEAD_on_get_response[ONEAD.isip_index] !== undefined && typeof parent.ONEAD_on_get_response[ONEAD.isip_index] === 'function') {
                continue_ad = parent.ONEAD_on_get_response[ONEAD.isip_index](param);
            }
        } else {

            if (window.ONEAD_on_get_response !== undefined && typeof window.ONEAD_on_get_response === 'function') {
                continue_ad = window.ONEAD_on_get_response(param);
            } else if (parent.ONEAD_on_get_response !== undefined && typeof parent.ONEAD_on_get_response === 'function') {
                continue_ad = parent.ONEAD_on_get_response(param);
            }
        }

        // debugger;
    } catch (err) {
        // console.log(err);
    }

    if (continue_ad === false) {
        return;
    }

    if (ONEAD.query_only) {
        var commandChecker = function () {
            setTimeout(function () {
                // excute all of cmd
                //@zone FRON-243 修改判斷 Array 的方式
                if (typeof ONEAD.cmd !== 'undefined' && Array.isArray(ONEAD.cmd)) {
                    var fn = false;
                    while ((fn = ONEAD.cmd.shift())) {
                        fn();
                        fn = false;
                    }
                }
                commandChecker();
            }, 500);
        };

        commandChecker();
        return false;

    } else {
        if (window.ONEAD_is_mobile() === true && param !== undefined && param !== null) {
            var timeCounter = -500;
            var playMode = param.play_mode;

            var checkDom = function () {
                timeCounter += 500;

                if (typeof document.getElementById(ONEAD.slot_id[playMode]) === "undefined") {
                    if (timeCounter <= 3000) {
                        setTimeout(checkDom, 500);
                        //console.log("check dom:" + timeCounter);
                    } else {
                        //console.log("wait dom too long , drop");
                    }
                } else {
                    //console.log("get dom, ONEAD_expand_slot");
                    ONEAD.ONEAD_expand_slot();
                }
            };

            var checkSlot = function () {
                //if mic, no need to check slot_id or dom
                if (playMode === "mobile-incover" || playMode === "inflip") {
                    ONEAD.ONEAD_expand_slot();
                    return;
                }

                timeCounter += 500;

                //push cmd earlier and check slot
                //@zone FRON-243 修改判斷 Array 的方式
                if (typeof ONEAD.cmd !== 'undefined' && Array.isArray(ONEAD.cmd)) {
                    var fn = false;
                    while ((fn = ONEAD.cmd.shift())) {
                        fn();
                        fn = false;
                    }
                }

                if (typeof ONEAD.slot_id === "undefined" || typeof ONEAD.slot_id[playMode] === "undefined") {
                    if (timeCounter <= 3000) {
                        setTimeout(checkSlot, 500);
                        //console.log("check slot id:" + timeCounter);
                    } else {
                        //console.log("wait slot too long , drop");
                    }
                } else {
                    //console.log("get slot id, next check whether dom exists");
                    timeCounter -= 500;
                    checkDom();
                }
            };

            checkSlot();
        } else {
            window.ONEAD_is_window_onload = false;
            if (window.ONEAD_is_window_onload === true) {
                // window.alert('on query done');
                ONEAD.ONEAD_expand_slot();
                window.console.log("ONEAD_is_window_onload = true");

            } else {
                setTimeout(function () {
                    ONEAD.ONEAD_expand_slot();
                }, 5000);

                var page_onload = function () {
                    if (ONEAD.query_only !== true && window.ONEAD_is_mobile() === false) {
                        ONEAD.ONEAD_expand_slot();
                    }
                };

                //@zone FRON-936 沒有 parent 的時候, 延遲執行
                (function () {
                    var currentTryCounter = 0;
                    var MAX_TRY_TIMES = 6;
                    var checkParentDocumentReadyStateThenExpandSlot = function () {
                        if (parent && parent.document) {
                            switch (parent.document.readyState) {
                                case 'loading':
                                case 'interactive':
                                    try {
                                        if (window.attachEvent) {
                                            parent.window.attachEvent('onload', page_onload);
                                        } else {
                                            parent.window.addEventListener('load', page_onload, false);
                                        }
                                    } catch (e) {

                                    }
                                    break;
                                case 'complete':
                                    ONEAD.ONEAD_expand_slot();
                                    break;

                                default:
                                    ONEAD.ONEAD_expand_slot();
                                    break;
                            }
                        } else {
                            if (++currentTryCounter <= MAX_TRY_TIMES) {
                                setTimeout(checkParentDocumentReadyStateThenExpandSlot, 500);
                            }
                        }
                    };
                    checkParentDocumentReadyStateThenExpandSlot();
                })();
            }
        }
    }
};

//@zone FRON-95 isip 流程結束, 進入媒體端的輪撥流程
//@zone FRON-155 進入輪撥不是呼叫 changeADState

var returnControlToPublish = function () {
    //colorLog('沒有廣告可撥, 控制權還給媒體', 'red');
    continueGetResponseProcess({ param: null });
};

//@zone FRON-95 RoN 排程拿最後可以用的 VAST Result 傳下去或者送出 Error 訊息
var ron_process = function (vastList, timeoutMS, param, ronProcessState) {
    //@zone 簡寫
    // window.console.log(vastList);
    var vastResultArr = ronProcessState.vastResultArr;
    var highestPriorityIndex = ronProcessState.highestPriorityIndex;
    var maxIndex = vastList.length - 1;

    //@zone 用來暫存 VAST 查詢結果的陣列
    vastResultArr = [];

    //@zone 根據 index 選擇 vastResult 來用, 使用前要先確認該 vastResult 可以用
    var useVastResultByIndex = function (index) {
        var dataObj = vastResultArr[index];
        var fetchingImgUrl = vastList[index].fetching;

        //colorLog('拿到可用的 vast 廣告, 準備播放', 'green');

        //@zone FRON-194  送事件方式移到 reporting
        //@zone FRON-161 送 fetching
        reporting.sendHttpRequestToServer(fetchingImgUrl, function () {
            if (vastList.length === 1) {
                //colorLog('只有一個 vast, 所以沒有送 fetching');
            }
        });

        //@zone FRON-95 之後收到 vastResponse 的時候用來判斷是否需要繼續執行的變數
        ronProcessState.alreadyStartPlayingAd = true;
        dataObj.used = true;

        //@zone FRON-194 把 tracking_url 的資料存在 ONEAD  物件裡面
        reporting.vastTrackUrl = vastList[index].vast_tracking;

        //@zone FRON-875 VAST 影片都統一抓第一個, 不考慮實際使用的尺寸; VPAID 也納入統計
        (function () {
            var vastResult = dataObj.vastResult;
            //@zone FRON-810 VPAID 沒有影片, 先不送
            if (!vastResult.hasVPAIDAd) {
                //================
                //          helper function
                //================
                var extractHostname = function (url) {
                    var hostname;
                    //find & remove protocol (http, ftp, etc.) and get hostname

                    if (url.indexOf("//") > -1) {
                        hostname = url.split('/')[2];
                    }
                    else {
                        hostname = url.split('/')[0];
                    }

                    //find & remove port number
                    hostname = hostname.split(':')[0];
                    //find & remove "?"
                    hostname = hostname.split('?')[0];

                    return hostname;
                };
                var extractRootDomain = function (url) {
                    var domain = extractHostname(url),
                        splitArr = domain.split('.'),
                        arrLen = splitArr.length;

                    //extracting the root domain here
                    //if there is a subdomain
                    if (arrLen > 2) {
                        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
                        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
                        if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
                            //this is using a ccTLD
                            domain = splitArr[arrLen - 3] + '.' + domain;
                        }
                    }
                    return domain;
                };
                //---------------------------------
                var sourceDomain = extractRootDomain(vastList[index].source_url);

                //var vastUrl = /\/{2}(\S+)&guid/g.exec(vastResult.vastUrl)[1];

                var videoUrl = "";
                try {
                    videoUrl = dataObj.vastResult.video_src[0][0][0].fileURL;
                    videoUrl = videoUrl.split('//')[1];
                } catch (e) {
                    //@zone FRON-875 only Banner 的情形
                }

                //@zone FRON-907 沒有影片資料的時候不做紀錄
                if (videoUrl !== "") {
                    var now = new Date();
                    var timeStr = [now.getFullYear(), "/", (now.getMonth() + 1), "/", now.getDate()].join('');
                    videoUrl += "," + (window.ONEAD_is_mobile() ? 'm' : 'd') + "," + timeStr;

                    var errorCode = "80001";
                    var errDescJson = {
                        videoUrl: videoUrl
                    };

                    if (param.tracking) {
                        (new Image()).src = param.tracking
                            .replace("[EVENT]", "error")
                            .replace("[ERRORCODE]", errorCode)
                            .replace("[ERRORMSG]", errorCode + " DATA COLLECT (VAST) from " + sourceDomain)
                            .replace("[ERRORDESC]", encodeURIComponent(JSON.stringify(errDescJson)))
                            .replace("[CLICKLABEL]", "")
                            .replace("[ENG]", "");
                    }
                }
            }
        })();

        continueGetResponseProcess({ param: param, vastResult: dataObj.vastResult });
    };

    //@zone FRON-95 RoN 從傳入的 vastResultArr 依序檢查是否有可用的 vastResult
    var getUsableVastIndexFromTop = function (vastResultArr) {
        var i;
        var loopTimes = vastResultArr.length;
        var tmpObj;
        var usableIndex = -1;

        for (i = 0; i < loopTimes; i++) {
            ////log2('index=' + i);
            tmpObj = vastResultArr[i];

            //@zone if already
            if (tmpObj.gotResult === true && tmpObj.used === false) {
                if (tmpObj.isEmpty) {
                    //log2('empty');
                } else if (tmpObj.hasError) {
                    //log2('hasError');
                } else {
                    //log2('get usable result');
                    usableIndex = i;
                    break;
                }
            }
        }
        return usableIndex;
    };

    var callbackWhenRonTimeout = function () {
        //@zone FRON-1035 固定在這個函式清除 timeout
        clearTimeout(ronProcessState.countdownTimeout);
        //var now = +(new Date());
        //colorLog('RON 從開始到 timeout, 共經過 : ' + (now - ron_start_time) + 'ms' );

        var usableVastIndex;
        ronProcessState.alreadyTimeout = true;
        usableVastIndex = getUsableVastIndexFromTop(vastResultArr);
        // 有可以用的 VAST 就接下去執行
        if (usableVastIndex > -1) {
            //colorLog('RON Timeout : 有查到廣告');
            useVastResultByIndex(usableVastIndex);
        } else {
            // 查不到廣告
            //colorLog('RON Timeout： 查不到廣告', 'red');

            //@zone FRON-194 送事件函式移到 reporting 物件底下
            //@zone FRON-161 送出 touching 給 server
            reporting.sendHttpRequestToServer(param.touching, function () {
                if (vastList.length === 1) {
                    //colorLog('只有一個 vast, 所以 server 送 touching, 目前這種情形不算錯誤');
                }
            });
            returnControlToPublish();
        }
    };

    //@zone FRON-95 使用於每次得到 vastResponse 的時候, 檢查該 vastResult 是否為目前最優先的廣告
    var checkIfGotTheHighestPriorityVast = function (index) {
        var dataObj = vastResultArr[index];

        if ((index === highestPriorityIndex)) {
            if (dataObj.gotResult) {
                if (dataObj.usable) {
                    //log2('最優先的 index=' + highestPriorityIndex +', vastResult 可以用, 清除 timeout ,接後續流程');
                    clearTimeout(ronProcessState.countdownTimeout);
                    useVastResultByIndex(index);
                } else {
                    highestPriorityIndex++;
                    if (highestPriorityIndex <= maxIndex) {
                        //log2('最優先的 vastResult 不能用, 調整最優先的 index 為' + highestPriorityIndex + ' 順便檢查一下該 index 的 vastResult 是否可以使用');
                        checkIfGotTheHighestPriorityVast(highestPriorityIndex);
                    } else {
                        //@zone FRON-1035 全部都不能用, 直接提前執行 timeout
                        callbackWhenRonTimeout();
                    }
                }
            } else {
                //log2('還沒有拿到 vastResult ( index = ' + index + ')');
            }
        }
    };

    //@zone 灑出去開始查詢
    vastList.forEach(function (element, index) {
        var tmpObj;
        var vastUrl = element.vast_url;
        tmpObj = {
            used: false,
            gotResult: false
        };
        vastResultArr[index] = tmpObj;

        //@zone FRON-95 防呆：vast_url 為空的情形不處理, 以免出現 404 錯誤
        if (vastUrl) {
            //@zone FRON-155 需要多傳 param 的資料進去 getVastParseResult
            getVastParseResult(vastUrl, param, function (error, vastResult) {
                tmpObj.isEmpty = (vastResult === '');
                tmpObj.hasError = (error !== null);
                tmpObj.error = error;
                tmpObj.vastResult = vastResult;
                tmpObj.gotResult = true;
                tmpObj.usable = (!tmpObj.isEmpty && !tmpObj.hasError);

                //@zone FRON-95 已經 timeout 或者拿到廣告開始撥的話, 後續收到 vastResult 就不處理
                if (ronProcessState.alreadyTimeout === false && ronProcessState.alreadyStartPlayingAd === false) {
                    checkIfGotTheHighestPriorityVast(index);
                }
            }, element.source_url);
        }
    });

    //@zone FRON-95 時間到了就開始檢查
    //colorLog('Ron 開始計時');
    //var ron_start_time = +(new Date());
    ronProcessState.countdownTimeout = setTimeout(callbackWhenRonTimeout, timeoutMS);
};

//@zone FRON-95
var insertOneadVastJs = function (callback) {
    ONEAD.gotVAST = undefined ? false : ONEAD.gotVAST;
    if (!ONEAD.gotVAST) {
        var VAST_SRC = '//ad-specs.guoshipartners.com/static/js/vast-client.js';
        var vast_js = document.createElement('script');
        vast_js.type = 'text/javascript';
        vast_js.async = true;
        vast_js.src = VAST_SRC;

        vast_js.onload = function () {
            //log2('ONEAD VAST 載入完成, 執行 callback');
            ONEAD.ONEAD_VAST = window.ONEAD_VAST;
            ONEAD.gotVAST = true;
            ONEAD.gettingVastJs = false;
            callback();
        };

        //@zone FRON-1133
        var node;
        switch (ONEAD.uid) {
            case '1000055':
                node = document.body;
                break;
            default:
                node = document.head;
                break;
        }
        node.appendChild(vast_js);
    } else {
        //log2('已載入 ONEAD VAST 直接執行 callback');
        callback();
    }
};

//@zone FRON-95 在 RON 之前先自己確認 vast_list 裡面有 url
var isVastListHasValidUrl = function (vastList) {
    var result = false;
    //@zone FRON-243 修改判斷 Array 的方式
    if (Array.isArray(vastList)) {
        result = vastList.some(function (element) {
            var vastUrl = element.vast_url;
            return (vastUrl && (vastUrl !== '') && (vastUrl.indexOf('//') > -1));
        });
    }

    //log2('vast_list 防呆檢查結果 =' + result);

    return result;
};

//@zone FRON-95 原本的 ONEAD_get_response 在此分成兩種情形：陣列需要非同步處理之後在進行後續動作, 非陣列就直接依照舊有邏輯處理
// 如果 VAST 資料有錯誤的話, 目前的處理方式是直接關閉, 輪撥其他廣告
// 此函式注意 不要用到 return, 會影響後面查廣告
var ONEAD_get_response = function (param) {

    //FRON-2393 調整 cookie sync 執行時間點
    ONEAD.cookie_sync();

    /*時間區間公用函式*/   //小時區間待調整
    /*
    function checkBetween(param) {
        var a, b, c, x, y, z;
        a = param.start[0];
        b = param.start[1] - 1;
        c = param.start[2];

        x = param.end[0];
        y = param.end[1] - 1;
        z = param.end[2] + 1;

        var startMS = new Date(a, b, c).getTime();
        var endMS = new Date(x, y, z).getTime();
        var counter = new Date().getTime();
        if (startMS < counter && counter < endMS) {
            return true;
        }
    }
    */

    if (param !== null) {

        var isSpeed;
        //run 做防呆
        if (param.run) {
            isSpeed = param.run.indexOf("2:") > -1;
        } else {
            //For Preview
            isSpeed = false;
        }

    }
    //@shuu 濾 PID 的判斷是 End ========

    //@Ryan FRON-2726 [IP] 針對特定有做 rwd 的媒體，檢查瀏覽器當前可視寬度是否小於觸發隱藏廣告區塊寬度, 若是則不長廣告.
    var excludeAdServing = function () {
        var needExclude = false;
        var browserWidth = window.innerWidth || document.documentElement.clientWidth;
        if (param.play_mode === ONEAD_CONST.PLAY_MODE.IN_STREAM || param.play_mode === ONEAD_CONST.PLAY_MODE.IR) {
            switch (ONEAD.uid) {
                case ONEAD_CONST.UID.TVBS:
                    needExclude = browserWidth <= 1280;
                    break;
                // @Ryan 數位時代先不做, 因為只有列表頁會隱藏廣告 div, 文章頁正常.
                // case ONEAD_CONST.UID.BNEXT:
                //     needExclude = browserWidth <= 1200;
                //     break;
                default:
                    break;
            }
        }
        if (needExclude) {
            // 因瀏覽器寬度檢查不符合條件而排除投遞時, 顯示 console.log.
            // TODO: 將 console.log 改成送 sentry 方便注意到廣告因瀏覽寬度未符合條件而排除投放.
            window.console.log('%c [ONEAD] Exclude ' + param.play_mode + ' ad delivery!!!.', 'background-color:#454545; color:#FFFF4F');
        }
        return needExclude;
    };


    if (param !== null) {
        if (excludeAdServing()) {
            //@Ryan FRON-2726
            returnControlToPublish();
        } else {
            //@zone FRON-1246
            param.oneadObj = ONEAD;

            if (param.vast_list) {
                if (isVastListHasValidUrl(param.vast_list)) {
                    //@zone FRON-95 這種情形預設為 VAST
                    window.console.log('走 RON 流程');

                    //@zone FRON-739 RON 流程之前先送 UcFunnel, SpotXpixel
                    //@sam FRON-19999 關掉 ucfunnel
                    // cookieSyncUc();
                    // cookieSyncSpotX();

                    //@zone FRON-797
                    var useImaVpaid;

                    var insertJS = function () {
                        var thirdPartyTimeout = 0 + (param.tout) || 2500;
                        ron_process(param.vast_list, thirdPartyTimeout, param, ronProcessState);
                    };

                    for (var i = 0; i < param.vast_list.length; i++) {

                        //@zone FRON-797
                        if (param.vast_list[i].source_url.indexOf('&imaVpaid=true') > -1) {
                            useImaVpaid = true;
                            param.vast_list[i].source_url = param.vast_list[i].source_url.replace('&imaVpaid=true', '');
                        }

                        if (useImaVpaid) {
                            param.imaUrl = param.vast_list[i].vast_url;
                            param.insertJS = insertJS;
                            ONEAD.AD_PARAM = param;
                            var innerParam = param;
                            param.vast_list.splice(i, 1);
                            ONEAD.ONEAD_expand_slot();
                            ONEAD.ONEAD_mobile_init_player_ima(innerParam, insertOneadVastJs);
                            break;
                        } else {
                            if (i === param.vast_list.length - 1) {
                                insertOneadVastJs(insertJS);
                            }
                        }
                    }


                } else {
                    //@zone FRON-95 錯誤情形
                    //FIXME: @Zone 實做錯誤報告發送
                    //log2('vast_list 實做錯誤, 沒有 url 的時候, vast_list 就不出現');
                    returnControlToPublish();
                }
            } else {
                //log2('不走 RON 流程');
                if (param.is_vast === 'true') {
                    //log2(' 單支 VAST');
                    insertOneadVastJs(function () {
                        //@zone FRON-155 需要多傳 param 進去 getVastParseResult
                        getVastParseResult(param.vast_url, param, function (error, vastResult) {
                            if (error) {
                                //@zone FRON-95 無法繼續往下撥, 關閉廣告
                                //log2('VAST 資料錯誤');
                                returnControlToPublish();
                            } else {
                                if (vastResult === '') {
                                    //@zone FRON-95 無法繼續往下撥, 關閉廣告
                                    //log2('VAST 內容空白');
                                    returnControlToPublish();
                                } else {
                                    continueGetResponseProcess({ param: param, vastResult: vastResult });
                                }
                            }
                        });
                    });
                } else {
                    //log2('單支 非 VAST');
                    continueGetResponseProcess({ param: param });
                }
            }
        }
    } else {
        //@zone FRON-1195 沒有廣告也做 cookie-sync
        //@sam FRON-1999
        // cookieSyncUc();
        // cookieSyncSpotX();

        //log2(' param = null , 把控制權還給媒體');
        //@zone FRON-155 沒有廣告內容, 把控制權還給媒體
        returnControlToPublish();
    }
};

window.ONEAD_get_response[ONEAD.isip_index] = ONEAD_get_response;


this.ONEAD.is_expanded = false;
if (this.ONEAD.ONEAD_expand_slot === undefined) {
    this.ONEAD.ONEAD_expand_slot = function () {
        if (ONEAD.is_expanded) {
            return;
        }
        //point 6
        // ONEAD.recordLatencyTime();
        ONEAD.is_expanded = true;
        var doc = (ONEAD.container && ONEAD.container === 'iframe' ? window.parent.document : document);

        // debugger;
        var param = ONEAD.AD_PARAM || null;

        // console.log('call expand_slot');
        // console.log(param);

        //@zone FRON-243 修改判斷 Array 的方式
        if (typeof ONEAD.cmd !== 'undefined' && Array.isArray(ONEAD.cmd)) {

            var fn = false;
            while ((fn = ONEAD.cmd.shift())) {
                fn();
                fn = false;
            }
        }

        // no pid
        if (param === null) {
            param = {};
        }

        // For DFP mode
        if (param !== null && param.onetime === undefined) {
            param.onetime = false;
        }

        // For DFP mode
        if (ONEAD.container && ONEAD.container === 'iframe' && param.onetime === false) {
            // console.log('iframe');
            if (parent.ONEAD_get_response && typeof parent.ONEAD_get_response === 'function') {
                // console.log('call parent.ONEAD_get_response');
                param.onetime = true;
                parent.ONEAD_get_response(param);
                return;
            } else {
                // console.log('normal ONEAD_get_response(1)');
            }
        } else {
            // console.log('not iframe');
        }

        // // ONEAD_on_get_response, if no pid, out_param is null



        // no pid
        if (param.pid === undefined) {
            // window.console.log('param.pid is undefined');
            return;
        }

        // pass the returned play_mode to ONEAD.play_mode
        if (typeof param.play_mode !== 'undefined') {
            //@shuu FRON-806 將 player_type 加入 ONEAD 物件中
            ONEAD.play_mode = param.play_mode;
            ONEAD.player_type = param.player_type;
        } else {
            // default
            ONEAD.play_mode = ONEAD_CONST.mode_instream;
        }

        if (window.ONEAD_is_mobile()) {

            //@zone FRON-562 因應 Line Today, 調整 visibility: visible
            if (ONEAD.slot_id && ONEAD.slot_id[param.play_mode]) {
                doc.getElementById(ONEAD.slot_id[param.play_mode]).style.visibility = "visible";
            }

            // reset AD_PARAM when ad is going to show
            // ONEAD.AD_PARAM = {};
            // Dcard using
            if (param.uid === ONEAD_CONST.UID.DCARD && param.play_mode === 'mobile-inread' && (param.player_type.toUpperCase() === 'MOBILE' || param.player_type.toUpperCase() === 'TRANSFORMER')) {
                param.player_type = 'INSTANT';
            }

            param['vastResult'] = ONEAD.vastResult || null;

            //FRON-2177
            if (window.ONEAD_is_ios() && window.ONEAD_is_fb()) {
                var checkFBHeight = 0;
                checkFBHeight = Math.min(document.documentElement.clientHeight, window.innerHeight);
                var checkHeightTimer = setInterval(function () {
                    if (checkFBHeight < 400) {
                        checkFBHeight = Math.min(document.documentElement.clientHeight, window.innerHeight);
                    } else {
                        ONEAD.ONEAD_mobile_init_player_pv2(param);
                        clearInterval(checkHeightTimer);
                        // break;
                    }
                }, 100);

            } else {
                ONEAD.ONEAD_mobile_init_player_pv2(param);
            }
            // mobile version don't need to run following code;
            return false;
        }

        var new_width = null;
        var new_height = null;

        // stage_width, stage_height in param
        if (param.stage_width !== undefined && param.stage_height !== undefined) {
            new_width = param.stage_width;
            new_height = param.stage_height;
            // console.log("stage - new_width=" + new_width + ", new_height=" + new_height);
        }

        // slot_limit for multiple play_mode
        // inread, ignore stage_width/stage_height from server
        if (typeof ONEAD.slot_limit_multiple !== 'undefined') {
            if (typeof ONEAD.slot_limit_multiple[ONEAD.play_mode] !== 'undefined') {
                // console.log(ONEAD.slot_limit_multiple[ONEAD.play_mode]);
                var setting = ONEAD.slot_limit_multiple[ONEAD.play_mode];
                if (typeof setting['width'] !== 'undefined') {
                    // re-calculate new_width and new_height
                    new_width = null;
                    new_height = null;
                    ONEAD.slot_limit.width = setting['width'];
                    ONEAD.slot_limit.height = setting['height'];
                }
            }
        }


        //if (param.iframe_url && ONEAD && ONEAD.wrapper) {
        if (ONEAD && ONEAD.wrapper) {
            // server return the stage_width, stage_height as new_width, new_height
            if (new_width === null || new_height === null) {
                // resize by slot_limit
                if (param.width && param.height && param.height > 0) {

                    // orininal size
                    new_width = param.width;
                    new_height = param.height;

                    // console.log('orininal size:' + new_width + "," + new_height);

                    // console.debug(param);
                    if (ONEAD.slot_limit && ONEAD.slot_limit.height && ONEAD.slot_limit.width) {
                        // based on width
                        new_width = ONEAD.slot_limit.width;
                        new_height = (ONEAD.slot_limit.width / param.width * param.height) | 0;
                        // control bar can't be scaled, IS_INSYNC, IS_DF
                        if (param.player_type.toUpperCase().indexOf('IS_') === 0) {
                            new_height = ((ONEAD.slot_limit.width / param.width * (param.height - 30)) + 30) | 0;
                        }
                        // console.log('size, based on width:' + new_width + "," + new_height);

                        if (new_height > ONEAD.slot_limit.height) {
                            // based on height
                            new_width = (ONEAD.slot_limit.height / param.height * param.width) | 0;
                            // control bar can't be scaled, IS_INSYNC, IS_DF
                            if (param.player_type.toUpperCase().indexOf('IS_') === 0) {
                                new_width = (((ONEAD.slot_limit.height - 30) / (param.height - 30) * param.width)) | 0;
                            }
                            new_height = ONEAD.slot_limit.height;

                            // console.log('size, based on height:' + new_width + "," + new_height);
                        }
                    }
                } else {
                    // exception!
                    try {
                        window.console.warn('ONEAD_get_response() gets an exception, param is invalid.');
                    } catch (e) { }
                    return;
                }
            }

            // show the ads
            if (typeof ONEAD.wrapper_multiple !== 'undefined' && typeof param.play_mode !== 'undefined') {
                if (typeof ONEAD.wrapper_multiple[param.play_mode]) {

                    //@Vic FRON-424 因應多查inread，讓 wrapper 加上 isip_index ，使卷軸滾動能抓到正確的廣告
                    ONEAD.wrapper = ONEAD.wrapper_multiple[param.play_mode] + '-' + ONEAD.isip_index;

                }
            }


            // debugger;
            var check_player_mode_and_start = function (param, callbackAfterCheckVastResponse) {
                param.slot = ONEAD.wrapper;
                switch (param.player_type) {
                    case ONEAD_CONST.PLAYER_TYPE.H5_970X250:
                    case ONEAD_CONST.PLAYER_TYPE.H5_640X480:
                        ONEAD.desktop_init_EmbeddedPlayer(param, callbackAfterCheckVastResponse);
                        break;
                    default:
                        // ONEAD.init_html5_player(param, callbackAfterCheckVastResponse);
                        ONEAD.init_desktop_player(param, callbackAfterCheckVastResponse);
                        break;
                }
            };

            // avoid to use jQuery
            if (doc.getElementById(ONEAD.wrapper)) {
                // jQuery.css()

                // if (ONEAD.html5_mode === true) {
                // prevent using queryelector in not html5 mode
                var is_ie_compatible = typeof document.querySelector('meta[http-equiv="X-UA-Compatible"]') === 'object';

                if (is_ie_compatible) {
                    new_height += 8;
                }

                // }
                //FRON-891 incover 因應黑背景改到 player
                if (ONEAD.wrapper.indexOf(ONEAD_CONST.PLAY_MODE.IC) > -1) {
                    ONEAD.ONEAD_css(ONEAD.wrapper, doc, {
                        'width': new_width + 'px',
                        'height': new_height + 'px',
                        'position': 'fixed',
                        'top': '50%',
                        'left': '50%',
                        'margin-left': '-' + new_width / 2 + 'px',
                        'margin-top': '-' + new_height / 2 + 'px',
                        'z-index': '2147483647',
                    });
                } else {
                    ONEAD.ONEAD_css(ONEAD.wrapper, doc, {
                        'position': 'relative',
                        'overflow': 'hidden',
                        'top': '0%',
                        'left': '0%',
                        'width': new_width + 'px',
                        'height': new_height + 'px',
                        //,'z-index': '-10000'
                        //@Vic FRON-424 因應多查inread，display:none 會隱藏該出現的廣告
                        'display': 'block',
                        // 'padding-top': '4px',
                        // 'padding-bottom': '4px',
                        'margin-left': 'auto',
                        'margin-right': 'auto',
                        'margin-bottom': '5px'
                    });
                    if (param.player_type === ONEAD_CONST.PLAYER_TYPE.H5_970X250 ||
                        param.player_type === ONEAD_CONST.PLAYER_TYPE.H5_640X480) {
                        ONEAD.ONEAD_css(ONEAD.wrapper, doc, {
                            'height': '0px',
                            'padding': '0px'
                        });
                    }
                }


                // add a tag for setFocus
                var a = document.createElement('a');
                a.href = "#onead_active" + ONEAD.isip_index;
                doc.getElementById(ONEAD.wrapper).parentNode.insertBefore(a, doc.getElementById(ONEAD.wrapper).nextSibling);

                if (param.play_mode === 'inread') {
                    /** IR的情形下, 因為VAST可能會有空的內容, 必需要把展開的動作延遲到確認有VAST內容再展開, 如果不是VAST, 則會在之後呼叫這個callback
                     * error first
                     * @param error
                     */
                    //@Vic FRON-985 IR VPAID 等待 player ready 再展開
                    if (ONEAD.vastResult && ONEAD.vastResult.hasVPAIDAd) {
                        ONEAD.ONEAD_css(ONEAD.wrapper, doc, {
                            'display': 'none'
                        });
                    }
                    var afterCheckVastResponseIR = function (error) {
                        if (error === null && (ONEAD.vastResult && !ONEAD.vastResult.hasVPAIDAd)) {
                            ONEAD.ONEAD_css(ONEAD.wrapper, doc, {
                                'display': 'block'
                            });
                        }
                    };

                    check_player_mode_and_start(param, afterCheckVastResponseIR);

                } else if (param.play_mode === 'incover' || param.play_mode === 'default') {

                    // FRON-891 因為 fadeWrapper 改由 player 產生，這邊只針對 incover 的 slot 做設定，改用 flex 做排版
                    if (typeof ONEAD.slot_id !== 'undefined' && typeof ONEAD.slot_id[param.play_mode] !== 'undefined') {
                        ONEAD.ONEAD_css(ONEAD.slot_id[param.play_mode], doc, {
                            'display': 'block',
                        });
                    }
                    check_player_mode_and_start(param);
                } else {
                    // default, instream/inpage, slide down
                    // jQuery.slidedown
                    // debugger;

                    //@zone FRON-277 設定 IP 展開動畫的開關
                    if (ONEAD.ONEAD_isSlotAnimationOn === false) {
                        check_player_mode_and_start(param);
                        doc.getElementById(ONEAD.wrapper).style.display = 'block';
                    } else {
                        ONEAD.ONEAD_slide(doc.getElementById(ONEAD.wrapper), true, function () {
                            check_player_mode_and_start(param);
                        });
                    }
                }
            } else {

                if (parent.ONEAD.display_type && parent.ONEAD.display_wrapper) {
                    if (parent.ONEAD.display_type === 'instream') {

                        doc.getElementById(parent.ONEAD.display_wrapper).innerHTML = param.embed_string;
                    }
                }
            }

            return;
        }
        return;
    };
    if (ONEAD.oldMedia !== undefined && ONEAD.oldMedia) {
        parent.ONEAD_expand_slot = this.ONEAD.ONEAD_expand_slot;
    }
}

(function (ONEAD) {
    // var HTML5_PLAYER_SRC = '//ad-specs.guoshipartners.com/static/js/player-dw.min.js';
    var HTML5_PLAYER_SRC;

    if (!ONEAD.pub || !ONEAD.pub.test_mode) {
        HTML5_PLAYER_SRC = '//ad-specs.guoshipartners.com/static/js/player-dw.min.js';
    } else {
        HTML5_PLAYER_SRC = ('https://127.0.0.1:' + (ONEAD.pub.test_mode[1] || 8080) + '/publisher_js_api/guoshipartners/static/js/player-dw.min.js');
    }
    // var MOBILE_HTML5_PLAYER_SRC = 'http://ad-specs.guoshipartners.com/static/js/mobile-html5player.js';
    var _vpaidSrc = '//ad-specs.guoshipartners.com/static/js/vpaid-client.js';

    //=========
    //    promise
    //=========
    var Promise = function () {
        this.ready = false;
    };

    Promise.prototype = {
        complete: function (data) {
            this.ready = true;
            this.data = data;
            var f = this.on_complete;
            if (typeof f === 'function') {
                f(data);
            }
        },

        then: function (f) {
            if (typeof f === 'function') {
                // f(this.data);
                this.on_complete = f;
            }
        }
    };
    var ALL = function (promises, then) {
        var promiseCompleteCounter = 0;
        var targetCompletePromiseNumber = promises.length;
        var checkAllPromiseComplete = function () {
            promiseCompleteCounter++;
            if (promiseCompleteCounter === targetCompletePromiseNumber) {
                var data = [];
                for (var i = 0; i < promises.length; i++) {
                    data.push(promises[i].data);
                }
                then(data);
            }
        };

        promises.forEach(function (el) {
            el.on_complete = checkAllPromiseComplete;
        });
    };

    var _ = {};
    _.ajax = function (options) {
        var promise = new Promise();
        var xmlhttp = new XMLHttpRequest();
        var dom;
        var async = options.async || true;
        var method = options.method || 'get';
        var parameters = options.parameters || null;
        var success_callback = options.success || function () { };

        // events
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var parser = new DOMParser();
                dom = parser.parseFromString(
                    xmlhttp.responseText,
                    'text/xml'
                );
                // var a = typeof success_callback;
                // var b = dom;
                // debugger;
                promise.complete(dom);

                success_callback(dom);
            }
        };

        if (parameters !== null) {
            parameters = '';
            for (var k in options.parameters) {
                parameters += k + '=' + options.parameters[k] + '&';
            }
            parameters = parameters.substr(parameters, parameters.length - 1);
        }

        xmlhttp.open(method, options.url, async);

        if (method === 'post') {
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        xmlhttp.send(parameters);

        return promise;
    };

    _.post = function (url, params, callback) {
        _.ajax({
            url: url,
            method: 'post',
            parameters: params,
            success: callback
        });
    };

    _.Q = {
        Promise: Promise,
        ALL: ALL
    };

    _.get_script = function (url, insert_node) {
        var doc = document;
        var promise = new Promise();
        var js = doc.createElement('script');

        js.charset = 'utf-8';
        js.async = true;
        js.type = 'text/javascript';
        // js.src = 'http://demo1.guoshi.com.tw/onead-html5-player/scripts/main.js';
        js.src = url;
        js.onload = function () {
            promise.complete(url + '_ready');
        };


        if (typeof insert_node === 'undefined') {
            var node = doc.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(js, node.nextSibling); // insert after
        } else {
            // var head = doc.getElementsByTagName('head')[0];
            insert_node.appendChild(js);
        }


        return promise;
    };

    //-------------------

    // return _;
    // ONEAD.guoshi = _;
    // 移除桌機 iframe, 穩定後再將此功能註解移除
    // ------ iframe desktop begin ------
    // ONEAD.init_html5_player = function (params, callbackAfterCheckVastResponse) {
    //     var _is_vast = (params.is_vast !== undefined && params.is_vast === 'true');
    //     var iframe_id = 'ONEAD-' + params.player_type + this.isip_index;
    //     var iframe_name = 'ONEAD-iframe' + this.isip_index;
    //     var is_iframe_exist = (document.getElementById(iframe_id) !== null);

    //     if (is_iframe_exist === true) {
    //         return;
    //     }

    //     var slot_id = params.slot;
    //     var slot = document.getElementById(slot_id);
    //     var iframe = document.createElement('iframe');
    //     iframe.scrolling = 'no';
    //     iframe.style.border = '0';
    //     //iframe.id = iframe_id;
    //     //@Vic FRON-830 iframe 新增name屬性方便整合測試用
    //     iframe.name = iframe_name;

    //     var head,
    //         encoding,
    //         body;

    //     iframe.addEventListener('load', function () {
    //         var self = this;

    //         //@zone FRON-1133
    //         var node;

    //         // reset iframe content body margin padding
    //         body = self.contentDocument.body;
    //         body.style.margin = '0';
    //         body.style.padding = '0';

    //         // setup iframe content encoding
    //         encoding = document.createElement('meta');
    //         encoding['http-equiv'] = 'Content-Type';
    //         encoding['content'] = 'text/html; charset=utf-8';

    //         head = self.contentDocument.head;
    //         head.appendChild(encoding);

    //         //@zone FRON-1133
    //         switch (ONEAD.uid) {
    //             case "1000055":
    //                 node = body;
    //                 break;
    //             default:
    //                 node = head;
    //                 break;
    //         }

    //         var startInitPlayer = function (datas) {
    //             //@Ryan FRON-1052
    //             params.returnControlToPublish = returnControlToPublish;

    //             //@zone FRON-95 expand IR by CSS
    //             if (callbackAfterCheckVastResponse !== undefined && typeof callbackAfterCheckVastResponse === 'function') {
    //                 callbackAfterCheckVastResponse(null);
    //             }

    //             //console.log('[html5JS]: init Player (' + (_is_vast ? 'VAST)' : 'NORMAL)'));
    //             var xml_data = datas[1];
    //             //FRON-622 統一命名空間 Guoshi
    //             var Guoshi = iframe.contentWindow.Guoshi;
    //             var vpaidSetting = datas[2] || {};

    //             //@zone FRON-194 把 reporting 物件放到 iframe 物件底下
    //             iframe.contentWindow.reporting = reporting;

    //             //@zone FRON-205 send create view event
    //             //reporting.sendTrackingEvent(reporting.events.CREATE_VIEW);
    //             //FRON-622 reporting 改使用 player 的 eventCenter

    //             //@Vic 桌機重構，修改isip呼叫方式
    //             //@Vic FRON-622 因應統一命名空間，加入 desktop 防止與手機重複命名
    //             var desktopMain = new Guoshi.desktop.Main();

    //             //@zone FRON-927 把 vastResult 附加到 external 的參數當中
    //             params.vastResult = datas[0];

    //             ONEAD.html5_player = desktopMain;
    //             ONEAD.html5_player.init_player({
    //                 'iframe': iframe,
    //                 'window': window,
    //                 // 'slot' : body,
    //                 'slot_limit': {
    //                     width: ONEAD.slot_limit.width,
    //                     height: ONEAD.slot_limit.height
    //                 },
    //                 'xml_data': xml_data,
    //                 'params': params,
    //                 'is_vast': _is_vast,
    //                 'vastResult': datas[0],
    //                 //@zone 非 VAST 會沒有 hasVPAIDAd 的值
    //                 'hasVPAIDAd': datas[0].hasVPAIDAd || false,
    //                 'vpaidSettingISIP': vpaidSetting
    //             });
    //             //ONEAD.ONEAD_player_init();
    //         };

    //         if (_is_vast) {
    //             var vastResult = ONEAD.vastResult;
    //             var set_vast_info = function () {
    //                 startInitPlayer([ONEAD.vastResult, {}]);
    //             };

    //             //@zone FRON-155 如果是 VAST 的情形, 在這邊已經會拿到 vastResult, 再載入 html5player 即可
    //             if (ONEAD.gotVAST) {
    //                 //@zone FRON-155 VPAID起點
    //                 if (checkIfUseVpaid(vastResult)) {
    //                     var vpaidAdUrl;
    //                     var vpaidAdParameters;
    //                     var vpaidSetting;

    //                     //@zone 預設使用第一個廣告的第一個Creative的第一個 VPAID AD
    //                     vpaidAdUrl = vastResult.vpaid_src[0][0][0].fileURL;

    //                     //@zone 預設使用第一個廣告的第一個Creative的 AdParameters
    //                     vpaidAdParameters = vastResult.vpaid_adParameters_src[0][0];
    //                     //console.log('ISIP: vpaidAdParameter=' + vpaidAdParameters);

    //                     //@zone VPAID 收集初始化所需資料
    //                     vpaidSetting = {};
    //                     vpaidSetting.vpaidAdUrl = vpaidAdUrl;
    //                     vpaidSetting.vpaidAdParameters = vpaidAdParameters;

    //                     vpaidSetting.vpaidSlotWidth = ONEAD.slot_limit.width;
    //                     vpaidSetting.vpaidSlotHeight = ONEAD.slot_limit.height;
    //                     //console.log('vpaidSetting width height=' + vpaidSetting.vpaidSlotWidth + ',' + vpaidSetting.vpaidSlotHeight);

    //                     var callbackGotVpaidCode = function () {
    //                         vpaidSetting.ONEAD_VPAID = iframe.contentWindow.ONEAD_VPAID;
    //                         startInitPlayer([vastResult, {}, vpaidSetting]);
    //                     };

    //                     _.Q.ALL([
    //                         _.get_script(HTML5_PLAYER_SRC, node),
    //                         _.get_script(_vpaidSrc, node)
    //                     ], callbackGotVpaidCode);
    //                 } else {
    //                     _.Q.ALL([_.get_script(HTML5_PLAYER_SRC, node)], set_vast_info);
    //                 }
    //             }
    //             /*
    //             else{
    //                 //@zone FRON-95 應該不會有執行到這邊的可能性
    //                 window.parent.document.addEventListener('GOT_VAST',function(){
    //                     console.log('html5.js: listener Got ONEAD_VAST');
    //                     _.Q.ALL([_.get_script(HTML5_PLAYER_SRC, node)], set_vast_info);
    //                 });
    //             }
    //             */
    //         } else {
    //             _.Q.ALL([
    //                 _.get_script(HTML5_PLAYER_SRC, node),
    //                 //@zone FRON-670 因為桌機自己會 load, 這邊就不處理
    //                 //_.ajax({url: params.l_url})
    //             ], startInitPlayer);
    //         }
    //     });
    //     slot.appendChild(iframe);
    // };
    // ------ iframe desktop end ------

    ONEAD.desktop_init_EmbeddedPlayer = function (params, callbackAfterCheckVastResponse) {
        var node;

        switch (ONEAD.uid) {
            case '1000055':
                node = document.body;
                break;
            default:
                node = document.getElementsByTagName('head')[0];
                break;
        }


        var initPlayer = function () {
            //@Ryan FRON-1052
            params.returnControlToPublish = returnControlToPublish;
            //@zone FRON-95 expand IR by CSS
            if (callbackAfterCheckVastResponse !== undefined && typeof callbackAfterCheckVastResponse === 'function') {
                callbackAfterCheckVastResponse(null);
            }

            var Guoshi = window.Guoshi;
            var desktopMain = new Guoshi.desktop.Main();
            if (params !== undefined) {
                desktopMain.init_player({
                    'slot_limit': {
                        width: ONEAD.slot_limit.width,
                        height: ONEAD.slot_limit.height
                    },
                    'params': params,
                });
            }

        };

        (function () {
            var js = document.createElement('script');
            js.src = HTML5_PLAYER_SRC;
            js.onload = initPlayer;
            //@zone FRON-1133
            node.appendChild(js);
        })();
    };
    ONEAD.init_desktop_player = function (params, callbackAfterCheckVastResponse) {
        var _is_vast = (params.is_vast !== undefined && params.is_vast === 'true');
        var node;
        switch (ONEAD.uid) {
            case '1000055':
                node = document.body;
                break;
            default:
                node = document.getElementsByTagName('head')[0];
                break;
        }

        var startInitPlayer = function (datas) {
            //@Ryan FRON-1052
            params.returnControlToPublish = returnControlToPublish;

            //@zone FRON-95 expand IR by CSS
            if (callbackAfterCheckVastResponse !== undefined && typeof callbackAfterCheckVastResponse === 'function') {
                callbackAfterCheckVastResponse(null);
            }

            var xml_data = datas[1];
            var vpaidSetting = datas[2] || {};
            //FRON-622 統一命名空間 Guoshi
            var Guoshi = window.Guoshi;
            //@Vic FRON-622 因應統一命名空間，加入 desktop 防止與手機重複命名
            var desktopMain = new Guoshi.desktop.Main();

            //@zone FRON-927 把 vastResult 附加到 external 的參數當中
            params.vastResult = datas[0];

            desktopMain.init_player({
                'slot_limit': {
                    width: ONEAD.slot_limit.width,
                    height: ONEAD.slot_limit.height
                },
                'xml_data': xml_data,
                'params': params,
                'is_vast': _is_vast,
                'vastResult': datas[0],
                //@zone 非 VAST 會沒有 hasVPAIDAd 的值
                'hasVPAIDAd': datas[0].hasVPAIDAd || false,
                'vpaidSettingISIP': vpaidSetting
            });
        };

        if (_is_vast) {
            var vastResult = ONEAD.vastResult;
            var set_vast_info = function () {
                startInitPlayer([ONEAD.vastResult, {}]);
            };

            //@zone FRON-155 如果是 VAST 的情形, 在這邊已經會拿到 vastResult, 再載入 html5player 即可
            if (ONEAD.gotVAST) {
                //@zone FRON-155 VPAID起點
                if (checkIfUseVpaid(vastResult)) {
                    var vpaidAdUrl;
                    var vpaidAdParameters;
                    var vpaidSetting;

                    //@zone 預設使用第一個廣告的第一個Creative的第一個 VPAID AD
                    vpaidAdUrl = vastResult.vpaid_src[0][0][0].fileURL;

                    //@zone 預設使用第一個廣告的第一個Creative的 AdParameters
                    vpaidAdParameters = vastResult.vpaid_adParameters_src[0][0];
                    //console.log('ISIP: vpaidAdParameter=' + vpaidAdParameters);

                    //@zone VPAID 收集初始化所需資料
                    vpaidSetting = {};
                    vpaidSetting.vpaidAdUrl = vpaidAdUrl;
                    vpaidSetting.vpaidAdParameters = vpaidAdParameters;

                    vpaidSetting.vpaidSlotWidth = ONEAD.slot_limit.width;
                    vpaidSetting.vpaidSlotHeight = ONEAD.slot_limit.height;
                    //console.log('vpaidSetting width height=' + vpaidSetting.vpaidSlotWidth + ',' + vpaidSetting.vpaidSlotHeight);

                    var callbackGotVpaidCode = function () {
                        vpaidSetting.ONEAD_VPAID = window.ONEAD_VPAID;
                        startInitPlayer([vastResult, {}, vpaidSetting]);
                    };

                    _.Q.ALL([
                        _.get_script(HTML5_PLAYER_SRC, node),
                        _.get_script(_vpaidSrc, node)
                    ], callbackGotVpaidCode);
                } else {
                    _.Q.ALL([_.get_script(HTML5_PLAYER_SRC, node)], set_vast_info);
                }
            }
        } else {
            _.Q.ALL([
                _.get_script(HTML5_PLAYER_SRC, node),
                //@zone FRON-670 因為桌機自己會 load, 這邊就不處理
                //_.ajax({url: params.l_url})
            ], startInitPlayer);
        }
    };
})(ONEAD || {});

ONEAD.ONEAD_mobile_init_player_pv2 = function (params, callbackAfterCheckVastResponse) {
    ONEAD.CDN_DOMAIN = 'ad-specs.guoshipartners.com';
    var script_tags = document.getElementsByTagName('script');
    script_tags = Array.prototype.slice.call(script_tags);
    // debugger;
    // var script = null;
    var production = true;

    // var pv2_src = 'http://ad-specs.guoshipartners.com/static/js/pv2.min.js';
    var pv2_src;
    if (!ONEAD.pub || !ONEAD.pub.test_mode) {
        pv2_src = ('//' + ONEAD.CDN_DOMAIN + '/' + ((production) ? 'static' : 'demo') + '/js/player-mw.min.js');
    } else {
        pv2_src = 'https://127.0.0.1:' + (ONEAD.pub.test_mode[1] || 8080) + '/publisher_js_api/guoshipartners/static/js/player-mw.min.js';
    }
    var iframe_id = 'ONEAD-' + params.player_type + this.isip_index;

    var is_iframe_exist = (document.getElementById(iframe_id) !== null);
    // console.log('is_iframe_exist', is_iframe_exist);

    if (is_iframe_exist === true) {
        return;
    }

    var Promise = function () {
        this.ready = false;
    };

    Promise.prototype = {
        complete: function (data) {
            this.ready = true;
            this.data = data;
            var f = this.on_complete;
            if (typeof f === 'function') {
                f(data);
            }
        },

        then: function (f) {
            if (typeof f === 'function') {
                this.on_complete = f;
            }
        }
    };

    var ALL = function (promises, then) {

        var interval = setInterval(function () {
            var counter = 0;
            for (var p = 0; p < promises.length; p++) {
                if (promises[p].ready === true) {
                    counter++;
                }

                if (counter === promises.length) {
                    clearInterval(interval);
                    var data = [];

                    for (p = 0; p < promises.length; p++) {
                        data.push(promises[p].data);
                    }
                    then(data);
                    break;
                }
            }
        }, 10);
    };

    var _ = {};
    _.ajax = function (options) {
        var promise = new Promise();
        var xmlhttp = new XMLHttpRequest();
        var dom;
        var async = options.async || true;
        var method = options.method || 'get';
        var parameters = options.parameters || null;
        var success_callback = options.success || function () { };

        // events
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var parser = new DOMParser();
                dom = parser.parseFromString(
                    xmlhttp.responseText,
                    'text/xml'
                );

                promise.complete(dom);

                success_callback(dom);
            }
        };

        if (parameters !== null) {
            parameters = '';
            for (var k in options.parameters) {
                parameters += k + '=' + options.parameters[k] + '&';
            }
            parameters = parameters.substr(parameters, parameters.length - 1);
        }

        xmlhttp.open(method, options.url, async);

        if (method === 'post') {
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        xmlhttp.send(parameters);

        return promise;
    };

    _.Q = {
        Promise: Promise,
        ALL: ALL
    };

    _.get_script = function (url, insert_node) {
        var doc = document;
        var promise = new Promise();
        var js = doc.createElement('script');

        js.charset = 'utf-8';
        js.async = true;
        js.type = 'text/javascript';
        // js.src = 'http://demo1.guoshi.com.tw/onead-html5-player/scripts/main.js';
        js.src = url;
        js.onload = function () {
            promise.complete(url + '_ready');
        };


        if (typeof insert_node === 'undefined') {
            var node = doc.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(js, node.nextSibling); // insert after
        } else {
            // var head = doc.getElementsByTagName('head')[0];
            insert_node.appendChild(js);
        }


        return promise;
    };
    var head = document.getElementsByTagName('head')[0];
    //@zone FRON-1133
    var node;
    switch (ONEAD.uid) {
        case '1000055':
            node = document.body;
            break;
        default:
            node = head;
            break;
    }

    var startInitPlayer = function () {
        //@Ryan FRON-1052
        params.returnControlToPublish = returnControlToPublish;
        //@zone FRON-95 expand IR by CSS
        if (callbackAfterCheckVastResponse !== undefined && typeof callbackAfterCheckVastResponse === 'function') {
            callbackAfterCheckVastResponse(null);
        }
        if (checkIfUseVpaid(params.vastResult)) {
            var _vpaidSrc = '//ad-specs.guoshipartners.com/static/js/vpaid-client.js';

            var _vpaidJs = document.createElement('script');
            _vpaidJs.src = _vpaidSrc;
            _vpaidJs.onload = function () {
                var Guoshi = window.Guoshi;
                var main = new Guoshi.Main();
                params['vastResult']['ONEAD_VPAID'] = window.ONEAD_VPAID;
                if (params !== undefined) {
                    main._get_isip_params(params);
                }
            };

            //@zone FRON-1133
            node.appendChild(_vpaidJs);
        } else {
            var Guoshi = window.Guoshi;
            var main = new Guoshi.Main();
            if (params !== undefined) {
                main._get_isip_params(params);
            }
        }

    };
    //@zone FRON-670 只需要載入 pv2.js, 不需用到 Promise
    // _.Q.ALL([
    //       _.get_script(pv2_src, head),
    //       _.ajax({ url: params.l_url })
    //   ], startInitPlayer);
    (function () {
        var js = document.createElement('script');
        js.src = pv2_src;
        js.onload = startInitPlayer;
        //@zone FRON-1133
        node.appendChild(js);
    })();


};
ONEAD.ONEAD_mobile_init_player_ima = function (params, callbackIfUrlIsUseless) {
    ONEAD.CDN_DOMAIN = 'ad-specs.guoshipartners.com';
    var script_tags = document.getElementsByTagName('script');
    script_tags = Array.prototype.slice.call(script_tags);
    var pv2_src = '//' + ONEAD.CDN_DOMAIN + '/' + 'static' + '/js/player-ima.min.js';
    var iframe_id = 'ONEAD-' + params.player_type + this.isip_index;

    var is_iframe_exist = (document.getElementById(iframe_id) !== null);

    if (is_iframe_exist === true) {
        return;
    }

    var Promise = function () {
        this.ready = false;
    };

    Promise.prototype = {
        complete: function (data) {
            this.ready = true;
            this.data = data;
            var f = this.on_complete;
            if (typeof f === 'function') {
                f(data);
            }
        },

        then: function (f) {
            if (typeof f === 'function') {
                this.on_complete = f;
            }
        }
    };

    var ALL = function (promises, then) {

        var interval = setInterval(function () {
            var counter = 0;
            for (var p = 0; p < promises.length; p++) {
                if (promises[p].ready === true) {
                    counter++;
                }

                if (counter === promises.length) {
                    clearInterval(interval);
                    var data = [];

                    for (p = 0; p < promises.length; p++) {
                        data.push(promises[p].data);
                    }
                    then(data);
                    break;
                }
            }
        }, 10);
    };

    var _ = {};
    _.Q = {
        Promise: Promise,
        ALL: ALL
    };

    _.get_script = function (url, insert_node) {
        var doc = document;
        var promise = new Promise();
        var js = doc.createElement('script');

        js.charset = 'utf-8';
        js.async = true;
        js.type = 'text/javascript';
        // js.src = 'http://demo1.guoshi.com.tw/onead-html5-player/scripts/main.js';
        js.src = url;
        js.onload = function () {
            promise.complete(url + '_ready');
        };


        if (typeof insert_node === 'undefined') {
            var node = doc.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(js, node.nextSibling); // insert after
        } else {
            // var head = doc.getElementsByTagName('head')[0];
            insert_node.appendChild(js);
        }


        return promise;
    };
    var head = document.getElementsByTagName('head')[0];

    //@zone FRON-1133
    var node;
    switch (ONEAD.uid) {
        case '1000055':
            node = document.body;
            break;
        default:
            node = head;
            break;
    }

    var startInitPlayer = function () {
        //@Ryan FRON-1052
        params.returnControlToPublish = returnControlToPublish;
        //@zone FRON-95 expand IR by CSS
        params.google = window.google;
        var Guoshi = window.Guoshi;
        var main = new Guoshi.component.ima.imaMain();
        if (params !== undefined) {
            main._get_isip_params(params, callbackIfUrlIsUseless);
        }
    };
    var imaScript = document.createElement('script');
    imaScript.type = "text/javascript";
    imaScript.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
    imaScript.onload = function () {
        //@zone FRON-1133
        _.Q.ALL([
            _.get_script(pv2_src, node)
        ], startInitPlayer);

    };
    head.appendChild(imaScript);


};

// ?onead_uid=1000033&onead_pid=22006&preview_playmode=ic&onead_preview&onead_scopes=all&host=staging
(function () {
    if (location.search.indexOf("onead_preview") > -1) {
        var strUrl = location.search;
        var getPara = [];
        var ParaVal = [];
        var aryPara = [];
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (var i = 0; i < getPara.length; i++) {
            ParaVal = getPara[i].split("=");
            aryPara.push(ParaVal[0]);
            aryPara[ParaVal[0]] = ParaVal[1];
        }

        // 2019/11/22 統一本網頁所有的查詢皆導向 host 參數所在伺服器，避免 isip_index 在不同廣告主機的查詢問題。
        if (aryPara["host"] !== undefined) {
            switch (aryPara["host"].toLowerCase()) {
                case "staging":
                    ONEAD.external_url = ONEAD_CONST.HOST.STAGING;
                    break;
                case "test":
                    ONEAD.external_url = ONEAD_CONST.HOST.TEST;
                    break;
                case "demo":
                    ONEAD.external_url = ONEAD_CONST.HOST.DEMO;
                    break;
                case "rd":
                    ONEAD.external_url = ONEAD_CONST.HOST.RD;
                    break;
                default:
                    ONEAD.external_url = ONEAD_CONST.HOST.DEMO;
                    break;
            }
        } else {
            ONEAD.external_url = ONEAD_CONST.HOST.DEMO;
        }

        if (aryPara["onead_uid"]) {
            ONEAD.uid = aryPara["onead_uid"];
        }

        var freq = '0';

        if (!ONEAD.oldMedia) {

            // 2019/11/22 若此 ONEAD.response_freq_multiple 不符合 preview_playmode 的值，則 reuten 不覆寫僅維持原設定
            switch (aryPara["preview_playmode"].toLowerCase()) {
                case "ic":
                    if (ONEAD.response_freq_multiple['incover'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "incover": freq };
                    }
                    break;
                case "ip":
                    if (ONEAD.response_freq_multiple['instream'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "instream": freq };
                    }
                    break;
                case "mic":
                case "mib":
                    if (ONEAD.response_freq_multiple['mobile-incover'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "mobile-incover": freq };
                    }
                    break;
                case "mif":
                    if (ONEAD.response_freq_multiple['mobile-inflip'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "mobile-inflip": freq };
                    }
                    break;
                case "ir":
                    if (ONEAD.response_freq_multiple['inread'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "inread": freq };
                    }
                    break;
                case "mir":
                    if (ONEAD.response_freq_multiple['mobile-inread'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "mobile-inread": freq };
                    }
                    break;
                case "mit":
                    if (ONEAD.response_freq_multiple['mobile-intop'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "mobile-intop": freq };
                    }
                    break;
                case "mair":
                    if (ONEAD.response_freq_multiple['mobile-app-inread'] === undefined) {
                        return;
                    } else {
                        ONEAD.response_freq_multiple = { "mobile-app-inread": freq };
                    }
                    break;
                default:
                    break;
            }
        }

        if (aryPara["onead_pid"]) {
            ONEAD.dedicated_pid = aryPara["onead_pid"];
        }

        // 2019/11/25 新增 onead_scopes 參數，強迫依 Direct -> Speed -> PD 方式查詢廣告
        if (aryPara["onead_scopes"] === 'all') {
            ONEAD.scopes = ["spotbuy", "speed", "speedvast"];
        }
    }
})();

// re-join the ONEAD.response_freq_multiple
if (window.ONEAD_rejoin_response_freq === undefined) {
    window.ONEAD_rejoin_response_freq = function (freq_multiple) {
        var playmodes = [];
        if (typeof freq_multiple !== 'undefined') {
            var const_modes = [ONEAD_CONST.PLAY_MODE.IR, ONEAD_CONST.PLAY_MODE.IC, ONEAD_CONST.PLAY_MODE.IN_STREAM];
            if (window.ONEAD_is_mobile()) {
                const_modes = [
                    ONEAD_CONST.PLAY_MODE.MIF,
                    ONEAD_CONST.PLAY_MODE.MIC,
                    ONEAD_CONST.PLAY_MODE.MIR,
                    ONEAD_CONST.PLAY_MODE.MAIR,
                    ONEAD_CONST.PLAY_MODE.MIT
                ];
            }

            for (var playMode in freq_multiple) {
                var freq = freq_multiple[playMode].split(/[\s,:-]+/);
                // console.log(playMode + '.' + freq.join('-'));
                for (var i = 0; i < const_modes.length; i++) {
                    if (const_modes[i] === playMode) {
                        playmodes.push(playMode + '.' + freq.join('-'));
                    }
                }
            }
            // console.log(playmodes.join('_'));
        }
        return playmodes.join('_');
    };
}
// publisher can overwrite this function by their js
if (ONEAD.ONEAD_slot === undefined) {
    ONEAD.ONEAD_slot = function (slot_id, play_mode) {

        play_mode = typeof play_mode !== 'undefined' ? play_mode : ONEAD_CONST.PLAY_MODE.IN_STREAM;
        var wrapper_id = '';

        // record the slot_id
        ONEAD.slot_id = ONEAD.slot_id || [];
        // slot_id = slot_id + ONEAD.isip_index;
        ONEAD.slot_id[play_mode] = slot_id;
        //console.log(ONEAD.slot_id);
        // ONEAD.wrapper_multiple is high priority
        if (typeof ONEAD.wrapper_multiple !== 'undefined') {

            // default is ONEAD_CONST.PLAY_MODE.IN_STREAM
            if (typeof ONEAD.wrapper_multiple[ONEAD_CONST.PLAY_MODE.IN_STREAM] === 'undefined') {
                ONEAD.wrapper_multiple[ONEAD_CONST.PLAY_MODE.IN_STREAM] = ONEAD.wrapper;
            }

            if (typeof ONEAD.wrapper_multiple[play_mode] !== 'undefined') {
                //@Vic FRON-424 因應多查inread，讓 wrapper 加上 isip_index ，使卷軸滾動能抓到正確的廣告
                wrapper_id = ONEAD.wrapper_multiple[play_mode] + '-' + ONEAD.isip_index;
            } else {
                // wrapper is undefined
                return;
            }
        }

        // ONEAD.wrapper is low priority
        if (wrapper_id.length === 0 && play_mode === ONEAD_CONST.PLAY_MODE.IN_STREAM) {
            if (typeof ONEAD.wrapper !== 'undefined') {
                wrapper_id = ONEAD.wrapper;
            }
        }

        var div;

        if (ONEAD.slot_limit !== undefined && ONEAD.slot_limit.height !== undefined && ONEAD.slot_limit.width !== undefined) {
            if (slot_id) {
                div = document.getElementById(slot_id);
                if (typeof div !== 'undefined' && div != null) {
                    // append, not replace
                    //@zone FRON-78 只有桌機刪除多餘的結構與屬性
                    switch (play_mode) {
                        case ONEAD_CONST.PLAY_MODE.IC:
                        case ONEAD_CONST.PLAY_MODE.IN_STREAM:
                        case ONEAD_CONST.PLAY_MODE.IR:
                            div.innerHTML = '<div id="' + wrapper_id + '" class="' + play_mode + '" style="margin-left: auto; margin-right: auto; text-align: left"></div>';
                            break;
                        default:
                            div.innerHTML = '<center><a href="#onead"></a><div><div id="' + wrapper_id + '" class="' + play_mode + '" style="text-align: center; margin-left: auto; margin-right: auto;"></div></div></center>';
                            break;
                    }
                }
            } else {
                //@zone FRON-78 只有桌機刪除多餘的結構與屬性
                switch (play_mode) {
                    case ONEAD_CONST.PLAY_MODE.IC:
                    case ONEAD_CONST.PLAY_MODE.IN_STREAM:
                    case ONEAD_CONST.PLAY_MODE.IR:
                        document.write('<div id="' + wrapper_id + '" class="' + play_mode + '" style="margin-left: auto; margin-right: auto;"></div>');
                        break;
                    default:
                        document.write('<center><a href="#onead"></a><div><div id="' + wrapper_id + '" class="' + play_mode + '" style="text-align: center; margin-left: auto; margin-right: auto;"></div></div></center>');
                        break;
                }
            }
        }
    };
    if (ONEAD.oldMedia !== undefined && ONEAD.oldMedia) {
        parent.ONEAD_slot = ONEAD.ONEAD_slot;
    }
}

(function () {
    // ONEAD._is_created_dom_type_runned = false;
    // debugger;

    var ONEAD_async_load = function () {
        // check client's device
        if (!window.ONEAD_checkIsCompatible()) {
            return false;
        }
        // ====== 根據 UID 進行排除廣告設定 ======
        // 若需針對媒體進行特定條件排除廣告請由此進行設定.
        // check_is_compatible.js ONEAD 物件取得不正確, 因此無法正常排除投遞, 在修正前皆由此處進行設定.
        // switch (ONEAD.uid) {
        //     case '1000107':
        //         if (window.ONEAD_is_ios()) {
        //             // @Ryan coco01 若裝置為 ios 則排除投放 MIC 系列 (含 MIB, 因 play_mode 同樣為 mobile-incover).
        //             var excludePlayMode = ONEAD_CONST.PLAY_MODE.MIC;
        //             if (ONEAD.response_freq_multiple !== undefined && ONEAD.response_freq_multiple[excludePlayMode] !== undefined) {
        //                 ONEAD.response_freq_multiple[excludePlayMode] = '';
        //                 ONEAD.dedicated_pid = 0;
        //             }
        //         }
        //         break;
        //     default:
        //         break;
        // }
        // ====== 排除廣告設定 結束 ======

        // front-end width, height
        if (typeof ONEAD.slot_limit === 'undefined') {
            // && ONEAD.slot_limit.height && ONEAD.slot_limit.width
            // default
            ONEAD.slot_limit = { width: 950, height: 390 };
        }

        // excute all of cmd
        // if (typeof ONEAD.cmd !== 'undefined' && ONEAD.cmd instanceof Array) {
        //     var fn = false;
        //     while ((fn = ONEAD.cmd.shift())) {
        //         fn();
        //         fn = false;
        //     }
        // }

        // replace for $.param
        var to_param = function (obj) {
            // @Ryan FRON-1991 先將 player_type 存起來, 並從物件中移除, 待 External_Url 參數組好再將 player_type 寫進去.
            var playerType = obj.player_type;
            delete obj.player_type;

            var r20 = /%20/g;
            var s = [];
            if (obj.length === undefined) {
                for (var name in obj) {
                    if (obj[name].constructor === Array) {
                        // array
                        // console.log('obj[name].length:' + obj[name].length);
                        for (var i = 0; i < obj[name].length; i++) {
                            var tmp = obj[name][i];
                            // console.log(tmp);
                            var v = tmp;
                            if (isNaN(v)) {
                                v = encodeURIComponent(tmp);
                            }
                            s[s.length] = encodeURIComponent(name + "[]") + "=" + v;
                        }
                    } else {
                        s[s.length] = encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]);

                    }
                }
            }

            var result = s.join("&").replace(r20, "+") + "&_t=" + (+ new Date());

            //廣告查詢範圍設定, 沒有設定或者是空陣列時, 查詢網址皆不出現scopes
            if (ONEAD.scopes !== undefined && typeof ONEAD.scopes.map === 'function' && ONEAD.scopes.length >= 1) {
                var tmpStr = '&scopes[]=';
                result += tmpStr + ONEAD.scopes.join(tmpStr);
            }
            // @Ryan FRON-1991 DFP 嵌入碼若 player_type 為空陣列, 查詢網址不顯示.
            if (Array.isArray(playerType) && playerType.length > 0) {
                playerType.forEach(function (type) {
                    // @Ryan 判斷是否為string, 是則強制轉大寫在比較, 預防使用者輸入小寫或非字串內容.
                    type = typeof type === "string" ? type.toLocaleUpperCase() : type;
                    for (var prop in ONEAD_CONST.PLAYER_TYPE) {
                        if (type === ONEAD_CONST.PLAYER_TYPE[prop]) {
                            result += '&player_type=' + type;
                        }
                    }
                });
            }
            return result;
        };

        ONEAD.to_param = to_param;

        var r_freq = new Array(0); // -1, array, {start, step}
        var arr_freq = new Array(0);
        var i;


        // response_freq, by start & step
        if (typeof ONEAD.response_freq !== 'undefined') {
            if (ONEAD.response_freq === -1) {
                ONEAD.response_freq = { start: 1, step: 1 };
            } else {
                r_freq = ONEAD.response_freq;
            }
            if (ONEAD.response_freq.start && ONEAD.response_freq.step) {
                if (ONEAD.response_freq.start > 0 && ONEAD.response_freq.step > 0) {
                    i = ONEAD.response_freq.start;
                    for (i; i < 100; i += ONEAD.response_freq.step) {
                        arr_freq.push(i);
                    }
                }
                r_freq = arr_freq;
                // console.log('r_freq:' + r_freq.length);
            }
            // ONEAD.response_freq
        }



        // response_freq_multiple
        var multiple_freq = '';
        if (typeof ONEAD.response_freq_multiple === 'undefined') {
            ONEAD.response_freq_multiple = {
                instream: r_freq.join(',')
            };
        }

        /***************************************************************************
                                    QUERY AD DEBUG MODE
        ****************************************************************************/

        (function () {
            var debug = window.location.hash.indexOf('oneaddebug_') !== -1;
            var freq = {};

            if (debug) {
                var mode = window.location.hash.split('_')[1];
                var freq_params = [];

                for (var i = 1; i <= 50; i++) {
                    freq_params.push(i);
                }

                freq[mode] = freq_params.join(',');

            } else {
                freq = ONEAD.response_freq_multiple;
            }

            // multiple_freq = window.ONEAD_rejoin_response_freq(ONEAD.response_freq_multiple);
            multiple_freq = window.ONEAD_rejoin_response_freq(freq);
        })();

        // if multiple_freq is empty, stop query ads
        //// FRON-2160 註解下段
        // if (multiple_freq === '') {
        //     ONEAD.log_multiple_freq = 'is_empty';
        //     return false;
        // }

        // parameters for GET
        //FRON-1013 external.php 已拿掉 ONEAD_version
        var p = {
            // version: window.ONEAD_version + 'js',
            adid: ONEAD.ad_id || "",
            category: -1,
            cookie: window.ONEAD_checkCookie().toString(),
            uid: ONEAD.uid,
            // guid: '',
            ip: '',
            // empty for auto detect
            volume: (ONEAD.volume ? ONEAD.volume : 0),
            channel: (ONEAD.channel ? ONEAD.channel : 0),
            isip_index: ONEAD.isip_index
        };

        if (multiple_freq.length > 0) {
            p.response_freq_multiple = multiple_freq;
        }
        ONEAD.request = p;
        // TODO comment
        if (window.ONEAD !== undefined && ONEAD.category !== undefined && ONEAD.category !== "") {
            p.category = ONEAD.category;
        } else if (ONEAD.category !== undefined && ONEAD.category !== "") {
            p.category = ONEAD.category;
        }

        // wmode
        if (window.ONEAD !== undefined && ONEAD.wmode !== undefined && ONEAD.wmode !== "") {
            p.wmode = ONEAD.wmode;
        } else if (ONEAD.wmode !== undefined && ONEAD.wmode !== "") {
            p.wmode = ONEAD.wmode;
        }

        // connect to server, get an embedded code
        if (window.ONEAD !== undefined && ONEAD.dedicated_pid !== undefined) {
            p.dedicated_pid = encodeURIComponent(ONEAD.dedicated_pid);

            if (ONEAD.is_custom_pid !== undefined) {
                p.is_custom_pid = 'true';
            }

            if (ONEAD.force_backend !== undefined && ONEAD.force_backend === true) {
                p.force_backend = 'true';
            }

        } else if (ONEAD.dedicated_pid !== undefined) {
            p.dedicated_pid = encodeURIComponent(ONEAD.dedicated_pid);

            if (ONEAD.is_custom_pid !== undefined) {
                p.is_custom_pid = 'true';
            }
            if (ONEAD.force_backend !== undefined && ONEAD.force_backend === true) {
                p.force_backend = 'true';
            }
        }
        // @Ryan FRON-1991 設定 player_type.
        if (ONEAD && ONEAD.player_type) {
            p.player_type = ONEAD.player_type;
        }

        // front-end width, height
        if (ONEAD.slot_limit && ONEAD.slot_limit.height && ONEAD.slot_limit.width) {
            p.slot_limit_width = ONEAD.slot_limit.width;
            p.slot_limit_height = ONEAD.slot_limit.height;
        }

        if (typeof ONEAD.slot_limit_multiple !== 'undefined') {

            var mode, modes = [ONEAD_CONST.PLAY_MODE.IR, ONEAD_CONST.PLAY_MODE.IC, ONEAD_CONST.PLAY_MODE.IN_STREAM];
            for (i = 0; i < modes.length; i++) {
                mode = modes[i];
                if (typeof ONEAD.slot_limit_multiple[mode] === 'undefined') {
                    break;
                }

                if (typeof ONEAD.slot_limit_multiple[mode].width !== 'undefined') {
                    eval('p.slot_limit_' + mode + '_width=' + ONEAD.slot_limit_multiple[mode].width);
                }
                if (typeof ONEAD.slot_limit_multiple[mode].height !== 'undefined') {
                    eval('p.slot_limit_' + mode + '_height=' + ONEAD.slot_limit_multiple[mode].height);
                }
            }
        }

        //@zone FRON-477 referrer 和 location 都由前端送 window.top 的資料
        //@FRON-903
        (function () {
            var web_location;
            var web_referrer;
            var web_title;
            try {
                web_location = window.top.location;
                web_referrer = window.top.document.referrer;
                web_title = window.top.document.title;
            } catch (e) {
                web_location = window.location;
                web_referrer = window.document.referrer;
                web_title = window.document.title;
            }
            //@zone FRON-477 web_location 和 web_referrer 這邊先不 encode
            p.web_location = web_location;
            p.r = web_referrer;
            p.title = web_title;
        })();





        //FRON-903
        var _external = ONEAD.external_url.split('//')[1];
        ONEAD.external_url = 'https://' + _external;

        //FRON-990
        ONEAD_PIXEL_ISIP.cscb_ary.push(ONEAD.oid_call);

        var _hasOneFP = ONEAD.get_cookie('one_fp');

        //window.console.log("_OneFP: ", _hasOneFP);
        if (!_hasOneFP) {

            if (ONEAD_CONST.ETAG_SERVICE.FP === "" || ONEAD_CONST.ETAG_SERVICE.FP === undefined) {// FORN-820
                var fp = new ONEAD_CONST.Fingerprint2({ excludeFlashFonts: true });
                // window.console.log('ONEAD_CONST.ETAG_SERVICE.FP: ', ONEAD_CONST.ETAG_SERVICE.FP);
                fp.get(function (result) {
                    if (typeof result === 'undefined') {
                        result = "";
                    }
                    //@sam FRON-980
                    p.fp = ONEAD_CONST.ETAG_SERVICE.FP = result;
                    //window.console.log("_OneFP_1stValue: ", p.fp);
                    ONEAD.appned_tag(ONEAD.external_url + ONEAD_CONST.ETAG_SERVICE.SERV);
                    //===========

                });
                //FRON-2438 TVBS客製化
                var isNeedEncode = true;
                if (ONEAD.uid === "1000084") {
                    isNeedEncode = false;
                    ONEAD.set_cookie('one_fp', ONEAD_CONST.ETAG_SERVICE.FP, isNeedEncode);
                } else {
                    //FRON-2348 有 FP 存入 cookie
                    ONEAD.set_cookie('one_fp', ONEAD_CONST.ETAG_SERVICE.FP, isNeedEncode);
                }
            }

        } else {
            //@sam FRON-980
            //====etag===
            p.fp = ONEAD_CONST.ETAG_SERVICE.FP = _hasOneFP;
            //window.console.log("_OneFP_oldValue: ", p.fp);
            ONEAD.appned_tag(ONEAD.external_url + ONEAD_CONST.ETAG_SERVICE.SERV);
        }
        // window.console.log("ONEAD_CONST.ETAG_SERVICE.FP2=", ONEAD_CONST.ETAG_SERVICE.FP);


        setTimeout(function () {
            //point 4
            p.cu2 = "oid_time_out";
            ONEAD.ONEAD_adQuery(p);//p = ONEAD.request
        }, 3000);

    };

    // won't query ads if ONEAD, ONEAD.uid, ONEAD.external_url is undefined
    if (!(ONEAD && ONEAD.uid && ONEAD.external_url)) {
        return;
    }

    // if( typeof ONEAD.premium_query !== 'undefined' && ONEAD.premium_query === true && window.ONEAD_is_mobile() ){

    ONEAD_async_load();

    return;


})();
