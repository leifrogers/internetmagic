"use strict";
let totalGrid = [];
let traveled = [];
let finder = [1];
let branches = [];

let gridDetails = [16, 16];

let tripCounter = (function () {
    let privateCounter = 0;

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

let travelSize = tripCounter();
let travelLength = tripCounter();
travelLength.setOne();

function setup() {
    let myCanvas = createCanvas(736, 544);
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
    let counter = 1;
    let grid = [];
    let rowY = 0;
    for (let i = 0; i < gridDetails[2]; i++) {
        rowY = i * gridDetails[1];
        let newRow = [];
        let localX = 0;
        for (let j = 0; j < gridDetails[3]; j++) {
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
    let currentRow = 0;
    let currentColumn = 0;
    while (travelLength.value() < totalCells()) {
        //row, column
        //north(3), south(4), east(5), west(6)
        let len = gridDetails[2];
        let len3 = gridDetails[3];
        while (len--) {
            len3 = gridDetails[3];
            while (len3--) {
                if (totalGrid[len][len3][2] === traveled[travelSize.value()]) {
                    currentRow = len;
                    currentColumn = len3;
                }
            }
        }
        let up = currentRow - 1;
        let down = currentRow + 1;
        let left = currentColumn - 1;
        let right = currentColumn + 1;
        //north, south, east, west
        let choices = [true, true, true, true];

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
        let actualChoices = [];
        let counter = 1;
        for (let i = 0; i < 4; i++) {
            if (!choices[i]) {
                actualChoices.push([counter]);
            }
            counter++;
        }

        if (actualChoices.length > 0) {
            let direction = actualChoices[getRandomInt(0, actualChoices.length)][0].valueOf();
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
    let len = gridDetails[2];
    let len3 = gridDetails[3];
    while (len--) {
        len3 = gridDetails[3];
        while (len3--) {
            let leftX = totalGrid[len][len3][0];
            let rightX = totalGrid[len][len3][0] + gridDetails[1] - 1;
            let topY = totalGrid[len][len3][1];
            let bottomY = totalGrid[len][len3][1] + gridDetails[0] - 1;

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
    let currentRow = 0;
    let currentColumn = 0;
    //row, column
    //north(3), south(4), east(5), west(6)
    fill(0, 255, 0);
    let len = gridDetails[2];
    let len3 = gridDetails[3];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len3; j++) {
            if (totalGrid[i][j][2] === finder[travelSize.value()]) {
                currentRow = i;
                currentColumn = j;
            }
        }
    }
    rect(totalGrid[currentRow][currentColumn][0], totalGrid[currentRow][currentColumn][1], 10, 10);
    //north, south, east, west
    let choices = [totalGrid[currentRow][currentColumn][3], totalGrid[currentRow][currentColumn][4], totalGrid[currentRow][currentColumn][5], totalGrid[currentRow][currentColumn][6]];
    let actualChoices = [];

    if (branches.length > 0) {
        let useFunction = true;
        for (let z = 0; z < branches.length; z++) {

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
        let newCurrentRow = 0;
        let newCurrentColumn = 0;
        if (actualChoices.length !== 0) {
            let direction = actualChoices[getRandomInt(0, actualChoices.length)].valueOf();
            for (let z = actualChoices.length - 1; z >= 0; z--) {
                if (actualChoices[z] === direction) {
                    actualChoices.splice(z, 1);
                }
            }

            let up = currentRow - 1;
            let down = currentRow + 1;
            let left = currentColumn - 1;
            let right = currentColumn + 1;

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

            let choices = [totalGrid[newCurrentRow][newCurrentColumn][3], totalGrid[newCurrentRow][newCurrentColumn][4], totalGrid[newCurrentRow][newCurrentColumn][5], totalGrid[newCurrentRow][newCurrentColumn][6]];

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
        let actualChoices = [];
        let counter = 1;
        for (let l = 0; l < choices.length; l++) {
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
    for (let i = 0; i < finder.length; i++) {
        let len = gridDetails[2];
        let len3 = gridDetails[3];
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