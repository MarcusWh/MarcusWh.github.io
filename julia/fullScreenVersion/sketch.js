let a=0.25;
let b=0;
let ang = 0;
let dist = 0.5;
let lim = 50;
let pow = 1.8;
let power=Math.pow(lim,pow);
// let div = document.getElementById("canvasContainer");

function setup() {
    // let wid = div.offsetWidth;
    let cnv = createCanvas(windowWidth,windowHeight);
    // cnv.parent(div);
    // ca = createCanvas(1000,800);
    pixelDensity(1);
    colorMode(HSB);
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
        text("Tap to activate full screen\n(there may be a delay on larger screens)",0,0);
        pop();
        lineArray = [];
    }else{
        a=(mouseX-width/2)/(height/2);
        b=(mouseY-height/2)/(height/2);
        background(0);
        loadPixels();
        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++){
                let real = (x-width/2)/(height/3);
                let imag = (-y+height/2)/(height/3);
                let col = 0;
                for (let i = 0; i < lim; i++){
                    let re = real;
                    let im = imag;
                    real = (re*re) - (im*im) + a;
                    imag = 2 * re * im + b;
                    if (abs(real)>10 || abs(imag)>10){
                        col = Math.pow(i,pow);
                        map(col, 0, Math.pow(lim,pow), 0, 255);
                        break;
                    }
                }
                let index = (x+y*width)*4;
                pixels[index+0] = (col)%255;
                pixels[index+1] = (col*0.8)%255;
                pixels[index+2] = (col*0.6)%255;
                pixels[index+3] = 255;
            }
        }
        updatePixels();
    }
}

function touchEnded() {
    if (!fullscreen()){
        fullscreen(true);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
