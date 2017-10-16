"use strict";
var totalGrid = [];
var traveled = [];
var finder = [1];
var branches = [];

var gridDetails = [16, 16];

var tripCounter = (function () {
    var privateCounter = 0;

    function changeBy(val) {
        privateCounter += val;
    }

    function zero() {
        privateCounter = 0;
    }

    function one() {
        privateCounter = 1;
    }

    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        },
        setZero: function () {
            zero();
        },
        setOne: function () {
            one();
        }
    }
});

var travelSize = tripCounter();
var travelLength = tripCounter();
travelLength.setOne();

function setup() {
    var myCanvas = createCanvas(736, 544);
    myCanvas.parent('grid');
    background(150);
    fill(0, 255, 0);
    strokeWeight(4);
    stroke(255);
    gridDetails.push((height / gridDetails[1]));
    gridDetails.push((width / gridDetails[0]));
    totalGrid = setupTotalBoxes();

    makeSuperFastBoxes();
    drawSuperFastBoxes();
    noStroke();
    travelSize.setZero();
}

const totalCells = function totalGridSize() {
    return (gridDetails[3] * gridDetails[2]);
};

function draw() {
    //if (finder[travelSize] !== 750) {
    if (finder[travelSize.value()] !== totalCells()) {
        makeSolutions();
    }
    else {
        noLoop();
        showPath();
    }
}

function setupTotalBoxes() {
    var counter = 1;
    var grid = [];
    var rowY = 0;
    for (var i = 0; i < gridDetails[2]; i++) {
        rowY = i * gridDetails[1];
        var newRow = [];
        var localX = 0;
        for (var j = 0; j < gridDetails[3]; j++) {
            //north(3), south(4), east(5), west(6)
            newRow.push([localX, rowY, counter, false, false, false, false]);
            counter++;
            localX += gridDetails[0];
        }
        grid.push(newRow);
    }
    return grid;
}

function makeSuperFastBoxes() {
    traveled.push(getRandomInt(1, totalCells()));
    var currentRow = 0;
    var currentColumn = 0;
    while (travelLength.value() < totalCells()) {
        //row, column
        //north(3), south(4), east(5), west(6)
        var len = gridDetails[2];
        var len3 = gridDetails[3];
        while (len--) {
            len3 = gridDetails[3];
            while (len3--) {
                if (totalGrid[len][len3][2] === traveled[travelSize.value()]) {
                    currentRow = len;
                    currentColumn = len3;
                }
            }
        }
        var up = currentRow - 1;
        var down = currentRow + 1;
        var left = currentColumn - 1;
        var right = currentColumn + 1;
        //north, south, east, west
        var choices = [true, true, true, true];

        if (up >= 0) {
            choices[0] = traveled.includes(totalGrid[up][currentColumn][2]);
        }
        if (down < gridDetails[2]) {
            choices[1] = traveled.includes(totalGrid[down][currentColumn][2]);
        }
        if (right < gridDetails[3]) {
            choices[2] = traveled.includes(totalGrid[currentRow][right][2]);
        }
        if (left >= 0) {
            choices[3] = traveled.includes(totalGrid[currentRow][left][2]);
        }
        var actualChoices = [];
        var counter = 1;
        for (var i = 0; i < 4; i++) {
            if (!choices[i]) {
                actualChoices.push([counter]);
            }
            counter++;
        }

        if (actualChoices.length > 0) {
            var direction = actualChoices[getRandomInt(0, actualChoices.length)][0].valueOf();
            if (direction === 1) {
                totalGrid[currentRow][currentColumn][3] = true;
                totalGrid[up][currentColumn][4] = true;
                traveled.push(totalGrid[up][currentColumn][2]);
            }
            if (direction === 2) {
                totalGrid[down][currentColumn][3] = true;
                totalGrid[currentRow][currentColumn][4] = true;
                traveled.push(totalGrid[down][currentColumn][2]);
            }
            if (direction === 3) {
                totalGrid[currentRow][currentColumn][5] = true;
                totalGrid[currentRow][right][6] = true;
                traveled.push(totalGrid[currentRow][right][2]);
            }
            if (direction === 4) {
                totalGrid[currentRow][currentColumn][6] = true;
                totalGrid[currentRow][left][5] = true;
                traveled.push(totalGrid[currentRow][left][2]);
            }
            travelLength.increment();
            travelSize.increment();

        }
        else {
            if (travelSize.value() >= traveled.length) {
                travelSize.setZero();
            }
            else {
                travelSize.increment();
            }
        }
    }
}

