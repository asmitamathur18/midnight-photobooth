const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const strip = document.getElementById("strip");
const downloadBtn = document.getElementById("downloadBtn");

let photos = [];
let currentFilter = "none";

/* CAMERA */
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" }
}).then(stream => {
  video.srcObject = stream;
});

/* SET FILTER */
function setFilter(filter) {
  video.className = filter;
  currentFilter = filter;
}

/* TAKE PHOTO */
function takePhoto() {
  if (photos.length >= 4) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.filter = getCanvasFilter();
  ctx.drawImage(video, 0, 0);
  addGrain();

  const img = new Image();
  img.src = canvas.toDataURL("image/png");

  photos.push(img);
  strip.appendChild(img);

  if (photos.length === 4) {
    downloadBtn.disabled = false;
  }
}

/* FILTER FOR CANVAS */
function getCanvasFilter() {
  if (currentFilter === "bw")
    return "grayscale(100%) contrast(110%) brightness(95%)";

  if (currentFilter === "cool")
    return "grayscale(30%) contrast(105%) brightness(95%) saturate(80%)";

  if (currentFilter === "warm")
    return "sepia(20%) contrast(105%) brightness(100%) saturate(90%)";

  return "none";
}

/* GRAIN */
function addGrain() {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const n = Math.random() * 12;
    imgData.data[i] += n;
    imgData.data[i+1] += n;
    imgData.data[i+2] += n;
  }
  ctx.putImageData(imgData, 0, 0);
}

/* DOWNLOAD STRIP (SCALED + REAL DOWNLOAD) */
function downloadStrip() {
  const TARGET_WIDTH = 600;
  const scale = TARGET_WIDTH / canvas.width;
  const imgH = canvas.height * scale;
  const gap = 20;

  const stripCanvas = document.createElement("canvas");
  stripCanvas.width = TARGET_WIDTH;
  stripCanvas.height = (imgH * photos.length) + gap * (photos.length - 1);

  const sctx = stripCanvas.getContext("2d");
  sctx.fillStyle = "black";
  sctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);

  photos.forEach((img, i) => {
    sctx.drawImage(
      img,
      0,
      i * (imgH + gap),
      TARGET_WIDTH,
      imgH
    );
  });

  forceDownload(stripCanvas.toDataURL("image/png"));
}

/* FORCE DOWNLOAD */
function forceDownload(dataURL) {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "midnight-photobooth.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
