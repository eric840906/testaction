/*!
 *  resource_bag.config.js 2023-04-13 5:43:10 PM
 *
 */
/******/ ;(() => {
  // webpackBootstrap
  var __webpack_exports__ = {}
  const resourceBagInfo = [
    //// "memo": template 有多種option功能提示 / 一些設置提醒話語的地方
    //// "imgUrl": 示意圖的URL
    //// "templateUrl": 樣版下載的URL
    //// "linksMax": 網址數量的上限
    //// "rmbUrl": 前往 RMB

    //// -- MIR ---
    {
      transformer: {
        name: 'transformer',
        info: 'Video + Banner',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Banner',
            imgUrl: '',
            size: '640x535',
          },
        ],
      },
      transformer_gallery: {
        name: 'transformer_gallery',
        info: 'Video + Creative Banner (內含 3-6張 Banner)',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: '640x535',
            desc: '底圖(選擇性): 640x535',
            templateUrl: 'https://onead.github.io/onead-creative-template/files/MIRT_Gallery.zip',
          },
        ],
      },
      bnb: {
        name: 'bnb',
        info: '純 Banner 格式, Banner 1 + Banner 2',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 1',
            imgUrl: '',
            size: '640x360',
          },
          {
            unit: 'Banner 2',
            imgUrl: '',
            size: '640x535',
          },
        ],
      },
      transformer_sticky: {
        name: 'transformer_sticky',
        info: 'Video + Banner',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Banner',
            imgUrl: '',
            size: '640x535',
          },
        ],
      },
      transformer_swap: {
        name: 'transformer_swap',
        info: 'Video + Banner',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Banner',
            imgUrl: '',
            size: '640x535',
          },
        ],
      },
      instant: {
        name: 'instant',
        info: '純 Video 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
        ],
      },
      scratch: {
        name: 'scratch',
        info: 'Video + 刮刮樂遮罩 Banner 1 + Banner 2',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Banner 1',
            imgUrl: '',
            size: '640x535',
          },
          {
            unit: 'Banner 2',
            imgUrl: '',
            size: '640x535',
          },
        ],
      },
      scratch_bnb: {
        name: 'scratch_bnb',
        info: ' Creative Banner (內含刮刮樂遮罩, 底圖 BnB)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: '遮罩區: 640x895',
            desc: 'Banner 上:640x360 下:640x535',
          },
        ],
      },
      vertical: {
        name: 'vertical',
        info: '純 Video 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '720x1280',
          },
        ],
      },
      vertical_banner: {
        name: 'vertical_banner',
        info: '純 Banner 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Banner',
            imgUrl: '',
            size: '640x960',
          },
        ],
      },
      vertical_videobanner: {
        name: 'vertical_videobanner',
        info: 'Video + Banner',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1080x1920',
          },
          {
            unit: 'Banner',
            imgUrl: '',
            size: '720x1280',
          },
        ],
      },
      page: {
        name: 'MIR Page (page)',
        info: 'Video + Creative Banner(內含2-5頁 Page + 封底)',
        memo: '需要設定足夠的導外連結，鎖屏滾動長度才會正確。例: 5頁page,需設置6個導外連結(含封底導外)',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: 'Page: 700x855',
            desc: '封底: 720x875',
            templateUrl: '',
          },
        ],
      },
      page_banner: {
        name: 'MIR Page Banner (page_banner)',
        info: 'Creative Banner(內含2-5頁 Page + 封底)',
        memo: '需要設定足夠的導外連結，鎖屏滾動長度才會正確。例: 5頁page,需設置6個導外連結(含封底導外)',
        cutOne: [
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: 'Page: 700x1260',
            desc: '封底: 720x1280',
            templateUrl: '',
          },
        ],
      },
      show: {
        name: 'MIR Show (show)',
        info: 'Intro banner: 進場動畫3s + Creative Banner(內含主選單頁 , 1-3子分頁)',
        memo: '',
        cutOne: [
          {
            unit: 'Intro Banner',
            imgUrl: '',
            size: '720x1280 (3s)',
          },
        ],
        cutTwo: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: '720x1280',
            linksMax: '7',
            templateUrl: '',
          },
        ],
      },
      tag: {
        name: 'MIR Tag (tag)',
        info: 'Creative Banner(內含1-5頁產品卡片)',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 上',
            imgUrl: '',
            size: '680x900',
            desc: 'Banner 下: 640x320',
            templateUrl: '',
          },
        ],
      },
      poster: {
        name: 'MIR Poster (poster)',
        info: 'Creative Banner(Title Banner 1-3張, Poster Banner 3張)+ 電影時刻(由 RMB 產出)',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 上',
            imgUrl: '',
            size: '410x130',
            desc: 'Banner 下: 385x560',
            templateUrl: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '750x300',
            desc: '',
            goToRmb: '1',
          },
        ],
      },
      //// -- MFS ---
      cover_transparent_video: {
        name: 'MFS Cover 大蓋版(破框版) (cover_transparent_video)',
        info: 'Video + Creative Banner(透明影片版本)',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '640x1360',
            desc: '',
            linksMax: '1',
            templateUrl: '',
          },
        ],
      },
      cover: {
        name: 'MFS (Video) 大蓋版 (cover)',
        info: '純 Video 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '640x1360',
            desc: '',
          },
        ],
      },
      cover_banner: {
        name: 'MFS (Cover Banner) 大蓋版 (cover_banner)',
        info: '純 Banner 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '640x1360',
            desc: '',
          },
        ],
      },
      cover_story: {
        name: 'MFS (Cover Story) 故事大蓋版 (cover_story)',
        info: 'Video + Creative Banner(內含 1-2張滿版 Banner)',
        memo: '',
        cutOne: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '640x1360',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '640x1360',
            desc: '',
            linksMax: '2',
            templateUrl: '',
          },
        ],
      },
      cover_play: {
        name: 'MFS (Cover Play) 大蓋版 (cover_play)',
        info: 'Intro banner: 進場動畫3s + Creative Banner(內含主選單頁, 複數子分頁) + Video',
        memo: '',
        cutOne: [
          {
            unit: 'Intro Banner',
            imgUrl: '',
            size: '640x1360 (3s)',
          },
        ],
        cutTwo: [
          {
            unit: 'Creative Banner',
            imgUrl: '',
            size: '640x1360',
            linksMax: '7',
            templateUrl: '',
          },
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
          },
        ],
      },
      //// -- MIB ---
      bottom_instant: {
        name: 'MIR instant 置中大影音版 (bottom_instant)',
        info: '純 Video 格式',
        memo: '',
        cutOne: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
      },
      peek: {
        name: 'MIB Peek 拉拉 Move (peek)',
        info: 'Creative banner (內含 1個 peek icon, 1~3張 banner: 440x480)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative banner:',
            imgUrl: '',
            size: 'Icon: 136x136',
            desc: 'Banner: 440x480',
            linksMax: '3',
            templateUrl: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
      },
      reels: {
        name: 'MIB Reels 限動膠卷 (reels)',
        info: 'Creative Banner (內含品牌 Logo, 置底換Cut Lottie Banner, 短影片起始秒數) + Video (2-3支短影片合成1支上傳)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative banner:',
            imgUrl: '',
            size: 'Icon: 136x136',
            desc: 'Banner: 640x320',
            linksMax: '3',
            templateUrl: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
      },
      bottom_superdsp: {
        name: 'MIB (Super DSP) (bottom_superdsp)',
        info: 'Video + 置底右邊小 Banner (只有 MIB Bottom 的第二Cut 版本)',
        memo: '',
        cutOne: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '180x320',
            desc: '',
            linksMax: '',
            templateUrl: '',
          },
        ],
      },
      bottom: {
        name: 'MIB Bottom 置底貼 (bottom)',
        info: '第一Cut banner + Video + 置底右邊小 banner',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 1:',
            imgUrl: '',
            size: '640x100',
            desc: '',
            linksMax: '3',
            templateUrl: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
          {
            unit: 'Banner 2:',
            imgUrl: '',
            size: '180x320',
            desc: '',
          },
        ],
      },
      bottom: {
        name: 'MIB Bottom 置底貼 (bottom)',
        info: '第一Cut banner + Video + 置底右邊小 banner',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 1:',
            imgUrl: '',
            size: '640x100',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
          {
            unit: 'Banner 2:',
            imgUrl: '',
            size: '180x320',
            desc: '',
          },
        ],
      },
      bottom_banner: {
        name: 'MIB Bottom 置底貼 (bottom_banner)',
        info: 'Banner 1 + Banner 2',
        memo: '',
        cutOne: [
          {
            unit: 'Banner 1:',
            imgUrl: '',
            size: '640x100',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Banner 2:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
      },
      star: {
        name: 'MIB Star 置底大明星 (star)',
        info: 'Creative Banner (支援 2~3 個圖像 Icon 與  2~3 個 slider) + 置底Banner',
        memo: '',
        cutOne: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '640x280',
            desc: 'icon: 200x200, slider: 640x895',
          },
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '640x100',
            desc: '',
          },
        ],
      },
      location: {
        name: 'MIB Location 置底 (location)',
        info: 'Creative Banner (選擇 location 版本，支援 3張圖片換cut ) + Map Banner (由 RMB 產出)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '420x360',
            desc: '',
            linksMax: '3',
          },
        ],
        cutTwo: [
          {
            unit: 'RMB Map:',
            imgUrl: '',
            rmbUrl: '',
          },
        ],
      },
      location_video: {
        name: 'MIB Location Video 置底 (location_video)',
        info: 'Creative Banner (選擇 location_video 版本 ) + Map Banner (由 RMB 產出)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '',
            desc: 'Template: location_video',
          },
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'RMB Map:',
            imgUrl: '',
            rmbUrl: '',
          },
        ],
      },
      cube: {
        name: 'MIB Cube 魔術方塊 (cube)',
        info: 'Video + 置底右邊小 banner: 180x320 + Cube banner',
        memo: 'Cube banner (須為雙數, 支援 2/4/6張)',
        cutOne: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
          {
            unit: 'Banner 1:',
            imgUrl: '',
            size: '180x320',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Cube Banner:',
            imgUrl: '',
            size: '640x895',
            linksMax: '6',
            templateUrl: '',
          },
        ],
      },
      cube_banner: {
        name: 'MIB Cube 魔術方塊 (cube_banner)',
        info: 'Banner + Cube banner',
        memo: 'Cube banner (須為雙數, 支援 2/4/6張)',
        cutOne: [
          {
            unit: 'Banner 1:',
            imgUrl: '',
            size: '640x340',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Cube Banner:',
            imgUrl: '',
            size: '640x895',
            linksMax: '6',
            templateUrl: '',
          },
        ],
      },
      gallery_banner: {
        name: 'MIB Gallery 置頂迴廊 (gallery_banner)',
        info: 'Creative Banner (支援 3~6張小 Banner)',
        memo: '客製化選項 : 點翻/自動播放/要開啟白色navi點點/不需要滑動時縮小, 請從 template 內的 option.xml 設定',
        cutOne: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '600x500',
            desc: '',
            linksMax: '6',
            templateUrl: '',
          },
        ],
      },
      gallery_webgl: {
        name: 'MIB Gallery (WebGL) 置頂迴廊 (gallery_webgl)',
        info: 'Creative Banner (支援 2/3/4/6張小 Banner, 5張需要客製)',
        memo: '',
        cutOne: [
          {
            unit: 'Creative Banner:',
            imgUrl: '',
            size: '600x500',
            desc: '',
            linksMax: '6',
            templateUrl: '',
          },
        ],
      },
      flash: {
        name: 'MIB Flash 快閃焦點 (flash)',
        info: 'Flash Banner + Video + 置底右邊小 banner',
        memo: '',
        cutOne: [
          {
            unit: 'Flash Banner:',
            imgUrl: '',
            size: '640x895 (3s)',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '180x320',
            desc: '',
          },
        ],
      },
      flash_banner: {
        name: 'MIB Flash 快閃焦點 (flash_banner)',
        info: 'Flash Banner + 置底右邊小 banner',
        memo: '',
        cutOne: [
          {
            unit: 'Flash Banner:',
            imgUrl: '',
            size: '640x895 (3s)',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
      },
      hit_video: {
        name: 'MIB Hit 創意貼 (hit_video)',
        info: 'Flash Banner + Video + 置底包框 Banner ( 至多3張 )',
        memo: '',
        cutOne: [
          {
            unit: 'Flash Banner:',
            imgUrl: '',
            size: '640x895 (3s)',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Hit Banner:',
            imgUrl: '',
            size: '640x360',
            desc: '',
            linksMax: '3',
            templateUrl: '',
          },
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
      },
      hit_banner: {
        name: 'MIB 卡牌模組 (hit_video)',
        info: 'Flash Banner + 置底 Banner (至多3張)',
        memo: '',
        cutOne: [
          {
            unit: 'Flash Banner:',
            imgUrl: '',
            size: '640x895 (3s)',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Hit Banner:',
            imgUrl: '',
            size: '640x340',
            desc: '',
            linksMax: '3',
            templateUrl: '',
          },
        ],
      },
      hit_card: {
        name: 'MIB 卡牌模組 (hit_card)',
        info: '置底 Banner (至多3張)',
        memo: '',
        cutOne: [
          {
            unit: 'Banner:',
            imgUrl: '',
            size: '640x340',
            desc: '',
          },
        ],
      },
      flash_video: {
        name: 'MIB Flash Video 影圖輪播 (flash_video)',
        info: 'Flash Banner + Video + 置底輪播 Banner (須為雙數, 只支援 2張 或 4張)',
        memo: '',
        cutOne: [
          {
            unit: 'Flash Banner:',
            imgUrl: '',
            size: '640x895 (3s)',
            desc: '',
          },
        ],
        cutTwo: [
          {
            unit: 'Video:',
            imgUrl: '',
            size: '1920x1080',
            desc: '',
          },
        ],
        cutThree: [
          {
            unit: 'Banner 3:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
        cutFour: [
          {
            unit: 'Banner 4:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
        cutFive: [
          {
            unit: 'Banner 5:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
        cutSix: [
          {
            unit: 'Banner 2:',
            imgUrl: '',
            size: '640x360',
            desc: '',
          },
        ],
      },
    },
  ]

  window.resourceBagInfo = resourceBagInfo
  /******/
})()
