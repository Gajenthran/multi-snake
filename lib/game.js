var Player = require('./Player');

/** Class representing the game and their elements. */
class Game {
  constructor(w, h, background) {
    // TODO: Add Items in the future to update
    this.players = new Map();
  }

  addNewPlayer(socket) {
    // TODO: not the good way to do that + add maybe the all socket?
    socket.player = { 
      "x" : Math.random() * 800, 
      "y" : Math.random() * 600,
      "w" : 5,
      "h" : 5,
      "color" : "red"
    };

    var data = {
      "player"  : socket.player,
      "enemies" : this.getEnnemies(socket)
    };

    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(socket));
  }

  removePlayer(socket) {
    this.players.delete(socket.id);
  }

  removeAllPlayer() {
    this.players.clear();
  }

  updatePlayerInput(socket, data) {
    var player = this.players.get(socket.id);
    if(player) {
      player.update(data);
    }
  }

  update(socket, data) {
    var data;
    this.updatePlayerInput(socket, data);
    for(let player of this.players.values()) {
      player.move(); // Override to make player.move?
      data = {
        "player"   : { "x" : player.x, "y" : player.y },
        "ennemies" : this.getEnnemies(player.socket)
      };
      // console.log(data["ennemies"]);
      player.socket.emit("update-players", data);
    }
  }

  getEnnemies(socket) {
    var players = new Array();
    for(let player of this.players.values()) {
      if(player.socket.id != socket.id)
        players.push({"x" : player.x, 
                      "y" : player.y});
    }
    return players;
  }

  /* emitGameValues() {
    var enemies;
    for(let player of this.players.values()) {
      enemies = this.getEnnemies(player);
      player.socket.emit("update", {
        "player"  : player,
        "enemies" : enemies
      });
    }
  } */
}

module.exports = Game;