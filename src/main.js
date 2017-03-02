class Game {
    constructor() {

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.width = window.innerWidth;
        this.canvas.height = this.height = window.innerHeight;

        this.objects = {
            myPlayer: null,
            players: [],
            bullets: []
        }

        this.params = {
            canvas: this.canvas,
            ctx: this.ctx
        }
    }

    init() {
        Network.connectToServer(this);

        let player = new Player(this.params);
        this.objects.myPlayer = player;
        this.objects.players.push(player);

        document.addEventListener('keydown', () => player.move());
        document.addEventListener('mousemove', () => player.rotate());
        document.addEventListener('mousedown', () => player.shot());
        document.addEventListener('mouseup', () => player.stopShot());

        requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.playerDraw();
        this.bulletsDraw();
        this.testBulletTankCollision();
        Network.sendDataToServer(this.objects.myPlayer);
        //   console.log(this.objects.bullets);
        requestAnimationFrame(() => this.draw());
    }

    positionTest() {
        let dir = this.objects.myPlayer.direction;
        let px = (Math.cos(dir) * 10 + this.objects.myPlayer.playerX);
        let py = (Math.sin(dir) * 10 + this.objects.myPlayer.playerY);
        let player = this.objects.myPlayer;
       // console.log(px);
        console.log(py);
        if ((px >= 10 && px <= this.width-30) && (py >= 10 && py  <= this.height-30)) {
            player.speed = 10;
            return;
        }
            player.speed = 0;
    }


    playerDraw() {
        this.objects.players.forEach(player => {
            Player.draw(player, this.ctx);
        });
        this.positionTest();
    }

    bulletsDraw() {
        this.objects.bullets.forEach((bullet, i) => {
            Bullet.draw(this.ctx, bullet);
            if ((bullet.x >= this.width) || (bullet.y >= this.height) ||
                (bullet.x < 0) || (bullet.y < 0) || (bullet.collision == true)
            ) {
                console.log(bullet);
                this.objects.bullets.splice(i, 1);
            }
        });
    }

    updatePlayer(data) {
        var uid = this.objects.myPlayer.uid;
        this.objects.players = [];
        for (let i in data._data) {
            this.objects.players.push(data._data[i][1]);
        }
    }

    updateBullets(bull) {
        this.objects.bullets.push(bull);
    }

    testBulletTankCollision() {

        this.objects.bullets.forEach((bullet, i) => {
            this.objects.players.forEach((player, i) => {

                var playerMaxX = player.playerX + player.playerWidth;
                var playerMaxY = player.playerY + player.playerHeight;

                if ((bullet.x >= player.playerX && bullet.x <= playerMaxX) &&
                    (bullet.y >= player.playerY && bullet.y <= playerMaxY)
                ) {
                    if (player.uid == this.objects.myPlayer.uid) {
                        this.objects.myPlayer.health -= 1;
                    }
                    bullet.collision = true;
                }
            });
        });
    }


}