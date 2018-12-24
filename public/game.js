
/** Class representing the game and their elements. */
class Game {
  constructor(w, h, background) {
    this.w         = w;
    this.h         = h;
    this.players   = new Array();
    this.canvas    = null;
    this.context   = null;
  }

  /**
   * @method Initialize values for the background
   */
  init() {
    this.canvas        = document.createElement("canvas"); // TODO: Find a better way to create canvas
    this.canvas.id     = "game_canvas";     
    this.context       = this.canvas.getContext("2d");
    this.canvas.width  = this.w;
    this.canvas.height = this.h;
    document.body.appendChild(this.canvas);
  }

  addNewPlayer(id, name, level, x, y, w, h, color) {
    this.players.push(new Player(id, name, level, x, y, w, h, color));
  }

  /** 
   * @method Resize the dimension of the game.
   * @param w width
   * @param h height
   */
  resize(w, h) {
    this.canvas.width  = this.w = w;
    this.canvas.height = this.h = h;
  }

  /*
   * @method Update all the event of the game
   */
  update() {
    this.players.map(snake => {
      snake.move();
    });
  }

  /*
   * @method Display all the elements of the game 
   */
  render() {
    drawSnake(this);
  }
  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}