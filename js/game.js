/** Class representing the game and their elements. */
class Game {
  constructor(w, h, players, background) {
    this.w = w;
    this.h = h;
    this.players = players;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
  }

  /**
   * @method Initialize values for the background
   */
  init() {
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  /** 
   * @method Resize the dimension of the game.
   * @param w width
   * @param h height
   */
  resize(w, h) {
    this.canvas.width = this.w = w;
    this.canvas.height = this.h = h;
  }

  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}