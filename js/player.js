/** Class representing a player. */
class Player extends Snake {
  constructor(name, snake, level) {
    super(snake.x, snake.y, snake.w, snake.h, snake.color);
    Player.nbPlayer = Player.nbPlayer + 1 || 1;
    this.name = name;
    this.level = level;
  }

  /** 
   * @return count the number of players in the game
   */
  static countPlayer() {
    return Player.nbPlayer;
  }
}