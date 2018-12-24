function drawSnake(game) {
  var context = game.context;
  game.players.forEach(function(snake) {
    context.beginPath();
    context.arc(snake.x, snake.y, snake.rad, 0, 2*Math.PI);
    context.fillStyle = snake.color;
    context.fill();
    context.closePath();
  });
}