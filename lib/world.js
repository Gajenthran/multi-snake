var Item = require('./Item');

var tilesId = {
  "empty"  : 0,
  "item"   : 1,
  "player" : 2
};

class World {
  constructor(tileSize, w, h) {
    this.w = w
    this.h = h
    // this.tileSize = 16; // Have to use Constant for that
    this.tiles = new Array(this.w * this.h);
  }

  init() {
    this.tiles.fill(tilesId["empty"], 0, this.w * this.h);
  }

  getTileCoord(coord) {
    return Math.floor(coord * this.tileSize);
  }

  insertSnake(snake) {
    var x = snake.x; // this.getTileCoord(snake.x);
    var y = snake.y; // this.getTileCoord(snake.y);
    this.tiles[y * this.w + x] = tilesId["player"];
    x = snake.body[snake.body.length-1].x; // this.getTileCoord(snake.body[snake.body.length-1].x); // TODO: last cell
    y = snake.body[snake.body.length-1].y; // this.getTileCoord(snake.body[snake.body.length-1].y);
    this.tiles[y * this.w + x] = tilesId["empty"];
  }

  insertItem(item) {
    var x = item.x; // this.getTileCoord(item.x);
    var y = item.y; // this.getTileCoord(item.y);
    this.tiles[y * this.w + x] = { "id"    : tilesId["item"],
                                   "value" : item }; 
  }

  isBound(objectx, objecty, boundx, boundy, boundw, boundh) {
    return !(objecty < boundx || objectx >= boundw ||
             objecty < boundy || objecty >= boundh);
  }

  checkSnakeTile(snake) {
    var x = snake.x; // this.getTileCoord(snakex);
    var y = snake.y; // this.getTileCoord(snakey);
    var bound = this.isBound(snake.x, snake.y, 0, 0, this.w, this.h);
    if(// this.isBound(0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x] != tilesId["empty"] && 
       this.tiles[y * this.w + x] == tilesId["player"])
      return true;
    return false;
  }

  checkItemTile(snake) {
    var x = snake.x;
    var y = snake.y;
    if(this.isBound(snake.x, snake.y, 0, 0, this.w, this.h) &&
       this.tiles[y * this.w + x] != tilesId["empty"] && // TODO: undefined
       this.tiles[y * this.w + x].hasOwnProperty("id") && 
       this.tiles[y * this.w + x]["id"] == tilesId["item"]) {
      var item = this.tiles[y * this.w + x]["value"];
      this.tiles[y * this.w + x] = tilesId["player"];
      return item;
    }
    return false;
  }

  spawnSnake() { // TODO: put color, w, h
    return { "x" : 0,
             "y" : 0 };
  }

  spawnItem() {
    return { "x" : 0,
             "y" : 10 }
  }
}

module.exports = World;