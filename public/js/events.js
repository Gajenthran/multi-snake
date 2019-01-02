var keyboardState = {
  "up"    : false,
  "left"  : false,
  "right" : false,
  "down"  : false 
};

/**
 * @method Handle all events.
 */
function handleEvents() { // TODO: maybe canvas instead of document
  on(document, "keydown", onKeydown);
  on(document, "keyup",   onKeyup);
}

/**
 * @method Handle all keyboard inputs and update the keyboard state when 
 * a key is pressed down. Called when the "keydown" event fires.
 *
 * @param event the triggered event ("keydown" normally)
 */
function onKeydown(event) {
  switch(event.key) {
    case "ArrowDown":
    case "x":
      keyboardState["down"] = true;
      console.log("down"); 
      break;
    case "ArrowUp":
    case "z":
      keyboardState["up"] = true;
      console.log("up"); 
      break;       
    case "ArrowLeft":
    case "q":
      keyboardState["left"] = true;
     console.log("left");
      break;
    case "ArrowRight":
    case "d":
      keyboardState["right"] = true;
      console.log("right");
      break;
  }
}

/**
 * @method Handle all keyboard inputs and update the keyboard state when 
 * a key is released. Called when the "keyup" event fires.
 *
 * @param event the triggered event ("keyup" normally)
 */
function onKeyup(event) { 
  switch(event.key) {
    case "ArrowDown":
    case "x":
      keyboardState["down"] = false;
      break;
    case "ArrowUp":
    case "z":
      keyboardState["up"] = false;
      break;    
    case "ArrowLeft":
    case "q":
      keyboardState["left"] = false;
      break;
    case "ArrowRight":
    case "d":
      keyboardState["right"] = false;
      break;
  }
}