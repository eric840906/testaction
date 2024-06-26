/*!  action.js 2024-05-21 11:56:20 AM */
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
let createVerticalVideo = false;
let currentLabel = '';
let currentX; // 紀錄游標 x 座標
const fixPosIcons = [];
const fixPosIconOriginXs = [];
let isScrollPage = false;
let isTriggerPlay = false;
let muted = true;
let muteButton = null;
let pageIndex = 0;
const pageWidth = 640;
let pageNum;
let posBtnClicked = false;
let prevX = 0; // 紀錄前一個游標 x 座標
let startPosBtn;
let scrollVideo = false;
let scrollVideoPosIndex = 1;
let startX; // 紀錄觀察物起始位置 x 座標
let startPosBtnOriginX; // 返回原位置按鈕初始 x 座標
let videoContainer = null;
let videoClickArea = null;
let videoOriginX; // 影片起始位置
let videoCurrentX; // 影片當前位置
let videoElement; // 影片元件
let videoSrc; // 影片連結
let xDiff; // 紀錄游標 x 移動距離

const muteButtonImg = {
    mute: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjY0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTEuNjUzMyA1MC45MjE4QzkwLjM4NDYgNDkuNjUzMiA4OC4zMjc4IDQ5LjY1MzIgODcuMDU5MiA1MC45MjE4TDgxLjA0NjcgNTYuOTM0Mkw3NS4wMzQ2IDUwLjkyMjFDNzMuNzY2IDQ5LjY1MzUgNzEuNzA5MiA0OS42NTM1IDcwLjQ0MDUgNTAuOTIyMUM2OS4xNzE5IDUyLjE5MDggNjkuMTcxOSA1NC4yNDc2IDcwLjQ0MDUgNTUuNTE2Mkw3Ni40NTI2IDYxLjUyODNMNzAuNDQwMSA2Ny41NDA5QzY5LjE3MTQgNjguODA5NSA2OS4xNzE0IDcwLjg2NjQgNzAuNDQwMSA3Mi4xMzVDNzEuNzA4NyA3My40MDM3IDczLjc2NTYgNzMuNDAzNyA3NS4wMzQyIDcyLjEzNUw4MS4wNDY3IDY2LjEyMjVMODcuMDU5NiA3Mi4xMzUzQzg4LjMyODIgNzMuNDA0IDkwLjM4NTEgNzMuNDA0IDkxLjY1MzcgNzIuMTM1M0M5Mi45MjI0IDcwLjg2NjcgOTIuOTIyNCA2OC44MDk4IDkxLjY1MzcgNjcuNTQxMkw4NS42NDA5IDYxLjUyODNMOTEuNjUzMyA1NS41MTU5QzkyLjkyMTkgNTQuMjQ3MyA5Mi45MjE5IDUyLjE5MDUgOTEuNjUzMyA1MC45MjE4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zOS40OTA1IDQ4Ljc2MTdDMzguOTk5MSA0OS4xNDA0IDM4LjcxMTIgNDkuNzI1NiAzOC43MTEyIDUwLjM0NlY3MS4wMzA4QzM4LjcxMTIgNzEuNjUxMSAzOC45OTkxIDcyLjIzNjMgMzkuNDkwNSA3Mi42MTVMNTYuOTEyOSA4Ni4wNDAxQzU4LjIyNzkgODcuMDUzNCA2MC4xMzM3IDg2LjExNiA2MC4xMzM3IDg0LjQ1NTlWMzYuOTIwOEM2MC4xMzM3IDM1LjI2MDcgNTguMjI3OSAzNC4zMjMzIDU2LjkxMjkgMzUuMzM2NkwzOS40OTA1IDQ4Ljc2MTdaTTI0IDQ5LjM2MjFDMjIuODk1NCA0OS4zNjIxIDIyIDUwLjI1NzUgMjIgNTEuMzYyMVY3MC4wMTQ0QzIyIDcxLjExOSAyMi44OTU0IDcyLjAxNDQgMjQgNzIuMDE0NEgyOC41OTI3QzI5LjY5NzMgNzIuMDE0NCAzMC41OTI3IDcxLjExOSAzMC41OTI3IDcwLjAxNDRWNTEuMzYyMUMzMC41OTI3IDUwLjI1NzUgMjkuNjk3MyA0OS4zNjIxIDI4LjU5MjcgNDkuMzYyMUgyNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    unmute: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjY0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzguNzExMiA1MC4zNDZDMzguNzExMiA0OS43MjU2IDM4Ljk5OTEgNDkuMTQwNCAzOS40OTA1IDQ4Ljc2MTdMNTYuOTEyOSAzNS4zMzY2QzU4LjIyNzkgMzQuMzIzMyA2MC4xMzM3IDM1LjI2MDcgNjAuMTMzNyAzNi45MjA5Vjg0LjQ1NTlDNjAuMTMzNyA4Ni4xMTYgNTguMjI3OSA4Ny4wNTM0IDU2LjkxMjkgODYuMDQwMUwzOS40OTA1IDcyLjYxNUMzOC45OTkxIDcyLjIzNjQgMzguNzExMiA3MS42NTExIDM4LjcxMTIgNzEuMDMwOFY1MC4zNDZaTTIyIDUxLjM2MjFDMjIgNTAuMjU3NSAyMi44OTU0IDQ5LjM2MjEgMjQgNDkuMzYyMUgyOC41OTI3QzI5LjY5NzMgNDkuMzYyMSAzMC41OTI3IDUwLjI1NzUgMzAuNTkyNyA1MS4zNjIxVjcwLjAxNDRDMzAuNTkyNyA3MS4xMTkgMjkuNjk3MyA3Mi4wMTQ0IDI4LjU5MjcgNzIuMDE0NEgyNEMyMi44OTU0IDcyLjAxNDQgMjIgNzEuMTE5IDIyIDcwLjAxNDRWNTEuMzYyMVpNNzIuMjU1NyA1My4zNTY3QzcxLjA4NDIgNTIuMTg1MSA2OS4xODQ3IDUyLjE4NTEgNjguMDEzMSA1My4zNTY3QzY2Ljg0MTUgNTQuNTI4MiA2Ni44NDE1IDU2LjQyNzcgNjguMDEzMSA1Ny41OTkzQzY5Ljk0NDEgNTkuNTMwMyA2OS45NDQxIDYyLjY2MDkgNjguMDEzMSA2NC41OTE5QzY2Ljg0MTUgNjUuNzYzNSA2Ni44NDE1IDY3LjY2MyA2OC4wMTMxIDY4LjgzNDVDNjkuMTg0NyA3MC4wMDYxIDcxLjA4NDIgNzAuMDA2MSA3Mi4yNTU3IDY4LjgzNDVDNzYuNTI5OCA2NC41NjA0IDc2LjUyOTggNTcuNjMwOCA3Mi4yNTU3IDUzLjM1NjdaTTc1Ljk1NzYgNDcuNzk1NUM3Ny4xMjkyIDQ2LjYyMzkgNzkuMDI4NyA0Ni42MjM5IDgwLjIwMDMgNDcuNzk1NUM4Ny41NzY5IDU1LjE3MjEgODcuNTc2OSA2Ny4xMzIgODAuMjAwMyA3NC41MDg2Qzc5LjAyODcgNzUuNjgwMiA3Ny4xMjkyIDc1LjY4MDIgNzUuOTU3NiA3NC41MDg2Qzc0Ljc4NiA3My4zMzcgNzQuNzg2IDcxLjQzNzUgNzUuOTU3NiA3MC4yNjZDODAuOTkxMSA2NS4yMzI1IDgwLjk5MTEgNTcuMDcxNiA3NS45NTc2IDUyLjAzODFDNzQuNzg2IDUwLjg2NjYgNzQuNzg2IDQ4Ljk2NzEgNzUuOTU3NiA0Ny43OTU1Wk04OC4xNDQ4IDQwLjY0NTRDODYuOTczMiAzOS40NzM5IDg1LjA3MzcgMzkuNDczOSA4My45MDIxIDQwLjY0NTRDODIuNzMwNiA0MS44MTcgODIuNzMwNiA0My43MTY1IDgzLjkwMjEgNDQuODg4MUM5Mi42NTg2IDUzLjY0NDYgOTIuNjU4NiA2Ny44NDE3IDgzLjkwMjEgNzYuNTk4MkM4Mi43MzA2IDc3Ljc2OTggODIuNzMwNiA3OS42NjkzIDgzLjkwMjEgODAuODQwOEM4NS4wNzM3IDgyLjAxMjQgODYuOTczMiA4Mi4wMTI0IDg4LjE0NDggODAuODQwOEM5OS4yNDQ0IDY5Ljc0MTIgOTkuMjQ0NCA1MS43NDUxIDg4LjE0NDggNDAuNjQ1NFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
};

