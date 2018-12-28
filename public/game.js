/** Class representing the game and their elements. */
class Game {
  constructor(socket, display) {
    this.socket   = socket;
    this.display  = display;
    this.world    = null;
    this.player   = null;
    this.ennemies = null;
    this.frameID  = null; 
  }

  init() {
    var setPlayersValues = this.setPlayersValues.bind(this);
    this.socket.on("generate-players", setPlayersValues);
    this.socket.emit("new-player");
  } 

  setPlayersValues(data) {
    this.player = data["player"];
    if(data["ennemies"] !== undefined)
      this.ennemies = data["ennemies"];
  }

  run() {
    this.socket.emit("player-action", keyboardState);
    var setPlayersValues = this.setPlayersValues.bind(this);
    this.socket.on("update-players", setPlayersValues);
    this.render();
    var run = this.run.bind(this);
    window.requestAnimationFrame(run);
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
      this.display.snake(this.player);
    if(this.ennemies) {
      this.ennemies.forEach(enemy => this.display.snake(enemy)); // Not sure
    }
  }


  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}