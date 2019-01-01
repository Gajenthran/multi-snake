/** Class representing the game and their elements. */
class Game {
  constructor(socket, display) {
    this.socket   = socket;
    this.display  = display;
    this.world    = null;
    this.player   = null;
    this.enemies = new Array();
    this.items    = new Array();
    this.frameId  = null; 
    this.play = true;
  }

  init() {
    this.socket.on("generate-players", this.setPlayersValues.bind(this));
    this.socket.emit("new-player");
  } 

  isEmpty(array) { // TODO: Put in utility
    if(array.length === 0)
      return true;
    return false;
  }
  setPlayersValues(data) {
    this.player = data["player"];

    if(data["enemies"] !== undefined &&
       Array.isArray(data["enemies"]) &&
       data["enemies"].length !== 0)
      this.enemies = data["enemies"];

    if(data["items"] !== undefined &&
       Array.isArray(data["items"]))
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
    window.cancelAnimationFrame(this.frameId);
  }

  /*
   * @method Display all the elements of the game 
   */
  render() {
    this.display.clear();
    if(this.player)
      this.display.snake("player", this.player);
    if(this.enemies.length != 0)
      this.enemies.forEach(enemy => this.display.snake("enemies", enemy)); // Not sure
    if(this.items.length != 0) 
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