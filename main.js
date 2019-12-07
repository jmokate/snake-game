const DEBUG = false;
//KEY CODE REFERENCE
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

let snakeEdge = 20;

let snake = [
  { x: 100, y: 100 },
  { x: 80, y: 100 },
  { x: 60, y: 100 }
];

//snakeHead = snake[0];

let snakeSpeedX = 0;
let snakeSpeedY = 0;

let fps = 1;

let score = 0;
let canvasColumn = 40;
let canvasRow = 30;
let gridSquareWidth = 20;
let gridSquareHeight = 20;
let grid = [];

for (c = 0; c < canvasColumn; c++) {
  grid[c] = [];
  for (r = 0; r < canvasRow; r++) {
    grid[c][r] = { x: 0, y: 0 };
  }
}

let randomX = gridSquareWidth * Math.floor(Math.random() * canvasColumn);
let randomY = gridSquareHeight * Math.floor(Math.random() * canvasRow);

window.onload = function() {
  //drawCanvas();

  setInterval(function() {
    requestAnimationFrame(drawEverything);
  }, 1000 / fps);
};

document.addEventListener("keydown", function(e) {
  if (e.keyCode == UP) {
    snakeSpeedX = 0;
    snakeSpeedY = 20;
  }
  if (e.keyCode == RIGHT) {
    snakeSpeedY = 0;
    snakeSpeedX = 20;
  }
  if (e.keyCode == DOWN) {
    snakeSpeedX = 0;
    snakeSpeedY = -20;
  }
  if (e.keyCode == LEFT) {
    snakeSpeedY = 0;
    snakeSpeedX = -20;
  }
});

// function drawCanvas() {
//   canvas = document.querySelector("#gameCanvas");
//   canvas.width = 800;
//   canvas.height = 600;
//   canvasContext = canvas.getContext("2d");

//   //requestAnimationFrame(drawCanvas);
// }

function drawGrid() {
  for (c = 0; c < canvasColumn; c++) {
    for (r = 0; r < canvasRow; r++) {
      let gridX = c * gridSquareWidth;
      let gridY = r * gridSquareHeight;
      grid[c][r].x = gridX;
      grid[c][r].y = gridY;
      canvasContext.beginPath();
      canvasContext.rect(gridX, gridY, gridSquareWidth, gridSquareHeight);
      //canvasContext.strokeStyle = "white";
      //canvasContext.stroke();
      canvasContext.closePath();
      //console.log(gridX);
    }
  }
  //requestAnimationFrame(drawGrid);
}

function moveSnake() {
  let snakeCopy = snake.slice();
  //snakeCopy.push({ x: 120, y: 140 });

  console.log(snakeCopy);
  console.log(snake);

  for (i = 0; i < snake.length; i++) {
    colorRect(snake[i].x, snake[i].y, 20, 20, "green", "white");

    // if iteration is 0 then run code
    if (snake[i] == snake[0]) {
      snake[i].y -= snakeSpeedY; //move up
      snake[i].x += snakeSpeedX; //move right
    } //else update current snake copy?
    else {
      snake.unshift({ x: snake[0].x, y: snake[0].y });
      snake.pop();
      // snake.push({ x: snake[i].x, y: snake[i].y });

      // colorRect(snakeCopy[i].x, snakeCopy[i].y, 20, 20, "yellow");
      // snakeCopy[i] == snake[i];
      // snakeCopy.unshift({ x: snakeCopy[0].x, y: snakeCopy[0].y });
      // snakeCopy.pop();
    }

    if (snake[i].x >= canvas.width - snakeEdge) {
      snakeSpeedX = -snakeSpeedX;
      //gameOver();
    }
    if (snake[i].x < 0) {
      snakeSpeedX = -snakeSpeedX;
    }
    if (snake[i].y >= canvas.height - snakeEdge) {
      snakeSpeedY = -snakeSpeedY;
      //gameOver();
    }
    if (snake[i].y < 0) {
      snakeSpeedY = -snakeSpeedY;
    }

    if (snake[i].x == randomX && snake[0].y == randomY) {
      console.log("score", score);
      score++;
      newApple();
    }
  }
}

function newApple() {
  randomX = gridSquareWidth * Math.floor(Math.random() * canvasColumn);
  randomY = gridSquareHeight * Math.floor(Math.random() * canvasRow);
  colorRect(randomX, randomY, 20, 20, "red");
}

function gameOver() {
  clearInterval(moveSnake);
  clearInterval(drawEverything);
}

function drawEverything() {
  canvas = document.querySelector("#gameCanvas");
  canvas.width = 800;
  canvas.height = 600;
  canvasContext = canvas.getContext("2d");
  //draws game canvas
  colorRect(0, 0, canvas.width, canvas.height, "black");

  drawGrid();
  moveSnake();
  apple = colorRect(randomX, randomY, 20, 20, "red");
}

//this function fills in color for everything
function colorRect(leftX, topy, width, height, drawColor, strokeColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.strokeStyle = strokeColor;
  canvasContext.strokeRect(leftX, topy, width, height);
  canvasContext.fillRect(leftX, topy, width, height);
}
