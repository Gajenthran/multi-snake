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