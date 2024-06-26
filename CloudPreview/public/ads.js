// Copyright 2013 Google Inc. All Rights Reserved.
// You may study, modify, and use this example for any purpose.
// Note that this example is provided "as is", WITHOUT WARRANTY
// of any kind either expressed or implied.

var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var playButton;
var videoContent;
var muteImg = {};
var mute_img_src;
var unmute_img_src;
var DEBUG_MODE = DEBUG_MODE || false;
var is_mobile = is_mobile || false;
var url = window.location.href;
var w = window.innerWidth;
var h = window.innerHeight;
const controlContent = document.querySelector('#mainContainer #content');
controlContent.style.width = `${w}px`;
controlContent.style.height = `${h}px`;
if (DEBUG_MODE) {
    mute_img_src = 'https://staging-occ.onead.tw/images/instream_mute.svg';
    unmute_img_src = 'https://staging-occ.onead.tw/images/instream_volume.svg';
} else {
    mute_img_src = 'https://staging-occ.onead.tw/images/instream_mute.svg';
    unmute_img_src = 'https://staging-occ.onead.tw/images/instream_volume.svg';
}

console.log('[oneads] ads');
function init() {
    videoContent = document.getElementById('contentElement');
    videoContent.style.position = 'absolute';
    playButton = document.getElementById('playButton');
    playButton.style.display = 'none';
    playButton.addEventListener('click', playAds);
    setUpIMA();
    appendMute();
}

function appendMute() {
    let mute_div = document.createElement('div');
    mute_div.id = 'mute_div';
    let mute_div_css = {
        position: 'absolute',
        'z-index': '2147483647',
        bottom: '0',
        'text-align': 'center',
        margin: '0 0 8px 8px',
        height: '32px',
        width: '32px',
    };

    for (let c in mute_div_css) {
        mute_div.style.setProperty(c, mute_div_css[c]);
    }

    // if (is_mobile) {
    // mute_div.style.top = "85%"
    // }
    let mute_img = document.createElement('img');
    mute_img.src = mute_img_src;
    mute_img.id = 'mute_img';
    mute_img.style.width = '30px';
    mute_img.style.margin = '0 auto';

    mute_img.addEventListener('click', function () {
        muteImg.mute.style.display = 'none';
        muteImg.unmute.style.display = 'block';
        adsManager.setVolume(1);
    });

    let unmute_img = document.createElement('img');

    unmute_img.src = unmute_img_src;
    unmute_img.id = 'unmute_img';
    unmute_img.style.display = 'none';
    unmute_img.style.width = '30px';
    unmute_img.style.margin = '0 auto';

    unmute_img.addEventListener('click', function () {
        muteImg.unmute.style.display = 'none';
        muteImg.mute.style.display = 'block';
        adsManager.setVolume(0);
    });

    let content = document.getElementById('content');
    mute_div.appendChild(mute_img);
    mute_div.appendChild(unmute_img);
    content.appendChild(mute_div);

    muteImg.mute = mute_img;
    muteImg.unmute = unmute_img;

    let urlPath = new URL(url).searchParams;
    let tip_div = document.getElementById('tip');
    let paramW = urlPath.get('w');
    let paramH = urlPath.get('h');
    let mainContainer = document.getElementById('mainContainer');
    if (url && (url.toLocaleLowerCase().indexOf('hidevolume') > -1 || url.toLocaleLowerCase().indexOf('hvb') > -1)) {
        mute_div.style.setProperty('display', 'none', 'important');
        tip_div && tip_div.style.setProperty('display', 'none', 'important');
    }
    if (paramW) {
        w = parseInt(paramW);
        mainContainer.style.width = `${w}px`;
        content.style.width = `${w}px`;
    }
    if (paramH) {
        mainContainer;
        h = parseInt(paramH);
        mainContainer.style.height = `${h}px`;
        content.style.height = `${h}px`;
    }

    console.log(muteImg);
}

function setUpIMA() {
    // Create the ad display container.
    createAdDisplayContainer();
    // Create ads loader.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.
    var contentEndedListener = function () {
        adsLoader.contentComplete();
    };
    videoContent.onended = contentEndedListener;

    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = OneadVastUrl;

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = 640;
    adsRequest.linearAdSlotHeight = 400;

    adsRequest.nonLinearAdSlotWidth = 640;
    adsRequest.nonLinearAdSlotHeight = 150;

    adsLoader.requestAds(adsRequest);
}

function createAdDisplayContainer() {
    // We assume the adContainer is the DOM id of the element that will house
    // the ads.
    adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('adContainer'), videoContent);
}

function playAds() {
    // Initialize the container. Must be done via a user action on mobile devices.
    videoContent.load();
    adDisplayContainer.initialize();
    // document.getElementById('adContainer').addEventListener("click", function (e) {
    //     adsManager.setVolume(1);
    // })
    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(w, h, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();
    } catch (adError) {
        console.log('[ERROR] ', adError);
        // console.error(adError)
        videoContent.play();

        // An error may be thrown if there was a problem with the VAST response.
    }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Get the ads manager.
    var adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    adsRenderingSettings.loadVideoTimeout = 10000;
    // videoContent should be set to the content video element.
    adsManager = adsManagerLoadedEvent.getAdsManager(videoContent, adsRenderingSettings);

    // Add listeners to the required events.
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAdEvent);

    // Listen to any additional events, if necessary.
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);

    playAds();
}

function onAdEvent(adEvent) {
    // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
    // don't have ad object associated.
    var ad = adEvent.getAd();
    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            // This is the first event sent for an ad - it is possible to
            // determine whether the ad is a video ad or an overlay.
            if (!ad.isLinear()) {
                // Position AdDisplayContainer correctly for overlay.
                // Use ad.width and ad.height.
                videoContent.play();
            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            // This event indicates the ad has started - the video player
            // can adjust the UI, for example display a pause button and
            // remaining time.
            if (ad.isLinear()) {
                // For a linear ad, a timer can be started to poll for
                // the remaining time.
                intervalTimer = setInterval(function () {
                    var remainingTime = adsManager.getRemainingTime();
                }, 300); // every 300ms
            }
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            // This event indicates the ad has finished - the video player
            // can perform appropriate UI actions, such as removing the timer for
            // remaining time detection.
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
            }
            break;
    }
}

function onAdError(adErrorEvent) {
    // Handle the error logging.
    console.log('[ADError]', adErrorEvent.getError());
    adsManager && adsManager.destroy();
}

function onContentPauseRequested() {
    videoContent.pause();
    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking etc.)
    // setupUIForAds();
}

function onContentResumeRequested() {
    videoContent.play();
    // This function is where you should ensure that your UI is ready
    // to play content. It is the responsibility of the Publisher to
    // implement this function when necessary.
    // setupUIForContent();
}

// Wire UI element references and UI event listeners.
init();
