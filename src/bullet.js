class Bullet {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
        this.dX = params.dx;
        this.dY = params.dy;
        this.speed = 10;
    }

    draw(ctx) {
        this.x += this.dX;
        this.y += this.dY;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, 5, 5);
    }
} 