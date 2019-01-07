
/** 
 * Class representing the game and their elements (Players, Items)
 * on the client side. The game (client side) will take care of the
 * display et send the keyboard inputs.
 */
class Game {
  constructor(socket) {
    this.socket  = socket;
    this.display = null;
    this.player  = null;
    this.enemies = new Array();
    this.items   = new Array();
    this.frameId = null; 
  }

  /**
   * @method Initialize the game by creating a Display object to manage
   * the rendering of the game and generating all the data from the 
   * server side.
   */
  init() {
    this.display = new Display();
    this.display.init();
    this.socket.on("generate-players", this.initGameValues.bind(this));
    this.socket.emit("new-player");
  } 

  /**
   * @method Init the data (Players, Items) of the game given by the server.
   *
   * @param {Object} data: data given by the server
   */
  initGameValues(data) {
    if(this.player == null)
      this.player = new Player(data["player"].x, data["player"].y, 
                               data["player"].dir, 0, data["player"].size);
    this.enemies = data["enemies"];
    this.items = data["items"];
  }

  /**
   * @method Set the data (Players, Items) of the game given by the server.
   *
   * @param {Object} data: data given by the server
   */
  setGameValues(data) {
    if(this.player.body[0].x != data["player"].body.x ||
       this.player.body[0].y != data["player"].body.y) {
      this.player.update(data["player"].body.x, data["player"].body.y,
                         data["player"].dir, data["player"].score, 
                         data["player"].size);
  }
    this.enemies = data["enemies"];
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
    this.socket.emit("player-action", KEYBOARD_STATE);
    this.socket.on("update-players", this.setGameValues.bind(this));
    this.render();
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
    this.display.background();
    if(this.player && this.player.body.length != 0) {
      this.display.snakeOnScreen("player", this.player);
      this.display.playersOnScoreboard(this.player, this.enemies);
    }

    for(var i = 0; i < this.enemies.length; i++)
      this.display.snakeOnScreen("enemies", this.enemies[i]);

    if(this.items.length != 0) 
      this.display.itemOnScreen(this.items);
  }
}