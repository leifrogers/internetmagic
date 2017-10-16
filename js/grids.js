function setup() {
    createCanvas(windowWidth, windowHeight);
    makeGrids();
}

function draw() {
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    makeGrids();
}

function makeGrids()
{
    var width = windowWidth/10;
    var height = windowHeight/10;
    for (var i = 0; i < windowWidth/10; i++)
    {
        for (var j = 0; j < windowHeight/10; j++)
        {
            fill(random(255),random(255),random(255));
            rect(i*width,j*height,width,height);
        }
    }
}