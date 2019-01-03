class Player {
  constructor(body, score, size, dir) {
    this.body = body || [] ;
    this.score = score;
    this.size = size;
    this.dir = dir;
  }

  init(data) {
    this.x = data["player"].x;
    this.y = data["player"].y;
    this.score = data["player"].score;
    // this.size = data["player"].size;
    // this.dir = data["player"].dir;
  }

  update(x, y, score, size, dir) {
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift({"x" : this.x, "y" : this.y});
  }
}