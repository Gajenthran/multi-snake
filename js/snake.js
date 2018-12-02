/** Class representing a snake. */
class Snake {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.image = newElement("div", 
      document.body, 
      this.x, this.y, this.w, this.h, 
      {backgroundColor : this.color});
  }

  /** 
   * Move the snake.
   * @param x coordinate x
   * @param y coordinate y
   */
  move(x, y) {
    this.x += x;
    this.y += y;
  }
}