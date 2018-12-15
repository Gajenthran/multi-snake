var directions = {
  "left"  : {"x" : -1, "y" :  0},
  "up"    : {"x" :  0, "y" :  1},
  "right" : {"x" :  1, "y" :  0},
  "down"  : {"x" : -1, "y" : -1},
};

/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.angle = Math.floor(Math.random()*360 + 1);
    this.speed = 2;
    this.dir = directions["left"];
    this.alive = true;
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(angle) {
    console.log(this.dir);
    if(this.dir == directions["left"])
      this.angle -= angle;
    else if(this.dir == directions["right"])
      this.angle += angle;
    this.dir = null;
    this.x += this.speed * Math.cos(Math.PI * this.angle/180);
    this.y += this.speed * Math.sin(Math.PI * this.angle/180);
  }

  /**
   * @method Check if there is a collision between snakes.
   * @param snake
   */
  collision(snake) {
    if(this.x >= snake.x && this.y >= snake.y &&
       this.x <= snake.x + snake.w && this.y <= snake.y + snake.h)
      return this.alive = true;
  }
}