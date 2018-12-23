var socketIO = require("socket.io");
var express  = require('express');
var http     = require('http');

var app      = express();
var server   = http.Server(app);
var io       = socketIO(server);

app.set('port', 8080);
app.use(express.static('public'));

io.on("connection", onConnect);

function onConnect(socket) {
  console.log("Add a new player.");
    
 socket.on('disconnect', function() {
    console.log("Client has disconnected");
  });
}

server.listen(8080, function() {
  console.log('Starting server on port ' + 8080);
});