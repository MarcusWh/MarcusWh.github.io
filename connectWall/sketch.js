let div = document.getElementById("canvasContainer");

let tiles = [];
let foundGroups = 0;
let resetGame = false;
let bkDrop;

let questions = [
  [
    "0 + 1",
    "1 + 0",
    "1 - 0",
    "2 - 1",
    "3 - 2",
    "4 - 3",
    "5 - 4",
    "6 - 5",
    "7 - 6",
    "8 - 7",
    "9 - 8",
    "10 - 9",
    "1 x 1",
    "1 ÷ 1",
    "2 ÷ 2",
    "3 ÷ 3",
    "4 ÷ 4",
    "5 ÷ 5",
    "6 ÷ 6",
    "7 ÷ 7",
    "8 ÷ 8",
    "9 ÷ 9",
    "10 ÷ 10",
  ],
  [
    "0 + 2",
    "1 + 1",
    "2 + 0",
    "2 - 0",
    "3 - 1",
    "4 - 2",
    "5 - 3",
    "6 - 4",
    "7 - 5",
    "8 - 6",
    "9 - 7",
    "10 - 8",
    "1 x 2",
    "2 x 1",
    "2 ÷ 1",
    "4 ÷ 2",
    "6 ÷ 3",
    "8 ÷ 4",
    "10 ÷ 5",
  ],
  [
    "0 + 3",
    "1 + 2",
    "2 + 1",
    "3 + 0",
    "3 - 0",
    "4 - 1",
    "5 - 2",
    "6 - 3",
    "7 - 4",
    "8 - 5",
    "9 - 6",
    "10 - 7",
    "1 x 3",
    "3 x 1",
    "3 ÷ 1",
    "6 ÷ 2",
    "9 ÷ 3",
  ],
  [
    "0 + 4",
    "1 + 3",
    "2 + 2",
    "3 + 1",
    "4 + 0",
    "4 - 0",
    "5 - 1",
    "6 - 2",
    "7 - 3",
    "8 - 4",
    "9 - 5",
    "10 - 6",
    "1 x 4",
    "2 x 2",
    "4 x 1",
    "4 ÷ 1",
    "8 ÷ 2",
  ],
  [
    "0 + 5",
    "1 + 4",
    "2 + 3",
    "3 + 2",
    "4 + 1",
    "5 + 0",
    "5 - 0",
    "6 - 1",
    "7 - 2",
    "8 - 3",
    "9 - 4",
    "10 - 5",
    "1 x 5",
    "5 x 1",
    "5 ÷ 1",
    "10 ÷ 2",
  ],
  [
    "0 + 6",
    "1 + 5",
    "2 + 4",
    "3 + 3",
    "4 + 2",
    "5 + 1",
    "6 + 0",
    "6 - 0",
    "7 - 1",
    "8 - 2",
    "9 - 3",
    "10 - 4",
    "1 x 6",
    "2 x 3",
    "6 x 1",
    "6 ÷ 1",
  ],
  [
    "0 + 7",
    "1 + 6",
    "2 + 5",
    "3 + 4",
    "4 + 3",
    "5 + 2",
    "6 + 1",
    "7 + 0",
    "7 - 0",
    "8 - 1",
    "9 - 2",
    "10 - 3",
    "1 x 7",
    "7 x 1",
    "7 ÷ 1",
  ],
  [
    "0 + 8",
    "1 + 7",
    "2 + 6",
    "3 + 5",
    "4 + 4",
    "5 + 3",
    "6 + 2",
    "7 + 1",
    "8 + 0",
    "8 - 0",
    "9 - 1",
    "10 - 2",
    "1 x 8",
    "2 x 4",
    "4 x 2",
    "8 x 1",
    "8 ÷ 1",
  ],
  [
    "0 + 9",
    "1 + 8",
    "2 + 7",
    "3 + 6",
    "4 + 5",
    "5 + 4",
    "6 + 3",
    "7 + 2",
    "8 + 1",
    "9 + 0",
    "9 - 0",
    "10 - 1",
    "1 x 9",
    "3 x 3",
    "9 x 1",
    "9 ÷ 1",
  ],
  [
    "0 + 10",
    "1 + 9",
    "2 + 8",
    "3 + 7",
    "4 + 6",
    "5 + 5",
    "6 + 4",
    "7 + 3",
    "8 + 2",
    "9 + 1",
    "10 + 0",
    "10 - 0",
    "1 x 10",
    "2 x 5",
    "5 x 2",
    "10 x 1",
    "10 ÷ 1",
  ],
];

function copyQuestions() {
  let arr = [];
  for (let i = 0; i < questions.length; i++) {
    arr[i] = [];
    for (let j = 0; j < questions[i].length; j++) arr[i][j] = questions[i][j];
  }
  return arr;
}

