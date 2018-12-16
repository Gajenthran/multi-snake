const directions = {
  "left" : -1,
  "right" : 1
};

/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x     = x;
    this.y     = y;
    this.w     = w;
    this.h     = h;
    this.color = color;
    this.angle = Math.floor(Math.random()*360 + 1);
    this.speed = 2;
    this.dir   = directions["left"];
    this.alive = true;
    // this.body = new Array();
    // this.body.push({"x" : this.x, "y" : this.y, "w" : this.w, "h" : this.h });
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(angle) {  // TODO : Argument of the function move
    if(!this.alive) 
      return;
    this.angle += this.dir * angle;
    this.dir = null;
    this.x += this.speed * Math.cos(Math.PI * this.angle/180);
    this.y += this.speed * Math.sin(Math.PI * this.angle/180);
  }

  /**
   * @method Check if there is a collision between snakes.
   * @param snake
   */
  collision(snakes) {
    snakes.forEach(snake => {
      if(snake != this) {
        
      }
    });
    /*if(this.x >= snake.x && this.y >= snake.y &&
       this.x <= snake.x + snake.w && this.y <= snake.y + snake.h)
      this.alive = false; */
  }
}