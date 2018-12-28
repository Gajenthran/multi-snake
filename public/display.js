class Display {
  constructor(canvasWidth, canvasHeight) {
    // this.wW = worldWidth;
    // this.wH = worldHeight;
    this.cW = canvasWidth;
    this.cH = canvasHeight;
    this.canvas = null;
    this.context = null;
    // this.camera = { "x" : null, "y" : null, "w" : 200, "h" : 200};
  }

  clear() {
    this.context.clearRect(0, 0, this.cW, this.cH);
  }

  getColor(x, y, w, h) {
    return this.context.getImageData(x, y, w, h).data[3];
  }

  init(player) {
    this.canvas = document.createElement("canvas"); // TODO: Find a better way to create canvas
    this.canvas.id = "Canvas_Curve-Fever";     
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.cW;
    this.canvas.height = this.cH; // TODO: Redondance??
    this.canvas.style["borderStyle"] = "solid";
    document.body.appendChild(this.canvas);
  }

  snake(player) {
    this.context.beginPath();
    // this.context.save();
    // this.context.translate(player.x - this.canvas.width/2, player.y - this.canvas.height/2);
    // this.context.scale(2, 2);
    // this.context.translate(-this.canvas.width / 4, -this.canvas.height / 4);
    // this.context.restore();
    //player.forEach(cell => cell["x"], cell["y"], 16, 16);
    for(let cell = 0; cell < player.length; cell++) {
      this.context.rect(player[cell]["x"], player[cell]["y"], 10, 10);
      this.context.fillStyle = player.color;
      this.context.fill();
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.context.closePath();
  }
}