function setup() {
  // frameRate(10);
  let canvw = div.offsetWidth;
  if (canvw > 1000) {
    canvw = 1000;
  }
  let canvh = (canvw * 2) / 3;
  let canv = createCanvas(canvw, canvh);
  // bkDrop = loadImage("bkDrop.jpeg");
  canv.parent(div);
  stroke(255);
  strokeWeight(1);
  noFill();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(height * 0.05);
  gameSetup();
}

function gameSetup() {
  tiles = [];
  foundGroups = 0;
  let tilew = width / 4;
  let tileh = height / 4;
  let questionsCopy = copyQuestions();
  for (let i = 0; i < 4; i++) {
    let randGroup = floor(random(questionsCopy.length));
    for (let j = 0; j < 4; j++) {
      let randQuestion = floor(random(questionsCopy[randGroup].length));
      tiles.push(
        new Tile(
          j * tilew + tilew / 2,
          i * tileh + tileh / 2,
          questionsCopy[randGroup][randQuestion],
          randGroup
        )
      );
      questionsCopy[randGroup].splice(randQuestion, 1);
    }
    questionsCopy.splice(randGroup, 1);
  }
  let tempArr = [];
  for (let i = 0; i < 16; i++) {
    let rand = floor(random(tiles.length));
    tempArr.push(tiles[rand]);
    tiles.splice(rand, 1);
  }
  for (let i = 0; i < tempArr.length; i++) {
    tiles[i] = tempArr[i];
  }
  reorder();
}

function draw() {
  background(19, 42, 56);
  //   image(bkDrop, 0, 0, width, height);
  for (let i = tiles.length - 1; i >= 0; i--) {
    tiles[i].draw();
  }
  push();
  noStroke();
  if (resetGame) {
    fill(0, 0, 0, 150);
    rect(width / 2, height / 2, width, height);
    fill(255);
    text("You solved the wall!\nClick to play again.", width / 2, height / 2);
  }
  pop();
}

function touchStarted() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].touchStarted();
  }
  return false;
}

function touchEnded() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].touchEnded();
  }
  if (countSelected() == 4) {
    if (findGroup()) {
      doShuffle();
    } else {
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].selected) {
          tiles[i].selected = false;
        }
      }
    }
  }
  if (resetGame) {
    gameSetup();
    resetGame = false;
  }
  if (countLocked() == 12) {
    foundGroups++;
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].locked) {
        tiles[i].locked = true;
        tiles[i].foundGroup = foundGroups;
      }
    }
    resetGame = true;
  }
  return false;
}

function doShuffle() {
  foundGroups++;
  let tempArrayInd = [];
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].selected) {
      tempArrayInd.push(i);
      tiles[i].foundGroup = foundGroups;
      tiles[i].locked = true;
      tiles[i].selected = false;
    }
  }
  let startNumber = (foundGroups - 1) * 4;
  for (let i = 0; i < tempArrayInd.length; i++) {
    let temp = tiles[tempArrayInd[i]];
    tiles[tempArrayInd[i]] = tiles[startNumber + i];
    tiles[startNumber + i] = temp;
  }
  reorder();
}

function reorder() {
  for (let i = 0; i < tiles.length; i++) {
    let tilew = width / 4;
    let tileh = height / 4;
    tiles[i].tx = (i % 4) * tilew + tilew / 2;
    tiles[i].ty = floor(i / 4) * tileh + tileh / 2;
  }
}

function windowResized() {
  canvw = div.offsetWidth;
  if (canvw > 1000) {
    canvw = 1000;
  }
  canvh = (canvw * 2) / 3;
  resizeCanvas(canvw, canvh);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].tw = (width / 4) * 0.95;
    tiles[i].th = (height / 4) * 0.95;
  }
  textSize(height * 0.05);
  reorder();
}

function overTile(x, y) {
  let tilew = (width / 4) * 0.95;
  let tileh = (height / 4) * 0.95;
  return (
    mouseX > x - tilew / 2 &&
    mouseX < x + tilew / 2 &&
    mouseY > y - tileh / 2 &&
    mouseY < y + tileh / 2
  );
}

function countSelected() {
  let c = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].selected) {
      c++;
    }
  }
  return c;
}

function countLocked() {
  let c = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].locked) {
      c++;
    }
  }
  return c;
}

function findGroup() {
  let tempArray = [];
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].selected) {
      tempArray.push(tiles[i]);
    }
  }
  return (
    tempArray[0].group == tempArray[1].group &&
    tempArray[0].group == tempArray[2].group &&
    tempArray[0].group == tempArray[3].group
  );
}
