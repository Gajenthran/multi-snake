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
    this.use = false;
  }

  apply(player, data) {
    switch(this.name) {
      case "increase_speed":
        this.increaseSnakeSize(player, data);
        break;
      case "decrease_speed":
        this.decreaseSnakeSize(player, -data);
        break;
      case "decrease_angle":
        // this.modifyPlayerAngle(player, -data);
        break;
      case "increase_angle":
        // this.modifyPlayerAngle(player, data);
        break;
    }
  }

  increaseSnakeSize(player, speed) {
    player.size++;
    this.use = true;
  }

  decreaseSnakeSize(player, angle) {
    player.size--;
    this.use = true;
  }
}

module.exports = Item;