class Util {
  static getRandomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }

  static isBound(objectx, objecty, boundx, boundy, boundw, boundh) {
    return !(objecty < boundx || objectx >= boundw ||
             objecty < boundy || objecty >= boundh);
  }

  static getRandomMax(max) {
    return Math.random() * max;
  }

  static getRandomFloor(max) {
    return Math.floor(Math.random() * max);
  }
}

module.exports = Util;