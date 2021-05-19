/**************************************************************
bb_manager.js
Written by steven leishman 2021
V1 base code from miniskills
V2 game adapted to start from button
V3 Button switchs from start to stop on click
V4 Ball shows up and move/bounce, no score/misses
V5 Multiple Balls show, disapper on click, score faulty
**************************************************************/
/*******************************************************/
//function createBall()
//Creates the ball/s depending on _ballAmount and -_diameter
//Called by: setup()
//Input: _ballAmount,_diameter
//Returns: N/A
/*******************************************************/
function bb_createBall(_ballAmount, _diameter) {
	console.log("bb_createBall(_ballAmount,-diameter)  / _ballAmount = " +
		_ballAmount + " / _diameter = " + _diameter)
	for (var i = 0; i < _ballAmount; i++) {
		ballsArray[i] = {
			ballHit: false,
			posX: gameCanvas.width / 2,
			posY: gameCanvas.height / 2,
			diameter: _diameter,
			speedX: random(velArray),
			speedY: random(velArray),
			colR: random(0, 255),
			colG: random(0, 255),
			colB: random(0, 255),

			bb_display: function () {
				fill(this.colR, this.colG, this.colB);
				ellipse(this.posX, this.posY, this.diameter);
			},

			bb_movement: function () {
				//Adjusts position of the ball by the speed
				this.posY = this.posY + this.speedY //* levelArray[0];
				this.posX = this.posX + this.speedX //* levelArray[0];
			},

			bb_bounce: function () {
				let rad = this.diameter / 2;
				//checks if the ball is off screen on X axis
				if (this.posX >= width - rad) {
					//reverses the speeds of the balls and adjusts the position when hits the edge
					this.speedX = this.speedX * -1;
					this.posX = width - rad;

					//check if balls it is off the top of the screen  
				} else if (this.posX <= rad) {
					//reverses the speed and adjusts the position
					this.speedX = this.speedX * -1;
					this.posX = rad;
				}

				//checks if ball is off screen on Y axis
				if (this.posY >= height - rad) {
					//reverse the speed of the ball and adjusts the position
					this.speedY = this.speedY * -1;
					this.posY = height - rad;

				} else if (this.posY <= rad) {
					//reverse the speed of the ball and adjusts the position
					this.speedY = this.speedY * -1;
					this.posY = rad;
				}
			},

			bb_checkBallHit: function (_i) {
				let rad = this.diameter / 2;
				var px2Ball = dist(this.posX, this.posY, mouseX, mouseY)
				// check if mouse is on ball
				if (px2Ball <= rad) {
          ballsArray.splice(_i, 1);
					this.ballHit = true;
          return true;
				}
        else {
          return false;
        }
			}
		}
	}
}

/*******************************************************/
//function bb_startBtn()
//Make Canvas to fit screen and start the game 
//Called by: start button in s_gamePg
//Input: N/A
//Returns: N/A
/*******************************************************/
function bb_startBtn() {
	console.log("bb_startBtn")

	//Changes between start and stop, which changes activeGame
	var btn = document.getElementById("b_startBtn")
	if (btn.innerHTML == "Start") {
		btn.innerHTML = "Stop";
		activeGame = 'bb';
		timer = setInterval(bb_playTimer,1000)
	} else {
		btn.innerHTML = "Start"
		activeGame = '';
		clearInterval(timer)
	}

	//Resizes the canvas based on size of box on screen
	var elmnt = document.getElementById("d_gameArea")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameArea);

  gameCanvas.mousePressed(bb_clicked);
}

/*******************************************************/
//function bb_draw()
//Calls all the functions that would normally be called by draw
// only works when start button is clicked
//Called by: draw()
//Input: N/A
//Returns: N/A
/*******************************************************/
function bb_draw() {
	for (var i = 0; i < ballsArray.length; i++) {
		ballsArray[i].bb_movement()
		ballsArray[i].bb_bounce()
		ballsArray[i].bb_display()
	}
  
}

//Testing bb_checkBallHit - doesn't get rid off ball
function bb_clicked() {
  var ballHit = false;
  for (var i = 0; i < ballsArray.length; i++) {
		result = ballsArray[i].bb_checkBallHit(i);
		 if (result == true) {
			hits++;
      ballHit = true;
		} 
  }
  if (ballHit == false) {
    misses++;
  }
  console.log(" hits: " + hits + "  misses: " + misses); //DIAG
}
/**************************************************************/
function bb_playTimer(){
	ui_changeHTML("p_time","Time = " + counter)
	counter--;
}

/**************************************************************/
//   END OF PROG
/**************************************************************/