var img;
function preload() {
  img = loadImage(glitchURL);
}
function setup() {
    createCanvas(img.width, img.height);
    image(img, 0, 0);
}
