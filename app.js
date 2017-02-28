var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser')
var app = express();


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
	console.log("Server ide!!!" + port)
});

// Create socket
var io = require('socket.io')(server);


io.on('connection', socket => {
	console.log("OK");
});


