function on(element, event, action) {
    element.addEventListener(event, action);
}

function createElement(elementName, parent, styles, x, y, w, h) {
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

function createText(text, parent) {
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
function compare(object1, object2) {
  if (object1.score < object2.score)
    return -1;
  if (object1.score > object2.score)
    return 1;
  return 0;
}