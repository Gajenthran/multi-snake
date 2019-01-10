var Item = require('./item');
var Snake = require('./snake');
var Util = require("./global/util");

/**
 * Class representing the game board. Here, we can the coordinates
 * of all objects in our game (Players, Items).
 */
class World {
  /**
   * @constructor
   *
   * @param {number} w: width of the world
   * @param {number} h: height of the world
   */
  constructor(w, h) {
    this.w      = w;
    this.h      = h;
    this.tiles  = new Array(this.w * this.h);
    this.offset = 0; 
  }
 
  /**
   * @method Initialize the game board. All tiles are empty.
   */
  init() {
    this.tiles.fill(World.TILES_ID["empty"], 0, this.w * this.h);
  }

  /**
   * @method Draw all tiles of the game board to debug.
   */
  DrawWorld() {
    var r, c, arr = [];
    console.log(this.h, this.w);
    for(r = 0; r < this.h; r++) {
      for(c = 0; c < this.w; c++) {
        if(this.tiles[r * this.w + c].hasOwnProperty("id") && 
           this.tiles[r * this.w + c]["id"] == World.TILES_ID["item"])
          arr.push(this.tiles[r * this.w + c]["id"]);
        else
          arr.push(this.tiles[r * this.w + c]);
      }
      console.log(arr);
      arr = [];
    }
    console.log("");
  }

  /**
   * @method enlarge the game board.
   */
  enlargeWorld(snake) {
    if(!(snake.x + this.offset == 0 || 
         snake.y + this.offset == 0 || 
         snake.x + this.offset == this.w - 1 || 
         snake.y + this.offset == this.h - 1))
      return;

    this.offset += 5;
    var w = (this.w + this.offset * 2);
    var h = (this.h + this.offset * 2);
    var newW = new Array(w * h);
    newW.fill(World.TILES_ID["empty"], 0, w * h);
    for(var i = this.offset; i < h-this.offset; i++) {
      for(var j = this.offset; j < w-this.offset; j++) {
        newW[i * w + j] = this.tiles[(i-this.offset) * this.w + (j-this.offset)];
      }  
    }

    this.w = w;
    this.h = h;
    this.tiles = newW;
  }
  
  /**
   * @method Put the snake's body in the game board.
   *
   * @param {Snake|Player} snake: snake
   */
  insertSnake(snake) {
    this.tiles[(snake.y + this.offset) * this.w + (snake.x + this.offset)] = World.TILES_ID["player"];
    if(snake.body.length == snake.size) {
      var x = snake.body[snake.body.length-1].x + this.offset;
      var y = snake.body[snake.body.length-1].y + this.offset;
      this.tiles[y * this.w + x] = World.TILES_ID["empty"];
    }
  }

  /**
   * @method Put the item in the game board.
   *
   * @param {Item} item: item
   */
  insertItem(item) {
    var x = item.x + this.offset; 
    var y = item.y + this.offset;
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
    var x = snake.x + this.offset; 
    var y = snake.y + this.offset;
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
    var x = snake.x + this.offset;
    var y = snake.y + this.offset;
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
    var x, y;
    for(var i = 0; i < snake.body.length; i++) {
      x = snake.body[i].x + this.offset
      y = snake.body[i].y + this.offset;
      this.tiles[y * this.w + x] = World.TILES_ID["empty"];
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
World.WORLD_WIDTH = 20;

/**
 * @const {number} WORLD_HEIGHT: the height of the world
 */
World.WORLD_HEIGHT = 15;

module.exports = World;