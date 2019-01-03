
/** 
 * Class representing the game and their elements (Players, Items)
 * on the client side.
 */
class Game {
  constructor(socket) {
    this.socket  = socket;
    this.display = null;
    this.player  = null;
    this.enemies = new Array();
    this.items   = new Array();
    this.frameId = null; 
    this.play    = true;
  }

  /**
   * @method Initialize the game by creating a Display object to manage
   * the rendering of the game and generating all the data from the 
   * server side.
   */
  init() {
    this.display = new Display();
    this.display.init();
    this.socket.on("generate-players", this.setGameValues.bind(this));
    this.socket.emit("new-player");
  } 


  /**
   * @method Set the data (Players, Items) of the game given by the server.
   *
   * @param data {Object} data given by the server
   */
  setGameValues(data) {
    this.player = data["player"];
    if(data["enemies"] !== undefined &&
       Array.isArray(data["enemies"])) {
      this.enemies = data["enemies"];
    }

    if(data["items"] !== undefined &&
       Array.isArray(data["items"]))
      this.items = data["items"];
  }

  /**
   * @method Start the game loop.
   */
  start() {
    this.run(Date.now());
  }

  /**
   * @method Run the game loop. We will send the keyboard state to 
   * the server and get the game state from the server. After that, 
   * we will render all the elements of the game.
   */
  run() {
    if(this.play) {
      this.socket.emit("player-action", keyboardState);
      this.socket.on("update-players", this.setGameValues.bind(this));
      this.render();
    }
    this.play = !this.play;
    window.requestAnimationFrame(this.run.bind(this));
  }

  /**
   * @method End the game loop.
   */
  end() {
    window.cancelAnimationFrame(this.frameId);
  }

  /**
   * @method Display all the elements of the game, i.e all 
   * the Players and Items.
   */
  render() {
    this.display.clearScreen();
    if(this.player && this.player["body"] !== undefined) {
      this.display.snakeOnScreen("player", this.player["body"]);
      this.display.playersOnScoreboard(this.player, this.enemies);
    }
    for(var i = 0; i < this.enemies.length; i++)
      this.display.snakeOnScreen("enemies", this.enemies[i]["body"]);
    // this.enemies.forEach(enemy => this.display.snakeOnScreen("enemies", enemy["body"]));
    if(this.items.length != 0) 
      this.display.itemOnScreen(this.items);
  }
}