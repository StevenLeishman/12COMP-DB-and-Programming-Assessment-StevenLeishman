/**************************************************************
bb_manager.js
Written by steven leishman 2021
v1 base code from miniskills
v2 adapted to work from button
**************************************************************/

/*******************************************************/
//function createBall()
//Creates the ball/s depending on _ballAmount and -_diameter
//Called by: setup()
//Input: _ballAmount,_diameter
//Returns: N/A
/*******************************************************/
function bb_createBall(_ballAmount, _diameter) {
	console.log("bb_createBall(_ballAmount,-diameter)  / _ballAmount = " + 											_ballAmount + " / _diameter = " + _diameter)
	for (var i = 0; i < _ballAmount; i++) {
		ballsArray[i] = {
			posX: gameCanvas / 2,
			posY: height / 2,
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
				this.posY = this.posY + this.speedY * levelArray[0];
				this.posX = this.posX + this.speedX * levelArray[0];
			},
			bb_bounce: function () {
				let rad = this.diameter / 2;
				//checks if the ball is off screen on X axis
				if (this.posX >= (width - (rad))) {
					//reverses the speeds of the balls and adjusts the position when hits the edge
					this.speedX = this.speedX * -1;
					this.posX = (width - (this.diameter / 2))

					//check if balls it is off the top of the screen  
				} else if (this.posX <= (this.diameter / 2)) {
					//reverses the speed and adjusts the position
					this.speedX = this.speedX * -1;
					this.posX = this.diameter / 2;
				}

				//checks if ball is off screen on Y axis
				if (this.posY >= (height - (this.diameter / 2))) {
					//reverse the speed of the ball and adjusts the position
					this.speedY = this.speedY * -1;
					this.posY = height - this.diameter / 2;

				} else if (this.posY <= this.diameter / 2) {
					//reverse the speed of the ball and adjusts the position
					this.speedY = this.speedY * -1;
					this.posY = this.diameter / 2;
				}
			},
			bb_checkBallHit: function () {
				var ballHit = false;
				for (var i = 0; i < ballsArray.length; i++) {
					var px2Ball = dist(this.posX, this.posY, mouseX, mouseY);
					if (px2Ball <= this.diameter / 2) {
						console.log('px2Ball = '+ px2Ball + "  diameter = " + diameter)
						ballHit = true;
						ballsArray.splice(i, 1);
					}
				}
				if (ballHit) {
					score++;
				} else {
					misses++;
				}
			}
		}
	}
}

/*******************************************************/
//function bb_startBtn()
//Resizes Canvas to fit screen and 
//Called by: start button in s_gamePg
//Input: N/A
//Returns: N/A
/*******************************************************/
function bb_startBtn() {
	console.log("bb_startBtn")

	activeGame = 'bb';
	//Resizes the canvas based on size of box on screen
	var elmnt = document.getElementById("d_gameArea")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameArea)
}

/**************************************************************/
//   END OF PROG
/**************************************************************/