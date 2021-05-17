/**************************************************************
bb_manager.js
Written by steven leishman 2021
V1 base code from miniskills
V2 game adapted to start from button
V3 Button switchs from start to stop on click
V4 Balls show up and move/bounce, no score/misses
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
			bb_checkBallHit: function () {
				let rad = this.diameter / 2;
				var px2Ball = dist(this.posX, this.posY, mouseX, mouseY)

				// check if mouse is on ball
				if (px2Ball <= rad) {
					console.log("within")
					this.ballHit = true
				}
				console.log(this.ballHit)

				/*	let rad = _diameter/2
					var ballHit = false;
					for(i=0; i < ballsArray.length; i++){
						var px2Ball = dist(this.posX, this.posY, mouseX, mouseY);
						console.log("px2Ball = " + px2Ball)
						if (px2Ball <= this.rad / 2) {
							console.log('px2Ball = ' + px2Ball + "  rad = " + rad)
							ballHit = true;
							ballsArray.splice(i, 1);
						}
					}
					if (ballHit) {
						score++;
					} else {
						misses++;
					}
					*/
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
	} else {
		btn.innerHTML = "Start"
		activeGame = '';
	}

	//Resizes the canvas based on size of box on screen
	var elmnt = document.getElementById("d_gameArea")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameArea)
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
	gameCanvas.mousePressed(myFunction)
}

//Testing bb_checkBallHit - doesn't get rid off ball
function myFunction() {
	for (var i = ballsArray.length; i > 0; i--) {
		let x = i-1;
		ballsArray[x].ballHit = false
		ballsArray[x].bb_checkBallHit()
		if (ballsArray[x].ballHit == true) {
			hits++;
			ballsArray.splice(x,1)
		} else {
			misses++
		}
	}

}
/**************************************************************/
//   END OF PROG
/**************************************************************/