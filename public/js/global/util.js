function on(element, event, action) {
    element.addEventListener(event, action);
}

function createElement(elementName, parent, styles, x, y, w, h) {
  var el = parent.createElement(elementName);
  // If we don't have all the elements, we fill nothing 
  if(x && y && w && h) {
    el.style.position = "absolute";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.style.height = h + "px";
  }
  
  document.body.appendChild(el);
  for(var property in styles) el.style[property] = styles[property];
  return el;
}