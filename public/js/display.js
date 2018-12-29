var tilesFile = {
  //"player" : "../img/player.js"
  "world"          : "/public/img/world.png",
  "increase_speed" : "/public/img/increase_speed.png", 
  "decrease_speed" : "/public/img/decrease_speed.png", 
  "player"         : "/public/img/player.png",
  "ennemies"       : "/public/img/ennemies.png"
};

var tilesValue = {
  "empty_tile"  : 0,
  "item_tile"   : 1,
  "player_tile" : 2
};

class Display {
  constructor(canvasWidth, canvasHeight) {
    // this.wW = worldWidth;
    // this.wH = worldHeight;
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
      this.images[tile] = new Image();
      this.images[tile].src = tilesFile[tile];
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
      this.context.drawImage(this.images[items[i].name], items[i].x, items[i].y, 16, 16);
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.context.closePath();
  }

  snake(imageName, body) {
    var image = this.images[imageName];
    this.context.beginPath();
    for(let cell = 0; cell < body.length; cell++) {
      this.context.drawImage(image, body[cell]["x"], body[cell]["y"], 16, 16);
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.context.closePath();
  }
}