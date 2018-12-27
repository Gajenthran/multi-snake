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
    var setPlayersValues = this.setPlayersValues.bind(this);
    this.socket.on("generate-players", setPlayersValues);
    this.socket.emit("new-player");
    // console.log(this.player);
  } 

  setPlayersValues(data) {
    this.player = data["player"];
    if(data["ennemies"] !== undefined)
      this.ennemies = data["ennemies"];
  }

  run() {
    // console.log("running...");
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
    this.display.snake(this.player);
    console.log(this.ennemies);
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