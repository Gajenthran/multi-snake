var Snake = require("./snake");
var Util = require("./global/util");

/** 
 * Class representing a player on the server. A player is a snake 
 * with some other details like name (have to do) and socket.
 */
class Player extends Snake {
  /**
   * @constructor
   *
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} direction: direction of the snake
   * @param {Object} socket: socket associating the player and the client
   */
  constructor(x, y, direction, socket) {
    super(x, y, direction);
    // this.name = name; // To add in the future
    this.socket = socket;
  }

  /**
   * @method Update the player's direction with the inputs obtained on 
   * the client side.
   *
   * @param {Object} keyboardState: the inputs obtained on the client side
   */
  update(keyboardState) {
    if(this.impossibleMove(keyboardState))
      return;

    for(var key in keyboardState) {
      if(keyboardState[key] && Snake.DIRECTIONS.hasOwnProperty(key))
        this.dir = Snake.DIRECTIONS[key];
    }
  }

  /**
   * @method Check if it is possible to move the player with the given 
   * inputs.
   *
   * @param {Object} keyboardState: the inputs obtained on the client side
   * @return {boolean} True if there is no possibility to move, false otherwise.
   */
  impossibleMove(keyboardState) {
    return ( (keyboardState["left"] && keyboardState["right"]) ||
             (keyboardState["up"]   && keyboardState["down"])  ||
             (this.dir == Snake.DIRECTIONS["right"] && keyboardState["left"])  ||
             (this.dir == Snake.DIRECTIONS["left"]  && keyboardState["right"]) ||
             (this.dir == Snake.DIRECTIONS["up"]    && keyboardState["down"])  ||
             (this.dir == Snake.DIRECTIONS["down"]  && keyboardState["up"]) );
  }

  /**
   * @method Get the name of the direction knowing the value of the direction.
   *
   * @return {String} The name of the direction.
   */ 
  getDir() {
    for(var dir in Snake.DIRECTIONS) {
      if(Util.isSameObjects(Snake.DIRECTIONS[dir], this.dir))
        return dir;
    }
  }
}

module.exports = Player;
