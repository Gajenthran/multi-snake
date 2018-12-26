/** Class representing the game and their elements. */
class Game {
  constructor(socket, display) {
    this.socket   = socket;
    this.player   = 0;
    this.ennemies = new Array();
    this.display  = display;
    this.frameID  = null; 
  }

  init() {
    this.socket.on("generate-players", this.setPlayersValues);
    this.socket.emit("new-player");
    console.log(this.player);
  } 

  setPlayersValues(data) {
    this.player = data["player"];
    this.ennemies = data["ennemies"];
    console.log(this.player);
  }

  run() {
    console.log("running...");
    this.socket.emit("player-action", keyboardState);
    this.render();
    window.requestAnimationFrame(this.run);
  }


  end() {
    window.cancelAnimationFrame(this.frameID);
  }

  /*
   * @method Display all the elements of the game 
   */
  render() {
    this.display.snake(this.player);
    this.ennemies.forEach(this.display.snake); // Not sure
  }


  /**
   * @method Set a new background.
   * @param background new background
   */
  setBackground(background) {
    this.background = background
  }
}