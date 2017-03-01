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
        this.socket.on('bulletToClient', (data) => game.updateBullets(data) );
    }

    static sendDataToServer(myPlayer){
        this.socket.emit('playerData',myPlayer);
    }

    static bulletToServer(b){
        this.socket.emit('sendBllet',b);
    }

}