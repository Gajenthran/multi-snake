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

    // console.log(socket.player);
    var data = {
      "player"  : socket.player,
      "enemies" : this.getPlayers()
    };

    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(socket));
    console.log(this.players);
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
    this.updatePlayerInput(socket.id, data);
    for(let player of this.players.values()) {
      player.move(); // Override to make players.move?
    }
  }

  getPlayers() {
    var players = new Array();
    for(let player of this.players.values()) {
      console.log(player.socket["player"])
      players.push(player.socket["player"]);
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