"use strict"
window.onload = main;

var _wW = window.innerWidth;
var _wH = window.innerHeight;

function main() {
  var socket = io.connect('http://localhost:8080');

  var display = new Display(800, 600);
  display.init();

  var game = new Game(socket, display);
  handleEvents();
  game.init();
  game.start();
}