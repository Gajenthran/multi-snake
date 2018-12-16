/** Class representing a player. */
class Player extends Snake {
  constructor(name, level, x, y, w, h, color) {
    super(x, y, w, h, color);
    Player.nbPlayer = Player.nbPlayer + 1 || 1;
    this.name  = name;
    this.level = level;
  }

  /** 
   * @return count the number of players in the game
   */
  static countPlayers() {
    console.log("Number of players : " + Player.nbPlayer);
    return Player.nbPlayer;
  }
}