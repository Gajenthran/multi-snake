var Snake = require("./Snake");

/**
 * @const {Object} directions: coordinates for each direction
 */
var directions = {
  "left"  : {"x" : -1, "y" :  0},
  "right" : {"x" :  1, "y" :  0},
  "up"    : {"x" :  0, "y" : -1},
  "down"  : {"x" :  0, "y" :  1}
};

/** 
 * Class representing a player on the server. A player is a snake 
 * with some other details like name and socket.
 */
class Player extends Snake {
  constructor(x, y, w, h, color, socket) {
    super(x, y, w, h, color);
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
    if(this.possibleMove(keyboardState))
      return;

    for(var key in keyboardState) {
      if(keyboardState[key] && directions.hasOwnProperty(key))
        this.dir = directions[key];
    }
  }

  /**
   * @method Check if it is possible to move the player with the given 
   * inputs.
   *
   * @param {Object} keyboardState: the inputs obtained on the client side
   */
  possibleMove(keyboardState) {
    return ((keyboardState["left"] && keyboardState["right"]) ||
           (keyboardState["up"] && keyboardState["down"]) ||
           (this.dir == directions["right"] && keyboardState["left"]) ||
           (this.dir == directions["left"] && keyboardState["right"]) ||
           (this.dir == directions["up"] && keyboardState["down"]) ||
           (this.dir == directions["down"] && keyboardState["up"]));
  }
}

module.exports = Player;
