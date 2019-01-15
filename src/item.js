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
   * @return {boolean} true if we exceed the respawn time and false otherwise.
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
   * @return {String} the name of an item
   */
  static chooseRandomItem() {
    return Item.ITEMS_NAME[Util.getRandomFloor(Item.ITEMS_NAME.length)];
  }
}

/**
 * @const {String} COIN_ITEM: the name given for the coin item
 */
Item.COIN_ITEM = "coin";

/**
 * @const {String} APPLE_ITEM: the name given for the apple item
 */
Item.APPLE_ITEM = "apple";

/**
 * @const {String} POISON_ITEM: the name given for the poison item
 */
Item.POISON_ITEM  = "poison";

/**
 * @const {String} COIN_VALUE: the value of the coin (the number of points given to the snake)
 */
Item.COIN_VALUE = 5;

/**
 * @const {String} SPAWN_ITEM_DURATION: spawn time of an object
 */
Item.SPAWN_ITEM_DURATION = 1500;

/**
 * @const {String} SPAWN_ITEM_TIME_REM: remaining time for the spawn of an object
 */
Item.SPAWN_ITEM_TIME_REM = 0;

/**
 * @const {String} MAX_ITEM_ON_SCREEN: the maximum number of items on the screen
 */
Item.MAX_ITEM_ON_SCREEN = 30;

/**
 * @const {Array.<String>} ITEMS_NAME: the list of all items
 */
Item.ITEMS_NAME = [
  Item.APPLE_ITEM,
  Item.POISON_ITEM,
  Item.COIN_ITEM
];

module.exports = Item;