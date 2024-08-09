class Car {
    constructor(x, y, width, height, angle, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.angle = angle;
        this.dist = Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2);
        this.angleDiff = Math.atan(this.width / this.height);
        
    this.cornerPts = [
        { x: x - Math.sin(this.angle + this.angleDiff) * this.dist, y: y - Math.cos(this.angle + this.angleDiff) * this.dist }, //leftUp
        { x: x + Math.sin(this.angle - this.angleDiff) * this.dist, y: y + Math.cos(this.angle - this.angleDiff) * this.dist }, //leftDown
        { x: x + Math.sin(this.angle + this.angleDiff) * this.dist, y: y + Math.cos(this.angle + this.angleDiff) * this.dist },  //rightDown
        { x: x - Math.sin(this.angle - this.angleDiff) * this.dist, y: y - Math.cos(this.angle - this.angleDiff) * this.dist } //rightUp
        ];
        this.image = img;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        
        ctx.beginPath();
        ctx.rect(
            - 5,
            - 5,
            10,
            10
        );
        ctx.fill();
        ctx.restore();

        //рисуем без угла поворота
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.moveTo(this.cornerPts[0].x, this.cornerPts[0].y);
        ctx.lineTo(this.cornerPts[1].x, this.cornerPts[1].y);
        ctx.lineTo(this.cornerPts[2].x, this.cornerPts[2].y);
        ctx.lineTo(this.cornerPts[3].x, this.cornerPts[3].y);
        ctx.lineTo(this.cornerPts[0].x, this.cornerPts[0].y);
        ctx.stroke();
    }
}