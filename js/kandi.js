var dim;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dim = width/2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  drawGradient(random(0, (windowWidth*(1/3))), random(windowHeight));
  drawGradient(random((windowWidth*(1/3)), (windowWidth*(2/3))), random(windowHeight));
  drawGradient(random((windowWidth*(2/3)), windowWidth), random(windowHeight));
}

function draw() {
  
}


function drawGradient(x, y) {
  var radius = dim/random(1, 5);
  var h = random(0, 360);
  var s = random(0, 100);
  for (var r = radius; r > 0; --r) {
    fill(h, s, 90);
    ellipse(x, y, r, r);
    s = (s + 1) % 100;
  }
}


