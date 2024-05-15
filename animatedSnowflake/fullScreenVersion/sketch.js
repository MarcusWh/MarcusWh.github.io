// Marcus Whiteley
// Animated Snowflake

let lineArray = [];
let orderOfRotation = 6;
let shapeStarted = false;

function setup() {
    createCanvas(windowWidth,windowHeight);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(4);
    noFill();
    textSize(20);
    textAlign(CENTER);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    if (!fullscreen()){
        push();
        noStroke();
        fill(255);
        text("Tap to activate full screen",0,0);
        pop();
        lineArray = [];
    }else{
        for (let order = 0; order < orderOfRotation; order++) {
            for (let i = 0; i < lineArray.length; i++) {
                beginShape();
                for (let j = 0; j < lineArray[i].length; j++) {
                    vertex(lineArray[i][j][0], lineArray[i][j][1]);
                }
                endShape();
            }
            for (let i = 0; i < lineArray.length; i++) {
                beginShape();
                for (let j = 0; j < lineArray[i].length; j++) {
                    vertex(lineArray[i][j][0], lineArray[i][j][1] * -1);
                }
                endShape();
            }
            rotate(360 / orderOfRotation);
        }
        for (let i = lineArray.length - 1; i >= 0; i--) {
            for (let j = lineArray[i].length - 1; j >= 0; j--) {
                lineArray[i][j][0] += width/400;
                if (lineArray[i][j][0] > windowWidth*1.5) {
                    lineArray[i].splice(j, 1);
                }
            }
            if (lineArray[i].length < 1) {
                lineArray.splice(i, 1);
            }
        }
    }
}

function touchStarted() {
    if (fullscreen()){
        shapeStarted = true;
        lineArray.push([
            [mouseX - width / 2, mouseY - height / 2]
        ]);

    }
    return false;
}

function touchMoved() {
    if (fullscreen()){
        if (shapeStarted) {
            lineArray[lineArray.length - 1].push([mouseX - width / 2, mouseY - height / 2]);
        }
    }
    return false;
}

function touchEnded() {
    if (!fullscreen()){
        fullscreen(true);
    }
    shapeStarted = false;
    return false;
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

// function overRect(x,y,w,h){
//     if(mouseX>x-w/2 && mouseX<x+w/2 && mouseY>y-h/2 && mouseY<y+h/2){
//         return true;
//     }
// }
