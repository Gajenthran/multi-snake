/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.alive = true;
    this.image = newElement("div", 
      document.body, 
      this.x, this.y, this.w, this.h, 
      {backgroundColor : this.color});
  }

  /** 
   * @method Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(x, y) {
    this.x += x;
    this.y += y;
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