var Item = require('./item');
var Util = require('./global/util');

/**
 * Class representing a snake in the game. A snake can be
 * a player or an AI (have to do).
 */
class Snake {
  /**
   * @constructor
   *
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} direction: direction of the snake
   */
  constructor(x, y, direction) {
    this.x     = x;
    this.y     = y;
    this.dir   = direction;

    // this.color = color; // To add in the future
    this.alive = true;
    this.score = 0;

    this.size  = Snake.SNAKE_SIZE;
    this.body  = new Array();
    this.body.unshift({"x" : x, "y" : y, "dir": Snake.getDir(this.dir)});
  }

  /** 
   * @method Move the snake using the direction of the snake and
   * check if the snake comes off the board.
   *
   * @param {World} world: the game board
   */
  move(world) {
    // Not useful but to be sure that the player does not move
    if(!this.alive)
      return;

    // To play with an unlimited body like Curve Fever
    if(Snake.UNLIMITED_BODY)
      this.size++;

    this.x += this.dir.x;
    this.y += this.dir.y;
    
    // Check if the snake goes of the board
    if(this.x >= world.w)
      this.x = 0;
    else if(this.y >= world.h)
      this.y = 0;
    else if(this.x < 0)
      this.x = world.w - 1;
    else if(this.y < 0)
      this.y = world.h - 1;

    // Manage the body of the snake
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({"x" : this.x, "y" : this.y, "dir" : Snake.getDir(this.dir)});
  }

  /**
   * @method Check if there is a collision between a snake and
   * a game object.
   *
   * @param {World} world: the game board
   */
  collision(world) {
    var item;

    // Check the collision with a snake 
    if(world.checkSnakeTile(this)) {
      this.alive = false;
      return;
    }    

    // Check the collision with an item 
    if((item = world.checkItemTile(this)))
      item.apply(this);
  }

  /**
   * @method Increase the size of the snake.
   *
   * @param {Snake} snake: snake
   */
  grow(size) {
    this.size += size || 1;
    this.score += Math.floor(size/2) || 1;
  }

  /**
   * @method Increase the score of the snake.
   *
   * @param {Snake} snake: snake
   */
  increaseScore(value) {
    this.score += value;
  }

  /**
   * @method Immobilize the snake.
   *
   * @param {Snake} snake: snake
   */
  lock() {
    this.dir.x = this.dir.y = 0;
  }

  /**
   * @method Kill the snake.
   *
   * @param {Snake} snake: snake
   */
  dead() {
    this.alive = false;
  }
  
  /**
   * @method getRandomDirection Get a random direction.
   */
  static getRandomDirection() {
    return Util.getRandomPropriety(Snake.DIRECTIONS);
  }

  /**
   * @method Get the name of the direction knowing the value of the direction.
   *
   * @return {String} The name of the direction.
   */ 
  static getDir(direction) {
    for(var dir in Snake.DIRECTIONS) {
      if(Util.isSameObjects(Snake.DIRECTIONS[dir], direction))
        return dir;
    }
  }
}

/**
 * The size of the snake at the beginning.
 * @const {number}
 */
Snake.SNAKE_SIZE = 3;

/**
 * Coordinates for each direction.
 * @const {Object}
 */
Snake.DIRECTIONS = {
  "left"  : {"x" : -1, "y" :  0},
  "right" : {"x" :  1, "y" :  0},
  "up"    : {"x" :  0, "y" : -1},
  "down"  : {"x" :  0, "y" :  1}
};

/**
 * The body of the snake is unlimited. So, the snake will grow indefinitely.
 * @const {boolean}
 */
Snake.UNLIMITED_BODY = false;

module.exports = Snake;