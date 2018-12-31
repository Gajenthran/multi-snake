var Item = require('./Item');

var tilesId = {
  "empty"  : 0,
  "item"   : 1,
  "player" : 2
};

class World {
  constructor(tileSize, w, h) {
    this.w = w;
    this.h = h;
    this.tileSize = 16; // Have to use Constant for that
    this.tiles = new Array(this.w * this.h);
  }

  init() {
    this.tiles.fill(tilesId["empty"], 0, this.w * this.h);
  }

  getTileCoord(coord) {
    return Math.floor(coord / this.tileSize);
  }

  putSnake(snake) {
    var x = this.getTileCoord(snake.x);
    var y = this.getTileCoord(snake.y);
    this.tiles[y * this.w + x] = tilesId["player"];
    x = this.getTileCoord(snake.body[snake.body.length-1]["x"]); // TODO: last cell
    y = this.getTileCoord(snake.body[snake.body.length-1]["y"]);
    this.tiles[y * this.w + x] = tilesId["empty"];
  }

  putItem(item) {
    var x = this.getTileCoord(item.x);
    var y = this.getTileCoord(item.y);
    this.tiles[y * this.w + x] = { "id"    : tilesId["item"],
                                   "value" : item }; 
  }

  checkSnakeTile(snakex, snakey) {
    var x = this.getTileCoord(snakex);
    var y = this.getTileCoord(snakey);
    if(this.tiles[y * this.w + x] != tilesId["empty"] && 
       this.tiles[y * this.w + x] == tilesId["player"])
      return false;
    console.log("bien une collision !")
    return true;
  }

  checkItemTile(snake, itemx, itemy) {
    var x = this.getTileCoord(itemx);
    var y = this.getTileCoord(itemy);
    if(this.tiles[y * this.w + x] != tilesId["empty"] && // TODO: undefined
       this.tiles[y * this.w + x].hasOwnProperty("id") && 
       this.tiles[y * this.w + x]["id"] == tilesId["item"]) {
      var item = this.tiles[y * this.w + x]["value"];
      this.tiles[y * this.w + x] = tilesId["player"];
      item.apply(snake);
    }
    return false;
  }
}

module.exports = World;