(function () {

	let counter = 0;
  
	// Save this for later use
	const originalHTML = document.body.innerHTML;
	let messageWrapper = document.getElementById('message');



////////////////////////////////////////////////////////////////////////////////////
//////////////* PINGS*//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////







var canvas;
var canvasContext;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;

var showingWinScreen = false;

var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calculateMousePos(event) {
  var canvasRect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  //accounts for mouse coordinates - canvas coordinates - account for scrolling
  var mouseX = event.clientX - canvasRect.left - root.scrollLeft;
  var mouseY = event.clientY - canvasRect.top - root.scrollTop;

  return {
    x:mouseX,
    y:mouseY
  };
}

function handleMouseClick(event) {
  if(showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}





window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(event){
    var mousePos = calculateMousePos(event);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  })

  canvas.addEventListener('mousedown', handleMouseClick);
}



function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;

  if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
    showingWinScreen = true;
  }
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  if(paddle2YCenter < ballY-15){
    paddle2Y += 8;
  }
  else if(paddle2YCenter > ballY+15) {
    paddle2Y -= 8;
  }
}

function moveEverything() {
  if(showingWinScreen){
    return;
  }
  computerMovement();
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  console.log('ballY:' + ballY);


  if(ballX < 12){
    if((ballY < paddle1Y + PADDLE_HEIGHT) && (ballY > paddle1Y)){
      ballSpeedX = -ballSpeedX;
      ballSpeedY = -ballSpeedY;

      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    }
    else if(ballX < 0) {                    
      player2Score++; //must be before ballReset()
      ballReset();
    }
  }
  if(ballX > canvas.width - 12){
    if((ballY < paddle2Y + PADDLE_HEIGHT) && (ballY > paddle2Y)){
      ballSpeedX = -ballSpeedX;
      ballSpeedY = -ballSpeedY;

      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    }
    else if(ballX > canvas.width) {
      player1Score++;  //must be before ballReset()
      ballReset();
    }
  }

  if(ballY > canvas.height){
    ballSpeedY = -ballSpeedY;
  }
  if(ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for(var i = 0; i < canvas.height; i+=40) {
    colorRect(canvas.width/2-1, i, 2, 20, 'black');
  }
}

function drawEverything() {
  //game canvas dimensions
  colorRect(0, 0, canvas.width, canvas.height, 'white'); 

  drawNet();

  //left player paddle
  colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'magenta');
  //right player paddle
  colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'magenta');

  //draws the ball
  colorCircle(ballX, ballY, 10, 'magenta');

  //Scores
  if(showingWinScreen){
    if(player1Score >= WINNING_SCORE){
      canvasContext.fillText("You win!", 330, 175);
    }
    else if(player2Score >= WINNING_SCORE){
      canvasContext.fillText("Computer wins!", 315, 175);
    }
    canvasContext.fillText("Click to play again!", 306, 500);
    canvasContext.fillStyle('white');                
  }
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true); //(x, y, radius, radian, draw side)
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}








////////////////////////////////////////////////////////////////////////////////////
//////////////* SPACEEEEEE  SPACE STARS*//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


  document.onkeydown = function (event) {
    // Prevents the space bar from scrolling down when pressed
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }

document.onkeyup = function (event) {
    const keyCodePressed = event.keyCode;

	if (keyCodePressed===32){


		const ctx = document.querySelector("#starcanva").getContext("2d");

		function render(time) {
		  time *= 0.001;
		  resizeCanvasToDisplaySize(ctx.starcanva);
		 
		  ctx.fillStyle = "#DDE";
		  ctx.fillRect(0, 0, ctx.starcanva.width, ctx.starcanva.height);
		  ctx.save();
		 
		  const spacing = 64;
		  const size = 48;
		  const across = ctx.starcanva.width / spacing + 1;
		  const down = ctx.starcanva.height / spacing + 1;
		  const s = Math.sin(time);
		  const c = Math.cos(time);
		  for (let y = 0; y < down; ++y) {
			for (let x = 0; x < across; ++x) {
			  ctx.setTransform(c, -s, s, c, x * spacing, y * spacing);
			  ctx.strokeRect(-size / 2, -size / 2, size, size);
			}
		  }
		  
		  ctx.restore();
		  
		  requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
		
		function resizeCanvasToDisplaySize(starcanva) {
		   // look up the size the canvas is being displayed
		   const width = starcanva.clientWidth;
		   const height = starcanva.clientHeight;

		
		
		   // If it's resolution does not match change it
		   if (starcanva.innerwidth == innerwidth|| starcanva.innerheight == innerheight) {
			 starcanva.innerWidth = innerWidth;
			 starcanva.innerHeight = innerHeight;
			 return true;
		   }
		
		   return false;
		}



var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
	x = starcanva.width; // Number of stars
	
	

// Push stars to array

for (var i = 0; i < x; i++) {
  stars.push({
    x: Math.random() * starcanva.width,
    y: Math.random() * starcanva.height,
    radius: Math.random(),
    vx: Math.floor(Math.random() * 10) - 5,
    vy: Math.floor(Math.random() * 10) - 5
  });
}

// Draw the scene

function draw() {
  ctx.clearRect(0,0,starcanva.width,starcanva.height);
  
  ctx.globalCompositeOperation = "lighter";
  
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
	ctx.fill();
	

  }
}

// Update star locations

function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    s.x += s.vx / FPS;
    s.y += s.vy / FPS;
    
    if (s.x < 0 || s.x > starcanva.width) s.x = -s.x;
    if (s.y < 0 || s.y > starcanva.height) s.y = -s.y;
  }
}

