"use strict"
window.onload = main;

var _wW = window.innerWidth;
var _wH = window.innerHeight;
var _game = null;
var socket;

function gameLoop(timestamp){
  socket.emit("update", { "directions": directions, "gameData": _game });
  window.requestAnimationFrame(gameLoop);
  window.cancelAnimationFrame(gameLoop); 
}

function main() {
  socket = io.connect('http://localhost:8080');

  _game = new Game(_wW, _wH, null);
  _game.init();

  console.log(_game);
  var data = {
    name: data,
    level: 18,
    x: Math.random() * _wW,
    y: Math.random() * _wH,
    w: 5,
    h: 5,
    color: "red"
  };

  socket.emit("new-player", data);

  onKeyDown();
  onKeyUp();

  socket.on("draw", function(players) {
    _game.players = players; // Problem : not the good way to do that
    drawSnake(_game);
  });

  window.requestAnimationFrame(gameLoop); 
}