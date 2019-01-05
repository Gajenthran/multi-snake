/** 
 * Class representing a player on the client side. This class
 * will take only necessary information from the server for
 * the display
 */
class Player {
  constructor(x, y, dir, score, size) {
    this.body = new Array();
    this.body.unshift({"x" : x, "y" : y});
    this.dir = dir;
    this.score = score;
    this.size = size;
  }

  update(x, y, dir, score, size) {
    this.size = size || this.size;
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({"x" : x, "y" : y});
    this.dir = dir || this.dir;
    this.score = score || this.score;
  }
}