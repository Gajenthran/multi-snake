class World {
	constructor(tileSize, w, h) {
		this.w = w;
		this.h = h;
		this.tileSize = 8;
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
		this.tiles[y * this.w + x] = snake.socket.id;	

		console.log(snake.body[snake.body.length-1]["x"]);
		x = this.getTileCoord(snake.body[snake.body.length-1]["x"]);
		y = this.getTileCoord(snake.body[snake.body.length-1]["y"]);
		this.tiles[y * this.w + x] = 0;
	}

	checkFreeTile(id, nextx, nexty) {
		console.log(nextx);
		var x = Math.floor(nextx / this.tileSize);
		var y = Math.floor(nexty / this.tileSize);
		if(this.tiles[y * this.w + x] != 0 && this.tiles[y * this.w + x] != id)
			return false;
		return true;
	}
}

module.exports = World;