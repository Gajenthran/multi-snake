var Snake = require("./Snake")

var directions = {
  "left"  : [-1, 0],
  "right" : [1, 0],
  "up"    : [0, -1],
  "down"  : [0, 1]
};

/** Class representing a player. */
class Player extends Snake {
  constructor(x, y, w, h, color, socket) { // TODO: position, dim
    super(x, y, w, h, color);
    Player.nbPlayer = Player.nbPlayer + 1 || 1; // TODO: maybe to remove
    // this.name = name;
    this.socket = socket;
  }

  updateInput(keyboardState) {
    if((keyboardState["left"] && keyboardState["right"]) ||
       (keyboardState["up"] && keyboardState["down"]) ||
       (this.dir == directions["right"] && keyboardState["left"]) ||
       (this.dir == directions["left"] && keyboardState["right"]) ||
       (this.dir == directions["up"] && keyboardState["down"]) ||
       (this.dir == directions["down"] && keyboardState["up"]))
      return;

    for(var key in keyboardState) {
      if(keyboardState[key] && directions.hasOwnProperty(key))
        this.dir = directions[key];
    }
  }

  /** 
   * @return count the number of players in the game
   */
  static getNbPlayers() {
    console.log("Number of players : " + Player.nbPlayer);
    return Player.nbPlayer;
  }
}

module.exports = Player;
