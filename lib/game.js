var Player = require('./Player');

/** Class representing the game and their elements. */
class Game {
  constructor(world) {
    // TODO: Add Items in the future to update
    this.world = world;
    this.players = new Map();
  }

  spawn() {
    return { 
      "x" : Math.random() * 800,
      "y" : Math.random() * 600,
      "w" : 5,
      "h" : 5,
      "color" : "red"
    };
  }

  addNewPlayer(socket) {
    // TODO: not the good way to do that + add maybe the all socket?
    var data = {
      "player"  : this.spawn(),
      "enemies" : this.getEnnemies(socket)
    };

    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(data, socket)); // TODO: Maybe only socket.id?
  }

  removePlayer(socket) {
    this.players.delete(socket.id);
  }

  removeAllPlayer() {
    this.players.clear();
  }

  updatePlayerInput(socket, data) {
    // .has(socket.id) with Map
    var player = this.players.get(socket.id);
    if(player) {
      player.updateInput(data);
    }
  }

  update(socket, data) {
    var data;
    this.updatePlayerInput(socket, data);
    for(let player of this.players.values()) {
      this.world.putSnake(player);
      player.move(player.socket.id, this.world); // Override to make player.move?
      data = {
        "player"   : player.body,
        "ennemies" : this.getEnnemies(player.socket)
      };
      player.socket.emit("update-players", data);
    }
  }

  getEnnemies(socket) {
    var players = new Array();
    for(let player of this.players.values()) {
      if(player.socket.id != socket.id)
        players.push(player.body);
    }
    return players;
  }
}

module.exports = Game;