function on(element, ev, func) {
  element.addEventListener(ev, func);
}

function handleSnakeMovement(snake) {
  on(document, 'keydown', (event) => {
    const key = event.key;
    switch(key) {
      case "ArrowLeft":
        snake.dir = directions["left"];
        console.log("left");
        break;
      case "ArrowRight":
        snake.dir = directions["right"];
        console.log("right");
        break;
    }
  }, false);
}