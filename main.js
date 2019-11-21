let canvas;
let canvasContext;

let snakeX = 100;
let snakeY;

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

function moveSnake() {
  snakeX = snakeX + 5; //this function needs to be called to move the snake

  if (snakeX > canvas.width) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(moveSnake());
  clearInterval(drawEverything()); //last thing working on
}

function drawEverything() {
  console.log(snakeX);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(600, 390, 15, 15);
  canvasContext.fillStyle = "gray"; // snake on top
  canvasContext.fillRect(snakeX, 300, 15, 15);
}
