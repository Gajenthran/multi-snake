var tilesFile = {
  "increase_speed" : "/public/img/increase_speed.png", 
  "decrease_speed" : "/public/img/decrease_speed.png", 
  "player"         : "/public/img/player.png",
  "enemies"        : "/public/img/enemies.png"
};

/**
 * Draw all the images of the game and also the scoreboard on the canvas 
 */
class Display {
  constructor() {
    this.canvas  = null;
    this.context = null;
    this.images  = {};
  }

  /**
   * @method Initialize the canvas and load all the images.
   *
   * @param canvasWidth {number} width of the canvas
   * @param canvasHeight {number} height of the canvas
   */
  init(canvasWidth, canvasHeight) {
    this.canvas = createElement("canvas", document, { "borderStyle" : "solid"});
    this.canvas.id = CANVAS_ID;     
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.loadImages();
  }
  
  /**
   * @method Load all images and put them in a list.
   */
  loadImages() {
    for(let tile in tilesFile) {
      if(tilesFile.hasOwnProperty(tile)) {
        this.images[tile] = new Image();
        this.images[tile].src = tilesFile[tile];
      }
    }
  }

  /**
   * @method Clear the canvas.
   */
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @method Draw all the items on the canvas.
   *
   * @param items {Array.<Item>} the items of the game 
   */
  itemOnScreen(items) {
    this.context.beginPath();
    for(let i = 0; i < items.length; i++)
      this.context.drawImage(this.images[items[i].name], items[i].x * 40, items[i].y * 40, 40, 40);
    this.context.closePath();
  }

  /**
   * @method Draw a snake on the canvas.
   *
   * @param imageName {String} name of the image, to know if it is the player or the enemies
   * @param body {Array.<Object>} the body of the snake
   */
  snakeOnScreen(imageName, body) {
    var image = this.images[imageName];
    this.context.beginPath();
    for(let cell = 0; cell < body.length; cell++)
      this.context.drawImage(image, body[cell].x * 40, body[cell].y * 40, 40, 40);
    this.context.closePath();
  }
}