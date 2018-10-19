var MovingCircles = {};

MovingCircles.ourBox = {
    theWidth: 8,
    theHeight: 8,
    rows: 0,
    columns: 0,
    circleArrayLength: 0
};

MovingCircles.ourColors = {
    r: 255,
    g: 192,
    b: 203,
    current: 0
};

var newBoxes = [];
var Circles = [];

function Box(bX, bY) {
    this.alpha = 0;
    this.x = bX;
    this.y = bY;
    this.r = 119;
    this.green = 119;
    this.b = 119;
}

function Circle(cX, cY) {
    this.x = cX;
    this.y = cY;
    this.radius = random(50);
    this.speed = random(20);
}


function setup() {
    createCanvas(windowWidth, windowHeight);

    MovingCircles.ourBox.rows = windowHeight / MovingCircles.ourBox.theHeight;
    MovingCircles.ourBox.columns = windowWidth / MovingCircles.ourBox.theWidth;
    var circleCount = random(20, 80);
    for (var i = 0; i < circleCount; i++) {
        Circles.push(new Circle(random(windowWidth).valueOf(), random(windowHeight).valueOf()));
    }
    MovingCircles.ourBox.circleArrayLength = Circles.length;
    noStroke();
    noSmooth();
    setupBoxes(newBoxes);
    //drawBoxes();
    background(119);
}

function draw() {
   // drawBoxes();
    background(119);
    for (var i = 0; i < MovingCircles.ourBox.circleArrayLength; i++) {
        drawCircle(Circles[i].x, Circles[i].y, Circles[i].radius);
        if (Circles[i].y <= 0) {
            Circles[i].x = (random(windowWidth));
            Circles[i].y = windowHeight + random(150);
            Circles[i].radius = random(60);
            Circles[i].speed = random(10);
        }
        else {
            Circles[i].y -= Circles[i].speed;
        }
    }
}

function setupBoxes(grid) {
    var rowY = 0;
    for (var i = 0; i < MovingCircles.ourBox.rows; i++) {
        rowY = i * MovingCircles.ourBox.theHeight;
        Row(grid, rowY);
    }
}

function Row(grid, rowNumber) {
    var newRow = [];
    var localX = 0;
    for (var i = 0; i < MovingCircles.ourBox.columns; i++) {
        newRow.push(new Box(localX, rowNumber));
        localX += MovingCircles.ourBox.theWidth;
    }
    grid.push(newRow);
}
/**
function drawBoxes() {
    for (var i = 0; i < MovingCircles.ourBox.rows; i++) {
        for (var j = 0; j < MovingCircles.ourBox.columns; j++) {
            drawBox(i, j);
        }
    }
}

function drawBox(i, j) {
    fill(newBoxes[i][j].r, newBoxes[i][j].green, newBoxes[i][j].b);
    rect(newBoxes[i][j].x, newBoxes[i][j].y, MovingCircles.ourBox.theWidth, MovingCircles.ourBox.theHeight);
}
**/
function getLocation(box) {
    var curCol = box.x / MovingCircles.ourBox.theWidth;
    var curRow = box.y / MovingCircles.ourBox.theHeight;
    return {curRow: curRow, curCol: curCol};
}

function getCurrentBox(x, y) {
    var endX;
    var endY;

    for (var i = 0; i < MovingCircles.ourBox.rows; i++) {
        for (var j = 0; j < MovingCircles.ourBox.columns; j++) {
            endX = newBoxes[i][j].x + MovingCircles.ourBox.theWidth - 1;
            endY = newBoxes[i][j].y + MovingCircles.ourBox.theHeight - 1;
            if ((x >= newBoxes[i][j].x) && (x <= endX) && (y >= newBoxes[i][j].y ) && (y <= endY)) {
                return newBoxes[i][j];
            }
        }
    }
}

function drawCircle(x, y, r) {

    var r2 = 2 * r;
    var slice = 2 * Math.PI / r2;
    for (var i = 0; i < r2; i++) {
        var angle = slice * i;
        var newX = (int)(x + r * Math.cos(angle));
        var newY = (int)(y + r * Math.sin(angle));
        var box = getCurrentBox(newX, newY);
        try {
            var __ret = getLocation(box);
          drawPreview(__ret.curRow, __ret.curCol);

        }
        catch (ex) {
        }
    }
}

function drawPreview(i, j) {
    fill(MovingCircles.ourColors.r, MovingCircles.ourColors.g, MovingCircles.ourColors.b);
    rect(newBoxes[i][j].x, newBoxes[i][j].y, MovingCircles.ourBox.theWidth, MovingCircles.ourBox.theHeight);
}
