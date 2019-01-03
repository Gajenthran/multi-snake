var Item = require('./Item');

/**
 * Class representing a snake in the game. A snake can be
 * a player or an AI (have to do).
 */
class Snake {
  /**
   * @constructor
   *
   * @param x {number}            coordinate x
   * @param y {number}            coordinate y
   * @param w {number}            width of the snake (more precisely the width of a body element)
   * @param h {number}            height of the snake
   * @param color {String}        color of the snake (not use at the moment)
   * @param alive {boolean}       check if the snake is still alive
   * @param size {number}         the size of the snake, the number of body 
   * @param body {Array.<Object>} snake's body storing all the cordinates
   */
  constructor(x, y, w, h, color) {
    this.x     = x;
    this.y     = y;
    this.w     = 40;
    this.h     = 40;
    this.dir   = {"x" : 0, "y" : 1};

    this.color = color;
    this.alive = true;
    this.score = 0;

    this.size  = 2;
    this.body  = new Array();
    this.body.unshift({"x" : x, "y" : y});
  }

  /** 
   * @method Move the snake using the direction of the snake and
   * check if the snake comes off the board.
   *
   * @param world {World} the game board
   */
  move(world) { 
    if(!this.alive) // TODO: to remove
      return;

    this.x += this.dir.x;
    this.y += this.dir.y;

    if(this.x >= world.w)
      this.x = 0;
    else if(this.y >= world.h)
      this.y = 0;
    else if(this.x < 0)
      this.x = world.w - 1;
    else if(this.y < 0)
      this.y = world.h - 1;

    if(this.body.length == this.size) {
      this.body.pop();
    }
    this.body.unshift({"x" : this.x, "y" : this.y});
  }

  /**
   * @method Check if there is a collision between a snake and
   * a game object.
   *
   * @param world {World} the game board
   */
  collision(world) {
    var item;
    if(world.checkSnakeTile(this)) {
      this.alive = false;
      return;
    }
    if((item = world.checkItemTile(this)))
      item.apply(this);
  }
}

module.exports = Snake;