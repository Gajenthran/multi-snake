function on(element, ev, func) {
  element.addEventListener(ev, func);
}

var keyboardState = {
  "left"  : false,
  "right" : false 
};

function onKeyDown() { // TODO: add a better handle snake movement function
  on(document, 'keydown', (event) => {
    const key = event.key;
    switch(key) {
      case "ArrowLeft":
        keyboardState["left"] = true
        console.log("left");
        break;
      case "ArrowRight":
        keyboardState["right"] = true
        console.log("right");
        break;
    }
  }, false);
}


function onKeyUp() { // TODO: add a better handle snake movement function
  on(document, 'keyup', (event) => {
    const key = event.key;
    switch(key) {
      case "ArrowLeft":
        keyboardState["left"] = false
        break;
      case "ArrowRight":
        keyboardState["right"] = false
        break;
    }
  }, false);
}