// aspectRatio List

// 16:9
// 6:5
// 2:1
// 1:1
// 1.91:1

// state flag
let isUploaded = false;

// DOM Selector

const fileInput = document.querySelector('.fileInput');
const editingImg = document.querySelector('.editingImg');
const placeholder = document.querySelector('.placeholder');
const imgPreviewBtns = document.querySelectorAll('.imgPreviewBtn');

let cropper = new Cropper(editingImg, {
    // initial aspectRatio: 1.7777,
    crop: (e) => {
        // console.log(e.detail.x);
        // console.log(e.detail.y);
        // console.log(e.detail.width);
        // console.log(e.detail.height);
        // console.log(e.detail.rotate);
        // console.log(e.detail.scaleX);
        // console.log(e.detail.scaleY);
    },
    // preview: ".imgPreviewArea",
    responsive: false,
    guides: true,
    viewMode: 1,
    center: true,
    dragMode: 'none',
    autoCropArea: 1,
    movable: true,
    scalable: false,
    zoomable: false,
    cropBoxResizable: false,
    cropBoxMovable: false,
    zoomOnWheel: true,
    zoomOnTouch: true,
    ready: () => {
        console.log('Ready!');
        // updatePreviews(cropper);
        // resetCropper(cropper);
        const targetImg = document.querySelector('.cropper-wrap-box img');

        let isDragging = false;
        let xOffset = 0;
        let yOffset = 0;

        targetImg.addEventListener('pointerdown', function (e) {
            e.preventDefault();
            isDragging = true;
            xOffset = e.clientX - this.offsetLeft;
            yOffset = e.clientY - this.offsetTop;
            this.style.cursor = 'grabbing';
        });

        targetImg.addEventListener('pointermove', function (e) {
            if (isDragging) {
                let x = e.clientX - xOffset;
                let y = e.clientY - yOffset;
                const targetImg = document.querySelector('.cropper-wrap-box img');
                const cropperFace = document.querySelector('.cropper-face');

                // 上下移動，圖片碰到匡線邊界即停下邏輯
                if (targetImg.clientHeight > cropperFace.clientHeight) {
                    const heightDifference = targetImg.clientHeight - cropperFace.clientHeight;
                    const innerHeight = heightDifference / 2;
                    targetImg.style.top = y + 'px';
                    if (y > innerHeight) {
                        y = innerHeight;
                        targetImg.style.top = y + 'px';
                    } else if (y < -innerHeight) {
                        y = -innerHeight;
                        targetImg.style.top = y + 'px';
                    }
                }

                // 左右移動，圖片碰到匡線邊界即停下邏輯
                if (targetImg.clientWidth > cropperFace.clientWidth) {
                    const widthDifference = targetImg.clientWidth - cropperFace.clientWidth;
                    const innerWidth = widthDifference / 2;
                    targetImg.style.left = x + 'px';
                    if (x > innerWidth) {
                        x = innerWidth;
                        targetImg.style.left = x + 'px';
                    } else if (x < -innerWidth) {
                        x = -innerWidth;
                        targetImg.style.left = x + 'px';
                    }
                }
            }
        });

        window.addEventListener('pointerup', function () {
            isDragging = false;
            targetImg.style.cursor = 'grab';
            // updateCurrentPreview(cropper, editingImg);
            // console.log(cropper.destroy())
        });
    },
});

// Event Listeners
fileInput.addEventListener('change', (e) => uploadImg(e, placeholder));
placeholder.addEventListener('click', () => fileInput.click());
imgPreviewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => changeAspectRatio(e, imgPreviewBtns));
});

// Functions
function uploadImg(e, placeholder) {
    const file = e.target.files[0];

    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const imgSrc = fileReader.result;

            // check uploaded img size
            let img = new Image();
            img.src = imgSrc;
            img.onload = function () {
                let height = img.height;
                let width = img.width;

                if (height !== 675 || width !== 1200) {
                    window.alert('請上傳符合 1200*675 尺寸的圖片');
                    isUploaded = false;
                    imgPreviewBtns.forEach((btn) => {
                        btn.classList.remove('isSelected');
                    });
                } else {
                    cropper.replace(imgSrc, false);
                    window.alert('圖片尺寸正確，歡迎使用！');
                    placeholder.style.display = 'none';
                    editingImg.style.display = 'block';
                    isUploaded = true;
                    imgPreviewBtns[0].classList.add('isSelected');
                }
            };
        };

        fileReader.readAsDataURL(file);
    }
}

function changeAspectRatio(e, imgPreviewBtns) {
    if (!isUploaded) {
        window.alert('請先上傳圖片');
        return;
    }
    cropper.setAspectRatio(e.target.dataset.value);
    setSelectedStyle(imgPreviewBtns, e.target);
    repositionImage();
}

function setSelectedStyle(imgPreviewBtns, selected) {
    imgPreviewBtns.forEach((btn) => {
        btn.classList.remove('isSelected');
    });

    selected.classList.add('isSelected');
}

function repositionImage() {
    const targetImg = document.querySelector('.cropper-wrap-box img');
    targetImg.style.top = '0px';
    targetImg.style.left = '0px';
}

// function updatePreviews() {
//   const preview16_9 = document.querySelector(".preview16_9");
//   const preview6_5 = document.querySelector(".preview6_5");
//   const preview2_1 = document.querySelector(".preview2_1");
//   const preview1_1 = document.querySelector(".preview1_1");
//   const preview1_9_1 = document.querySelector(".preview1_9_1");

//   // 清除之前的裁切預覽（如果有再次上傳新圖片）
//   preview16_9.innerHTML = "";
//   preview6_5.innerHTML = "";
//   preview2_1.innerHTML = "";
//   preview1_1.innerHTML = "";
//   preview1_9_1.innerHTML = "";

//   // 製作不同比例的裁切預覽
//   cropper.setAspectRatio(1.7777);
//   const canvas16_9 = cropper.getCroppedCanvas({
//     width: 160,
//     height: 90,
//     maxHeight: 90,
//   });
//   preview16_9.appendChild(canvas16_9);

//   cropper.setAspectRatio(1.2);
//   const canvas6_5 = cropper.getCroppedCanvas({
//     width: 160,
//     height: 133,
//     maxHeight: 90,
//   });
//   preview6_5.appendChild(canvas6_5);

//   cropper.setAspectRatio(2);
//   const canvas2_1 = cropper.getCroppedCanvas({
//     width: 200,
//     height: 100,
//     maxHeight: 90,
//   });
//   preview2_1.appendChild(canvas2_1);

//   cropper.setAspectRatio(1);
//   const canvas1_1 = cropper.getCroppedCanvas({
//     width: 160,
//     height: 160,
//     maxHeight: 90,
//   });
//   preview1_1.appendChild(canvas1_1);

//   cropper.setAspectRatio(1.9);
//   const canvas1_9_1 = cropper.getCroppedCanvas({
//     width: 190,
//     height: 100,
//     maxHeight: 90,
//   });
//   preview1_9_1.appendChild(canvas1_9_1);
// }

// function resetCropper(cropper) {
//   // 回到初始的裁切比例
//   cropper.setAspectRatio(1.7777);
// }

// function updateCurrentPreview(cropper, editingImg) {
//   // 應該要在這邊更新 preview
//   console.log("updateCurrentPreview!");
//   if (cropper) {
//     cropper.destroy();
//   }
//   cropper = new Cropper(editingImg, {
//     viewMode: 1,
//     ready: function () {
//       updatePreviews();
//     },
//     crop: function () {
//       updatePreviews();
//     },
//   });
// }
