/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x     = Math.floor(x);
    this.y     = Math.floor(y);
    this.w     = w;
    this.h     = h;
    this.color = color;
    this.angle = 1.5; 
    this.rad   = 2.5; 
    this.speed = 1.5;
    this.dir   = 0;
    this.alive = true;
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(display) {  // TODO : Argument of the function move
    // console.log("Moving the snake...");
    if(!this.alive) 
      return;
    // TODO : Simplify snake movement and do with time
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += this.dir * (Math.PI / 180);
    let nextx = this.x + Math.cos(this.angle) * this.rad;
    let nexty = this.y + Math.sin(this.angle) * this.rad;
    this.dir = null;
    // this.collision(nextx, nexty, display);
  }

  /**
   * @method Check if there is a collision between snakes.
   * @param snake
   */
  collision(nextx, nexty, game) {
    var color = display.getColor(nextx, nexty, 1, 1);
    if(color)
      this.alive = false;

  }
}

module.exports = Snake;