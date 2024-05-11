class Particle {
  constructor(x, y, i, r) {
    this.tx = x;
    this.ty = y;
    this.i = i;
    this.chooseStart(r);
    this.speed = this.chooseSpeed();
  }
  draw() {
    circle(this.x, this.y, 3);
    if (counter > this.i) {
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
    } else if (r == 2) {
      this.x = this.i * 3 - width / 2;
      this.y = 100 - height / 2;
      if (this.x > width) {
        this.x = this.x - width;
        this.y = 110 - height / 2;
      }
    } else if (r == 3) {
      this.x = 0;
      this.y = 0;
    } else if (r == 4) {
      this.x = width / 2;
      this.y = height / 2;
    }
  }
}
