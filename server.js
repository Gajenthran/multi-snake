/**
 * Initialization and lauch of the server and the game
 * (server side).
 *
 * @author PANCHALINGAMOORTHY Gajenthran
 */

// Tools needed to create a server
var socketIO = require('socket.io');
var express  = require('express');
var http     = require('http');

// Initialize the tools to create a server
var app      = express();
var server   = http.Server(app);
var io       = socketIO(server);

var DELAY = 1000/12;
var PORT = 8080; 

app.set('port', PORT);
// Serving static files
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

// Routing
app.get('/', function(request, response) {
  response.render('public/index.html');
});

// Initialize the game
var Game = require('./src/game');
var game = new Game();
game.init();
 
/**
 * When a player connects to the server, the server listens to the player's requests
 * Here, when a player connects to the server, we had a new player to the game,
 * we update the movement of the snake and we remove the player if he disconnects.
 */
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

/**
 * Call repeatedly game.update (to update the game) and 
 * game.emitValuesToClient (to send data to the client), with
 * a fixed time delay between each call.
 */
setInterval(function() {
  game.update();
  game.emitValuesToClient();
}, DELAY);

/**
 * The server listens on port 8080.
 */
server.listen(PORT, function() {
  console.log('Starting server on port ' + PORT);
});
