var Player = require('./player');
var Item   = require('./item');
var World  = require('./world');
var Util   = require('./global/util');

/** 
 * Class representing the game and their objects on the server. 
 * The game contains a world where we can find all the players and items. 
 */
class Game {
  /** 
   * @constructor
   *
   * @param {World} world: the location of all objects
   * @param {Map} players: key = the socket ID of the player and value = player details
   * @param {Array.<Item>} item: all items in the game
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
    this.world = new World(World.WORLD_WIDTH, World.WORLD_HEIGHT);
    this.world.init();
    Item.SPAWN_ITEM_TIME_REM = (new Date).getTime();
  }

  /**
   * @method Add a new Item in the game.
   *
   * @param {String} name: the name of the item
   */
  addNewItem(name) {
    var position = this.world.spawnItem();
    var item = new Item(name, position.x, position.y);
    this.items.push(item);
    this.world.insertItem(item);
  }

  /**
   * @method Add a new Player in the game and emit all the data to 
   * the client.
   *
   * @param {Object} socket: the socket of the player
   */
  addNewPlayer(socket) {
    var data = {
      "player"  : this.world.spawnSnake(),
      "enemies" : this.getEnemies(socket),
      "items"   : this.items
    };
    socket.emit("generate-game", data)
    this.players.set(socket.id, new Player(data["player"].x, data["player"].y,
                                           data["player"].dir, socket)); // Add for the color: Util.getRandomColor()
  }


  /**
   * @method Update all the objects (players and items) in the game.
   */
  update() {
    this.updatePlayers();
    this.updateItems();
  }


  /**
   * @method Update (move, collision and remove) all players
   * in the game. 
   */
  updatePlayers() {
    for(let player of this.players.values()) {
      this.world.insertSnakeBody(player);
      player.move(this.world);
      player.collision(this.world);
      this.world.insertSnakeHead(player);
      // this.world.enlargeWorld(player); 
      if(!player.alive) {
        this.removePlayer(player.socket);
      }
    }
  }

  /**
   * @method Update all items (check if an item has been
   * consumed. If that's the case, we remove it from the game).
   */
  updateItems() {
    if(Item.endOfSpawnTime(this.items.length))
      this.addNewItem(Item.chooseRandomItem());
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].use) {
        this.items.splice(i, 1);
      }
    }
  }

  /**
   * @method Update the values of the player recognized by his
   * socket ID, with the input given by the same player on the
   * client side.
   *
   * @param {Object} socket: socket of the player
   * @param {Object} input: input given by the player on the client side
   */
  updatePlayerInput(socket, input) {
    if(this.players.has(socket.id)) {
      this.players.get(socket.id).update(input);
    }
  }

  /**
   * @method Remove a player with his socket ID.
   *
   * @param {Object} socket: socket of the player
   */
  removePlayer(socket) {
    if(this.players.has(socket.id))
      this.world.clearSnake(this.players.get(socket.id));
      this.players.delete(socket.id);
  }

  /**
   * @method Remove all players from the game.
   */
  removeAllPlayer() {
    this.players.clear();
  }

  /**
   * @method Get all players in the game except the
   * player given as parameters.
   * 
   * @param {Object} playerSocket: the socket of the Player
   */
  getEnemies(playerSocket) {
    var enemies = new Array();
    for(let enemy of this.players.values()) {
      if(enemy.socket.id != playerSocket.id)
        enemies.push({ "body" : enemy.body, "score" : enemy.score, 
                       "dir"  : enemy.getDir()});
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
        "player"  : { "body" : player.body[0], "score" : player.score, 
                      "dir"  : player.getDir(), "size" : player.size },
        "enemies" : this.getEnemies(player.socket),
        "items"   : this.items
      };
      player.socket.emit("update-players", data);
    }
  }
}

module.exports = Game;