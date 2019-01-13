/*
 * @global {Object} KEYBOARD_STATE: All keyboard inputs. The value of an input is 
 * false when a key is released and true when a key is pressed. 
 */
var KEYBOARD_STATE = {
  "up"    : false,
  "left"  : false,
  "right" : false,
  "down"  : false 
};

/**
 * @method Handle all events.
 */
function handleEvents() { // TODO: maybe canvas instead of document
  Util.on(document, "keydown", onKeydown);
  Util.on(document, "keyup",   onKeyup);
}

/**
 * @method Handle all keyboard inputs and update the keyboard state when 
 * a key is pressed down. Called when the "keydown" event fires.
 *
 * @param {Event} event: the triggered event ("keydown" normally)
 */
function onKeydown(event) {
  switch(event.key) {
    case "ArrowDown":
    case "x":
      KEYBOARD_STATE["down"] = true;
      break;
    case "ArrowUp":
    case "z":
      KEYBOARD_STATE["up"] = true;
      break;       
    case "ArrowLeft":
    case "q":
      KEYBOARD_STATE["left"] = true;
      break;
    case "ArrowRight":
    case "d":
      KEYBOARD_STATE["right"] = true;
      break;
  }
}

/**
 * @method Handle all keyboard inputs and update the keyboard state when 
 * a key is released. Called when the "keyup" event fires.
 *
 * @param {Event} event: the triggered event ("keyup" normally)
 */
function onKeyup(event) { 
  switch(event.key) {
    case "ArrowDown":
    case "x":
      KEYBOARD_STATE["down"] = false;
      break;
    case "ArrowUp":
    case "z":
      KEYBOARD_STATE["up"] = false;
      break;    
    case "ArrowLeft":
    case "q":
      KEYBOARD_STATE["left"] = false;
      break;
    case "ArrowRight":
    case "d":
      KEYBOARD_STATE["right"] = false;
      break;
  }
}