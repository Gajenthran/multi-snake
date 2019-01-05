class Player {
  constructor(x, y, score) {
    this.body = new Array();
    this.body.unshift({"x" : x, "y" : y});
    this.score = score || 0;
  }

  update(x, y, score) {
    if(this.body.length == 2)
      this.body.pop();
    this.body.unshift({"x" : x, "y" : y});
    this.score = score || this.score;
    // this.dir = dir || this.dir;
  }

}