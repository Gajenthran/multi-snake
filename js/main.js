"use strict"
window.onload = main;

var _snake   = new Array(),
    _players = new Array(),
    _game    = null,
    _wW      = window.innerWidth,
    _wH      = window.innerHeight,
    lastTime = 0;


function gameLoop(timestamp){
  handleSnakeMovement(_game.players[0]);
  _game.update();
  _game.render();
  window.requestAnimationFrame(gameLoop);
  window.cancelAnimationFrame(gameLoop); 
}

function main(){
  var i;
  for(i = 0; i < 3; i++) {
    _snake = new Snake(Math.random() * _wW, Math.random() * _wH, 5, 5, "#"+((1<<24)*Math.random()|0).toString(16));
    _players.push(new Player("Gajen", _snake, 18));
  } 

  _game = new Game(_wW, _wH, _players);
  _game.init();
  console.log("Gamestate :" + _game);
  Player.countPlayers();
  window.requestAnimationFrame(gameLoop);
}