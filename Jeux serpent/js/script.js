document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const scoreElement = document.getElementById('score');
  const gridSize = { width: 45, height: 30 };
  let snake = [{ x: 10, y: 10 }];
  let apple = { x: 20, y: 15 };
  let direction = 'right';
  let score = 0;

  function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
  }

  function drawGame() {
    gameContainer.innerHTML = '';

    const appleElement = document.createElement('div');
    appleElement.className = 'apple';
    appleElement.style.left = `${apple.x * 20}px`;
    appleElement.style.top = `${apple.y * 20}px`;
    gameContainer.appendChild(appleElement);

    snake.forEach((segment, index) => {
      const segmentElement = document.createElement('div');
      segmentElement.className = index === 0 ? 'head' : 'body';
      segmentElement.style.left = `${segment.x * 20}px`;
      segmentElement.style.top = `${segment.y * 20}px`;
      gameContainer.appendChild(segmentElement);
    });
  }

  function moveSnake() {
    const newHead = { ...snake[0] };
    if (direction === 'right') newHead.x++;
    if (direction === 'left') newHead.x--;
    if (direction === 'down') newHead.y++;
    if (direction === 'up') newHead.y--;

    if (newHead.x >= gridSize.width || newHead.x < 0 || newHead.y >= gridSize.height || newHead.y < 0) {
      restartGame();
      return;
    }
    snake.unshift(newHead);


    if (newHead.x === apple.x && newHead.y === apple.y) {
      score += 1;
      updateScore();
      apple.x = Math.floor(Math.random() * gridSize.width);
      apple.y = Math.floor(Math.random() * gridSize.height);
    } else {

      snake.pop();
    }
  }
  function restartGame() {
    snake = [{ x: 10, y: 10 }];
    apple = { x: 20, y: 15 };
    direction = 'right';
    score = 0;
    updateScore();
  }
  function handleKeyPress(event) {
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  }

  document.addEventListener('keydown', handleKeyPress);


  setInterval(() => {
    moveSnake();
    drawGame();
  }, 40);


  drawGame();
});
