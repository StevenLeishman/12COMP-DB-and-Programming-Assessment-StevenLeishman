/*************************************************************************/
//ui_manager.js
//Written by Steven Leishman term 1 2021
// Manages everything in the interface
/*************************************************************************/
const DETAILS = "userDetails"
const STATS = "userStats"

//userDetails object for database
var userDetails = {
  uid:      	'',
  email:    	'',
  name:				'',
  photoURL:		'',
	age:				'',
	gender:			'',
	phone:			'',
	city:				'',
	suburb:			'',
	streetName:	'',
	houseNumber:'',
	postalCode:	'',
	bankAccount:'',
};

//userStats object for database
var userStats = {
	gameName: '',
	highScore:'',
	
}

var gameCanvas;

var activeGame = '';

const NUMBALLS = 5;
const BALLDIA = 50;
var ballsArray = [];
var velArray = [3, 4, 5, 6, -3, -4, -5, -6];
var levelArray = [1, 1.5, 2.5, 4]
var score = 0;
var scoreText;
var misses = 0;
var missesText;

/*************************************************************************/
// function setup()
// called by p5.js once when program is started
/*************************************************************************/
function setup() {
	
	//Miscellaneous setup
	gameCanvas = createCanvas(0, 0);

	// FIREBASE SETUP 
	fb_initialise()

	//bb set up 
	bb_createBall(NUMBALLS,BALLDIA)

}

/*************************************************************************/
// function draw() 
// called by p5.js 60 times per second  
/*************************************************************************/
function draw() {
	background(220);

	if(activeGame == 'bb'){
	
		for (var i = 0; i < ballsArray.length; i++) {
    	ballsArray[i].bb_movement()
    	ballsArray[i].bb_bounce()
    	ballsArray[i].bb_display()
  }
	}
}

/***********************************************/
// function windowResized() 
// called everytime the window is resized 
/*****************************************************/
function windowResized(){
	var elmnt = document.getElementById("d_gameArea")
  resizeCanvas(elmnt.offsetWidth,elmnt.offsetHeight);
}

/*************************************************************************/
// ui_switchScreens(_hideScreen,_showScreen)
// Displays a screen and hides another
// Input: Which screen to dispay and hide
// Output: n/a
/*************************************************************************/
function ui_switchScreens(_hideScreen, _showScreen) {
	console.log("ui_switchScreens() /" + " Active Screen = " + _showScreen )

	document.getElementById(_hideScreen).style.display = "none";
	document.getElementById(_showScreen).style.display = "block";
}

/**************************************************************/
//    END OF PROG
/**************************************************************/