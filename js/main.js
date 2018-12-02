"use strict"
window.onload = main;

var _snake = null;
var _player = null;

function frameloop(time){
    requestAnimationFrame(frameloop);
    handleSnakeMovement(_snake);
    drawSnake(_snake);
}

function main(){
    _snake = new Snake(10, 10, 10, 10, "red");
    _player = new Player("toto", _snake, 10);
    console.log(Player.countPlayer());
    window.requestAnimationFrame(frameloop);
    window.cancelAnimationFrame(frameloop); 
}