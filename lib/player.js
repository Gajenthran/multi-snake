var Snake = require("./Snake")

/** Class representing a player. */
class Player extends Snake {
  constructor(data, socket) {
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
    if(keyboardState["left"] && keyboardState["right"])
      this.dir = 0;
    else if(keyboardState["left"])
      this.dir = 0.05;
    else if(keyboardState["right"])
      this.dir = -0.05;

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
