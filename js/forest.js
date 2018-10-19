/**
 * 
 * So not developed into anything yet.  the nothingness is palatable.
 * 
 */

var PineTrees = [];

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
  PineTrees.push(new PineTree());
  strokeWeight(PineTrees[0].trunkThickness);
  line(PineTrees[0].bottomX, PineTrees[0].bottomY, PineTrees[0].bottomX,
    (PineTrees[0].bottomY - PineTrees[0].height));
}

function draw() {
}


function drawPineTree(pineTree) {

}
