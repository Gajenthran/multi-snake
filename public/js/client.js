"use strict"
window.onload = main;

function main() {
  var socket = io.connect('http://localhost:8080');
  var game = new Game(socket);
  handleEvents();
  game.init();
  game.start();
}