"use strict"
window.onload = main;

var _snake = null;

function frameloop(time){
    requestAnimationFrame(frameloop);
    handleSnakeMovement(_snake);
    drawSnake(_snake);
}

function main(){
    _snake = new Snake(10, 10, 10, 10, "red");
    window.requestAnimationFrame(frameloop);
    window.cancelAnimationFrame(frameloop); 
}