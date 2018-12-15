"use strict"
window.onload = main;

var _snake = new Array();
var _players = new Array();
var _game = null;
var _wW = window.innerWidth;
var _wH = window.innerHeight;

function frameLoop(time){
  handleSnakeMovement(_game.players[0]);
  _game.update();
  if(_snake[0].collision(_snake[1], _snake[1]))
    console.log("COLLISION !");
  drawSnake(_game);
  window.requestAnimationFrame(frameLoop);
  window.cancelAnimationFrame(frameLoop); 
}

function main(){
  var i;
  for(i = 0; i < 10; i++) {
    _snake.push(new Snake(Math.random() * _wW, Math.random() * _wH, 20, 20, "#"+((1<<24)*Math.random()|0).toString(16)));
    _players.push(new Player("Gajen", _snake[i], 18));
  } 

  _game = new Game(_wW, _wH, _players);
  _game.init();
  console.log(_game);
  Player.countPlayers();
  window.requestAnimationFrame(frameLoop);
}