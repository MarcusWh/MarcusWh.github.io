let grid = [];
let boxWidth;
let boxHeight;
let buttonSolve;
let buttonReset;
window.addEventListener("keydown", function(e) {
// space and arrow keys
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
}, false);

function setup() {
    newGrid();
    if (windowWidth<600){
        canvas = createCanvas(windowWidth,windowWidth);
    }else{
        canvas = createCanvas(600,600);
    }
    canvas.parent("canvasContainer");
    fill(255);
    stroke(255);
    textSize(40);
    textAlign(CENTER,CENTER);
    boxWidth = width/9;
    boxHeight = height/9;
    buttonSolve = document.getElementById("solveButton");
    buttonReset = document.getElementById("resetButton");
}

function draw() {
    background(40,20,60);
    push();
    for (let i = 0;i<grid.length;i++){
        let x = grid[i].col*boxWidth;
        let y = grid[i].row*boxHeight;
        if (grid[i].edit){
            fill(180,0,30);
        }else if (grid[i].err){
            fill(200,30,0);
        }else{
            noFill();
        }
        strokeWeight(2)
        rect(x,y,boxWidth,boxHeight);
        let txt = grid[i].val;
        push();
        fill(255);
        noStroke();
        if (txt != 0){
            text(txt,x+boxWidth/2,y+boxHeight/2);
        }
        pop();
    }
    pop()
    push();
    strokeWeight(5);
    for (let i = 0;i<4;i++){
        line(3*i*boxWidth,0,3*i*boxWidth,height);
        line(0,3*i*boxHeight,width,3*i*boxHeight);
    }
    pop();
}

function mousePressed(){
    for (let i = 0;i<grid.length;i++){
        let x = grid[i].col*boxWidth;
        let y = grid[i].row*boxHeight;
        if (overBox(x,y,boxWidth,boxHeight)){
            clearErr();
            grid[i].edit = true;
        }else{
            grid[i].edit = false;
        }
    }
}

function keyPressed(){
    let keyComplete = false;
    for (let i = 0;i<grid.length;i++){
        if (!keyComplete){
            if (grid[i].edit){
                if (key>=0 && key < 10){
                    grid[i].val = key;
                }
                if (keyCode === BACKSPACE){
                    grid[i].val = 0;
                }
                let r = grid[i].row;
                let c = grid[i].col;
                if (keyCode === UP_ARROW){
                    if (r>0){
                        for (let j = 0;j<grid.length;j++){
                            if (grid[j].row == r-1 && grid[j].col == c){
                                grid[j].edit = true;
                                grid[i].edit = false;
                            }
                        }
                    }
                }else if(keyCode === DOWN_ARROW){
                    if (r<8){
                        for (let j = 0;j<grid.length;j++){
                            if (grid[j].row == r+1 && grid[j].col == c){
                                grid[j].edit = true;
                                grid[i].edit = false;
                            }
                        }
                    }
                }else if(keyCode === LEFT_ARROW){
                    if (c>0){
                        for (let j = 0;j<grid.length;j++){
                            if (grid[j].col == c-1 && grid[j].row == r){
                                grid[j].edit = true;
                                grid[i].edit = false;
                            }
                        }
                    }
                }else if(keyCode === RIGHT_ARROW){
                    if (c<8){
                        for (let j = 0;j<grid.length;j++){
                            if (grid[j].col == c+1 && grid[j].row == r){
                                grid[j].edit = true;
                                grid[i].edit = false;
                            }
                        }
                    }
                }
                keyComplete=true;
            }
        }
    }
}

function overBox(x,y,w,h){
    if (mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h){
        return true;
    }
}

function checker(){
    let gridOk = true;
    for (let i = 0;i<grid.length;i++){
        if (grid[i].val > 0){
            let num = grid[i].val;
            grid[i].val = 0;
            if (!numberAllowed(grid[i].row,grid[i].col,num)){
                grid[i].err = true;
                gridOk = false;
            }
            grid[i].val = num;
        }else{
            grid[i].poss = countPoss(grid[i].row,grid[i].col);
        }
    }
    if (gridOk){
        orderArray();
        if (!solve()){
            alert("This grid is not possible!");
        }
    }else{
        alert("There's a mistake in the position of the numbers!");
    }
}

function countPoss(row, col){
    var options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row0 = floor(row/3)*3;
    let col0 = floor(col/3)*3;
    for (let i = 0;i<grid.length;i++){
        if (grid[i].row==row){
            for( var j = 0; j < options.length; j++){
                if (grid[i].val == options[j]) {
                    // console.log(options);
                    options.splice(j, 1);
                }
            }
        }
        if (grid[i].col==col){
            for( var j = 0; j < options.length; j++){
                if (grid[i].val == options[j]) {
                    options.splice(j, 1);
                }
            }
        }
        if(grid[i].row>=row0 && grid[i].row<row0+3 && grid[i].col>=col0 && grid[i].col<col0+3){
            for( var j = 0; j < options.length; j++){
                if (grid[i].val == options[j]) {
                    options.splice(j, 1);
                }
            }
        }
    }
    return options;
}

function orderArray(){
    let tGrid=[];
    for (let i = 0;i<grid.length;i++){
        tGrid[i] = grid[i];
    }
    grid = [];
    for (let i = tGrid.length-1;i>=0;i--){
        let ind = -1;
        let min = 100;
        for (let j = tGrid.length-1;j>=0;j--){
            if (tGrid[j].poss.length<min){
                min = tGrid[j].poss.length;
                ind = j;
            }
        }
        grid.push(tGrid[ind]);
        tGrid.splice(ind,1);
    }
}

function solve(){
    for (let i = 0;i<grid.length;i++){
        let row = grid[i].row;
        let col = grid[i].col;
        if (grid[i].val==0){
            for (let j=0;j<grid[i].poss.length;j++){
                if (numberAllowed(row,col,grid[i].poss[j])){
                    grid[i].val=grid[i].poss[j];
                    if (solve()){
                        return true;
                    }else{
                        grid[i].val = 0;
                    }
                }
            }
            return false;
        }
    }
    return true;
}

function numberAllowed(row,col,n){
    let row0 = floor(row/3)*3;
    let col0 = floor(col/3)*3;
    for (let i = 0;i<grid.length;i++){
        if(grid[i].val==n){
            if(grid[i].row==row){
                return false;
            }
            if (grid[i].col==col){
                return false;
            }
            if(grid[i].row>=row0 && grid[i].row<row0+3 && grid[i].col>=col0 && grid[i].col<col0+3){
                return false;
            }
        }
    }
    return true;
}

function clearErr(){
    timeOut = false;
    for (let i = 0;i<grid.length;i++){
        grid[i].err = false;
    }
}

function newGrid(){
    grid = [];
    for (let row = 0;row<9;row++){
        for (let col = 0;col<9;col++){
            grid.push({val:0, edit:false, err:false, row:row, col:col, poss:[1,2,3,4,5,6,7,8,9]});
        }
    }
}

function reset(){
    clearErr();
    newGrid();
}
