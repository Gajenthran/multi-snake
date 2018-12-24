var socketIO = require("socket.io");
var express  = require('express');
var http     = require('http');

var app      = express();
var server   = http.Server(app);
var io       = socketIO(server);

app.set('port', 8080);
app.use(express.static('public'));
var Player = require('./public/Player');
var Snake  = require('./public/Snake');

var players = [];

// Routing
app.get('/', function(request, response) {
  response.render('public/index.html', null);
});

io.on('connection',
  function(socket) {
    console.log("New player: " + socket.id);

    socket.on('new-player',
      function(data) {
        var player = new Player(socket.id, data.name, data.level, 
                                data.x, data.y, data.w, data.h, data.color);
        console.log(player);
        players.push(player);
        // game.addNewPlayer(player);
      }
    );

  	socket.on('update',
      function(data) {
        var player = null;
        for (var i = 0; i < players.length; i++) {
          if (players[i].id == socket.id) {
            player = players[i];
          }
        }

        //console.log("game : " + data["game"]);
        if(player)
          player.move(data["directions"]);
      }
    );

    socket.on('disconnect', function() {
      players.pop();
      console.log("Client has disconnected");
    });
  }
); 

setInterval(function() {
  io.sockets.emit("draw", players);
}, 1000 / 60);

server.listen(8080, function() {
  console.log('Starting server on port ' + 8080);
});
