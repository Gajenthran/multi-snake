/**
 * Class representing an item in the game. An item can be
 * eaten by a snake. It can be a bonus or a malus.
 */
class Item {
  /**
   * @constructor
   *
   * @param {String} name: the name of the item to identify it // TODO: maybe ID instead of name
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} w: width of the item
   * @param {number} h: height of the item
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
   * The functionality of the object will be chosen according to 
   * its name.
   *
   * @param {Snake} snake: snake that has eaten an item
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
   * @param {Snake} snake: snake
   */
  growSnake(snake) {
    snake.size++;
    snake.score++;
  }

  /**
   * @method Kill the snake.
   *
   * @param {Snake} snake: snake
   */
  killSnake(player) {
    player.alive = false;
  }
}

/**
 * @const {String} APPLE_ITEM: the name given for the apple item
 */
Item.APPLE_ITEM = "apple";

/**
 * @const {String} POISON_ITEM: the name given for the poison item
 */
Item.POISON_ITEM  = "poison";

/**
 * @const {Array.<String>} ITEMS_NAME: the list of all items
 */
Item.ITEMS_NAME = [
  Item.APPLE_ITEM,
  Item.POISON_ITEM
];

module.exports = Item;