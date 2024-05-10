let div = document.getElementById("canvasContainer");
let txt = "particle";
let points;
let font;
let particles = [];
let bounds;

function preload() {
  font = loadFont("Merriweather-Bold.ttf");
}

function setup() {
  //   font = textFont("Verdana");
  let wid = div.offsetWidth;
  let cnv = createCanvas(wid, wid * 0.8);
  cnv.parent("canvasContainer");
  points = font.textToPoints(txt, 0, 0, 200, {
    sampleFactor: 0.1,
  });
  bounds = font.textBounds(txt, 0, 0, 200);
  // textAlign(CENTER,CENTER);
  for (let i = 0; i < points.length; i++) {
    particles[i] = new Particle(
      points[i].x - bounds.w / 2,
      points[i].y - bounds.y - bounds.h / 2,
      i
    );
  }
  // stroke(255);
  // strokeWeight(1);
  noStroke();
  fill(255);
}

function draw() {
  background(40, 20, 60);
  translate(width / 2, height / 2);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

function windowResized() {
  let wid = div.offsetWidth;
  resizeCanvas(wid, wid * 0.8);
}
