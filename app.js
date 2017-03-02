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

io.on('connection', socket => {
	socket.on('playerData', (data) => {
		players.set(data.uid, data);
		if(data.health < 0 ){
			players.remove(data.uid);
		}
		console.log(players.count());
		io.emit('updatePlayer', players);
	});

	socket.on('sendBllet',b =>{
		io.emit('bulletToClient',b);
	});

	

});



