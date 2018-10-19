let traveled = [];
let gradient;
function setup(){
    let myCanvas = createCanvas(736, 544);
    gradient = createGraphics(736, 544);
    myCanvas.parent('grid');
    background(150);
    fillBackground();
    image(gradient,0,0);
    fill(0);
    strokeWeight(4);
}

function draw(){

}

function fillBackground(){
    gradient.noStroke();
    gradient.colorMode(RGB, width);
    let display = (int)(random(1,5));
    let randomLevel = (int)(width/random(1,10));
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (display === 1) {
                gradient.stroke(randomLevel, i, j,);
            }
            if (display === 2) {
                gradient.stroke(i, randomLevel, j);
            }
            if (display === 3) {
                gradient.stroke(i, j, randomLevel);
            }
            if (display === 4) {
                gradient.stroke(j, i, randomLevel);
            }
            if (display === 5) {
                gradient.stroke(j, randomLevel, i);
            }
            gradient.point(i, j);
        }
    }
}

function mouseDragged(){
    fill(0);
    stroke(0);
    strokeWeight(5);
    point(mouseX, mouseY);
    traveled.push([(int)(mouseX + random(-3,3)), (int)(mouseY + random(-3,3))]);
}

function mouseReleased(){
    traveled.push([-1, -1]);
    strokeWeight(5);
    image(gradient,0,0);
    let length = traveled.length - 1;
    for (let i = 0; i < length; i++){
        let j = i + 1;
       
        if (traveled[j][0] === -1) {
            i = i +2;
        }
        else{
            stroke(0);
            line(traveled[i][0], traveled[i][1], traveled[j][0], traveled[j][1]);
        }
    }
    filter(BLUR, 3);
}
