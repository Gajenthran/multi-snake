class Util {

  /**
   * @method Get a random hexadecimal color.
   */
  static getRandomColorHex() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  /**
   * @method Get a random RGB color.
   */
  static getRandomColorRGB() {
    var color = new Array(3);
    for (var i = 0; i < 3; i++)
      color[i] = Math.floor(Math.random() * 255);
    return {"r" : color[0], "g" : color[1], "b" : color[2]};
  }

  /**
   * @method Call addEventListener. We do not have to write [element].addEventListener
   * every time.
   *
   * @param {Element|Document} element: the element targeted by the event
   * @param {Event} event: the event type to listen for
   * @param {function} action: the function applied when the event is triggered
   */
  static on(element, event, action) {
      element.addEventListener(event, action);
  }

  /**
   * @method Create an HTML element. We do not have to write document.createElement([element])
   * every time.
   *
   * @param elementName: the element targeted by the event
   * @param parent: the parent of the element (where we will put the element)
   * @param styles: the styles of the element
   * @param x: the coordinate x
   * @param y: the coordinate y
   * @param w: the width of the element
   * @param h: the height of the element
   */
  static createElement(elementName, parent, styles, x, y, w, h) {
    var el = document.createElement(elementName);
    // If the element is a canvas, we don't have to set the position 
    if(elementName != "canvas") {
      el.style.position = "absolute";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.width = w + "px";
      el.style.height = h + "px";
    }

    if(parent == null)
      document.body.appendChild(el);
    else
      parent.appendChild(el);
    for(var property in styles) el.style[property] = styles[property];
    return el;
  }

  /**
   * @method Create a new Text node.
   *
   * @param {String} text: the text
   * @param parent: the parent of the Text node (where we will put the element)
   */
  static createText(text, parent) {
    var txt = document.createTextNode(text);
    if(parent == null)
      document.body.appendChild(txt);
    else
      parent.appendChild(txt);

    return txt;
  }

  /*
   * @method Comparison function to sort an array of objects taken in 
   * stackoverflow.com. It's not a generic comparison, but it 
   * will be enough for us. The function helps to sort the players' score.
   *
   * @param {Object} object2 the first object to compare
   * @param {Object} object2 the second object to compare
   */
  static compare(object1, object2) {
    if (object1.score < object2.score)
      return -1;
    if (object1.score > object2.score)
      return 1;
    return 0;
  }
}