document.addEventListener('DOMContentLoaded', () => {
    // 覆寫掉 handleComplete 就可以拿到 exportRoot
    const oldComplete = window.handleComplete;
    let actionAdd = false;
    window.handleComplete = (evt, comp) => {
        oldComplete(evt, comp);
        customAction();
    };

    function customAction() {
        const exportRoot = window.exportRoot;
        exportRoot.mainAction = function () {
            exportRoot.stop();
            // 允許 touchmove 事件
            createjs.Touch.enable(this.parent, true, false);
            if (!actionAdd) {
                // intro 播放開始影格 MFS Play 專用
                if (exportRoot.currentLabel.indexOf('introStart') !== -1) {
                    exportRoot.stop();
                    window.oneadMaterial.setupCallbackForInfoObject({
                        callback: () => {
                            exportRoot.play();
                        },
                    });
                }

                // 接到 expand 事件後再開始播放 MIB Flash 系列 banner 專用
                if (exportRoot.currentLabel.indexOf('playAfterExpand') !== -1) {
                    window.oneadMaterial.setupTrackingEvent(function () {
                        oneadMaterial.subscribeTrackingEvent({
                            eventName: 'expand',
                            action: () => {
                                setTimeout(exportRoot.play(), 500);
                            },
                        });
                    });
                }

                if (exportRoot.currentLabel.indexOf('showVideoOutside') !== -1) {
                    showVideoOutside();
                }

                // 監聽 label 變化為 stop 開頭的內容時暫停
                function checkLabelChange() {
                    if (exportRoot.currentLabel && exportRoot.currentLabel !== currentLabel) {
                        if (exportRoot.currentLabel.indexOf('stop') !== -1) {
                            exportRoot.stop();
                        }
                        // intro 播放結束影格 MFS Play 專用
                        if (exportRoot.currentLabel.indexOf('introEnd') !== -1) {
                            window.oneadMaterial.isFrameRunEnd({
                                isFrameRunEnd: true,
                            });
                        }
                        currentLabel = exportRoot.currentLabel;
                    }
                    requestAnimationFrame(checkLabelChange);
                }

                // 啟動監聽 Label 變化
                checkLabelChange();

                // 取得名字是 linkBtn 開頭的元件
                const keys = Object.keys(exportRoot);
                keys.forEach((key) => {
                    // 把 name 裡面的 functionKeys 分開
                    const funcKeys = key.split('_');
                    funcKeys.forEach((funcKey) => {
                        if (funcKey.indexOf('startPosBtn') !== -1) {
                            startPosBtn = exportRoot[key];
                            startPosBtnOriginX = startPosBtn.x;
                            startPosBtn.visible = false;
                        }

                        // 讓素材可以左右移動
                        if (funcKey.indexOf('scrollPage') !== -1) {
                            pageNum = funcKey.slice(-1);
                            isScrollPage = true;
                        }

                        if (funcKey.indexOf('scrollVideo') !== -1) {
                            scrollVideo = true;
                            scrollVideoPosIndex = funcKey.slice(-1);
                            // 設定影片起始位置
                            videoOriginX = scrollVideoPosIndex * pageWidth;
                            videoContainer.style.setProperty('left', `${videoOriginX}px`, 'important');
                        }

                        if (funcKey.indexOf('hideTrack') !== -1) {
                            // 取得要隱藏的 track 名稱
                            const trackName = funcKey.slice(funcKey.indexOf('hideTrack') + 'hideTrack'.length);
                            const hideTrackBtn = exportRoot[key];
                            hideTrackBtn.addEventListener('click', () => {
                                // 隱藏 track
                                exportRoot[trackName].visible = false;
                            });
                        }

                        if (funcKey.indexOf('showTrack') !== -1) {
                            // 取得要顯示的 track 名稱
                            let trackName = funcKey.slice(funcKey.indexOf('showTrack') + 'showTrack'.length);
                            const showTrackBtn = exportRoot[key];
                            exportRoot[trackName].visible = false;
                            showTrackBtn.addEventListener('click', () => {
                                // 顯示 track
                                exportRoot[trackName].visible = true;
                            });
                        }

                        if (funcKey.indexOf('fixPos') !== -1) {
                            fixPosIcons.push(exportRoot[key]);
                            fixPosIconOriginXs.push(exportRoot[key].x);
                        }

                        // 新增影片內容
                        if (funcKey.indexOf('createVideo') !== -1) {
                            videoSrc = exportRoot.timeline.currentLabel;
                            // 判斷是否為直式影片
                            if (funcKey.indexOf('Vertical') !== -1) {
                                createVerticalVideo = true;
                            }
                            createVideo();
                            createVideoClickArea();
                            createMuteButton();

                            if (funcKey.indexOf('Hide') !== -1) {
                                hideVideo();
                            }

                            // intersectionObserver 參數
                            const observerOptions = {
                                root: null,
                                rootMargin: '0px',
                                threshold: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.4, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.8, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99],
                            };

                            // 以 intersectionObserver 來控制影片播放暫停
                            const observerCallback = (entries, observer) => {
                                entries.forEach((entry) => {
                                    const intersectionRatio = entry.intersectionRatio;
                                    if (intersectionRatio > 0.5 && isTriggerPlay) {
                                        target.play();
                                    } else {
                                        target.pause();
                                    }
                                });
                            };

                            const observer = new IntersectionObserver(observerCallback, observerOptions);
                            target = document.getElementsByTagName('video')[0];
                            observer.observe(target);

                            setVideoEventListener();
                        }

                        // 隱藏影片
                        if (funcKey.indexOf('hideVideo') !== -1) {
                            const hideVideoBtn = exportRoot[key];
                            hideVideoBtn.addEventListener('click', () => {
                                if (funcKey.indexOf('Outside') !== -1) {
                                    hideVideoOutside();
                                } else {
                                    hideVideo();
                                }
                            });
                        }

                        // 返回目錄頁
                        if (funcKey.indexOf('backBtn') !== -1) {
                            const backBtn = exportRoot[key];
                            const backToMenu = () => {
                                exportRoot.gotoAndStop('menu') || exportRoot.gotoAndStop(0);
                            };

                            backBtn.addEventListener('click', () => {
                                backToMenu();
                            });
                        }

                        // 顯示影片
                        if (funcKey.indexOf('showVideo') !== -1) {
                            const showVideoBtn = exportRoot[key];
                            showVideoBtn.addEventListener('click', () => {
                                if (funcKey.indexOf('Outside') !== -1) {
                                    showVideoOutside();
                                } else {
                                    showVideo();
                                }
                            });
                        }

                        // 影片 z-index 調整
                        if (funcKey.indexOf('zIndex') !== -1) {
                            let zIndex = funcKey.slice(funcKey.indexOf('zIndex') + 'zIndex'.length);
                            // 處理負數 zIndex
                            if (zIndex.indexOf('M') !== -1) {
                                zIndex = parseInt(zIndex.replace('M', '-'));
                                // 移動 muteButton 至 videoContainer 同層
                                videoContainer.parentNode.insertBefore(muteButton, videoContainer.nextSibling);
                                muteButton.style.setProperty('bottom', 'unset', 'important');
                                muteButton.style.setProperty('top', '1200px', 'important');
                            }
                            videoContainer.style.setProperty('z-index', `${zIndex}`, 'important');
                        }

                        // 隱藏靜音按鈕
                        if (funcKey.indexOf('hideMuteBtn') !== -1) {
                            muteButton.style.display = 'none';
                        }

                        // 客製調整影片 top 位置
                        if (funcKey.indexOf('top') !== -1) {
                            const topPos = RegExp(/\d+/).exec(funcKey);
                            videoContainer.style.setProperty('top', `${topPos}px`, 'important');
                        }

                        // 開啟連結
                        if (funcKey.indexOf('linkBtn') !== -1) {
                            const linkBtn = exportRoot[key];
                            const index = funcKey.slice(-1);
                            const openLink = (index) => {
                                console.log(`open link${index}`);
                                window.oneadMaterial.sendClickLandingPage({
                                    bannerInfo: '',
                                    url: index - 1,
                                    bannerIndex: index - 1,
                                    eng: `banner_click_${index}`,
                                });
                            };
                            linkBtn.addEventListener('click', () => {
                                openLink(index);
                            });
                        }

                        // 開啟分頁 & 送出 eng 事件
                        if (funcKey.indexOf('pageBtn') !== -1) {
                            const pageBtn = exportRoot[key];
                            const index = funcKey.slice(-1);
                            const gotoPage = (index) => {
                                console.log(`goto page${index}`);
                                exportRoot.gotoAndPlay(`page${index}`);
                                window.oneadMaterial.sendEngEvent({
                                    buttonIndex: `banner_interaction_${index}`,
                                });
                            };

                            pageBtn.addEventListener('click', () => {
                                gotoPage(index);
                            });
                        }

                        // 前往橫向特定位置
                        if (funcKey.indexOf('posBtn') !== -1) {
                            const posBtnIndex = parseInt(funcKey.slice(-1));
                            exportRoot[key].on('click', (e) => {
                                pageIndex = posBtnIndex;
                                posBtnClicked = true;
                                window.oneadMaterial.sendEngEvent({
                                    buttonIndex: `banner_interaction_${pageIndex}`,
                                });
                            });
                        }

                        // 內部有需要設定事件時外層用 btnContainer
                        if (funcKey.indexOf('btnContainer') !== -1) {
                            const childKeys = Object.keys(exportRoot[key]);
                            childKeys.forEach((childKey) => {
                                // 點擊前往橫向某頁位置
                                if (childKey.indexOf('posBtn') !== -1) {
                                    const posBtnIndex = parseInt(childKey.slice(-1));
                                    exportRoot[key][childKey].on('click', (e) => {
                                        pageIndex = posBtnIndex;
                                        posBtnClicked = true;
                                        window.oneadMaterial.sendEngEvent({
                                            buttonIndex: `banner_interaction_${pageIndex}`,
                                        });
                                    });
                                }

                                if (childKey.indexOf('pageBtn') !== -1) {
                                    const pageBtn = exportRoot[key][childKey];
                                    const index = childKey.slice(-1);
                                    const gotoPage = (index) => {
                                        console.log(`goto page${index}`);
                                        exportRoot.gotoAndPlay(`page${index}`);
                                        window.oneadMaterial.sendEngEvent({
                                            buttonIndex: `banner_interaction_${index}`,
                                        });
                                    };

                                    pageBtn.addEventListener('click', () => {
                                        gotoPage(index);
                                    });
                                }

                                // 開啟連結
                                if (childKey.indexOf('linkBtn') !== -1) {
                                    const linkBtn = exportRoot[key][childKey];
                                    const index = childKey.slice(-1);

                                    const openLink = (index) => {
                                        console.log(`open link${index}`);
                                        window.oneadMaterial.sendClickLandingPage({
                                            bannerInfo: '',
                                            url: index - 1,
                                            bannerIndex: index - 1,
                                            eng: `banner_click_${index}`,
                                        });
                                    };
                                    linkBtn.addEventListener('click', () => {
                                        openLink(index);
                                    });
                                }

                                // 顯示影片
                                if (childKey.indexOf('showVideo') !== -1) {
                                    const showVideoBtn = exportRoot[key][childKey];
                                    showVideoBtn.addEventListener('click', () => {
                                        showVideo();
                                    });
                                }
                            });
                        }
                    });
                });

                // 左右滑動判斷邏輯
                const scrollPageSetting = () => {
                    // 讓元件可以拖曳點下時動作
                    exportRoot.on('mousedown', (e) => {
                        prevX = e.stageX;
                        startX = e.currentTarget.x;
                    });

                    // 讓元件可以拖曳點下時動作
                    exportRoot.on('touchstart', (e) => {
                        prevX = e.stageX;
                        startX = e.currentTarget.x;
                    });

                    // 讓元件可以拖曳移動時動作
                    exportRoot.on('pressmove', (e) => {
                        currentX = e.stageX;
                        xDiff = currentX - prevX;
                        if (startX + xDiff <= -(0 * pageWidth) && startX + xDiff >= -(pageNum * pageWidth)) {
                            e.currentTarget.x = startX + xDiff;
                            startPosBtn.x = startPosBtnOriginX - (startX + xDiff);
                            // 影片滾動邏輯
                            if (scrollVideo) {
                                videoContainer.style.setProperty('left', `${videoCurrentX + xDiff}px`, 'important');
                            }
                            //  固定位置元件邏輯
                            if (fixPosIcons.length > 0) {
                                for (let i = 0; i < fixPosIcons.length; i++) {
                                    fixPosIcons[i].x = fixPosIconOriginXs[i] - (startX + xDiff);
                                }
                            }
                        }
                    });

                    // 手指離開時決定最後位置
                    exportRoot.on('pressup', (e) => {
                        if (!posBtnClicked) {
                            pageIndex = Math.abs(Math.round(-(e.currentTarget.x / pageWidth)));
                        }
                        startPosBtn.visible = pageIndex !== 0;
                        if (posBtnClicked) {
                            createjs.Tween.get(e.currentTarget).to({ x: -(pageIndex * pageWidth) }, 0, createjs.Ease.linear);
                            createjs.Tween.get(startPosBtn).to({ x: startPosBtnOriginX + pageIndex * pageWidth }, 0, createjs.Ease.linear);
                            // 滾動影片邏輯
                            if (scrollVideo) {
                                videoCurrentX = videoOriginX - pageIndex * pageWidth;
                                videoContainer.style.setProperty('left', `${videoCurrentX}px`, 'important');
                            }
                            // 固定位置元件邏輯
                            if (fixPosIcons.length > 0) {
                                for (let i = 0; i < fixPosIcons.length; i++) {
                                    createjs.Tween.get(fixPosIcons[i]).to({ x: fixPosIconOriginXs[i] + pageIndex * pageWidth }, 0, createjs.Ease.linear);
                                }
                            }
                        } else {
                            createjs.Tween.get(e.currentTarget).to({ x: -(pageIndex * pageWidth) }, 300, createjs.Ease.linear);
                            createjs.Tween.get(startPosBtn).to({ x: startPosBtnOriginX + pageIndex * pageWidth }, 300, createjs.Ease.linear);
                            // 滾動影片邏輯
                            if (scrollVideo) {
                                videoCurrentX = videoOriginX - pageIndex * pageWidth;
                                videoContainer.style.setProperty('left', `${videoCurrentX}px`, 'important');
                            }
                            // 固定位置元件邏輯
                            if (fixPosIcons.length > 0) {
                                for (let i = 0; i < fixPosIcons.length; i++) {
                                    createjs.Tween.get(fixPosIcons[i]).to({ x: fixPosIconOriginXs[i] + pageIndex * pageWidth }, 300, createjs.Ease.linear);
                                }
                            }
                        }

                        posBtnClicked = false;
                    });

                    startPosBtn.on('click', (e) => {
                        e.currentTarget.parent.x = 0;
                        createjs.Tween.get(startPosBtn).to({ x: startPosBtnOriginX }, 300, createjs.Ease.linear);
                    });
                };

                if (isScrollPage) {
                    scrollPageSetting();
                }
                actionAdd = true;
            }
        };

        exportRoot.timeline.addTween(createjs.Tween.get(exportRoot).call(exportRoot.mainAction).wait(10));
    }

    // 新增影片
    const createVideo = () => {
        videoContainer = document.createElement('div');
        videoContainer.id = 'video_container';
        videoContainer.style.setProperty('position', 'absolute', 'important');
        videoContainer.style.setProperty('width', '640px', 'important');
        if (createVerticalVideo) {
            videoContainer.style.setProperty('height', '1360px', 'important');
            videoContainer.style.setProperty('top', '0px', 'important');
        } else {
            videoContainer.style.setProperty('height', '360px', 'important');
            videoContainer.style.setProperty('top', '800px', 'important');
        }
        videoContainer.style.setProperty('z-index', '1', 'important');

        videoContainer.innerHTML = `
    <video src=${videoSrc} muted playsinline autoplay='true' style="width:100%; height:100%; position:absolute; z-index:-1;"></video>`;

        videoElement = videoContainer.querySelector('video');
        videoElement.pause();
        anim_container.appendChild(videoContainer);
    };

    // 新增影片點擊區域
    const createVideoClickArea = () => {
        videoClickArea = document.createElement('div');
        videoClickArea.id = 'video_click_area';
        videoClickArea.style.setProperty('position', 'absolute', 'important');
        videoClickArea.style.setProperty('width', '100%', 'important');
        videoClickArea.style.setProperty('height', '100%', 'important');
        videoClickArea.style.setProperty('z-index', '2', 'important');
        videoContainer.appendChild(videoClickArea);
    };

    // 新增音量鍵
    const createMuteButton = () => {
        muteButton = document.createElement('img');
        muteButton.id = 'mute_button';
        muteButton.src = muteButtonImg.mute;
        muteButton.style.setProperty('background', 'none', 'important');
        muteButton.style.setProperty('border', 'none', 'important');
        muteButton.style.setProperty('position', 'absolute', 'important');
        muteButton.style.setProperty('bottom', '18px', 'important');
        muteButton.style.setProperty('left', '18px', 'important');
        muteButton.style.setProperty('width', '40px', 'important');
        muteButton.style.setProperty('height', '40px', 'important');
        muteButton.style.setProperty('z-index', '3', 'important');
        muteButton.style.setProperty('transition', 'all .1s linear', 'important');

        videoContainer.appendChild(muteButton);
    };

    // 顯示 banner 中影片
    const showVideo = () => {
        videoContainer.style.display = 'block';
        videoClickArea.style.display = 'block';
        muteButton.style.display = 'block';
    };

    // 顯示素材包影片 MFS Play 專用
    const showVideoOutside = () => {
        window.oneadMaterial.mirfPlayDone({
            playBtnClicked: true,
        });
    };

    // 隱藏 banner 中影片
    const hideVideo = () => {
        videoContainer.style.display = 'none';
        videoClickArea.style.display = 'none';
        muteButton.style.display = 'none';
    };

    // 隱藏素材包影片 MFS Play 專用
    const hideVideoOutside = () => {
        window.oneadMaterial.mirfPlayDone({
            playBtnClicked: false,
        });
    };

    // 綁定點擊事件
    const setVideoEventListener = () => {
        // 接入 expand 回傳事件播放影片
        window.oneadMaterial.setupTrackingEvent(() => {
            oneadMaterial.subscribeTrackingEvent({
                eventName: 'expand',
                action: () => {
                    isTriggerPlay = true;
                    videoElement.play();
                    window.oneadMaterial.videoSetter(videoElement);
                },
            });
        });

        // 為了可以讓嵌入在 banner 中的影片在選用 MFS Play 時可以在第二 cut 出來的時候再播放
        window.oneadMaterial.setupCallbackForInfoObject({
            callback: () => {
                isTriggerPlay = true;
                videoElement.play();
                window.oneadMaterial.videoSetter(videoElement);
            },
        });

        document.body.addEventListener('click', (e) => {
            // 切換靜音按鈕圖片邏輯
            if (e.target.id === 'mute_button') {
                if (muted) {
                    videoElement.muted = false;
                    muteButton.src = muteButtonImg.unmute;
                    muted = false;
                } else {
                    videoElement.muted = true;
                    muteButton.src = muteButtonImg.mute;
                    muted = true;
                }
            }
        });

        // 監聽影片結束時自動播放
        videoElement.addEventListener('ended', () => {
            videoElement.play();
        });
    };
});

/******/ })()
;