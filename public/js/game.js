
/** Class representing the game and their elements. */
class Game {
  constructor(socket) {
    this.socket  = socket;
    this.display = null;
    this.world   = null;
    this.player  = null;
    this.enemies = new Array();
    this.items   = new Array();
    this.frameId = null; 
    this.play    = true;
  }

  init() {
    this.display = new Display();
    this.display.init(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.socket.on("generate-players", this.setPlayersValues.bind(this));
    this.socket.emit("new-player");
  } 


  setPlayersValues(data) {
    this.player = data["player"];
    if(data["enemies"] !== undefined &&
       Array.isArray(data["enemies"]))
      this.enemies = data["enemies"];

    if(data["items"] !== undefined &&
       Array.isArray(data["items"]))
      this.items = data["items"];
  }

  start() {
    this.run(Date.now());
  }

  run() {
    if(this.play) {
      this.socket.emit("player-action", keyboardState);
      this.socket.on("update-players", this.setPlayersValues.bind(this));
      this.render();
    } 
    this.play = !this.play;
    window.requestAnimationFrame(this.run.bind(this));
  }

  end() {
    window.cancelAnimationFrame(this.frameId);
  }

  /*
   * @method Display all the elements of the game 
   */
  render() {
    this.display.clearScreen();
    if(this.player)
      this.display.snakeOnScreen("player", this.player);
    if(this.enemies.length != 0)
      this.enemies.forEach(enemy => this.display.snakeOnScreen("enemies", enemy));
    if(this.items.length != 0) 
      this.display.itemOnScreen(this.items);
  }

  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}