var Item = require('./Item');

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
   * @param {number} w: width of the snake (more precisely the width of a body element)
   * @param {number} h: height of the snake
   * @param {String} color: color of the snake (not use at the moment)
   * @param {boolean} alive: check if the snake is still alive
   * @param {number} size: the size of the snake, the number of body 
   * @param {Array.<Object>} body: snake's body storing all the coordinates
   */
  constructor(x, y, direction) {
    this.x     = x;
    this.y     = y;
    this.dir   = direction;

    // this.color = color;
    this.alive = true;
    this.score = 0;

    this.size  = Snake.SNAKE_SIZE;
    this.body  = new Array();
    this.body.unshift({"x" : x, "y" : y});
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

    this.x += this.dir.x //Math.floor((this.x + this.dir.x) * 0.2);
    this.y += this.dir.y //Math.floor((this.y + this.dir.y) * 0.2);

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
    this.body.unshift({"x" : this.x, "y" : this.y});
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
}

/**
 * @const {number} SNAKE_SIZE: the size of the snake at the beginning
 */
Snake.SNAKE_SIZE = 3;

module.exports = Snake;