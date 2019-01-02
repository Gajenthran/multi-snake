var keyboardState = {
  "up"    : false,
  "left"  : false,
  "right" : false,
  "down"  : false 
};

function handleEvents() {
  on(document, "keydown", onKeydown);
  on(document, "keyup",   onKeyup);
}

function onKeydown(event) { // TODO: add a better handle snake movement function
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