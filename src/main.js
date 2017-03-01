class Game {
    constructor() {

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width = 800;
        this.canvas.height = this.height = 800;

        this.objects = {
            myPlayer: null,
            players: [],
            bullets: []
        }

        Network.connectToServer(this);

        this.params = {
            canvas: this.canvas,
            ctx: this.ctx
        }

    }

    init() {
        let player = new Player(this.params);
        this.objects.myPlayer = player;
        this.objects.players.push(player);

        document.addEventListener('keydown', () => player.move());
        document.addEventListener('mousemove', () => player.rotate());

        document.addEventListener('mousedown', () => {
            player.shot();
            console.log(this.objects.myPlayer);
            console.log(this.objects.players);
        });

        document.addEventListener('mouseup', () => player.stopShot());

        requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.playerDraw();
        this.bulletsDraw();
        this.testBulletTankCollision();
        Network.sendDataToServer(this.objects.myPlayer);
        requestAnimationFrame(() => this.draw());
    }

    playerDraw() {
        this.objects.players.map(player => {
            Player.draw(player, this.ctx);
        });
    }

    bulletsDraw() {
        this.objects.bullets.map((bullet, i) => {
            Bullet.draw(this.ctx, bullet);
            if (bullet.x >= this.width || bullet.y >= this.height) {
                this.objects.bullets.slice(i, 1);
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
        var playerMaxX = this.objects.myPlayer.playerX + this.objects.myPlayer.playerWidth;
        var playerMaxY = this.objects.myPlayer.playerY + this.objects.myPlayer.playerHeight;

        this.objects.bullets.map((bullet) => {
            if ((bullet.x >= this.objects.myPlayer.playerX && bullet.x <= playerMaxX) &&
                (bullet.y >= this.objects.myPlayer.playerY && bullet.y <= playerMaxY)
            ){
               
            }
        });
    }

}