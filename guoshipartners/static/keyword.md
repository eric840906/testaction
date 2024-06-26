

# keyword list

###### tags: `沒有參數的關鍵字們`

---

* 手機隱藏音量鍵
```
 hideVolumeButton
```
* IP+/ IP 說明加關鍵字 onlybanner landscape
```
landscape
```
* 隱藏 coach mark (Ex.Gallery)
```
hideTips
```
* 某些古早格式沒有開 only video 專用格式時使用
```
onlyVideo
```
* Moat 啟用監測 video
```
moatUseVideo
```
* Moat 啟用監測 廣告露出
```
moatUseDisplay
```
* 將 Cube 設定為 Conversation(Chatbot) type
```
cubeChatbot
```
*
```
cubeNamelist
```
* MIB 需要做跨界 Banner 時使用
```
crossbanner
```
* 放大關閉鍵範圍，讓使用者準確關閉廣告，而不會誤觸導外
```
closeAreaSet
```
* 設定後, 將固定使用 assign() 進行開啟網頁的行為
```
openUrlWithAssign
```
* MIB Gallery 在觸發互動時，產生一個背景加載 LandingPage 的 iframe 來改善進站
```
preloadLandingPage
```
* 廣告板位出現在螢幕範圍50%後才開放點擊，開放後不再關閉，不能與 pageClickInSightOnly 同時使用
```
pageClickInSightOnly
```
* 廣告板位出現在螢幕範圍50%後才開放點擊，不在範圍內不開放，不能與 pageClickInSightAfterward 同時使用
```
pageClickInSightAfterward
```
* 監聽 Iframe 內的 Banner Click
```
listenClickOnBannerIframe
```
* 延遲 Impression  (IAB規格 IMP: 廣告露出 50%+1s)
```
useIabImpression
```
* VAST 使用第一個廣告素材
```
useFirstBanner
```
* 播放不 loop，停在最後一 cut 且不出現 EndWrapper
```
stopInLoopLast
```
* IOS 啟用預設 HybirdVideo
```
iosUseHybridVideo
```
* 隱藏 flash 關閉鍵
```
hideFlashCloseBtn
```
* MIB 與 MIR 同時出現時，屏敝 MIR
```
isUniGroup
```
* 顯示現在氣溫資訊
```
showTempInfo
```
* 顯示今日氣溫資訊
```
showTodayTempInfo
```
* 顯示現在濕度資訊
```
showHumiInfo
```
* 顯示空氣品質 AQI 資訊
```
showAqiInfo
```
* 顯示紫外線 UVI 資訊
```
showUviInfo
```
---

###### tags: `有參數的關鍵字們`

---
* 設定部分 UI 位置
```
setUiPos({"name":"MUTE_BUTTON","x":0,"y":0,"unit":"%"})
```
* 設定影片位置
> <a herf="https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin">Margin 使用參考</a>
```
movePlayer({“margin”:“94% 0 0 0”})
```
* 設定關閉鍵位置
```
closeUISet({"align":"right","top":30,"around":10,"posUnit":"px","width":100,"height":100,"sizeUnit":"px"})
```
* 設定倒數文字顏色
> <a herf="https://codepen.io/sosuke/pen/Pjoqqp">搭配使用轉換器</a>
```
countDownColor({"filter":"invert(43%) sepia(93%) saturate(999%) hue-rotate(201deg) brightness(91%) contrast(98%)"})
```
* 用 timeout 來決定展開時間
```
showAdsLatency({“time”:3000})
```
* 修改 Cube 背景顏色
```
setBackgroundColor({"color":"#e66465 0%, #9198e5 70%"})
```
