const mainStyle = GM_getResourceText('IMPORTED_CSS');
const svStyle = GM_getResourceText('IMPORTED_SV_CSS');
const bodyElement = top.document.body;
const shadow = bodyElement.appendChild(document.createElement('onead-ui')).attachShadow({ mode: 'closed' });
const adInfo = GM_getValue('adInfo') ? JSON.parse(GM_getValue('adInfo')) : {};
const svInfo = GM_getValue('svInfo') ? JSON.parse(GM_getValue('svInfo')) : {};
let isSliderActive = false;

let dialog;
const appendStyleSheet = (body, css) => {
    GM_addElement(body, 'style', { textContent: css });
};
const isRequireSelector = () => {
    return adInfo.playmodeValue === 'MIR' || adInfo.playmodeValue === 'TD' || adInfo.playmodeValue === 'IP' || adInfo.playmodeValue === 'IR';
};
const mapToArray = (mapObj) => {
    const result = [];
    for (let i of mapObj.entries()) {
        result.push(i);
    }
    return result;
};

const playerModeMap = new Map([
    ['MFS', 'mobile-fullscreen'],
    ['MIR', 'mobile-inread'],
    ['ㄇ簾', 'desktop-frame'],
    ['TD', 'text-drive'],
    ['IP', 'instream'],
    ['IR', 'inread'],
]);

const tagIdMap = new Map([
    ['MIR', 'oneadMIRSPEEDDFPTag'],
    ['MFS', 'oneadMFSSPEEDDFPTag'],
    ['TD', 'oneadTDTag'],
]);

