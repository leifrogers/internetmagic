/**
 * 
 * So not developed into anything yet.  the nothingness is palatable.
 * 
 */

var PineTrees = [];

var Revolvers = [];

class Revolver {

  constructor(x, y, r, s, a) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speed = s;
    this.angle = a;
  }

  revolvingPoints() {

    //for (let i = 0; i < length; i ++){
    strokeWeight(1);
    this.angle = this.angle + this.speed;
    let newX = (cos(this.angle) * this.radius) + this.x;
    let newY = (sin(this.angle) * this.radius) + this.y;
    fill(0);
    ellipse(newX, newY, 10);
    //  }
  }
}


function PineTree() {
  this.bottomX = 500;
  this.bottomY = 700;
  this.height = 500;
  this.trunkThickness = 25;
  this.branchPairCount = 5;



}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(119);
  angleMode(DEGREES);
  PineTrees.push(new PineTree());
  Revolvers.push(new Revolver(300, 300, 100, 0.5, 50));
  Revolvers.push(new Revolver(500, 800, 500, -0.1, 0));
  Revolvers.push(new Revolver(200, 100, 600, 0.1, 270));
}

function draw() {
  background(119);
  drawPineTree(PineTrees);
  let length = Revolvers.length;
  for (let i = 0; i < length; i++) {
    Revolvers[i].revolvingPoints();
  }
  //angle = (angle-1)%360;
}


function drawPineTree() {
  strokeWeight(PineTrees[0].trunkThickness);
  line(PineTrees[0].bottomX, PineTrees[0].bottomY, PineTrees[0].bottomX,
    (PineTrees[0].bottomY - PineTrees[0].height));
}
