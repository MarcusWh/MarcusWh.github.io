let div = document.getElementById("canvasContainer");
let txt = "particle";
let points;
let font;
let particles;
let bounds;
let counter = 0;
let words = [
  "awesome",
  "tranquil",
  "placid",
  "intricate",
  "focus",
  "clarity",
  "presence",
  "courage",
  "belief",
  "gratitude",
];
let wordCounter = 0;
let r = 0;

function preload() {
  font = loadFont("Merriweather-Bold.ttf");
}

function setup() {
  let wid = div.offsetWidth;
  let cnv = createCanvas(wid, wid * 0.5);
  cnv.parent("canvasContainer");
  resetParticles();
  noStroke();
  fill(255);
}

function draw() {
  background(19, 42, 56);
  translate(width / 2, height / 2);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
  if (counter > particles.length + 360) {
    resetParticles();
  }
  counter++;
}

function windowResized() {
  let wid = div.offsetWidth;
  resizeCanvas(wid, wid * 0.5);
}

function resetParticles() {
  particles = [];
  points = [];
  bounds = font.textBounds(words[wordCounter], 0, 0, 200);
  let fSize = (width / bounds.w) * 180;
  points = font.textToPoints(words[wordCounter], 0, 0, fSize, {
    sampleFactor: 0.2,
  });
  bounds = font.textBounds(words[wordCounter], 0, 0, fSize);
  for (let i = 0; i < points.length; i++) {
    particles[i] = new Particle(
      points[i].x - bounds.w / 2,
      points[i].y - bounds.y - bounds.h / 2,
      i,
      r
    );
  }
  counter = 0;
  wordCounter++;
  if (wordCounter == words.length) {
    wordCounter = 0;
  }
  r++;
  if (r == 5) {
    r = 0;
  }
}
