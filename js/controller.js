function on(element, ev, func) {
  element.addEventListener(ev, func);
}

function handleSnakeMovement(element) {
  on(document, 'keydown', (event) => {
    const touche = event.key;
    switch(touche) {
      case "ArrowLeft":
        element.move(-1, 0);
        console.log("left");
        break;
      case "ArrowRight":
        element.move(1, 0);
        console.log("right");
        break;
    }
  }, false);
}