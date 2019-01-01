/*
 * Fonction getter et setter,
 * Scoreboard,
 * World, TILES
 * Constante + Util dans client+serveur
 * Correct names = enemies
 * remove the double quotes
 * bonus, points
 */

var Player = require('./Player');
var Item = require('./Item');
var World = require('./World');

/** Class representing the game and their elements. */
class Game {
  constructor() {
    this.world = null;
    this.players = new Map();
    this.items = new Array();
  }

  init() {
    this.world = new World(40, 20, 15); // 800/8 & 600/8;
    this.world.init();
  }

  addNewItem(name) {
    var position = this.world.spawnItem();
    this.items.push(new Item(name, position.x, position.y, 8, 8));
  }


  randomColor() { // TODO: in Utility
    return "red";
  }

  addNewPlayer(socket) {
    this.addNewItem("increase_speed"); // TODO: put elsewhere (just to test)
    this.world.insertItem(this.items[this.items.length-1]);
    var data = {
      "player"  : this.world.spawnSnake(),
      "enemies" : this.getEnemies(socket),
      "items"   : this.items
    };
    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(data["player"].x, data["player"].y, 
                                           8, 8, this.randomColor(), socket));
  }

  update() {
    this.updateItems();
    this.updatePlayers();
  }

  updatePlayers() {
    var data;
    for(let player of this.players.values()) {
      this.world.insertSnake(player);
      player.move(this.world);
      player.collision(this.world);
      data = {
        "player"   : player.body,
        "enemies"  : this.getEnemies(player.socket),
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
  
  updatePlayerInput(socket, input) {
    if(this.players.has(socket.id)) {
      this.players.get(socket.id).updateInput(input);
    }
  }

  removePlayer(socket) {
    if(this.players.has(socket.id))
      this.players.delete(socket.id);
  }

  removeAllPlayer() {
    this.players.clear();
  }

  getEnemies(playerSocket) {
    var enemies = new Array();
    for(let enemy of this.players.values()) {
      if(enemy.socket.id != playerSocket.id)
        enemies.push(enemy.body);
    }
    return enemies;
  }

}

module.exports = Game;