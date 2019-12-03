const DEBUG = false;
//KEY CODE REFERENCE
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

let snakeEdge = 20;

let snakeX = 100;
let snakeY = 100;

let snakeSpeedX = 0;
let snakeSpeedY = 0;

let apple;
let fps = 15;

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
  drawCanvas();
  //appleSpawn();

  setInterval(function() {
    requestAnimationFrame(drawEverything);
  }, 1000 / fps);
};

function drawCanvas() {
  canvas = document.querySelector("#gameCanvas");
  canvas.width = 800;
  canvas.height = 600;
  canvasContext = canvas.getContext("2d");

  //requestAnimationFrame(drawCanvas);
}

function drawGrid() {
  for (c = 0; c < canvasColumn; c++) {
    for (r = 0; r < canvasRow; r++) {
      let gridX = c * gridSquareWidth;
      let gridY = r * gridSquareHeight;
      grid[c][r].x = gridX;
      grid[c][r].y = gridY;
      canvasContext.beginPath();
      canvasContext.rect(gridX, gridY, gridSquareWidth, gridSquareHeight);
      canvasContext.strokeStyle = "white";
      canvasContext.stroke();
      canvasContext.closePath();
      //console.log(gridX);
    }
  }
  //requestAnimationFrame(drawGrid);
}

function moveSnake() {
  snakeY -= snakeSpeedY; //move up
  snakeX += snakeSpeedX; //move right

  if (snakeX >= canvas.width - snakeEdge) {
    //remember 15 is size of snake. maybe make variable for this
    snakeSpeedX = -snakeSpeedX;
    //gameOver();
  }
  if (snakeX < 0) {
    snakeSpeedX = -snakeSpeedX;
  }
  if (snakeY >= canvas.height - snakeEdge) {
    snakeSpeedY = -snakeSpeedY;
    //gameOver();
  }
  if (snakeY < 0) {
    snakeSpeedY = -snakeSpeedY;
  }

  if (snakeX == randomX && snakeY == randomY) {
    console.log("score", score);
    score++;
    canvasContext.clearRect(randomX, randomY, 20, 20);
    //appleSpawn();
  }
  //requestAnimationFrame(moveSnake);
}

function appleSpawn() {
  apple = colorRect(randomX, randomY, 20, 20, "red");
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode == UP) {
    snakeSpeedX = 0;
    snakeSpeedY = 20;
  }
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode == RIGHT) {
    snakeSpeedY = 0;
    snakeSpeedX = 20;
  }
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode == DOWN) {
    snakeSpeedX = 0;
    snakeSpeedY = -20;
  }
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode == LEFT) {
    snakeSpeedY = 0;
    snakeSpeedX = -20;
  }
});

function gameOver() {
  clearInterval(moveSnake);
  clearInterval(drawEverything);
}

function drawEverything() {
  //draws game canvas
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // //draws the snake
  colorRect(snakeX, snakeY, 20, 20, "green");

  appleSpawn();
  drawGrid();
  moveSnake();
  //colorRect(randomX, randomY, 20, 20, "red");
}

//this function fills in color for everything
function colorRect(leftX, topy, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topy, width, height);
}

//this function draws the circular apple
// function circleApple(centerX, centerY, radius, drawColor) {
//   canvasContext.fillstyle = drawColor;
//   canvasContext.beginPath();
//   canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
//   canvasContext.fill();
// }
