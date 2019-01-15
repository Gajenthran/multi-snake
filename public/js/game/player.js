/** 
 * Class representing a player on the client side. This class
 * will take only necessary information from the server for
 * the display
 */
class Player {
  constructor(x, y, dir, score, size, color) {
    this.body = new Array();
    this.body.unshift({"x" : x, "y" : y});
    this.dir = new Array();
    this.dir.unshift(dir);
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
    this.updateDirection(dir);
    this.score = score || this.score;
  }

  /**
   * @method Update the snake direction with the new value given by the server.
   *
   * @param {number} dir: the new direction given by the server
   */  
  updateDirection(dir) {
    var updatedDir, actualDir = this.dir[0];
    if(this.dir[0] == dir) {
      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["left"] ||
         SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["right"])
        updatedDir = SNAKES_IMG_SRC["lr_body"];
      else
        updatedDir = SNAKES_IMG_SRC["ud_body"];
    }

    else {
      // LEFT
      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["left"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["down"]) {
        updatedDir = SNAKES_IMG_SRC["ul_body"];
      }

      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["left"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["up"])
        updatedDir = SNAKES_IMG_SRC["dr_body"];

      // RIGHT
      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["right"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["up"])
        updatedDir = SNAKES_IMG_SRC["dl_body"];

      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["right"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["down"])
        updatedDir = SNAKES_IMG_SRC["ur_body"];

      // UP
      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["up"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["right"])
        updatedDir = SNAKES_IMG_SRC["ul_body"];

      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["up"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["left"])
        updatedDir = SNAKES_IMG_SRC["ur_body"];

      // DOWN
      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["down"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["right"])
        updatedDir = SNAKES_IMG_SRC["dr_body"];

      if(SNAKES_IMG_SRC[actualDir] == SNAKES_IMG_SRC["down"] &&
         SNAKES_IMG_SRC[dir] == SNAKES_IMG_SRC["left"])
        updatedDir = SNAKES_IMG_SRC["dl_body"];
    }

    this.dir[0] = updatedDir;
    this.dir.unshift(dir);
  }
}