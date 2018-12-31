var Item = require('./Item');

/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x     = Math.floor(x);
    this.y     = Math.floor(y);
    this.w     = 16;
    this.h     = 16;
    this.color = color;

    this.body  = new Array();
    this.size  = 1;
    this.body.unshift({"x" : x, "y" : y});

    this.dir = [0, 1];
    this.alive = true;
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(id, world) { 
    if(!this.alive) 
      return;
    this.x += this.dir[0] * world.tileSize;
    this.y += this.dir[1] * world.tileSize;
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({"x" : this.x, "y" : this.y });
    this.collision(id, world);
    console.log(this.size);
  }

  /**
   * @method Check if there is a collision between snakes.
   * @param snake
   */
  collision(id, world) {
    if(world.checkItemTile(this, this.x, this.y) == true) 
      this.alive = false;
    // (world.checkItemTile(this.x, this.y);
  }
}

module.exports = Snake;