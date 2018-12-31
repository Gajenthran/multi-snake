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
    this.items.push(new Item(name, /*Math.floor(Math.random() * 50) * 16*/0, Math.floor(Math.random() * 37) * 16, 16, 16));
  }

  addNewPlayer(socket) {
    // TODO: not the good way to do that + add maybe the all socket?
    this.addNewItem("increase_speed"); // TODO: put elsewhere (just to test)
    this.world.putItem(this.items[0]);
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
      "x" : 0,
      "y" : 0, // Math.random() * 0,
      "w" : 16,
      "h" : 16,
      "color" : "red"
    };
  }

  update() {
    var data;
    this.updateItems();
    for(let player of this.players.values()) {
      player.move(player.socket.id, this.world); // Override to make player.move?
      this.world.putSnake(player);
      data = {
        "player"   : player.body,
        "ennemies" : this.getEnnemies(player.socket),
        "items"    : this.items
      };
      player.socket.emit("update-players", data);
    }
  }

  updateItems() {
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].use) {
        this.items.splice(i, 1);
      }
    }
  }
  
  updatePlayerInput(socket, data) {
    if(this.players.has(socket.id)) {
      this.players.get(socket.id).updateInput(data);
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

  removePlayer(socket) {
    if(this.players.has(socket.id))
      this.players.delete(socket.id);
  }

  removeAllPlayer() {
    this.players.clear();
  }
}

module.exports = Game;