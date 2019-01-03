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
   * @method Apply a function to the snake that has eaten an item.
   *
   * @param snake {Snake} snake that has eaten an item
   */
  apply(snake) {
    this.use = true;
    switch(this.name) {
      case Item.APPLE_ITEM:
        this.growSnake(snake);
        break;
      case Item.POISON_ITEM:
        this.killSnake(snake);
        break;
    }
  }

  /**
   * @method Increase the size of the snake.
   *
   * @param snake {Snake} snake
   */
  growSnake(snake) {
    snake.size++;
    snake.score++;
  }

  /**
   * @method Kill the snake.
   *
   * @param snake {Snake} snake
   */
  killSnake(player) {
    player.alive = false;
  }
}

Item.APPLE_ITEM = "apple";
Item.POISON_ITEM  = "poison";

Item.itemsName = [
  Item.APPLE_ITEM,
  Item.POISON_ITEM
];

module.exports = Item;