"use strict"
window.onload = main;

var _snake   = new Array(),
    _players = new Array(),
    _game    = null,
    _wW      = window.innerWidth,
    _wH      = window.innerHeight,
    lastTime = 0;


function gameLoop(timestamp){
  _game.update();
  _game.render();
  window.requestAnimationFrame(gameLoop);
  window.cancelAnimationFrame(gameLoop); 
}

function main(){
  var i;

  var socket = io.connect("http://localhost:8080/");
  for(i = 0; i < 3; i++)
    _players.push(new Player("Gajen", 18, 
                             Math.random() * _wW, Math.random() * _wH, 5, 5, 
                             "#"+((1<<24)*Math.random()|0).toString(16))); // TODO : Instanciation

  _game = new Game(_wW, _wH, _players);
  _game.init();
  console.log("Gamestate :" + _game);
  Player.countPlayers();
  handleSnakeMovement(_game.players[0]);
  window.requestAnimationFrame(gameLoop);
}