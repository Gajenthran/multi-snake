var Item = require('./Item');
var Util = require("./global/Util");

var tilesId = {
  "empty"  : 0,
  "item"   : 1,
  "player" : 2
};

class World {
  constructor(w, h) {
    this.w     = w;
    this.h     = h;
    this.tiles = new Array(this.w * this.h);
  }

  init() {
    this.tiles.fill(tilesId["empty"], 0, this.w * this.h);
  }

  insertSnake(snake) {
    this.tiles[snake.y * this.w + snake.x] = tilesId["player"];
    var x = snake.body[snake.body.length-1].x;
    var y = snake.body[snake.body.length-1].y;
    this.tiles[y * this.w + x] = tilesId["empty"];
  }

  insertItem(item) {
    var x = item.x; 
    var y = item.y;
    this.tiles[y * this.w + x] = { "id"    : tilesId["item"],
                                   "value" : item }; 
  }

  checkSnakeTile(snake) {
    var x = snake.x; 
    var y = snake.y;
    if(Util.isBound(snake.x, snake.y, 0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x] != tilesId["empty"] && 
       this.tiles[y * this.w + x] == tilesId["player"])
      return true;
    return false;
  }

  checkItemTile(snake) {
    var x = snake.x;
    var y = snake.y;
    if(Util.isBound(snake.x, snake.y, 0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x] != tilesId["empty"] &&
       this.tiles[y * this.w + x].hasOwnProperty("id") && 
       this.tiles[y * this.w + x]["id"] == tilesId["item"]) {
      var item = this.tiles[y * this.w + x]["value"];
      this.tiles[y * this.w + x] = tilesId["player"];
      return item;
    }
    return false;
  }

  clearSnake(snake) {
    for(var i = 0; i < snake.body.length; i++) {
      this.tiles[snake.body[i].y * this.w + snake.body[i].x] = tilesId["empty"];
    }
  }

  getRandomTile() {
    var x, y;
    do {
      x = Util.getRandomFloor(this.w);
      y = Util.getRandomFloor(this.h);
    } while(this.tiles[y * this.w + x] != tilesId["empty"]);

    return y * this.w + x;
  }

  spawnSnake() {
    var tile = this.getRandomTile();
    return { "x"     : Math.floor(tile%this.w),
             "y"     : Math.floor(tile/this.w),
             "w"     : 40,
             "h"     : 40,
             "color" : Util.getRandomColor() };
  }

  spawnItem(name) {
    var tile = this.getRandomTile();
    return { "x"    : Math.floor(tile%this.w),
             "y"    : Math.floor(tile/this.w) };
  }
}

module.exports = World;