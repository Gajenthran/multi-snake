Util = require('./global/util');

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
   */
  constructor(name, x, y) {
    this.name = name;
    this.x    = x;
    this.y    = y;
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
      case Item.COIN_ITEM:
        this.increaseScore(snake);
        break;
    }
  }

  /**
   * @method Increase the score of the snake.
   *
   * @param {Snake} snake: snake
   */
  increaseScore(snake) {
    snake.score += Item.COIN_VALUE;
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

  /**
   * @method Check if it is time to spawn a new item.
   *
   * @return {boolean} True if we exceed the respawn time and false otherwise.
   */
  static endOfSpawnTime(itemsLength) {
    if(itemsLength < Item.MAX_ITEM_ON_SCREEN && 
       (new Date()).getTime() > Item.SPAWN_ITEM_DURATION + Item.SPAWN_ITEM_TIME_REM) {
      Item.SPAWN_ITEM_TIME_REM = (new Date()).getTime();
      return true;
    }
    return false;
  }

  /** 
   * @method Choose a random item from the list of items ITEMS_NAME.
   *
   * @return {String} The name of an item.
   */
  static chooseRandomItem() {
    return Item.ITEMS_NAME[Util.getRandomFloor(Item.ITEMS_NAME.length)];
  }
}

/**
 * The name given for the coin item.
 * @const {String}
 */
Item.COIN_ITEM = "coin";

/**
 * The name given for the apple item.
 * @const {String}
 */
Item.APPLE_ITEM = "apple";

/**
 * The name given for the poison item.
 * @const {String}
 */
Item.POISON_ITEM  = "poison";

/**
 * The value of the coin (the number of points given to the snake).
 * @const {String}
 */
Item.COIN_VALUE = 5;

/**
 * Spawn time of an object.
 * @const {String}
 */
Item.SPAWN_ITEM_DURATION = 1500;

/**
 * SPAWN_ITEM_TIME_REM indicates the remaining time for the spawn of an object.
 */
Item.SPAWN_ITEM_TIME_REM = 0;

/**
 * The maximum number of items on the screen.
 * @const {String}
 */
Item.MAX_ITEM_ON_SCREEN = 30;

/**
 * The list of all items.
 * @const {Array.<String>}
 */
Item.ITEMS_NAME = [
  Item.APPLE_ITEM,
  Item.POISON_ITEM,
  Item.COIN_ITEM
];

module.exports = Item;