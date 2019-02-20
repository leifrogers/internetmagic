/**
 * just a twinkle in the eye for right now
 */
var img;
function preload() {
  img = loadImage(glitchURL);
}
function setup() {
    createCanvas(img.width, img.height);
    image(img, 0, 0);
}
