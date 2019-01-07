var Item = require('./Item');
var Snake = require('./Snake');
var Util = require("./global/Util");

/**
 * Class representing the game board. Here, we can the coordinates
 * of all objects in our game (Players, Items).
 */
class World {
  constructor(w, h) {
    this.w     = w;
    this.h     = h;
    this.tiles = new Array(this.w * this.h);
  }
 
  /**
   * @method Initialize the game board. All tiles are empty.
   */
  init() {
    this.tiles.fill(World.TILES_ID["empty"], 0, this.w * this.h);
  }

  /**
   * @method Put the snake's body in the game board.
   *
   * @param {Snake|Player} snake: snake
   */
  insertSnake(snake) {
    this.tiles[snake.y * this.w + snake.x] = World.TILES_ID["player"];
    if(snake.body.length == snake.size) {
      var x = snake.body[snake.body.length-1].x;
      var y = snake.body[snake.body.length-1].y;
      this.tiles[y * this.w + x] = World.TILES_ID["empty"];
    }
  }

  /**
   * @method Put the item in the game board.
   *
   * @param {Item} item: item
   */
  insertItem(item) {
    var x = item.x; 
    var y = item.y;
    this.tiles[y * this.w + x] = { "id"    : World.TILES_ID["item"],
                                   "value" : item }; 
  }

  /**
   * @method Check if the tile is already taken by another snake.
   *
   * @param snake: snake
   * @return {boolean} true if the tile is already take by another snake (collision) and false otherwise.
   */
  checkSnakeTile(snake) {
    var x = snake.x; 
    var y = snake.y;
    if(Util.isBound(x, y, 0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x] == World.TILES_ID["player"])
      return true;
    return false;
  }

  /**
   * @method Check if the tile is already taken by an item.
   *
   * @param snake: snake
   * @return {Item|boolean} the Item if the tile is taken by an item and false otherwise.
   */
  checkItemTile(snake) {
    var x = snake.x;
    var y = snake.y;
    if(Util.isBound(x, y, 0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x].hasOwnProperty("id") && 
       this.tiles[y * this.w + x]["id"] == World.TILES_ID["item"]) {
      return this.tiles[y * this.w + x]["value"];
    }
    return false;
  }

  /**
   * @method Clear the snake. Remove all the body from the game board.
   *
   * @param snake: snake
   */
  clearSnake(snake) {
    for(var i = 0; i < snake.body.length; i++) {
      this.tiles[snake.body[i].y * this.w + snake.body[i].x] = World.TILES_ID["empty"];
    }
  }

  /**
   * @method Get a random tile and check if the tile is empty
   *
   * @return {number} the number of the tile
   */
  getRandomTile() {
    var x, y;
    do {
      x = Util.getRandomFloor(this.w);
      y = Util.getRandomFloor(this.h);
    } while(this.tiles[y * this.w + x] != World.TILES_ID["empty"]);

    return y * this.w + x;
  }

  /**
   * @method Spawn a snake.
   *
   * @return {Object} all the information needed to create a snake (coordinate, direction, size).
   */
  spawnSnake() {
    var tile = this.getRandomTile();
    return { "x"    : Math.floor(tile%this.w),
             "y"    : Math.floor(tile/this.w),
             "dir"  : {"x": 0, "y": 1},
             "size" : Snake.SNAKE_SIZE };
            // "color" : Util.getRandomColor() };
  }

  /**
   * @method Spawn an item.
   *
   * @return {Object} all the information needed to create an item (coordinate).
   */
  spawnItem() {
    var tile = this.getRandomTile();
    return { "x" : Math.floor(tile%this.w),
             "y" : Math.floor(tile/this.w) };
  }
}

/**
 * @const {Object} TILES_ID: the tiles id
 */
World.TILES_ID = {
  "empty"  : 0,
  "item"   : 1,
  "player" : 2
};

/**
 * @const {number} WORLD_WIDTH: the width of the world
 */
World.WORLD_WIDTH = 40;


/**
 * @const {number} WORLD_HEIGHT: the height of the world
 */
World.WORLD_HEIGHT = 30;

module.exports = World;