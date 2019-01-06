var Snake = require("./Snake");
var Util = require("./global/Util");

/** 
 * Class representing a player on the server. A player is a snake 
 * with some other details like name and socket.
 */
class Player extends Snake {
  constructor(x, y, direction, socket) {
    super(x, y, direction);
    // this.name = name;
    this.socket = socket;
  }

  /**
   * @method Update the player's direction with the inputs obtained on 
   * the client side.
   *
   * @param {Object} keyboardState: the inputs obtained on the client side
   */
  updateInput(keyboardState) {
    this.getDir();
    if(this.possibleMove(keyboardState))
      return;

    for(var key in keyboardState) {
      if(keyboardState[key] && Player.DIRECTIONS.hasOwnProperty(key))
        this.dir = Player.DIRECTIONS[key];
    }
  }

  /**
   * @method Check if it is possible to move the player with the given 
   * inputs.
   *
   * @param {Object} keyboardState: the inputs obtained on the client side
   * @return {boolean} True if there is no possibility to move, false otherwise.
   */
  possibleMove(keyboardState) {
    return ((keyboardState["left"] && keyboardState["right"]) ||
           (keyboardState["up"] && keyboardState["down"]) ||
           (this.dir == Player.DIRECTIONS["right"] && keyboardState["left"]) ||
           (this.dir == Player.DIRECTIONS["left"] && keyboardState["right"]) ||
           (this.dir == Player.DIRECTIONS["up"] && keyboardState["down"]) ||
           (this.dir == Player.DIRECTIONS["down"] && keyboardState["up"]));
  }

  /**
   * @method Get the name of the direction knowing the value of the direction.
   *
   * @return {String} The name of the direction.
   */ 
  getDir() {
    for(var dir in Player.DIRECTIONS) {
      if(Util.isSameObjects(Player.DIRECTIONS[dir], this.dir))
        return dir;
    }
  }
}

/**
 * @const {Object} Player.DIRECTIONS: Coordinates for each direction
 */
Player.DIRECTIONS = {
  "left"  : {"x" : -1, "y" :  0},
  "right" : {"x" :  1, "y" :  0},
  "up"    : {"x" :  0, "y" : -1},
  "down"  : {"x" :  0, "y" :  1}
};

module.exports = Player;