const adCaller = ({ sourceValue, playmodeValue, pid, uid }, targetDiv) => {
    const adsrvMap = {
        staging: 'https://staging.onead.com.tw/',
        onevision: 'https://onead.onevision.com.tw/',
    };
    const custom_call = function () {};
    const adsDiv = document.createElement('div');
    adsDiv.id = tagIdMap.get(playmodeValue);
    targetDiv.appendChild(adsDiv);
    const ONEAD_TEXT = (unsafeWindow.top.ONEAD_TEXT = {});
    const _ONEAD = (unsafeWindow.top._ONEAD = {});
    if (playmodeValue !== 'TD') {
        _ONEAD.pub = {};
        _ONEAD.pub.slotobj = adsDiv;
        _ONEAD.pub.slots = ['div-onead-ad'];
        _ONEAD.pub.uid = uid;
        _ONEAD.pub.host = adsrvMap[sourceValue];
        _ONEAD.pub.servingFlag = 1;
        _ONEAD.pub.player_mode_div = 'div-onead-ad';
        _ONEAD.pub.player_mode = playerModeMap.get(playmodeValue);
        _ONEAD.pub.scopes = ['speed'];
        _ONEAD.pub.dedicated_pid = pid;
        _ONEAD.pub.queryAdCallback = custom_call;
        unsafeWindow.top.ONEAD_pubs = [];
        unsafeWindow.top.ONEAD_pubs.push(_ONEAD);
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://ad-specs.guoshipartners.com/static/js/onead-lib.min.js';
        bodyElement.appendChild(scriptElement);
    } else {
        ONEAD_TEXT.pub = {};
        ONEAD_TEXT.pub.uid = uid;
        ONEAD_TEXT.pub.dedicated_pid = pid;
        ONEAD_TEXT.pub.host = adsrvMap[sourceValue];
        ONEAD_TEXT.pub.slotobj = adsDiv;
        ONEAD_TEXT.pub.max_threads = 1;
        ONEAD_TEXT.pub.player_mode = 'text-drive';
        ONEAD_TEXT.pub.queryAdCallback = custom_call;
        ONEAD_TEXT.pub.servingFlag = 1;
        unsafeWindow.top.ONEAD_text_pubs = [];
        unsafeWindow.top.ONEAD_text_pubs.push(ONEAD_TEXT);
        const scriptElement = document.createElement('script');
        scriptElement.async = false;
        scriptElement.src = 'https://ad-specs.guoshipartners.com/static/js/ad-serv.min.js';
        bodyElement.appendChild(scriptElement);
    }
};
const setVideoListener = (videoElement) => {
    videoElement.addEventListener('playing', () => {
        document.getElementById('control-pause777').style.display = 'flex';
        document.getElementById('control-play777').style.display = 'none';
    });
    videoElement.addEventListener('pause', () => {
        document.getElementById('control-pause777').style.display = 'none';
        document.getElementById('control-play777').style.display = 'flex';
    });
    videoElement.addEventListener('volumechange', () => {
        if (videoElement.muted) {
            document.getElementById('control-on777').style.display = 'none';
            document.getElementById('control-off777').style.display = 'flex';
        } else {
            document.getElementById('control-on777').style.display = 'flex';
            document.getElementById('control-off777').style.display = 'none';
        }
    });
};
const generateGliaPlayer = (mainAdContainer, container, video) => {
    const gliaUi = document.createElement('div');
    gliaUi.id = 'glia-ui777';
    gliaUi.style.background = '#00000033';
    gliaUi.style.position = 'absolute';
    gliaUi.style.display = 'flex';
    gliaUi.style.bottom = '0px';
    gliaUi.style.padding = '4px 27px';
    gliaUi.style.gap = '5px';
    gliaUi.innerHTML = `
                    <div id="control-pause777" style="cursor:pointer; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" style="fill: white;"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
                    </div>
                    <div id="control-play777" style="cursor:pointer; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" style="fill: white;"><path d="M320-202v-560l440 280-440 280Z"/></svg>
                    </div>
                    <div id="glia-control-vol777">
                        <div id="control-on777" style="cursor:pointer; align-items: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 40" fill="none">
                                <rect y="12.54" width="15" height="15" fill="white"/>
                                <path d="M1 20L17.5 2.67949V37.3205L1 20Z" fill="white"/>
                            </svg>
                        </div>
                        <div id="control-off777" style="cursor:pointer; align-items: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 41" fill="none">
                                <rect y="13" width="15" height="15" fill="#5F94A0"/>
                                <path d="M1 20.46L17.5 3.1395V37.7805L1 20.46Z" fill="#5F94A0"/>
                            </svg>
                        </div>
                        <input id="volume-slider" class="glia777-slider" type="range" min="0" max="100" value="0" />
                    </div>
            `;
    container.appendChild(video);
    mainAdContainer.appendChild(container);
    mainAdContainer.appendChild(gliaUi);

    video.play();
    const volumeHandler = (x, containerWidth) => {
        let result;
        if ((x / containerWidth) * 100 > 80) {
            result = 100;
        } else if ((x / containerWidth) * 100 < 20) {
            result = 0;
        } else {
            result = (x / containerWidth) * 100;
        }
        return result;
    };
    document.getElementById('control-play777').addEventListener('click', () => video.play());
    document.getElementById('control-pause777').addEventListener('click', () => video.pause());
    document.getElementById('control-on777').addEventListener('click', () => {
        video.muted = true;
    });
    document.getElementById('glia-ui777').addEventListener('mouseenter', () => {
        document.querySelector('#glia-control-vol777 .glia777-slider').classList.add('expand');
    });
    document.getElementById('glia-ui777').addEventListener('mouseleave', () => {
        document.querySelector('#glia-control-vol777 .glia777-slider').classList.remove('expand');
    });
    document.getElementById('control-off777').addEventListener('click', () => {
        video.muted = false;
    });
    document.getElementById('volume-slider').addEventListener('input', (e) => {
        const volume = +e.target.value;
        video.muted = !!!volume;
        // document.getElementById('volume-num').textContent = `${volume}%`;
        // video.volume = volume / 100;
    });
};
const generateTruvidPlayer = (mainAdContainer, container, video) => {
    const truvidUi = document.createElement('div');
    truvidUi.style.color = '#ffffff';
    truvidUi.style.background = '#0f141633';
    truvidUi.style.position = 'absolute';
    truvidUi.style.display = 'flex';
    truvidUi.style.bottom = '0px';
    truvidUi.style.height = '28px';
    truvidUi.style.justifyContent = 'space-evenly';
    truvidUi.style.alignItems = 'center';
    truvidUi.style.width = '100px';
    truvidUi.style.padding = '0px';
    truvidUi.innerHTML = `
                    <div id="control-pause777" style="cursor:pointer; display:flex; width:10px; height: 22px; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="40" viewBox="0 0 38 40" fill="none"><rect width="12.6667" height="40" fill="#D6D6D7"/><rect x="25.3333" width="12.6667" height="40" fill="#D6D6D7"/></svg>
                    </div>
                    <div id="control-play777" style="cursor:pointer; display:flex; width:10px; height: 22px; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" viewBox="0 0 35 40" fill="none"><path d="M35 20L0.5 39.9186L0.5 0.0814152L35 20Z" fill="#D6D6D7"/></svg>
                    </div>
                    <div id="control-on777" style="cursor:pointer; display:flex; width:8px; height: 22px; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42" fill="none" style="width: 100%; height: 100%;"><rect y="13.9434" width="13.9812" height="14" fill="#D6D6D7"/><path d="M7.02826 21L22.7571 2.81347L22.7571 39.1865L7.02826 21Z" fill="#D6D6D7"/></svg>
                    </div>
                    <div id="control-off777" style="cursor:pointer; display:flex; width:8px; height: 22px; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42" fill="none" style="width: 100%; height: 100%;"><rect y="13.9434" width="13.9812" height="14" fill="#FF0000"/><path d="M7.02824 21L22.7571 2.81347L22.7571 39.1865L7.02824 21Z" fill="#FF0000"/></svg>
                    </div>
                    <div id="control-text" style="cursor:pointer; display:flex; align-items: center; font-size:12px; font-family: sans-serif; font-weight: bold;">
                        Ad
                    </div>
            `;
    container.appendChild(video);
    mainAdContainer.appendChild(container);
    mainAdContainer.appendChild(truvidUi);

    video.play();
    document.getElementById('control-play777').addEventListener('click', () => video.play());
    document.getElementById('control-pause777').addEventListener('click', () => video.pause());
    document.getElementById('control-on777').addEventListener('click', () => {
        video.muted = true;
    });
    document.getElementById('control-off777').addEventListener('click', () => {
        video.muted = false;
    });
};
const buildDialog = () => {
    dialog = document.createElement('dialog');
    dialog.id = 'onead-dialog777';
    dialog.innerHTML = `
    <span class="onead-tab777">
      <span id="outstream-tab" class="tab-active">outstream</span>
      <span id="instream-tab">instream</span>
    </span>
    <div class="onead-cards777">
     <div id="outstream-card" class="onead-card777">
      <form id="onead-form777" method="dialog">
       <div id="onead-form-body777" class="onead-form-style777">
         <div><span class="fw-bold">廣告來源:</span>
           <input type="radio" id="staging" value="staging" name="source777" ${adInfo?.sourceValue === 'staging' ? 'checked' : ''}/>
           <label for="staging">測試機</label>
           <input type="radio" id="onevision" value="onevision" name="source777" ${adInfo?.sourceValue === 'onevision' ? 'checked' : ''}/>
           <label for="onevision">正式機</label>
         </div>
         <div><span class="fw-bold">playmode:</span>
           ${mapToArray(playerModeMap)
               .map(
                   (item) => `<input type="radio" id=${item[0]} value=${item[0]} name="playmode777" ${adInfo?.playmodeValue === item[0] ? 'checked' : ''}/>
           <label for="MFS">${item[0] === 'MFS' ? '蓋板' : item[0]}</label>`
               )
               .join(' ')}
         </div>
         <div style="display: flex; gap: 5px; word-wrap:normal;">
           <label class="fw-bold" for="pid">PID:</label>
           <input type="number" id="pid777" class="onead-ui-input" name="pid" value="${adInfo?.pid ? adInfo.pid : ''}"/>
         </div>
         <div style="display: flex; gap: 5px; word-wrap:normal;">
           <label class="fw-bold" for="uid">UID:</label>
           <input type="number" id="uid777" class="onead-ui-input" name="uid" value="${adInfo?.uid ? adInfo.uid : ''}"/>
         </div>
         <input type="submit" class="onead-submit-button777" value="OK"/>
       </div>
      </form>
      <div id="cover-description" class="desc-title777" style="display:${!isRequireSelector() ? 'block' : 'none'};"><div class="fw-bold">說明:</div>
       <ol class="desc777">
         <li>資料填完整</li>
         <li>點 OK</li>
         <li>按 shift + r 查廣告</li>
         <li>點滑一下觸發廣告</li>
       </ol>
      </div>
      <div id="inread-description" class="desc-title777" style="display:${isRequireSelector() ? 'block' : 'none'};"><div class="fw-bold">說明:</div>
       <ol class="desc777">
         <li>資料填完整</li>
         <li>段落Selector: <input class="onead-ui-input" name='input-element' placeholder:''/></li>
         <li>點 OK</li>
         <li>按 shift + r 在該段落加入廣告</li>
       </ol>
      </div>
      </div>
     <div id="instream-card" class="onead-card777">
      <form id="onead-sv777" method="dialog">
       <div class="onead-form-style777">
        <div>
            <span class="fw-bold">選擇player:</span>
            <input type="radio" id="glia" value=1 name="player777" ${svInfo?.playerValue === '1' ? 'checked' : ''}/>
            <label for="glia">glia</label>
            <input type="radio" id="truvid" value=0 name="player777" ${svInfo?.playerValue === '0' ? 'checked' : ''}/>
            <label for="truvid">truvid</label>
         </div>
        <div style="display: flex; gap: 5px; word-wrap:normal; flex-direction: column;">
         <div style="display: flex; gap: 5px;">
          <span class="fw-bold">影片連結:</span>
          <input type="text" id="sv-url" name="sv777" class="onead-ui-input" placeholder="sv url" value="${svInfo?.url ? svInfo.url : ''}"/>
         </div>
         <div style="display: flex; gap: 5px;">
          <span class='fw-bold'>導外連結:</span>
          <input type='text' id='sv-link' name='sv-link777' class='onead-ui-input' placeholder='sv link' value="${svInfo?.link ? svInfo.link : ''}"/>
        </div>

        </div>
        <input type="submit" class="onead-submit-button777" value="OK"/>
       </div>
      </form>
      <div id="SV-description" class="desc-title777"><div class="fw-bold">SV 說明:</div>
       <ol class="desc777">
         <li>確認 glia 或 truvid player 存在</li>
         <li>選擇 player</li>
         <li>填寫廣告影片網址</li>
         <li>點 OK</li>
         <li>player會被替換</li>
       </ol>
      </div>
     </div>
    </div>
    `;
};
(function () {
    'use strict';
    appendStyleSheet(shadow, mainStyle);
    appendStyleSheet(bodyElement, svStyle);
    buildDialog();
    shadow.appendChild(dialog);
    shadow.querySelectorAll('input[type=radio][name=playmode777]').forEach((item) => {
        item.addEventListener('change', ({ target }) => {
            adInfo.playmodeValue = target.value;
            shadow.querySelector('#cover-description').style.display = 'none';
            shadow.querySelector('#inread-description').style.display = 'none';
            if (isRequireSelector()) {
                shadow.querySelector('#inread-description').style.display = 'block';
            } else {
                shadow.querySelector('#cover-description').style.display = 'block';
            }
        });
    });
    shadow.querySelectorAll('input[type=radio][name=source777]').forEach((item) => {
        item.addEventListener('change', ({ target }) => {
            adInfo.sourceValue = target.value;
        });
    });
    shadow.querySelector('#pid777').addEventListener('change', ({ target }) => {
        adInfo.pid = target.value;
    });
    shadow.querySelector('#uid777').addEventListener('change', ({ target }) => {
        adInfo.uid = target.value;
    });
    shadow.querySelector('#onead-form777').addEventListener('submit', (e) => {
        GM_setValue('adInfo', JSON.stringify(adInfo));
    });
    shadow.querySelectorAll('input[type=radio][name=player777]').forEach((item) => {
        item.addEventListener('change', ({ target }) => {
            svInfo.playerValue = target.value;
        });
    });
    shadow.querySelector('#sv-url').addEventListener('change', ({ target }) => {
        svInfo.url = target.value;
    });
    shadow.querySelector('#sv-link').addEventListener('change', ({ target }) => {
        svInfo.link = target.value;
    });

    shadow.querySelector('#onead-sv777').addEventListener('submit', (e) => {
        GM_setValue('svInfo', JSON.stringify(svInfo));
        const player = shadow.querySelector('input[type=radio][name=player777]:checked');
        const isGlia = !!+player.value;
        const instreamAdContainer = document.querySelector('.gliaplayer-container') || document.querySelector('.trv-player-container');
        const videoContainer = document.createElement('a');
        const linkUrl = shadow.querySelector('input[name=sv-link777]').value;
        videoContainer.style.position = 'relative';
        videoContainer.style.width = '100%';
        videoContainer.style.display = 'flex';
        videoContainer.href = linkUrl;
        const video = document.createElement('video');
        video.src = shadow.querySelector('input[name=sv777]').value;
        video.style.width = '100%';
        video.muted = true;
        for (const child of instreamAdContainer.children) {
            child.remove();
        }
        if (isGlia) {
            console.log('glia');
            generateGliaPlayer(instreamAdContainer, videoContainer, video, linkUrl);
        } else {
            console.log('truvid');
            generateTruvidPlayer(instreamAdContainer, videoContainer, video, linkUrl);
        }
        setVideoListener(video);
    });
    shadow.querySelector('.onead-tab777').addEventListener('click', ({ target }) => {
        const outstreamCard = shadow.querySelector('#outstream-card');
        const instreamCard = shadow.querySelector('#instream-card');
        const outstreamTab = shadow.querySelector('#outstream-tab');
        const instreamTab = shadow.querySelector('#instream-tab');
        if (target.id === 'outstream-tab') {
            outstreamTab.classList.add('tab-active');
            instreamTab.classList.remove('tab-active');
            outstreamCard.style.display = 'block';
            instreamCard.style.display = 'none';
        } else {
            instreamTab.classList.add('tab-active');
            outstreamTab.classList.remove('tab-active');
            instreamCard.style.display = 'block';
            outstreamCard.style.display = 'none';
        }
    });
    top.document.addEventListener('keydown', function (e) {
        // shift+W 開啟設定
        if (e.shiftKey && e.keyCode === 87) {
            e.preventDefault();
            dialog.showModal();
        }
        // shift+R 查廣告
        if (e.shiftKey && e.keyCode === 82) {
            if (isRequireSelector()) {
                const targetValue = shadow.querySelector('input[name="input-element"]').value;
                const targetElement = top.document.querySelector(`${targetValue}`);
                targetElement.innerHTML = '';
                adCaller(adInfo, targetElement);
            } else {
                adCaller(adInfo, top.document.body);
            }
        }
    });
})();
