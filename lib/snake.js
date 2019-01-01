var Item = require('./Item');

/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x     = x;
    this.y     = y;
    this.w     = 40;
    this.h     = 40;
    this.color = color;

    this.body  = new Array();
    this.body.unshift({"x" : x, "y" : y});
    this.size  = 3;

    this.dir   = [0, 1];
    this.alive = true;
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(world) { 
    if(!this.alive) 
      return;

    this.x += this.dir[0];
    this.y += this.dir[1];

    if(this.x >= world.w)
      this.x = 0;
    else if(this.y >= world.h)
      this.y = 0;
    else if(this.x < 0)
      this.x = world.w - 1;
    else if(this.y < 0)
      this.y = world.h - 1;

    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({ "x" : this.x, "y" : this.y });
    // this.collision(world);
  }

  /**
   * @method Check if there is a collision between snakes.
   * @param snake
   */
  collision(world) {
    var item;
    if(world.checkSnakeTile(this))
      this.alive = false;
    if((item = world.checkItemTile(this)))
      item.apply(this);
  }
}

module.exports = Snake;