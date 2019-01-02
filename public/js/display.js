var tilesFile = {
  "increase_speed" : "/public/img/increase_speed.png", 
  "decrease_speed" : "/public/img/decrease_speed.png", 
  "player"         : "/public/img/player.png",
  "enemies"        : "/public/img/enemies.png"
};

class Display {
  constructor() {
    this.canvas  = null;
    this.context = null;
    this.images  = {};
  }

  init(canvasWidth, canvasHeight) {
    this.canvas = createElement("canvas", document, { "borderStyle" : "solid"});
    this.canvas.id = CANVAS_ID;     
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.loadImages();
  }
  
  loadImages() {
    for(let tile in tilesFile) {
      if(tilesFile.hasOwnProperty(tile)) {
        this.images[tile] = new Image();
        this.images[tile].src = tilesFile[tile];
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  itemOnScreen(items) {
    this.context.beginPath();
    for(let i = 0; i < items.length; i++)
      this.context.drawImage(this.images[items[i].name], items[i].x * 40, items[i].y * 40, 40, 40);
    this.context.closePath();
  }

  snakeOnScreen(imageName, body) {
    var image = this.images[imageName];
    this.context.beginPath();
    for(let cell = 0; cell < body.length; cell++)
      this.context.drawImage(image, body[cell].x * 40, body[cell].y * 40, 40, 40);
    this.context.closePath();
  }
}