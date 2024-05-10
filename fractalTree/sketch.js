// let leftAngSlider;
// let rightAngSlider;
let length = document.getElementById("lineLength").value;
let ltAngle = document.getElementById("leftAngle").value / 100;
let rtAngle = document.getElementById("rightAngle").value / 100;
let ltRatio = document.getElementById("leftBranch").value / 100;
let rtRatio = document.getElementById("rightBranch").value / 100;
let div = document.getElementById("canvasContainer");

function setup() {
  let wid = div.offsetWidth;
  if (wid > 800) {
    wid = 800;
  }
  let canv = createCanvas(wid, (wid * 2) / 3);
  canv.parent(div);
  stroke(255);
  strokeWeight(1);
  noFill();
}

function updateLength(value) {
  length = value;
}

function updateLeftAngle(value) {
  ltAngle = value / 100;
}

function updateRightAngle(value) {
  rtAngle = value / 100;
}

function updateLeftBranch(value) {
  ltRatio = value / 100;
}

function updateRightBranch(value) {
  rtRatio = value / 100;
}

function draw() {
  background(19, 42, 56);
  push();
  strokeWeight(2);
  rect(1, 1, width - 1, height - 2);
  pop();
  makeBranch(width / 2, height * 0.9, (height / 400) * length, 0);
}

function makeBranch(startX, startY, length, angle) {
  if (length > 1) {
    let endX = startX + length * sin(angle);
    let endY = startY - length * cos(angle);
    line(startX, startY, endX, endY);
    makeBranch(endX, endY, length * ltRatio, angle + ltAngle);
    makeBranch(endX, endY, length * rtRatio, angle + rtAngle);
  }
}

function windowResized() {
  let wid = div.offsetWidth;
  if (wid > 800) {
    wid = 800;
  }
  resizeCanvas(wid, (wid * 2) / 3);
}
