var Item = require('./Item');
var Util = require("./global/Util");

var tilesId = {
  "empty"  : 0,
  "item"   : 1,
  "player" : 2
};

class World {
  constructor(tileSize, w, h) {
    this.w = w;
    this.h = h;
    this.tiles = new Array(this.w * this.h);
  }

  init() {
    this.tiles.fill(tilesId["empty"], 0, this.w * this.h);
  }

  insertSnake(snake) {
    var x = snake.x;
    var y = snake.y;
    this.tiles[y * this.w + x] = tilesId["player"];
    x = snake.body[snake.body.length-1].x;
    y = snake.body[snake.body.length-1].y;
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

  spawnSnake() {
    return { "x"     : 0, //Util.getRandomFloor(this.w),
             "y"     : Util.getRandomFloor(this.h),
             "w"     : 40,
             "h"     : 40,
             "color" : Util.getRandomColor() };
  }

  spawnItem(name) {
    return { "x"    : 0, //Util.getRandomFloor(this.w),
             "y"    : Util.getRandomFloor(this.h) };
  }
}

module.exports = World;