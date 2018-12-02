"use strict"
window.onload = main;

var _snake = null;
var _players = new Array();
var _game = null;
var _wW = window.innerWidth;
var _wH = window.innerHeight;

function frameloop(time){
    requestAnimationFrame(frameloop);
    handleSnakeMovement(_snake);
    drawSnake(_snake);
}

function main(){
    _snake = new Snake(10, 10, 10, 10, "red");
    _players.push(new Player("toto", _snake, 10));
    _players.push(new Player("Gajen", _snake, 18));
    _game = new Game(_wW, _wH, _players); // TODO : background
    console.log(_game);
    Player.countPlayers();
    window.requestAnimationFrame(frameloop);
    window.cancelAnimationFrame(frameloop); 
}