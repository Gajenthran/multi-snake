var socketIO = require('socket.io');
var express  = require('express');
var http     = require('http');

var app      = express();
var server   = http.Server(app);
var io       = socketIO(server);

var FPS  = 1000 / 15;
var PORT = 8080; 

app.set('port', PORT);
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.render('public/index.html');
});

var Game = require('./src/Game');
var game = new Game();
game.init();

io.on('connection', (socket) => {
  listen(socket, 'new-player',    game.addNewPlayer.bind(game));
  listen(socket, 'player-action', game.updatePlayerInput.bind(game));
  listen(socket, 'disconnect',    game.removePlayer.bind(game));
});

function listen(socket, type, callback) {
  socket.on(type, function(data) {
    callback(socket, data)
  });
}

setInterval(function() {
  game.update();
  game.emitValuesToClient();
}, FPS);

server.listen(PORT, function() {
  console.log('Starting server on port ' + PORT);
});
