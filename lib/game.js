var Player = require('./Player');
var Item = require('./Item');

/** Class representing the game and their elements. */
class Game {
  constructor(world) {
    // TODO: Add Items in the future to update
    this.world = world;
    this.players = new Map();
    this.items = new Array();
  }

  addNewItem(name) {
    this.items.push(new Item(name, Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 16, 16));
  }

  addNewPlayer(socket) {
    // TODO: not the good way to do that + add maybe the all socket?
    this.addNewItem("increase_speed"); // TODO: put elsewhere (just to test)
    var data = {
      "player"  : this.spawn(),
      "enemies" : this.getEnnemies(socket),
      "items"   : this.items
    };

    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(data, socket)); // TODO: Maybe only socket.id?
  }

  spawn() {
    return { 
      "x" : 10, // Math.random() * 0,
      "y" : 10, // Math.random() * 0,
      "w" : 5,
      "h" : 5,
      "color" : "red"
    };
  }

  removePlayer(socket) {
    this.players.delete(socket.id);
  }

  removeAllPlayer() {
    this.players.clear();
  }

  update(socket, data) {
    var data;
    this.updatePlayerInput(socket, data);
    for(let player of this.players.values()) {
      player.move(player.socket.id, this.world); // Override to make player.move?
      this.world.putSnake(player);
      data = {
        "player"   : player.body,
        "ennemies" : this.getEnnemies(player.socket)
      };
      player.socket.emit("update-players", data);
    }
  }

  updatePlayerInput(socket, data) {
    // .has(socket.id) with Map
    var player = this.players.get(socket.id);
    if(player) {
      player.updateInput(data);
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