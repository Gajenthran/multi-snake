var tilesValue = {
	"empty_tile"  : 0,
	"item_tile"   : { "value": 1, "item": [] },
	"player_tile" : { "value": 2, "player": [] }
};

class World {
	constructor(tileSize, w, h) {
		this.w = w;
		this.h = h;
		this.tileSize = 8; // Have to use Constant for that
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
		var x = this.getTileCoord(snake.body[0].x);
		var y = this.getTileCoord(snake.body[0].y);
		tilesValue["player_tile"]["player"].push(snake.socket.id);
		this.tiles[y * this.w + x] = { "value"  : tilesValue["player_tile"]["value"], 
		                               "player" : snake.socket.id }
		x = this.getTileCoord(snake.body[snake.body.length-1]["x"]);
		y = this.getTileCoord(snake.body[snake.body.length-1]["y"]);
		this.tiles[y * this.w + x] = tilesValue["empty_tile"];
	}

	putItem(item) {
		var x = this.getTileCoord(item.x);
		var y = this.getTileCoord(item.y);
		tilesValue["item_tile"]["item"].push(item);
		this.tiles[y * this.w + x] = { "value" : 2,
	  															 "item"  : item };
	}

	checkFreeTile(id, nextx, nexty) {
		// Collision after snake dead :: rectangle w
		var x = this.getTileCoord(nextx); // Math.floor(nextx / this.tileSize);
		var y = this.getTileCoord(nexty); // Math.floor(nexty / this.tileSize);
		// console.log(this.tiles[y * this.w + x]);
		if(this.tiles[y * this.w + x] != tilesValue["empty_tile"] && 
			 this.tiles[y * this.w + x].hasOwnProperty("player") &&
			 this.tiles[y * this.w + x]["player"] != id) 
			return false;
		return true;
	}

	checkItemTile(player) {
		var x = this.getTileCoord(player.x);
		var y = this.getTileCoord(player.y);
		console.log(this.tiles[y * this.w + x]);
		if(this.tiles[y * this.w + x] != tilesValue["empty_tile"] && 
			 this.tiles[y * this.w + x]["value"] == tilesValue["item_tile"]["value"]) {
			exit(0);
			this.tiles[y * this.w + x]["item"].apply(player, 1);
		}
	}
}

module.exports = World;