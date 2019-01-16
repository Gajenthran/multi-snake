/**
 * Initialization and lauch of the game (client side).
 *
 * @author PANCHALINGAMOORTHY Gajenthran
 */

"use strict"
window.onload = main;

/**
 * @method The main function of the client : connection with the server with
 * WebSocket, handle events, initialize the game and start the game loop.
 */
function main() {
  var socket = io.connect('http://localhost:8080');
  var game = new Game(socket);
  handleEvents();
  game.init();
  game.start();
}