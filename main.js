(function() {
  const DEBUG = false;

  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  const LEFT = 37;

  let snake = [{ x: 100, y: 100 }];

  let snakeSpeedX = 0;
  let snakeSpeedY = 0;

  let fps = 10;

  let score = 0;
  const canvasColumn = 40;
  const canvasRow = 30;
  const gridSquareWidth = 20;
  const gridSquareHeight = 20;
  let grid = [];

  for (c = 0; c < canvasColumn; c++) {
    grid[c] = [];
    for (r = 0; r < canvasRow; r++) {
      grid[c][r] = { x: 0, y: 0 };
    }
  }

  let randomX = gridSquareWidth * Math.floor(Math.random() * canvasColumn);
  let randomY = gridSquareHeight * Math.floor(Math.random() * canvasRow);

  let keyDirectionUp = true;
  let keyDirectionRight = true;
  let keyDirectionDown = true;
  let keyDirectionLeft = true;

  document.addEventListener("keydown", function(e) {
    if (e.keyCode == UP) {
      if (keyDirectionUp == true) {
        snakeSpeedX = 0;
        snakeSpeedY = 20;
        keyDirectionDown = false;
        keyDirectionRight = true;
        keyDirectionLeft = true;
      }
    }
    if (e.keyCode == RIGHT) {
      if (keyDirectionRight == true) {
        snakeSpeedY = 0;
        snakeSpeedX = 20;
        keyDirectionLeft = false;
        keyDirectionUp = true;
        keyDirectionDown = true;
      }
    }
    if (e.keyCode == DOWN) {
      if (keyDirectionDown == true) {
        snakeSpeedX = 0;
        snakeSpeedY = -20;
        keyDirectionUp = false;
        keyDirectionRight = true;
        keyDirectionLeft = true;
      }
    }
    if (e.keyCode == LEFT) {
      if (keyDirectionLeft == true) {
        snakeSpeedY = 0;
        snakeSpeedX = -20;
        keyDirectionRight = false;
        keyDirectionUp = true;
        keyDirectionDown = true;
      }
    }
  });

  window.onload = function() {
    setInterval(function() {
      requestAnimationFrame(drawEverything);
    }, 1000 / fps);
  };

  function drawCanvas() {
    canvas = document.querySelector("#gameCanvas");
    canvas.width = 800;
    canvas.height = 600;
    canvasContext = canvas.getContext("2d");
    colorRect(0, 0, canvas.width, canvas.height, "black");
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
        canvasContext.closePath();
      }
    }
  }

  function moveSnake() {
    let snakeCopy = [];

    snake.forEach(bodyPart => {
      snakeCopy.push({ x: bodyPart.x, y: bodyPart.y });
    });

    for (i = 0; i < snake.length; i++) {
      if (i == 0) {
        snake[i].y -= snakeSpeedY;
        snake[i].x += snakeSpeedX;
      } else {
        snake[i].y = snakeCopy[i - 1].y;
        snake[i].x = snakeCopy[i - 1].x;
      }
      colorRect(snake[i].x, snake[i].y, 20, 20, "green", "white");
    }

    for (i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        gameOver();
      }
    }

    if (snake[0].x > canvas.width - 20) {
      gameOver();
    }
    if (snake[0].x < 0) {
      gameOver();
    }
    if (snake[0].y > canvas.height - 20) {
      gameOver();
    }
    if (snake[0].y < 0) {
      gameOver();
    }

    if (snake[0].x === randomX && snake[0].y === randomY) {
      console.log("score", score);
      score++;
      newApple();
      snake.push({ x: snake.x, y: snake.y });
    }
  }

  function newApple() {
    randomX = gridSquareWidth * Math.floor(Math.random() * canvasColumn);
    randomY = gridSquareHeight * Math.floor(Math.random() * canvasRow);

    snake.forEach(bodyPart => {
      if (randomX !== bodyPart.x && randomY !== bodyPart.y) {
        colorRect(randomX, randomY, 20, 20, "red");
      } else if (randomX == bodyPart.x && randomY == bodyPart.y) {
        randomX = gridSquareWidth * Math.floor(Math.random() * canvasColumn);
        randomY = gridSquareHeight * Math.floor(Math.random() * canvasRow);
      }
    });
  }

  function gameOver() {
    document.location.reload();
    alert("you died :(");
  }

  function drawEverything() {
    canvas = document.querySelector("#gameCanvas");
    canvas.width = 800;
    canvas.height = 600;
    canvasContext = canvas.getContext("2d");

    drawCanvas();
    drawGrid();
    moveSnake();
    drawScore();
    apple = colorRect(randomX, randomY, 20, 20, "red");
  }

  function drawScore() {
    canvasContext.font = "16px arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, 360, 20);
  }

  //fills in color for everything
  function colorRect(leftX, topy, width, height, drawColor, strokeColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.strokeStyle = strokeColor;
    canvasContext.strokeRect(leftX, topy, width, height);
    canvasContext.fillRect(leftX, topy, width, height);
  }
})();
