class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width = 800;
        this.canvas.height = this.height = 800;

        this.objects = {
            players: [],
            bullets: []
        }

        this.params = {
            canvas: this.canvas,
            ctx: this.ctx
        }

    }

    init() {
        let bullets = this.objects.bullets;
        let player = new Player(this.params);
        this.objects.players.push(player);

        document.addEventListener('keydown', () => player.move());
        document.addEventListener('mousemove', () => player.rotate());
        document.addEventListener('mousedown', () => player.shot(bullets));
        document.addEventListener('mouseup', () => player.stopShot());

        requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.playerDraw();
        this.bulletsDraw();
        requestAnimationFrame(() => this.draw());
    }

    playerDraw() {
        this.objects.players.map(player => {
            player.draw();
        });
    }

    bulletsDraw() {
        this.objects.bullets.map((bullet,i) => {
            bullet.draw(this.ctx);
            if (bullet.x >= this.width || bullet.y >= this.height) {
                this.objects.bullets.slice(i, 1);
            }
        });
    }
}