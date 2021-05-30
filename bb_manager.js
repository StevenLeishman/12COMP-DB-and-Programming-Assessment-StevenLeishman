/**************************************************************
bb_manager.js
Written by steven leishman 2021
V1 base code from miniskills
V2 game adapted to start from button
V3 Button switchs from start to stop on click
V4 Ball shows up and move/bounce, no score/misses
V5 Multiple Balls show, disapper on click, score faulty
V6 Mr G Fixed score
V7 Timer works and game ends
V8 Game writes highscore to db
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
	//Resizes the canvas based on size of box on screen
	var elmnt = document.getElementById("d_gameArea")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameArea);

	//Changes btn text between start and stop
	var btn = document.getElementById("b_startBtn")

	if (btn.innerHTML == "Start") {
		btn.innerHTML = "Stop";
		//Start the game
		activeGame = 'bb';
		//reset scores
		bb_resetGame()

	} else {
		btn.innerHTML = "Start"
		activeGame = '';

		//stop timer
		clearInterval(bb_timer)
	}
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
	//Check the ball is being clicked
	gameCanvas.mousePressed(bb_clicked);

	// Genreal movement of the balls
	for (var i = 0; i < ballsArray.length; i++) {
		ballsArray[i].bb_movement()
		ballsArray[i].bb_bounce()
		ballsArray[i].bb_display()
	}

	// end the game 
	if (ballsArray.length <= 0) {
		bb_gameOver('Win')
	} else if (counter < 0) {
		bb_gameOver('Lose')
	}
}

/*******************************************************/
//function bb_clicked()
// Iterates over ballsArray to see if they got clicked 
// and calls bb_updateBBScores()
//Called by: draw()
//Input: N/A
//Returns: N/A
/*******************************************************/
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
	console.log(" hits: " + hits + "  misses: " + misses + "  counter: " + counter); //DIAG
	// keep the scores updated
	bb_updateBBScores()
}

/**************************************************************/
// bb_playTimer()
// called by: bb_startBtn
// Starts the timer when start button clicked
// Input: N/A
// Returns: N/A 
/**************************************************************/
function bb_playTimer() {
	counter--;
	ui_changeHTML("p_time", "Time : " + counter)
}

/**************************************************************/
// bb_resetGame()
// Called by: bb_startBtn
// Resets the scores when start button clicked
// Input: N/A
// Returns: N/A 
/**************************************************************/
function bb_resetGame() {
	console.log('bb_resetGame')
	//Reset score
	score = 0;
	hits = 0;
	misses = 0;

	//create the balls
	bb_createBall(NUMBALLS, BALLDIA)

	// Start/Reset timer
	bb_timer = setInterval(bb_playTimer, 1000);
	counter = 10;
	ui_changeHTML("p_time", "Time : " + counter)

	
	bb_gameResult.innerHTML = " h "
	console.log(bb_gameResult.innerHTML)
}

/*************************************************************************/
// bb_updateBBScores()
// Updates the text which shows score/hits/misses
// Called by: bb_clicked
// Input: 
// Output: n/a
/*************************************************************************/
function bb_updateBBScores() {
	ui_changeHTML("p_misses", "Misses : " + misses)
	ui_changeHTML("p_hits", "Hits : " + hits)

	score = (hits - misses) * (counter + 1)
	if (score < 0) {
		score = 0
	}
	ui_changeHTML("p_score", "Score : " + score)
}

/*******************************************************************/
// bb_gameOver()
// Called by: bb_draw()
// Input: result of game
// Output: 
/*************************************************************************/
function bb_gameOver(_result) {
	console.log('_result = ' + _result);
	//stop the game
	activeGame = '';

	// set users score as highscore if higher than old highscore
	if (score > userStats.highScore) {
		userStats.highScore = score;
		// Write highscores to database
		fb_writeRec(STATS, userDetails.uid, userStats);
	}
	console.log("highscore = " + userStats.highScore + "  score = " + score)

	// stop the timer
	clearInterval(bb_timer);
	counter = 0;
	ui_changeHTML("p_time", "Time : " + counter)

	// Let user know their result
	bb_gameResult.innerHTML = "You " + _result;
	bb_gameResult.style('font-size', '100px')
	bb_gameResult.position(gameCanvas.width / 2, 0)
}
/**************************************************************/
//   END OF PROG
/**************************************************************/