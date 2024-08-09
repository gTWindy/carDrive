class MoveCar extends Car {
  constructor(x, y, width, height, angle, img) {
    super(x, y, width, height, angle, img);
    
    this.speed = 0;
    
    this.friction = 0.05;

    this.forwardBlock = false;
    this.reverseBlock = false;

    this.controls = new Controls();
  }
  update() {
    this.#move();
  }
  #move() {
    if (this.controls.forward && !this.forwardBlock) {
      this.speed = Math.min(this.speed + currentAcceleration, currentMaxSpeed);
    }

    if (this.controls.reverse && !this.reverseBlock) {
      console.log('r');
      this.speed = Math.max(this.speed - currentAcceleration, -currentMaxSpeed / 2);
    }

    if (this.speed > 0)
      this.speed = Math.max(this.speed - this.friction, 0);

    if (this.speed < 0)
      this.speed = Math.min(this.speed + this.friction, 0);

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left)
        this.angle += (Math.abs(this.speed) / currentMaxSpeed) * 0.03 * flip;

      if (this.controls.right)
        this.angle -= (Math.abs(this.speed) / currentMaxSpeed) * 0.03 * flip;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;

    this.cornerPts[0].x = this.x - Math.sin(this.angle + this.angleDiff) * this.dist; //leftUp
    this.cornerPts[0].y = this.y - Math.cos(this.angle + this.angleDiff) * this.dist;

    this.cornerPts[1].x = this.x + Math.sin(this.angle - this.angleDiff) * this.dist; //leftDown
    this.cornerPts[1].y = this.y + Math.cos(this.angle - this.angleDiff) * this.dist;

    this.cornerPts[2].x = this.x + Math.sin(this.angle + this.angleDiff) * this.dist; //rightDown
    this.cornerPts[2].y = this.y + Math.cos(this.angle + this.angleDiff) * this.dist;
    
    this.cornerPts[3].x = this.x - Math.sin(this.angle - this.angleDiff) * this.dist; //rightUp
    this.cornerPts[3].y = this.y - Math.cos(this.angle - this.angleDiff) * this.dist;

    
     
    /*
    this.leftUpX = this.x - Math.sin(this.angle + this.angleDiff) * this.dist;
    this.leftDownX = this.x + Math.sin(this.angle - this.angleDiff) * this.dist;
    this.rightUpX = this.x - Math.sin(this.angle - this.angleDiff) * this.dist;
    this.rightDownX = this.x + Math.sin(this.angle + this.angleDiff) * this.dist;

    this.leftUpY = this.y - Math.cos(this.angle + this.angleDiff) * this.dist;
    this.leftDownY = this.y + Math.cos(this.angle - this.angleDiff) * this.dist;
    this.rightUpY = this.y - Math.cos(this.angle - this.angleDiff) * this.dist;
    this.rightDownY = this.y + Math.cos(this.angle + this.angleDiff) * this.dist;*/
  }
}