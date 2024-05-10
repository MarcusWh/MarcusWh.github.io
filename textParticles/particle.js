class Particle {
  constructor(x, y, i) {
    let r = floor(random(3));
    this.chooseStart(r);
    this.tx = x;
    this.ty = y;
    this.i = i;
    this.speed = this.chooseSpeed();
  }
  draw() {
    if (counter > this.i) {
      circle(this.x, this.y, 3);
      this.x = this.x + (this.tx - this.x) / this.speed;
      this.y = this.y + (this.ty - this.y) / this.speed;
    }
  }
  chooseSpeed() {
    return 20;
  }
  chooseStart(r) {
    if (r == 0) {
      this.x = width / -2;
      this.y = height / -2;
    } else if (r == 1) {
      this.x = random(width) - width / 2;
      this.y = random(height) - height / 2;
    } else if (r == 3) {
      this.x = i * 3;
      this.y = 100;
    }
  }
}
