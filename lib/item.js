var itemsName = [
  "increase_speed",
  "decrease_speed",
  "increase_angle",
  "decrease_angle"
];

var APPLE_ITEM = "increase_speed";
var LAVA_ITEM  = "decrease_speed";

/**
 * Class representing an item in the game. An item can be
 * eaten by a snake. It can be a bonus or a malus.
 */
class Item {
  /**
   * @constructor
   *
   * @param name {String} the name of the item to identify it // TODO: maybe ID instead of name
   * @param x {number}    coordinate x
   * @param y {number}    coordinate y
   * @param w {number}    width of the item
   * @param h {number}    height of the item
   */
  constructor(name, x, y, w, h) {
    this.name = name;
    this.x    = x;
    this.y    = y;
    this.w    = w;
    this.h    = h;
    this.use  = false;
  }

  /**
   * @method apply a function to the snake that has eaten an item.
   *
   * @param snake {Snake} snake that has eaten an item
   */
  apply(snake) {
    this.use = true;
    switch(this.name) {
      case APPLE_ITEM:
        this.growSnake(snake);
        break;
      case "decrease_speed":
        this.decreaseSnakeSize(snake);
        break;
      case "decrease_angle":
        // this.modifyPlayerAngle(player, -data);
        break;
      case "increase_angle":
        // this.modifyPlayerAngle(player, data);
        break;
    }
  }

  /**
   * @method increase the size of the snake*
   *
   * @param snake {Snake} snake
   */
  growSnake(snake) {
    snake.size++;
  }

  /**
   * @method decrease the size of the snake
   *
   * @param snake {Snake} snake
   */
  decreaseSnakeSize(player) {
    player.size--;
  }
}

module.exports = Item;