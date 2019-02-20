var lines = [];
var amountOfLines = getRandomInt(25,100);

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    smooth();
    background(225);
    frameRate(20);
    for (var i = 0; i < amountOfLines; i++) {
        lines.push({
            x: random(windowWidth),
            y: random(windowHeight),
            color: random(255),
            direction: "down"
        });
    }
}

function draw() {
    "use strict";
    for (var i = 0; i < amountOfLines; i++) {
        moveAbout(lines[i]);
    }
}

function pickRandom(direction) {
    "use strict";
    var rand = random(8);
    if ((rand >= 0) && (rand <= 2)) {
        direction = "up";
    }
    if ((rand > 2) && (rand <= 4)) {
        direction = "down";
    }
    if ((rand > 4) && (rand <= 6)) {
        direction = "left";
    }
    if ((rand > 6) && (rand <= 8)) {
        direction = "right";
    }
    return direction;
}

function moveAbout(line) {
    "use strict";
    if (random(4) <= 1) {
        line.direction = pickRandom(line.direction);
    }
    if (line.direction === "up") {
        line.y--;
    }
    if (line.direction === "down") {
        line.y++;
    }
    if (line.direction === "left") {
        line.x--;
    }
    if (line.direction === "right") {
        line.x++;
    }
    if (line.x > windowWidth) {
        line.x = 0;
    }
    if (line.x < 0) {
        line.x = windowWidth;
    }
    if (line.y < 0) {
        line.y = windowHeight;
    }
    if (line.y > windowHeight) {
        line.y = 0;
    }
    fill(line.color);
    ellipse(line.x, line.y, 5, 5);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}