function drawSnake(game) {
  var context = game.context;
  game.players.forEach(function(snake) {
    context.beginPath();
    context.fillRect(snake.x, snake.y, snake.w, snake.h);
    context.fillStyle = snake.color;
    context.fill();
    context.closePath();
  });
}