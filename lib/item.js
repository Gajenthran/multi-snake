var itemsName = [
	"increase_speed",
	"decrease_speed",
	"increase_angle",
	"decrease_angle"
];

class Item {
	constructor(name, x, y, w, h) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	apply(player, data) {
		switch(this.name) {
			case "increase_speed":
				modifyPlayerSpeed(player, data);
				break;
			case "decrease_speed":
				modifyPlayerSpeed(player, -data);
				break;
			case "decrease_angle":
				modifyPlayerAngle(player, -data);
				break;
			case "increase_angle":
				modifyPlayerAngle(player, data);
				break;
		}
		// console.log(player);
	}

	modifyPlayerSpeed(player, speed) {
		player.speed += speed;
	}

	modifyPlayerAngle(player, angle) {
		player.speed += angle;
	}
}

module.exports = Item;