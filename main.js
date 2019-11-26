//KEY CODE REFERENCE
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

let canvas;
let canvasContext;

let snake;

let snakeX = 100;
let snakeY = 100;

let snakeSpeedX = 5;
let snakeSpeedY = 5;

let apple = 600;

let score = 0;

window.onload = function() {
  canvas = document.querySelector("#gameCanvas");
  canvas.width = 800;
  canvas.height = 600;
  canvasContext = canvas.getContext("2d");

  const framesPerSecond = 30;

  // setInterval(drawEverything, 1000 / framesPerSecond);

  alert("press an arrow key to start the game");

  setInterval(function() {
    moveSnake();
    drawEverything();
  }, 1000 / framesPerSecond);

  // document.addEventListener("keydown", function(e) {
  //   if (e.keyCode == UP) {
  //     snakeSpeedX = 0;
  //     snakeY -= snakeSpeedY;

  //     console.log("up key");
  //   }
  // });
};

function moveSnake() {
  console.log("snake is moving");
  snakeX = snakeX + snakeSpeedX; //this function needs to be called to move the snake
  //snakeY = snakeY + snakeSpeedY; //this function needs to be called to move the snake
  // document.addEventListener("keydown", function(e) {
  //   if (e.keyCode == UP) {
  //     snakeSpeedX = 0;
  //     snakeY -= snakeSpeedY;

  //     console.log("up key");
  //   }
  // });

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

document.addEventListener("keydown", function(e) {
  if (e.keyCode == UP) {
    snakeSpeedX = 0;
    snakeY -= snakeSpeedY;

    console.log("up key");
  }
});

function gameOver() {
  clearInterval(moveSnake);
  clearInterval(drawEverything);
}

function drawEverything() {
  // console.log(snakeX);
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