function drawSuperFastBoxes() {
    var len = gridDetails[2];
    var len3 = gridDetails[3];
    while (len--) {
        len3 = gridDetails[3];
        while (len3--) {
            var leftX = totalGrid[len][len3][0];
            var rightX = totalGrid[len][len3][0] + gridDetails[1] - 1;
            var topY = totalGrid[len][len3][1];
            var bottomY = totalGrid[len][len3][1] + gridDetails[0] - 1;

            //north(3), south(4), east(5), west(6)
            //top line
            if (!totalGrid[len][len3][3]) {
                line(leftX, topY, rightX, topY);
            }
            //bottom line
            if (!totalGrid[len][len3][4]) {
                line(leftX, bottomY, rightX, bottomY);
            }
            //right line
            if (!totalGrid[len][len3][5]) {
                line(rightX, topY, rightX, bottomY);
            }
            //left line
            if (!totalGrid[len][len3][6]) {
                line(leftX, topY, leftX, bottomY);
            }
        }
    }
}


//maze solver portion

function makeSolutions() {
    var currentRow = 0;
    var currentColumn = 0;
    //row, column
    //north(3), south(4), east(5), west(6)
    fill(0, 255, 0);
    var len = gridDetails[2];
    var len3 = gridDetails[3];
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len3; j++) {
            if (totalGrid[i][j][2] === finder[travelSize.value()]) {
                currentRow = i;
                currentColumn = j;
            }
        }
    }
    rect(totalGrid[currentRow][currentColumn][0], totalGrid[currentRow][currentColumn][1], 10, 10);
    //north, south, east, west
    var choices = [totalGrid[currentRow][currentColumn][3], totalGrid[currentRow][currentColumn][4], totalGrid[currentRow][currentColumn][5], totalGrid[currentRow][currentColumn][6]];
    var actualChoices = [];

    if (branches.length > 0) {
        var useFunction = true;
        for (var z = 0; z < branches.length; z++) {

            if (branches[z].indexOf(totalGrid[currentRow][currentColumn][2]) !== -1) {
                useFunction = false;
                actualChoices = branches[z][1];
            }
        }
        if (useFunction === true) {
            actualChoices = getChoices(choices);
            pickSpecificDirectionsSolution(actualChoices, currentRow, currentColumn);
        }
        else {
            pickSpecificDirectionsSolution(actualChoices, currentRow, currentColumn);
        }
    }
    else {
        actualChoices = getChoices(choices);
        pickSpecificDirectionsSolution(actualChoices, currentRow, currentColumn);
    }

    function pickSpecificDirectionsSolution(actualChoices, currentRow, currentColumn) {
        var newCurrentRow = 0;
        var newCurrentColumn = 0;
        if (actualChoices.length !== 0) {
            var direction = actualChoices[getRandomInt(0, actualChoices.length)].valueOf();
            for (var z = actualChoices.length - 1; z >= 0; z--) {
                if (actualChoices[z] === direction) {
                    actualChoices.splice(z, 1);
                }
            }

            var up = currentRow - 1;
            var down = currentRow + 1;
            var left = currentColumn - 1;
            var right = currentColumn + 1;

            if (direction === 1) {
                newCurrentRow = up;
                newCurrentColumn = currentColumn;
            }

            if (direction === 2) {
                newCurrentRow = down;
                newCurrentColumn = currentColumn;
            }
            if (direction === 3) {
                newCurrentColumn = right;
                newCurrentRow = currentRow;
            }

            if (direction === 4) {
                newCurrentColumn = left;
                newCurrentRow = currentRow;
            }

            var choices = [totalGrid[newCurrentRow][newCurrentColumn][3], totalGrid[newCurrentRow][newCurrentColumn][4], totalGrid[newCurrentRow][newCurrentColumn][5], totalGrid[newCurrentRow][newCurrentColumn][6]];

            if (direction === 1) {
                choices[1] = false;
            }

            if (direction === 2) {
                choices[0] = false;
            }
            if (direction === 3) {
                choices[3] = false;
            }

            if (direction === 4) {
                choices[2] = false;
            }

            actualChoices = getChoices(choices);

            branches.push([totalGrid[newCurrentRow][newCurrentColumn][2], actualChoices]);

            finder.push(totalGrid[newCurrentRow][newCurrentColumn][2]);
            travelSize.increment();
        }
        else {
            fill(0, 0, 255);
            rect(totalGrid[currentRow][currentColumn][0], totalGrid[currentRow][currentColumn][1], 10, 10);
            finder.pop();
            travelSize.decrement();
        }
    }

    function getChoices(choices) {
        var actualChoices = [];
        var counter = 1;
        for (var l = 0; l < choices.length; l++) {
            if (choices[l]) {
                actualChoices.push(counter);
            }
            counter++;
        }
        return actualChoices;
    }
}

function showPath() {
    fill(255, 0, 0);
    for (var i = 0; i < finder.length; i++) {
        var len = gridDetails[2];
        var len3 = gridDetails[3];
        while (len--) {
            len3 = gridDetails[3];
            while (len3--) {
                if (totalGrid[len][len3][2] === finder[i]) {
                    rect(totalGrid[len][len3][0], totalGrid[len][len3][1], 10, 10);
                }
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}