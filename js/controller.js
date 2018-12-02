function on(element, ev, func) {
  element.addEventListener(ev, func);
}

function handleSnakeMovement(snake) {
  on(document, 'keydown', (event) => {
    const touche = event.key;
    switch(touche) {
      case "ArrowLeft":
        snake.move(-1, 0);
        console.log("left");
        break;
      case "ArrowRight":
        snake.move(1, 0);
        console.log("right");
        break;
    }
  }, false);
}