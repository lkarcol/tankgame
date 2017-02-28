class Network {
 
    static connectToServer(game) {
        this.socket = io();
        this.socket.on('connect', function (socket) {
            this.game = game;
            console.log(socket);
            Network.bindEvents(game);
        });
    }

    static bindEvents(game) {
        this.socket.on('updatePlayer', (data) => game.updatePlayer(data) );
        this.socket.on('nb', (data) => game.nb(data) );
    }

    static sendDataToServer(myPlayer){
        this.socket.emit('playerData',myPlayer);
    }

    static nb(b){
        this.socket.emit('nb',b);
    }

}