let video, c_out, ctx_out, c_tmp, ctx_tmp;

const segmentationConfig = {
internalResolution: 'high',
segmentationThreshold: 0.07,
scoreThreshold: 0.05
};
const bodyPixConfig = {
architechture: 'ResNetV1',
outputStride: 16,
multiplier: 1,
quantBytes: 4
};


function init() {
    video = document.getElementById("video");
    c_out = document.getElementById("output-canvas");
    ctx_out = c_out.getContext("2d");
    c_tmp = document.createElement("canvas");
    c_tmp.setAttribute("width", 500);
    c_tmp.setAttribute("height", 300);
    ctx_tmp = c_tmp.getContext("2d");
    video.play();
    computeFrame();
}

function computeFrame() {
ctx_tmp.drawImage(video,0,0,500,300);
let frame = ctx_tmp.getImageData(0,0,500,300);
model.segmentPerson(c_tmp,segmentationConfig).then((segmentation) => {
let out_image = ctx_out.getImageData(0,0,500,300);
for(let x=0;x<500;x++){
for(y=0;y<300;y++) {
let n = x + (y * 500);
if(segmentation.data[n] == 0) {
  out_image.data[n * 4] = frame.data[n * 4]; //R
  out_image.data[n * 4 + 1] = frame.data[n * 4 + 1]; //G
  out_image.data[n * 4 + 2] = frame.data[n * 4 + 2]; //B
  out_image.data[n * 4 + 3] = frame.data[n * 4 + 3]; //A
}
}
}
ctx_out.putImageData(out_image,0,0);
setTimeout(computeFrame,0);
});
}
document.addEventListener("DOMContentLoaded", () => {
bodyPix.load(bodyPixConfig).then((m) => {
model = m;
init();
});
});


function previewFile() {
    const preview = document.querySelector('video');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }