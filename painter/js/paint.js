"use strict";

var totalGrid = [];
var gridDetails = [[8, 16], [8, 8]];
var currentGrid = 0;
var curR = 0;
var curG = 0;
var curB = 0;
var curColor = 0;
var _currentFill = "rgb(136, 0, 0);stroke-width:1;stroke:rgb(0,0,0)";
var _currentRadius = 100;
var brush = 1;
var oldPoint = [0, 0];
var newPoint = [0, 0];
var counter = 0;
//box array
//x,y,red,green,blue,alpha,code

function setup() {
    var myCanvas = createCanvas(640, 480);
    myCanvas.parent('grid');
    frameRate(30);
    noStroke();
    noSmooth();
    background(187, 187, 187);
    gridDetails[1].push((height / gridDetails[1][1]));
    gridDetails[1].push((width / gridDetails[1][0]));
    gridDetails[0].push((height / gridDetails[0][1]));
    gridDetails[0].push((width / gridDetails[0][0]));
    //gridDetails[0][2] = rows
    //gridDetails[0][3] = columns
    //console.log(gridDetails);
    totalGrid = [setupTotalBoxes(0), setupTotalBoxes(1)];
    //console.log(totalGrid);
    drawSuperFastBoxes();
}

function draw() {
    if (mouseOnGrid()) {
        if (brush === 2) {
            drawAll();
            _currentRadius = $("#radius").val();
            drawCircle(mouseX, mouseY, _currentRadius, true);
        }
        if (mouseIsPressed) {
            if (brush === 3) {
                drawAll();
                drawLine(oldPoint[0], oldPoint[1], newPoint[0], newPoint[1], true);
            }
            if (brush === 4) {
                drawAll();
                drawSquare(true);
            }
        }
        counter = 0;
    }
    if (!mouseOnGrid() && counter === 0) {
        //console.log("redraw called");
        drawAll();
        counter = 1;
    }

}

function mouseClicked() {
    if (mouseButton == LEFT && mouseOnGrid()) {
        if (brush === 2) {
            _currentRadius = $("#radius").val();
            drawCircle(mouseX, mouseY, _currentRadius, false);
        }
        if (brush === 1) {
            drawDot();
        }
        if (brush === 5) {
            drawDot();
            drawSome();
        }
    }
}

function mousePressed() {
    if (mouseButton == LEFT && mouseOnGrid()) {
        if (brush === 3 || brush === 4) {
            oldPoint = [mouseX, mouseY];
            newPoint = [mouseX, mouseY];
        }
    }
    if (mouseButton == RIGHT && mouseOnGrid()) {
        save();
    }
    if (mouseButton == CENTER && mouseOnGrid()) {
        fillColor();
    }
}

function mouseReleased() {
    if (mouseButton == LEFT && mouseOnGrid()) {
        if (brush === 3) {
            drawLine(oldPoint[0], oldPoint[1], newPoint[0], newPoint[1], false);
        }
        if (brush === 4) {
            drawSquare(false);
        }
        drawAll();
    }
}

