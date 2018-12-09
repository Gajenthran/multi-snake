function on(element, ev, func) {
  element.addEventListener(ev, func);
}

function handleSnakeMovement(snake) {
  on(document, 'keydown', (event) => {
    const touche = event.key;
    switch(touche) {
      case "ArrowLeft":
        snake.move(directions["left"]);
        console.log("left");
        break;
      case "ArrowRight":
        snake.move(directions["right"]);
        console.log("right");
        break;
    }
  }, false);
}