// Marcus Whiteley
// Animated Snowflake

let lineArray = [];
let orderOfRotation = document.getElementById("orderSlider").value;
let orderSlider;
let div = document.getElementById("canvasContainer");
let shapeStarted = false;

function setup() {
  let wid = div.offsetWidth;
  if (wid > 1000) {
    wid = 1000;
  }
  let cnv = createCanvas(wid, 600);
  cnv.parent("canvasContainer");
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(4);
  noFill();
  imageMode(CENTER);
  iconSize = width * 0.08;
}

function updateSlider(value) {
  orderOfRotation = value;
}

function draw() {
  // orderOfRotation = orderSlider.value();

  background(19, 42, 56);
  rect(0, 0, width, height);
  translate(width / 2, height / 2);
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
      lineArray[i][j][0] += width / 400;
      if (lineArray[i][j][0] > windowWidth * 1.5) {
        lineArray[i].splice(j, 1);
      }
    }
    if (lineArray[i].length < 1) {
      lineArray.splice(i, 1);
    }
  }
}

function touchStarted() {
  if (overRect(width / 2, height / 2, width, height)) {
    shapeStarted = true;
    lineArray.push([[mouseX - width / 2, mouseY - height / 2]]);
    return false;
  }
}

function touchMoved() {
  if (overRect(width / 2, height / 2, width, height) && shapeStarted) {
    lineArray[lineArray.length - 1].push([
      mouseX - width / 2,
      mouseY - height / 2,
    ]);
    return false;
  }
}

function touchEnded() {
  shapeStarted = false;
}

function windowResized() {
  let wid = div.offsetWidth;
  if (wid > 1000) {
    wid = 1000;
  }
  resizeCanvas(wid, 600);
}

function overRect(x, y, w, h) {
  if (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  ) {
    return true;
  }
}

// function windowResized() {
//     let wid = div.offsetWidth;
//     resizeCanvas(wid, 600);
// }