function mouseDragged() {
    if (mouseButton == LEFT && mouseOnGrid()) {
        if (brush === 1) {
            drawDot();
        }
        if (brush === 5) {
            drawDot();
            drawSome();
        }
        if (brush === 3 || brush === 4) {
            newPoint = [mouseX, mouseY];
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        clearGrid();
    }
    if (keyCode === RIGHT_ARROW) {
        if (brush === 2) {
            fillCircle(mouseX, mouseY, _currentRadius, false);
        }
        else {
            fillColor();
        }
    }
    if (keyCode === DOWN_ARROW) {
        drawCircle(mouseX, mouseY, 100);
    }
}

function Row(grid, rowNumber) {
    var newRow = [];
    var localX = 0;
    for (var i = 0; i < gridDetails[currentGrid][3]; i++) {
        newRow.push([localX, rowNumber, 255, 255, 255, 0, -1]);
        localX += gridDetails[currentGrid][0];
    }
    grid.push(newRow);
}

function setupTotalBoxes(gridNumber) {
    var grid = [];
    var rowY = 0;
    for (var i = 0; i < gridDetails[gridNumber][2]; i++) {
        rowY = i * gridDetails[gridNumber][1];
        Row(grid, rowY);
    }
    return grid;

}

function getLocation(box) {
    var curRow, curCol;
    //console.log(box);
    //console.log(mouseX + " " + mouseY);
    curCol = box[0] / gridDetails[currentGrid][0];
    curRow = box[1] / gridDetails[currentGrid][1];
    return {curRow: curRow, curCol: curCol};
}

function getSpecificLocation(grid, box) {
    var curRow, curCol;
    curCol = box[0] / gridDetails[grid][0];
    curRow = box[1] / gridDetails[grid][1];
    return {curRow: curRow, curCol: curCol};
}

function getTotalCurrentBox(x, y) {
    var endX;
    var endY;
    var len = gridDetails[currentGrid][2];
    var len2 = gridDetails[currentGrid][3];
    while (len--) {
        len2 = gridDetails[currentGrid][3];
        while (len2--) {
            endX = totalGrid[currentGrid][len][len2][0] + gridDetails[currentGrid][0] - 1;
            endY = totalGrid[currentGrid][len][len2][1] + gridDetails[currentGrid][1] - 1;
            if ((x >= totalGrid[currentGrid][len][len2][0]) && (x <= endX) && (y >= totalGrid[currentGrid][len][len2][1] ) && (y <= endY)) {
                return totalGrid[currentGrid][len][len2];
            }
        }
    }
}

function getSpecificCurrentBox(grid, x, y) {
    var endX;
    var endY;
    var len = gridDetails[grid][2];
    var len2 = gridDetails[grid][3];
    while (len--) {
        len2 = gridDetails[grid][3];
        while (len2--) {
            endX = totalGrid[grid][len][len2][0] + gridDetails[grid][0] - 1;
            endY = totalGrid[grid][len][len2][1] + gridDetails[grid][1] - 1;
            if ((x >= totalGrid[grid][len][len2][0]) && (x <= endX) && (y >= totalGrid[grid][len][len2][1] ) && (y <= endY)) {
                return totalGrid[grid][len][len2];
            }
        }
    }
}

function setTotalBox(clear, grid, i, j) {
    if (brush === 5 || clear === true) {
        totalGrid[grid][i][j][2] = 255;
        totalGrid[grid][i][j][3] = 255;
        totalGrid[grid][i][j][4] = 255;
        totalGrid[grid][i][j][5] = 0;
        totalGrid[grid][i][j][6] = -1;
    }
    else {
        totalGrid[grid][i][j][2] = curR;
        totalGrid[grid][i][j][3] = curG;
        totalGrid[grid][i][j][4] = curB;
        totalGrid[grid][i][j][5] = 255;
        totalGrid[grid][i][j][6] = curColor;
    }
}

function setColor(r, g, b, cCode) {
    curR = r;
    curG = g;
    curB = b;
    curColor = cCode;
    var $svg = $("#currentColor");
    _currentFill = `rgb(${curR}, ${curG}, ${curB});stroke-width:2;stroke:rgb(0,0,0)`;
    $("#color", $svg).attr('style', "fill:" + _currentFill);

}


function drawAll() {
    background(187, 187, 187);
    drawSuperFastBoxes();
}

function drawSome() {
    var box = getSpecificCurrentBox(0, mouseX, mouseY);
    var __ret = getSpecificLocation(0, box);
    //background
    fill(187, 187, 187);
    rect(totalGrid[0][__ret.curRow][__ret.curCol][0], totalGrid[0][__ret.curRow][__ret.curCol][1], gridDetails[0][0], gridDetails[0][1]);
    //layer 1
    fill(totalGrid[0][__ret.curRow][__ret.curCol][2], totalGrid[0][__ret.curRow][__ret.curCol][3], totalGrid[0][__ret.curRow][__ret.curCol][4], totalGrid[0][__ret.curRow][__ret.curCol][5]);
    rect(totalGrid[0][__ret.curRow][__ret.curCol][0], totalGrid[0][__ret.curRow][__ret.curCol][1], gridDetails[0][0], gridDetails[0][1]);

    //layer 2
    var box2 = getSpecificCurrentBox(1, mouseX, mouseY);
    var ret2 = getSpecificLocation(1, box2);
    var __retAbove = ret2.curRow - 1;
    var __retBelow = ret2.curRow + 1;
    fill(totalGrid[1][ret2.curRow][ret2.curCol][2], totalGrid[1][ret2.curRow][ret2.curCol][3], totalGrid[1][ret2.curRow][ret2.curCol][4], totalGrid[1][ret2.curRow][ret2.curCol][5]);
    rect(totalGrid[1][ret2.curRow][ret2.curCol][0], totalGrid[1][ret2.curRow][ret2.curCol][1], gridDetails[1][0], gridDetails[1][1]);

    if (ret2.curRow & 1) {
        fill(totalGrid[1][__retAbove][ret2.curCol][2], totalGrid[1][__retAbove][ret2.curCol][3], totalGrid[1][__retAbove][ret2.curCol][4], totalGrid[1][__retAbove][ret2.curCol][5]);
        rect(totalGrid[1][__retAbove][ret2.curCol][0], totalGrid[1][__retAbove][ret2.curCol][1], gridDetails[1][0], gridDetails[1][1]);
    }
    else {
        fill(totalGrid[1][__retBelow][ret2.curCol][2], totalGrid[1][__retBelow][ret2.curCol][3], totalGrid[1][__retBelow][ret2.curCol][4], totalGrid[1][__retBelow][ret2.curCol][5]);
        rect(totalGrid[1][__retBelow][ret2.curCol][0], totalGrid[1][__retBelow][ret2.curCol][1], gridDetails[1][0], gridDetails[1][1]);
    }
}

function drawSuperFastBoxes() {
    var grids = totalGrid.length;
    for (var grid = 0; grid < grids; grid++) {
        var len = gridDetails[grid][2];
        var len3 = gridDetails[grid][3];
        while (len--) {
            len3 = gridDetails[grid][3];
            while (len3--) {
                fill(totalGrid[grid][len][len3][2], totalGrid[grid][len][len3][3], totalGrid[grid][len][len3][4], totalGrid[grid][len][len3][5]);
                rect(totalGrid[grid][len][len3][0], totalGrid[grid][len][len3][1], gridDetails[grid][0], gridDetails[grid][1]);
            }
        }
    }
}

function drawBox(grid, i, j, preview) {
    if (preview) {
        fill(curR, curG, curB);
    }
    else {
        fill(totalGrid[grid][i][j][2], totalGrid[grid][i][j][3], totalGrid[grid][i][j][4], totalGrid[grid][i][j][5]);
    }
    rect(totalGrid[grid][i][j][0], totalGrid[grid][i][j][1], gridDetails[grid][0], gridDetails[grid][1]);
}

function clearGrid() {
    var grids = totalGrid.length;
    for (var grid = 0; grid < grids; grid++) {
        var len = gridDetails[grid][2];
        var len2 = gridDetails[grid][3];
        while (len--) {
            len2 = gridDetails[grid][3];
            while (len2--) {
                setColor(255, 255, 255, -1);
                setTotalBox(true, grid, len, len2);
            }
        }
    }
    drawAll()
}


function drawDot() {
    var box = getTotalCurrentBox(mouseX, mouseY);

    try {
        var __ret = getLocation(box);
        setTotalBox(false, currentGrid, __ret.curRow, __ret.curCol);
        drawBox(currentGrid, __ret.curRow, __ret.curCol, false);
    }
    catch(ex){};
}

function tryShape(__ret, preview) {
    if (preview) {
        drawBox(currentGrid, __ret.curRow, __ret.curCol, true);
    }
    else {
        setTotalBox(false, currentGrid, __ret.curRow, __ret.curCol);
        drawBox(currentGrid, __ret.curRow, __ret.curCol, false);
    }
}

function drawCircle(x, y, r, preview) {
    var r2 = 2 * r;
    var slice = 2 * PI / r2;
    var angle, newX, newY, box, __ret;
    while (r2--) {
        angle = slice * r2;
        newX = (int)(x + r * Math.cos(angle));
        newY = (int)(y + r * Math.sin(angle));
        box = getTotalCurrentBox(newX, newY);
        try {
            __ret = getLocation(box);
            //tryShape(__ret, preview);
            if (preview) {
                drawBox(currentGrid, __ret.curRow, __ret.curCol, true);
            }
            else {
                setTotalBox(false, currentGrid, __ret.curRow, __ret.curCol);
                drawBox(currentGrid, __ret.curRow, __ret.curCol, false);
            }
        }
        catch (ex) {
        }
    }
}

function drawSquare(preview) {
    //topLeft-x = oldPoint[0];
    //topLeft-y = oldPoint[1];
    //bottomLeft-x = oldPoint[0];
    //bottomLeft-y = newPoint[1];
    //topRight-x = newPoint[0];
    //topRight-y = oldPoint[1];
    //bottomRight-x = newPoint[0];
    //bottomRight-y = newPoint[1];

    drawLine(oldPoint[0], oldPoint[1], newPoint[0], oldPoint[1], preview);
    drawLine(oldPoint[0], newPoint[1], newPoint[0], newPoint[1], preview);
    drawLine(oldPoint[0], oldPoint[1], oldPoint[0], newPoint[1], preview);
    drawLine(newPoint[0], oldPoint[1], newPoint[0], newPoint[1], preview);
}

function drawLine(x0, y0, x1, y1, preview) {
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;
    var box, __ret, e2;

    while (true) {
        box = getTotalCurrentBox(x0, y0);

        try {
            __ret = getLocation(box);
            tryShape(__ret, preview);
        }
        catch (ex) {
        }
        if ((x0 == x1) && (y0 == y1)) break;
        e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function fillColor() {
    var box = getTotalCurrentBox(mouseX, mouseY);
    var __ret = getLocation(box);
    var canvasWidth = totalGrid[currentGrid].length;
    var canvasHeight = totalGrid[currentGrid][0].length;
    floodTotalFill(__ret.curRow, __ret.curCol, box[6], curColor, canvasWidth, canvasHeight);
    drawAll();
}

function floodTotalFill(x, y, oldCode, newCode, canvasWidth, canvasHeight) {

    if (oldCode === newCode) {
        return;
    }
    if (totalGrid[currentGrid][x][y][6] !== oldCode) {
        return;
    }
    setTotalBox(false, currentGrid, x, y);
    if (x > 0) {
        floodTotalFill(x - 1, y, oldCode, newCode, canvasWidth, canvasHeight);
    }
    if (y > 0) {
        floodTotalFill(x, y - 1, oldCode, newCode, canvasWidth, canvasHeight);
    }
    if (x < canvasWidth - 1) {
        floodTotalFill(x + 1, y, oldCode, newCode, canvasWidth, canvasHeight);
    }
    if (y < canvasHeight - 1) {
        floodTotalFill(x, y + 1, oldCode, newCode, canvasWidth, canvasHeight);
    }
}

function fillCircle(x, y, r, preview) {
    while (r--) {
        drawCircle(x, y, r, preview)
    }
}


function setBrush(i) {
    brush = i
    function getPalette() {
        if (brush === 2) {
            $(document).ready(function () {
                $("#circleInfo").html("Radius of circle\n" +
                    "<br>\n" +
                    "        <input id=\"radius\" type=\"range\" min=\"0\" max=\"300\" value=\"50\">");

            });
        }
        else{
            $(document).ready(function () {
                $("#circleInfo").html("");
            });
        }
    }

    getPalette();
}

function switchPalette(palette) {
    clearGrid();
    if (palette === 'c64') {
        setColor(0, 0, 0, 0);
    }
    if (palette === 'nesColors') {
        setColor(124, 124, 124, 0);
    }
    if (palette === 'trs-80') {
        setColor(0, 128, 0, 0)
    }
    function getPalette() {
        $(document).ready(function () {
            $("#palette").html("");
            $.ajax({
                url: "palettes/" + palette + ".html",
                type: "GET",
                dataType: "html",
                success: function (html) {
                    $("#palette").html(html);
                }
            });
        });
    }

    getPalette();
}

function switchGrid(resolution) {
    if (resolution === 0) {
        currentGrid = 0;
    }
    if (resolution === 1) {
        currentGrid = 1;
    }
}

function mouseOnGrid() {
    return (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0);
}

function showSVG(){

    var header = '<svg version="1.1" baseProfile="full" height="'+ height +'" width="'+ width +'" xmlns="http://www.w3.org/2000/svg">';
    var middle = drawSuperFastSVG();
    var closer = "</svg>";
    var all = header + middle + closer;
    var displayCode = all.replace(/</g, "&lt;").replace(/>/g,"&gt;");

    $(`#svgDisplay`).html(all + "<hr><code id='svgCode'>" + displayCode + "</code>");
}

function drawSuperFastSVG() {
    var middle = "";
    var grids = totalGrid.length;
    for (var grid = 0; grid < grids; grid++) {
        var len = gridDetails[grid][2];
        var len3 = gridDetails[grid][3];
        while (len--) {
            len3 = gridDetails[grid][3];
            while (len3--) {
                if (totalGrid[grid][len][len3][5] === 255)
                    middle += '<rect x="'+ totalGrid[grid][len][len3][0] + '" y="'+totalGrid[grid][len][len3][1] +'" width="' +gridDetails[grid][0] +'" height="' + gridDetails[grid][1] +'" fill="rgb('+ totalGrid[grid][len][len3][2] + ',' + totalGrid[grid][len][len3][3] + ',' +totalGrid[grid][len][len3][4] + ')"/>';
            }

        }
    }
    return middle;
}

function selectText(element) {
    var doc = document, text = doc.getElementById(element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
        document.execCommand("Copy");
    }
    else if (window.getSelection) {
        var selection = window.getSelection();
        var range2 = document.createRange();
        range2.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range2);
        document.execCommand("Copy");
    }
}