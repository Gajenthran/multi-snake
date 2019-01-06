Util = require('./global/Util');

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
        this.growSnake(snake, 5);
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
  growSnake(snake, size) {
    snake.size += size || 1;
    snake.score += Math.floor(size/2) || 1;
  }

  /**
   * @method Kill the snake.
   *
   * @param {Snake} snake: snake
   */
  killSnake(player) {
    player.alive = false;
  }

  static endOfSpawnTime() {
    if((new Date()).getTime() > Item.SPAWN_ITEM_DURATION + Item.SPAWN_ITEM_TIME_REM) {
      Item.SPAWN_ITEM_TIME_REM = (new Date()).getTime();
      return true;
    }
    return false;
  }

  static chooseRandomItem() {
    return Item.ITEMS_NAME[Util.getRandomFloor(Item.ITEMS_NAME.length)];
    // for(let i = 0; i < ITEMS_NAME.length; i++)
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
 * @const {String} SPAWN_ITEM_DURATION: spawn time of an object
 */
Item.SPAWN_ITEM_DURATION = 5000;

/**
 * @const {String} SPAWN_ITEM_TIME_REM: remaining time for the spawn of an object
 */
Item.SPAWN_ITEM_TIME_REM = 0;
/**
 * @const {Array.<String>} ITEMS_NAME: the list of all items
 */
Item.ITEMS_NAME = [
  Item.APPLE_ITEM,
  Item.POISON_ITEM
];

module.exports = Item;