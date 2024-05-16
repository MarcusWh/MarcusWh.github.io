let a=0.25;
let b=0;
let ang = 0;
let dist = 0.5;
let lim = 50;
let pow = 1.8;
let power=Math.pow(lim,pow);
let div = document.getElementById("canvasContainer");

function setup() {
    let wid = div.offsetWidth;
    let cnv = createCanvas(wid,wid*0.8);
    cnv.parent("canvasContainer");
    // ca = createCanvas(1000,800);
    pixelDensity(1);
    colorMode(HSB);
}

function draw() {
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

function windowResized() {
    let wid = div.offsetWidth;
    resizeCanvas(wid, wid*0.8);
}
