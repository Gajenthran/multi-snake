"use strict"
window.onload = main;

var _snake = new Array();
var _players = new Array();
var _game = null;
var _wW = window.innerWidth;
var _wH = window.innerHeight;

function frameloop(time){
  requestAnimationFrame(frameloop);
  handleSnakeMovement(_snake[0]);
  if(_snake[0].collision(_snake[1], _snake[1]))
    console.log("COLLISION !");
  drawSnake(_snake[0]);
}

function main(){
  _snake.push(new Snake(10, 10, 20, 20, "red"));
  _snake.push(new Snake(300, 10, 100, 100, "green"));

  _players.push(new Player("toto", _snake[0], 10));
  _players.push(new Player("Gajen", _snake[1], 18));

  _game = new Game(_wW, _wH, _players); // TODO : background

  console.log(_game);
  Player.countPlayers();
  window.requestAnimationFrame(frameloop);
  window.cancelAnimationFrame(frameloop); 
}