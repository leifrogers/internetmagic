var img;
function preload() {
  img = loadImage('http://localhost/experiments/sorting/sort0.php');
}
function setup() {
    createCanvas(img.width, img.height);
    image(img, 0, 0);
}
