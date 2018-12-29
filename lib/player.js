var Snake = require("./Snake")

/** Class representing a player. */
class Player extends Snake {
  constructor(data, socket) { // TODO: position, dim
    super(
      data.player["x"],
      data.player["y"], 
      data.player["w"], 
      data.player["h"], 
      data.player["color"]
    );
    Player.nbPlayer = Player.nbPlayer + 1 || 1;
    this.socket = socket;
  }

  updateInput(keyboardState) {
    if(keyboardState["left"] && keyboardState["right"] ||
       keyboardState["up"] && keyboardState["down"])
      return;
    else if(keyboardState["left"])
      this.dir = [-1, 0]; // ["LEFT"] 
    else if(keyboardState["right"])
      this.dir = [1, 0];
    else if(keyboardState["up"])
      this.dir = [0, -1];
    else if(keyboardState["down"])
      this.dir = [0, 1];
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
