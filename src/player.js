class Player {
    constructor(params) {
        this.playerWidth = 60;
        this.playerHeight = 60;
        this.playerX = 10;
        this.playerY = 10;
        this.direction = 0;
        this.ctx = params.ctx;
        this.canvas = params.canvas;
        this.speed = 10;
        this.mouseDown = false;
    }

    move() {
        let key = event.key;
        if (key == 'w') {
            this.playerX += this.speed * Math.cos(this.direction);
            this.playerY += this.speed * Math.sin(this.direction);
        }
    }

    rotate() {
        let rect = this.canvas.getBoundingClientRect();

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let dX = x - this.canvas.width / 2;
        let dY = y - this.canvas.height / 2;

        this.direction = Math.atan2(dY, dX);
    }

    shot(bullets) {

        this.mouseDown = true;
        if (this.mouseDown == true) {
            let shoting = setInterval(() => {
                if (this.mouseDown == false) {
                    clearInterval(shoting);
                }
                var bullet = new Bullet(this.generateShot());
                console.log(bullet);
               
                bullet.draw(this.ctx);
                bullets.push(bullet);
            }, 100);
        }
    }

    stopShot() {
        this.mouseDown = false;
    }

    generateShot() {
        //Bullet spawn position
        let x = ((this.playerX + (this.playerWidth / 2)) + Math.cos(this.direction) * 70);
        let y = ((this.playerY + (this.playerHeight / 2)) + Math.sin(this.direction) * 70);
        //Direct + speed
        let dx = 10 * Math.cos(this.direction);
        let dy = 10 * Math.sin(this.direction);

        let params = {
            x: x,
            y: y,
            dx: dx,
            dy: dy
        }

        return params;
    }

    draw() {
        this.ctx.save();
        //  console.log(this.direction);
        //Tank Body
        this.ctx.fillStyle = 'green';
        this.ctx.translate(this.playerX + this.playerWidth / 2, this.playerY + this.playerHeight / 2);
        this.ctx.rotate(this.direction);
        this.ctx.translate(-(this.playerX + this.playerWidth / 2), -(this.playerY + this.playerHeight / 2));
        this.ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);

        //Canon
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.playerX + 30, this.playerY + 22, 60, 15);
        this.ctx.restore();
    }
}