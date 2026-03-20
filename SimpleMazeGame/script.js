const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restartButton');

const gridSize = 10;
const cellSize = canvas.width / gridSize;
const playerInset = 8;
const animationDuration = 140;

const directions = [
  { key: 'ArrowUp', dx: 0, dy: -1 },
  { key: 'ArrowDown', dx: 0, dy: 1 },
  { key: 'ArrowLeft', dx: -1, dy: 0 },
  { key: 'ArrowRight', dx: 1, dy: 0 },
];

const gameState = {
  maze: [],
  player: { x: 0, y: 0 },
  drawPosition: { x: 0, y: 0 },
  goal: { x: gridSize - 1, y: gridSize - 1 },
  isAnimating: false,
  hasWon: false,
  timerId: null,
  startTime: 0,
  elapsedMs: 0,
};

function createFilledMaze(size) {
  return Array.from({ length: size }, () => Array(size).fill(1));
}

function shuffleArray(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
}

function carveMaze(maze, x, y) {
  maze[y][x] = 0;

  const shuffledDirections = shuffleArray([
    { dx: 2, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 0, dy: 2 },
    { dx: 0, dy: -2 },
  ]);

  shuffledDirections.forEach(({ dx, dy }) => {
    const nextX = x + dx;
    const nextY = y + dy;
    const isInsideBounds = nextX >= 0 && nextX < gridSize - 1 && nextY >= 0 && nextY < gridSize - 1;

    if (!isInsideBounds || maze[nextY][nextX] === 0) {
      return;
    }

    maze[y + dy / 2][x + dx / 2] = 0;
    carveMaze(maze, nextX, nextY);
  });
}

function generateMaze() {
  const maze = createFilledMaze(gridSize);
  carveMaze(maze, 0, 0);

  maze[gridSize - 2][gridSize - 1] = 0;
  maze[gridSize - 1][gridSize - 1] = 0;

  return maze;
}

function formatTime(milliseconds) {
  const totalTenths = Math.floor(milliseconds / 100);
  const minutes = Math.floor(totalTenths / 600);
  const seconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

function updateTimer() {
  if (!gameState.startTime) {
    timerDisplay.textContent = '00:00.0';
    return;
  }

  const elapsed = performance.now() - gameState.startTime;
  gameState.elapsedMs = elapsed;
  timerDisplay.textContent = formatTime(elapsed);
}

function startTimer() {
  window.clearInterval(gameState.timerId);
  gameState.startTime = performance.now();
  gameState.elapsedMs = 0;
  timerDisplay.textContent = '00:00.0';
  gameState.timerId = window.setInterval(updateTimer, 100);
}

function stopTimer() {
  updateTimer();
  window.clearInterval(gameState.timerId);
  gameState.timerId = null;
}

function drawMaze() {
  for (let row = 0; row < gridSize; row += 1) {
    for (let col = 0; col < gridSize; col += 1) {
      ctx.fillStyle = gameState.maze[row][col] === 1 ? '#000000' : '#ffffff';
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.strokeStyle = '#d9e2ec';
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  ctx.fillStyle = '#16a34a';
  ctx.fillRect(gameState.goal.x * cellSize, gameState.goal.y * cellSize, cellSize, cellSize);
}

function drawPlayer() {
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(
    gameState.drawPosition.x * cellSize + playerInset,
    gameState.drawPosition.y * cellSize + playerInset,
    cellSize - playerInset * 2,
    cellSize - playerInset * 2,
  );
}

function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
}

function canMoveTo(x, y) {
  const isInsideMaze = x >= 0 && x < gridSize && y >= 0 && y < gridSize;

  if (!isInsideMaze) {
    return false;
  }

  return gameState.maze[y][x] === 0;
}

function showWinMessage() {
  gameState.hasWon = true;
  stopTimer();
  message.textContent = `You Win! Time: ${formatTime(gameState.elapsedMs)}`;
}

function animatePlayerMove(fromX, fromY, toX, toY) {
  gameState.isAnimating = true;
  const animationStart = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - animationStart) / animationDuration, 1);

    gameState.drawPosition.x = fromX + (toX - fromX) * progress;
    gameState.drawPosition.y = fromY + (toY - fromY) * progress;
    renderGame();

    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }

    gameState.player.x = toX;
    gameState.player.y = toY;
    gameState.drawPosition.x = toX;
    gameState.drawPosition.y = toY;
    gameState.isAnimating = false;
    renderGame();

    if (gameState.player.x === gameState.goal.x && gameState.player.y === gameState.goal.y) {
      showWinMessage();
    }
  }

  window.requestAnimationFrame(step);
}

function movePlayer(dx, dy) {
  if (gameState.isAnimating || gameState.hasWon) {
    return;
  }

  const nextX = gameState.player.x + dx;
  const nextY = gameState.player.y + dy;

  if (!canMoveTo(nextX, nextY)) {
    return;
  }

  message.textContent = '';
  animatePlayerMove(gameState.player.x, gameState.player.y, nextX, nextY);
}

function resetPlayer() {
  gameState.player = { x: 0, y: 0 };
  gameState.drawPosition = { x: 0, y: 0 };
  gameState.isAnimating = false;
  gameState.hasWon = false;
}

function restartGame() {
  gameState.maze = generateMaze();
  resetPlayer();
  message.textContent = '';
  startTimer();
  renderGame();
}

function handleKeydown(event) {
  const movement = directions.find(({ key }) => key === event.key);

  if (!movement) {
    return;
  }

  event.preventDefault();
  movePlayer(movement.dx, movement.dy);
}

document.addEventListener('keydown', handleKeydown);
restartButton.addEventListener('click', restartGame);
restartGame();
