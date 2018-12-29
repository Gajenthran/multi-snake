function on(element, ev, func) {
  element.addEventListener(ev, func);
}

var keyboardState = {
  "up"    : false,
  "left"  : false,
  "right" : false,
  "down"  : false 
};

function handleEvents() {
  onKeyDown();
  onKeyUp();
}

function onKeyDown() { // TODO: add a better handle snake movement function
  on(document, 'keydown', (event) => {
    const key = event.key;
    switch(key) {
      case "ArrowDown":
        keyboardState["down"] = true;
        console.log("down"); 
        break;
      case "ArrowUp":
        keyboardState["up"] = true;
        console.log("up"); 
        break;       
      case "ArrowLeft":
        keyboardState["left"] = true;
        console.log("left");
        break;
      case "ArrowRight":
        keyboardState["right"] = true;
        console.log("right");
        break;
    }
  }, false);
}


function onKeyUp() { // TODO: add a better handle snake movement function
  on(document, 'keyup', (event) => {
    const key = event.key;
    switch(key) {
      case "ArrowDown":
        keyboardState["down"] = false;
        console.log("down"); 
        break;
      case "ArrowUp":
        keyboardState["up"] = false;
        console.log("up"); 
        break;    
      case "ArrowLeft":
        keyboardState["left"] = false;
        break;
      case "ArrowRight":
        keyboardState["right"] = false;
        break;
    }
  }, false);
}