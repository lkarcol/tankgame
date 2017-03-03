var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser')
var app = express();
var HashMap = require('hashmap');

// parse application/x-www-form-urlencoded 
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
//app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './')));

//First route
app.get('/', function (req, res) {
	res.render(__dirname + '/index.ejs');
});



//Set port
var port = process.env.PORT || 3000;


var server = require('http').createServer(app).listen(port, function () {
	console.log("Server running!!!" + port)
});

// Create socket
var io = require('socket.io')(server);

var players = new HashMap();
var uid;
var bull = [];
var ticks;

io.on('connection', socket => {
	socket.on('playerData', (data) => {
		players.set(data.uid, data);
		if (data.health < 0) {
			players.remove(data.uid);
		}
	});

	socket.on('sendBllet', b => {
		bull.push(b);
	});

	ticks = setInterval(() => {
		bull.forEach((bullet, i) => {
			players.forEach((player, key) => {
				outsideRoom(bullet, i);
				collision(bullet, player, i);
			});
		});
		io.emit('bulletToClient', bull);
		io.emit('updatePlayer', players);
	}, 1000 / 33);


	socket.on('pingCheck', () => {
		socket.emit('ping');
	});
});

function collision(bullet, player, i) {
	var playerMaxX = player.playerX + player.playerWidth;
	var playerMaxY = player.playerY + player.playerHeight;

	if ((bullet.x >= player.playerX && bullet.x <= playerMaxX) &&
		(bullet.y >= player.playerY && bullet.y <= playerMaxY)
	) {
		player.health -= 1;
		bull.splice(i, 1);
	} else {
		bullet.x += bullet.speed * bullet.dX;
		bullet.y += bullet.speed * bullet.dY;
	}
}

//If bullet is outside room destroy
function outsideRoom(bullet, i) {
	if ((bullet.x >= 1000) || (bullet.y >= 1000) ||
		(bullet.x < 0) || (bullet.y < 0)
	) {
		bull.splice(i, 1);
	}
}
