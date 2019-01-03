/*
 * Fonction getter et setter
 * Scoreboard
 * World, TILES
 * Constante + Util dans client+serveur
 * bonus, points
 * Tickers
 * node_module, package.json, readme
 * Commentaire + {Object}
 * README: TODO
 * width of the player and width of the game
 */

var Player = require('./Player');
var Item   = require('./Item');
var World  = require('./World');
var Util   = require('./global/Util');

/** 
 * Class representing the game and their objects on the server. 
 * The game contains a world where we can find all the players and items. 
 */
class Game {
  /** 
   * @constructor
   */
  constructor() {
    this.world   = null;
    this.players = new Map();
    this.items   = new Array();
  }

  /**
   * @method Initialize the world that will contain players and 
   * items.
   */
  init() {
    this.world = new World(20, 15); // 800/8 & 600/8;
    this.world.init();
  }

  /**
   * @method Add a new Item in the game.
   *
   * @param name {String} the name of the item
   */
  addNewItem(name) {
    var position = this.world.spawnItem();
    var item = new Item(name, position.x, position.y, 8, 8);
    this.items.push(item);
    this.world.insertItem(item);
  }

  /**
   * @method Add a new Player in the game and emit all the data to 
   * the client.
   *
   * @param socket {Object} the socket of the player
   */
  addNewPlayer(socket) {
    this.addNewItem(Item.APPLE_ITEM);  // TODO: put elsewhere (just to test)
    this.addNewItem(Item.POISON_ITEM); // TODO: put elsewhere (just to test)

    var data = {
      "player"  : this.world.spawnSnake(),
      "enemies" : this.getEnemies(socket),
      "items"   : this.items
    };
    socket.emit("generate-players", data)
    this.players.set(socket.id, new Player(data["player"].x, data["player"].y, 
                                           8, 8, Util.getRandomColor(), socket));
  }


  /**
   * @method Update all the objects (Players and Items) in the game.
   */
  update() {
    this.updatePlayers();
    this.updateItems();
  }

  /**
   * @method Update all the Players (move, collision and remove)
   * in the game. 
   */
  updatePlayers() {
    for(let player of this.players.values()) {
      this.world.insertSnake(player);
      player.move(this.world);
      player.collision(this.world);
      this.world.tiles[player.y * this.world.w + player.x] = World.tilesId["player"];
      if(!player.alive) {
        this.removePlayer(player.socket);
      }
    }
  }

  /**
   * @method Update all the Items (check if an Item has been
   * consumed. If that's the case, we remove it from the world).
   */
  updateItems() {
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].use) {
        this.items.splice(i, 1);
      }
    }
  }

  /**
   * @method Update the values of the Player recognized by his
   * socket ID, with the input given by the same player on the
   * client side.
   *
   * @param socket {Object} socket of the Player
   * @param input {Object}  input given by the player on the client side
   */
  updatePlayerInput(socket, input) {
    if(this.players.has(socket.id)) {
      this.players.get(socket.id).updateInput(input);
    }
  }

  /**
   * @method Remove a Player with his socket ID.
   *
   * @param socket {Object} socket of the Player
   */
  removePlayer(socket) {
    if(this.players.has(socket.id))
      this.world.clearSnake(this.players.get(socket.id));
      this.players.delete(socket.id);
  }

  /**
   * @method Remove all the Players in the game.
   */
  removeAllPlayer() {
    this.players.clear();
  }

  /**
   * @method Get all the players in the game except the
   * player given as parameters.
   * 
   * @param {Object} playerSocket the socket of the Player
   */
  getEnemies(playerSocket) {
    var enemies = new Array();
    for(let enemy of this.players.values()) {
      if(enemy.socket.id != playerSocket.id)
        enemies.push({"body" : enemy.body, "score" : enemy.score });
    }
    return enemies;
  }

  /**
   * @method Emit the data to the client, only the
   * necessary information.
   */
  emitValuesToClient() {
    var data;
    for(let player of this.players.values()) {
      data = {
        "player"  : { "body" : player.body, "score" : player.score },
        "enemies" : this.getEnemies(player.socket),
        "items"   : this.items
      };
      player.socket.emit("update-players", data);
    }
  }
}

module.exports = Game;