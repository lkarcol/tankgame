class Player {
    constructor(params) {
        this.uid = this.generateUUID();
        this.playerWidth = 60;
        this.playerHeight = 60;
        this.playerX = 10;
        this.playerY = 10;
        this.direction = 0;
        this.health = 60;
        this.ctx = params.ctx;
        this.canvas = params.canvas;
        this.speed = 10;
        this.mouseDown = false;
    }

    getDataForServer() {
        return {
            uid: this.uid,
            pW: this.playerWidth,
            pH: this.playerHeight,
            pX: this.playerX,
            pY: this.playerY,
            dir: this.direction,
            bull: this.bull
        }
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
        if (this.health > 0) {
            this.mouseDown = true;
            if (this.mouseDown == true) {
                let shoting = setInterval(() => {
                    if (this.mouseDown == false) {
                        clearInterval(shoting);
                    }
                    var bullet = new Bullet(this.generateShot());
                    Network.bulletToServer(bullet);
                }, 100);
            }
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
        let dx = Math.cos(this.direction);
        let dy = Math.sin(this.direction);

        let params = {
            x: x,
            y: y,
            dx: dx,
            dy: dy
        }

        return params;
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    static draw(player, ctx) {
        ctx.save();
        //Tank Body
        ctx.fillStyle = 'green';
        ctx.translate(player.playerX + player.playerWidth / 2, player.playerY + player.playerHeight / 2);
        ctx.rotate(player.direction);
        ctx.translate(-(player.playerX + player.playerWidth / 2), -(player.playerY + player.playerHeight / 2));
        ctx.fillRect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);

        //Canon
        ctx.fillStyle = 'red';
        ctx.fillRect(player.playerX + 30, player.playerY + 22, 60, 15);


        ctx.fillStyle = 'blue';
        ctx.fillRect(player.playerX, player.playerY - 5, player.health, 5);
        //Health bar

        ctx.restore();
    }
}