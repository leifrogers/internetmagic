function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let numberOfRows = 50;
var numberRows = getParameterByName('rows'); 

if (!isNaN(numberRows)&&(numberRows != null))
    {
        numberOfRows = numberRows;
    }
    
let theRowColor = [];
let theRowFlipper = [];

let grader = 0;

function setup() {
    "use strict";
    createCanvas(windowWidth, windowHeight);
    noStroke();
    background(0);
    frameRate(30);
    let flipper = true;
    let colors = 0;
    grader = random(25);
    for (let i = numberOfRows; i >= 0; i--) {
        if (flipper === true) {
            colors = colors - grader;
        } else {
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
    let boxheight = windowHeight / numberOfRows;
    for (let currentRow = 0; currentRow < numberOfRows; currentRow++) {
        fill(theRowColor[currentRow]);
        rect(0, (currentRow * boxheight), windowWidth, (boxheight + (currentRow * (boxheight))));
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