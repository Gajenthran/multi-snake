function drawSnake(snake) {
	snake.image.style.left = snake.x + "px"
	snake.image.style.top = snake.y + "px"
}

function scroll(x, y) {
	window.scroll(x, y);
}