// Update and draw

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
	}

	















////////////////////////////////////////////////////////////////////////////////////
//////////////* WINDOW*//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


else if (keyCodePressed === 13) {

	const degreesRotation = Math.floor(Math.random() * 180);


	const popup = document.createElement('img');
	popup.className = 'popup';
	popup.src = `img/window.png`;
	popup.style.left = `${coordinates.x}px`;
	popup.style.top = `${coordinates.y}px`;
	popup.style.transform = "translateX(+100px) translateY(-10px)"
     
	document.body.appendChild(popup);
}

counter++;
// always keeps the message on top of other elements
messageWrapper.style.zIndex = counter;
}

	const helpers = {

		removeClass: (cssClass) => {
		  if (document.body.classList.contains(cssClass)) {
			document.body.classList.remove(cssClass);
		  }
		},
	
		generateCoordinates: () => {
		  const x = Math.floor(Math.random() * window.innerWidth);
		  const y = Math.floor(Math.random() * window.innerHeight);
		  return { x, y };
		},




		

  }}());
  





function PixelOverlay() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.rectWidth = 25;
  this.rectHeight = 25;
  this.speed = 25;
  this.color = '#000000';
}

PixelOverlay.prototype.init = function() {
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext('2d');

  this.canvas.id = 'pixel-overlay';
  this.canvas.style.zIndex = 8;
  this.canvas.style.top = 0;
  this.canvas.style.left = 0;
  this.canvas.style.position = "fixed";

  document.body.appendChild(this.canvas);

  this.ctx.canvas.width  = this.width;
  this.ctx.canvas.height = this.height;
}

PixelOverlay.prototype.drawRect = function(x, y, fill) {
 this.ctx.fillStyle = fill;
 if (fill == 'clear') {
   this.ctx.clearRect(x,y, this.rectWidth, this.rectHeight)
 } else {
   this.ctx.fillRect(x, y, this.rectWidth, this.rectHeight)
 }
}

PixelOverlay.prototype.distributeRects = function(spawnX, spawnY, radius, elemCount, fill) {
  var width = this.width,
  height = this.height,
  angle = 0,
  step = (2*Math.PI) / elemCount;

  for(var i = 0; i < elemCount; i++) {
    var x = spawnX + radius * Math.cos(angle) - this.rectWidth/2;
    var y = spawnY + radius * Math.sin(angle) - this.rectHeight/2;
    this.drawRect(x, y, fill);
    angle += step;
  }
}

PixelOverlay.prototype.spawnCircle = function(x, y, fill, finishColor, callback) {
  var count = 0;
  var tempColor;
  var offset = 0.5;
  var self = this;

  function draw(timestamp, finishColor, callback) {
    if (fill == 'random') {
      tempColor = randomColor({luminosity: 'bright'})
    } else {
      tempColor = fill;
    }

    self.distributeRects(x, y, 25 * count * offset , 4 * count, tempColor)

    if (self.checkDone(finishColor)) {
      if (callback && typeof(callback) == "function") callback()
    } else {
      count++;
      requestAnimationFrame(function(timestamp) {
        draw(timestamp, finishColor, callback)
      });
    }
  }

  requestAnimationFrame(function(timestamp) {
    draw(timestamp, finishColor, callback)
  })
}

PixelOverlay.prototype.checkDone = function(finishColor) {
  var topLeftSensor = this.ctx.getImageData(0, 0, 1, 1).data.toString();
  var topRightSensor = this.ctx.getImageData(this.width - 1, 0, 1, 1).data.toString();
  var bottomRightSensor = this.ctx.getImageData(this.width - 1, this.height - 1, 1, 1).data.toString();
  var bottomLeftSensor = this.ctx.getImageData(0, this.height - 1, 1, 1).data.toString();
  var finalColor = finishColor.toString();

  if (
      topLeftSensor === finalColor &&
      topRightSensor === finalColor &&
      bottomRightSensor === finalColor &&
      bottomLeftSensor === finalColor
    ) {
    return true
  }
}

PixelOverlay.prototype.getCursorPosition = function(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return {'x': x, 'y': y};
}

PixelOverlay.prototype.destroy = function() {
  var canvas = document.getElementById('pixel-overlay');
  canvas.parentNode.removeChild(canvas);
}

PixelOverlay.prototype.open = function(e, callback) {
  var cords = this.getCursorPosition(this.canvas, e);
  var self = this;

  this.spawnCircle(cords.x, cords.y, 'random', [0,0,0,255])

  setTimeout(function() {
    self.spawnCircle(cords.x, cords.y, self.color, [0,0,0,255], callback)
  }, 100)
}

PixelOverlay.prototype.close = function(e, callback) {
  var cords = this.getCursorPosition(this.canvas, e);
  var self = this;

  this.spawnCircle(cords.x, cords.y, 'random', [0,0,0,0])

  setTimeout(function() {
    self.spawnCircle(cords.x, cords.y, 'clear', [0,0,0,0], callback)
  }, 100)
}


var overlay = new PixelOverlay();

document.getElementById("open").onclick = function(e) {
  e.preventDefault()
  overlay.init();
  overlay.open(e, function() {
    document.getElementById("close").className = 'message'
    document.getElementById("open").className = 'secret message'
  })

}

document.getElementById("close").onclick = function(e) {
  e.preventDefault()
  document.getElementById("close").className = 'secret message';
  overlay.close(e, function() {
    document.getElementById("open").className = 'message';
    overlay.destroy();
  })
};


////////////////////////////////////////////////////////////////////////////////////
//////////////* WINDOW*//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

