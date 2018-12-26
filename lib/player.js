var Snake = require("./Snake")

/** Class representing a player. */
class Player extends Snake {
  constructor(socket) {
    super(
      socket.player["x"],
      socket.player["y"], 
      socket.player["w"], 
      socket.player["h"], 
      socket.player["color"]
    );
    Player.nbPlayer = Player.nbPlayer + 1 || 1;
    this.socket = socket;
  }

  update(keyboardState) {
    if(keyboardState["left"])
      this.dir = 10;
    else if(keyboardState["right"])
      this.dir = -10;
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
