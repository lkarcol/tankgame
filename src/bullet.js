class Bullet {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
        this.dX = params.dx;
        this.dY = params.dy;
        this.speed = 10;
        this.collision = false;
    }

    static draw(ctx,bullet) {
        bullet.x += bullet.speed * bullet.dX;
        bullet.y += bullet.speed * bullet.dY;
        ctx.fillStyle = 'black';
        ctx.fillRect(bullet.x, bullet.y, 5, 5);
    }
} 