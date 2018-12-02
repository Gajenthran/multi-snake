/** Class representing the game and their elements. */
class Game {
  constructor(w, h, players, background) {
    this.w = w;
    this.h = h;
    this.players = players;
    this.background = background;
  }

  /** 
   * Resize the dimension of the game.
   * @param w width
   * @param h height
   */
  resize(w, h) {
    this.w = w;
    this.h = h;
  }

  /**
   * Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}