//KEY CODE REFERENCE
// ARROW UP = 38
// ARROW RIGHT = 39
//ARROW DOWN = 40
// ARROW LEFT = 37

let canvas;
let canvasContext;

let snakeX = 100;
let snakeY = 100;

let snakeSpeedX = 5;
let snakeSpeedY = 5;

let apple = 600;

let score = 0;

window.onload = function() {
  //alert("welcome to da snake game!");
  canvas = document.querySelector("#gameCanvas");
  canvas.width = 800;
  canvas.height = 600;
  canvasContext = canvas.getContext("2d");

  const framesPerSecond = 30;
  setInterval(function() {
    moveSnake();
    drawEverything();
  }, 1000 / framesPerSecond);
};

// canvas.addEventListener("keydown", function(e) {
//   if (e.which == 38) {
//     snakeY += snakeSpeedY;
//   }
// });

function moveSnake() {
  snakeX = snakeX + snakeSpeedX; //this function needs to be called to move the snake
  //snakeY = snakeY + snakeSpeedY; //this function needs to be called to move the snake

  if (snakeX >= canvas.width) {
    snakeSpeedX = -snakeSpeedX;
    //gameOver();
  }
  if (snakeX < 0) {
    snakeSpeedX = -snakeSpeedX;
  }
  if (snakeY >= canvas.height) {
    snakeSpeedY = -snakeSpeedY;
    //gameOver();
  }
  if (snakeY < 0) {
    snakeSpeedY = -snakeSpeedY;
  }
}

function gameOver() {
  clearInterval(moveSnake());
  clearInterval(drawEverything()); //last thing working on
}

function drawEverything() {
  console.log(snakeX);
  //creates game canvas
  colorRect(0, 0, canvas.width, canvas.height, "black");
  //draws the apple
  colorRect(600, 390, 15, 15, "red");
  //draws circlular apple
  circleApple(apple, 100, 10, "red");
  //draws the snake
  colorRect(snakeX, snakeY, 15, 15, "gray");
}
//this function fills in color for everything
function colorRect(leftX, topy, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topy, width, height);
}

//this function draws the circular apple
function circleApple(centerX, centerY, radius, drawColor) {
  canvasContext.fillstyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
