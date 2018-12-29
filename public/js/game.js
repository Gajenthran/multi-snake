/** Class representing the game and their elements. */
class Game {
  constructor(socket, display) {
    this.socket   = socket;
    this.display  = display;
    this.world    = null;
    this.player   = null;
    this.ennemies = null;
    this.items    = {};
    this.frameID  = null; 
  }

  init() {
    this.socket.on("generate-players", this.setPlayersValues.bind(this));
    this.socket.emit("new-player");
  } 

  setPlayersValues(data) {
    this.player = data["player"];
    if(data["ennemies"] !== undefined)
      this.ennemies = data["ennemies"];
    if(data["items"] !== undefined)
       this.items = data["items"];
  }

  start() {
    this.run(Date.now());
  }

  run() {
    this.socket.emit("player-action", keyboardState);
    this.socket.on("update-players", this.setPlayersValues.bind(this));
    this.render();
    window.requestAnimationFrame(this.run.bind(this));
  }

  end() {
    window.cancelAnimationFrame(this.frameID);
  }

  /*
   * @method Display all the elements of the game 
   */
  render() {
    this.display.clear();
    if(this.player)
      this.display.snake("player", this.player);
    if(this.ennemies)
      this.ennemies.forEach(enemy => this.display.snake("ennemies", enemy)); // Not sure
    if(this.items)
      this.display.item(this.items);
  }

  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}