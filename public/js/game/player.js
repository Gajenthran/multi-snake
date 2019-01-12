/** 
 * Class representing a player on the client side. This class
 * will take only necessary information from the server for
 * the display
 */
class Player {
  constructor(x, y, dir, score, size, color) {
    this.body = new Array();
    this.body.unshift({"x" : x, "y" : y});
    this.dir = dir;
    this.score = score;
    this.size = size;
    this.color = color;
  }

  /**
   * @method Update the snake with the values given by the server.
   *
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} score: score of the snake
   * @param {number} size: the size of the snake
   */
  update(x, y, dir, score, size) {
    this.size = size || this.size;
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({"x" : x, "y" : y});
    this.dir = dir || this.dir;
    this.score = score || this.score;
  }
}