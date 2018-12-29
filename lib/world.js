var Item = require('./Item');

var tilesValue = {
  "empty_tile"  : 0,
  "item_tile"   : 1,
  "player_tile" : 2
};

class World {
  constructor(tileSize, w, h) {
    this.w = w;
    this.h = h;
    this.tileSize = 16; // Have to use Constant for that
    this.tiles = new Array();
  }

  init() {
    for(let i = 0; i < this.w * this.h; i++)
      this.tiles.push(0); // TODO: Put value for 0
  }

  getTileCoord(coord) {
    return Math.floor(coord / this.tileSize);
  }

  putSnake(snake) {
    var x = this.getTileCoord(snake.x);
    var y = this.getTileCoord(snake.y);
    this.tiles[y * this.w + x] = tilesValue["player_tile"];
    x = this.getTileCoord(snake.body[snake.body.length-1]["x"]); // TODO: last cell
    y = this.getTileCoord(snake.body[snake.body.length-1]["y"]);
    this.tiles[y * this.w + x] = tilesValue["empty_tile"];
  }

  putItem(item) {
    var x = this.getTileCoord(item.x);
    var y = this.getTileCoord(item.y);
    this.tiles[y * this.w + x] = { "id"    : tilesValue["item_tile"],
                                   "value" : item }; 
  }

  checkSnakeTile(snakex, snakey) {
    var x = this.getTileCoord(snakex);
    var y = this.getTileCoord(snakey);
    if(this.tiles[y * this.w + x] != tilesValue["empty_tile"] && 
       this.tiles[y * this.w + x] == tilesValue["player_tile"])
      return false;
    return true;
  }

  checkItemTile(snake, itemx, itemy) {
    var x = this.getTileCoord(itemx);
    var y = this.getTileCoord(itemy);
    if(this.tiles[y * this.w + x] != tilesValue["empty_tile"] && // TODO: undefined
       this.tiles[y * this.w + x].hasOwnProperty("id") && 
       this.tiles[y * this.w + x]["id"] == tilesValue["item_tile"]) {
      var item = this.tiles[y * this.w + x]["value"];
      this.tiles[y * this.w + x] = tilesValue["player_tile"];
      item.apply(snake);
    }
    return false;
  }
}

module.exports = World;