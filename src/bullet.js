class Bullet {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
        this.dX = params.dx;
        this.dY = params.dy;
        this.speed = 10;
    }

    static draw(ctx,bullet) {
        ctx.fillStyle = 'black';
        ctx.fillRect(bullet.x, bullet.y, 5, 5);
    }
} 