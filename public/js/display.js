var tilesFile = {
  "world"          : "/public/img/world.png",
  "increase_speed" : "/public/img/increase_speed.png", 
  "decrease_speed" : "/public/img/decrease_speed.png", 
  "player"         : "/public/img/player.png",
  "enemies"        : "/public/img/enemies.png"
};


class Display {
  constructor(canvasWidth, canvasHeight) {
    this.cW = canvasWidth;
    this.cH = canvasHeight;
    this.canvas = null;
    this.context = null;
    this.images = {};
    // this.camera = { "x" : null, "y" : null, "w" : 200, "h" : 200};
  }

  clear() {
    this.context.clearRect(0, 0, this.cW, this.cH);
  }

  loadImages() {
    for(let tile in tilesFile) {
      if(tilesFile.hasOwnProperty(tile)) {
        this.images[tile] = new Image();
        this.images[tile].src = tilesFile[tile];
      }
    }
  }

  init(player) {
    this.canvas = document.createElement("canvas"); // TODO: Find a better way to create canvas
    this.canvas.id = "Canvas_Curve-Fever";     
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.cW;
    this.canvas.height = this.cH; // TODO: Redondance??
    this.canvas.style["borderStyle"] = "solid";
    document.body.appendChild(this.canvas);
    this.loadImages();
  }
  
  item(items) {
    this.context.beginPath();
    for(let i = 0; i < items.length; i++) {
      this.context.drawImage(this.images[items[i].name], items[i].x * 40, items[i].y * 40, 40, 40);
    }
    this.context.closePath();
  }

  snake(imageName, body) {
    var image = this.images[imageName];
    this.context.beginPath();
    for(let cell = 0; cell < body.length; cell++) {
      this.context.drawImage(image, body[cell].x * 40, body[cell].y * 40, 40, 40);
    }
    this.context.closePath();
  }
}