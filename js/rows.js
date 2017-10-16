var theRowColor = [];
var theRowFlipper = [];
var numberOfRows = 50;
var grader = 0;

function setup() {
  "use strict";
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
  frameRate(random(60));
  var flipper = true;
  var colors = 0;
  grader = random(25);
  for (var i = 0; i <= numberOfRows; i++){
    if (flipper === true) {
      colors = colors - grader;
    }
    else{
      colors = colors + grader;
    }
    if (colors > 255) {
      flipper = false;
    }
    if (colors < 0) {
      flipper = true;
    }
    theRowColor.push(colors);
    theRowFlipper.push(flipper);
	}
	smooth();
}

function draw() {
	drawRows();
}

function drawRows() {
  "use strict";
  for(var currentRow = numberOfRows; currentRow >=0; currentRow--){
    fill(theRowColor[currentRow]);
    rect(0, (currentRow * numberOfRows), windowWidth, (windowHeight/numberOfRows));
    if (theRowFlipper[currentRow] === true) {
      theRowColor[currentRow] = theRowColor[currentRow] + grader;
    }
    if (theRowFlipper[currentRow] === false) {
      theRowColor[currentRow] = theRowColor[currentRow] - grader;
    }
    if (theRowColor[currentRow] > 255) {
      theRowFlipper[currentRow] = false;
    }
    if (theRowColor[currentRow] < 0) {
      theRowFlipper[currentRow] = true;
    }
  }
}



