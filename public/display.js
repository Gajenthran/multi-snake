class Display {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.canvas = null;
    this.context = null;
  }

  getColor(x, y, w, h) {
    return this.context.getImageData(x, y, w, h).data[3];
  }
  init() {
    this.canvas        = document.createElement("canvas"); // TODO: Find a better way to create canvas
    this.canvas.id     = "Canvas_Curve-Fever";     
    this.context       = this.canvas.getContext("2d");
    this.canvas.width  = 800;
    this.canvas.height = 600;
    document.body.appendChild(this.canvas);
  }

  snake(player) {
    this.context.beginPath();
    // this.context.arc(player.x, player.y, player.rad, 0, 2 * Math.PI);
    this.context.arc(player.x, player.y, 5, 0, 2 * Math.PI);
    this.context.fillStyle = player.color;
    this.context.fill();
    this.context.closePath();
  }
}