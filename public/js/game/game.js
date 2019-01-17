/** 
 * Class representing the game and their elements (Players, Items)
 * on the client side. The game (client side) will take care of the
 * display et send the keyboard inputs.
 */
class Game {
  /**
   * @constructor
   *
   * @param {Object} socket: socket associating the player and the client
   */
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
    this.socket.emit("new-player");
    this.socket.on("generate-game", this.initGameValues.bind(this));
    this.display = new Display(this.player);
    this.display.init();
  } 

  /**
   * @method Init the data (Players, Items) of the game given by the server.
   *
   * @param {Object} data: data given by the server
   */
  initGameValues(data) {
    if(this.player == null)
      this.player = new Player({"x" : data["player"].x, "y" : data["player"].y},
                               data["player"].dir, 0, data["player"].size,
                               Util.getRandomColorRGB());

    for(var i = 0; i < data["enemies"].length; i++)
      this.enemies.push(new Player(data["enemies"][i].body,
                                   data["enemies"][i].dir, 0, data["enemies"][i].size,
                                   Util.getRandomColorRGB()));
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
      this.player.update(data["player"].body,
                         data["player"].dir, data["player"].score, 
                         data["player"].size);
    }
    
    // this.enemies = data["enemies"];
    // TODO: When a player is removed from the game
    for(var i = 0; i < data["enemies"].length; i++)
      if(this.enemies[i].body[0].x != data["enemies"][i].body.x ||
         this.enemies[i].body[0].y != data["enemies"][i].body.y)
        this.enemies[i].update(data["enemies"][i].body,
                               data["enemies"][i].dir, 0, data["enemies"][i].score,
                               data["enemies"][i].size);
    this.items = data["items"];
  }

  /**
   * @method Start the game loop (TO ADD).
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
    window.requestAnimationFrame(this.run.bind(this));
    this.socket.emit("player-action", KEYBOARD_STATE);
    this.socket.on("update-players", this.setGameValues.bind(this));
    this.render();
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
      this.display.setCamera(this.player.body[0]);
      this.display.snakeOnScreen("player", this.player);
      this.display.playersOnScoreboard(this.player, this.enemies);
    }

    for(var i = 0; i < this.enemies.length; i++)
      this.display.snakeOnScreen("enemies", this.enemies[i]);

    if(this.items.length != 0) 
      this.display.itemOnScreen(this.items);
  }
}