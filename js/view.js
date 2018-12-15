function drawSnake(game) {
  var context = game.context;
  context.clearRect(0, 0, game.w, game.h);
  game.players.forEach(function(snake) {
    context.beginPath();
    context.fillRect(snake.x, snake.y, snake.w, snake.h);
    context.fillStyle = "#36B";
    context.fill();
    context.closePath();
  });
}