let lines = [];
let amountOfLines = getRandomInt(50, 150);

function setup () {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  smooth();
  background(0);
  frameRate(60);
  for (let i = 0; i < amountOfLines; i++) {
    lines.push({
      x: random(windowWidth),
      y: random(windowHeight),
      color: {
        r: random(255),
        g: random(255),
        b: random(255)
      },
      direction: "down"
    });
  }
}

function draw () {
  "use strict";
  for (let i = 0; i < amountOfLines; i++) {
    moveAbout(lines[i]);
  }
}

function pickRandom (direction) {
  "use strict";
  let rand = random(8);
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

function moveAbout (line) {
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
  fill(line.color.r, line.color.g, line.color.b);
  ellipse(line.x, line.y, 5, 5);
}

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}