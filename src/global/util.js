class Util {
  
  /**
   * @method Check if the object is outside the given perimeter
   *
   * @param {number} objectx: the coordinate x of the object
   * @param {number} objecty: the coordinate y of the object
   * @param {number} boundx: the coordinate x of the rectangle
   * @param {number} boundy: the coordinate y of the rectangle
   * @param {number} boundw: the coordinate w of the rectangle
   * @param {number} boundh: the coordinate h of the rectangle
   */
  static isBound(objectx, objecty, boundx, boundy, boundw, boundh) {
    return !(objecty < boundx || objectx >= boundw ||
             objecty < boundy || objecty >= boundh);
  }

  /**
   * @method Get a random number less than a given number.
   *
   * @param {number} max: the maximum value that the random number can reach
   */
  static getRandomMax(max) {
    return Math.random() * max;
  }

  /**
   * @method Get a random integer less than a given number.
   *
   * @param {number} max: the maximum value that the random number can reach
   */
  static getRandomFloor(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * @method Check if the two objects are identical.
   *
   * @param {Object} a: the first Object
   * @param {Object} b: the second Object
   */
  static isSameObjects(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
  }
}

module.exports = Util;