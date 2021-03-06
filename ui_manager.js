/*************************************************************************/
//ui_manager.js
//Written by Steven Leishman term 1 2021
//Manages everything in the interface
/*V1 function for switching pages and object for registration*/
/*V2 Canvas and balls created for pop the ball game*/
/*V3 change html function to use on login status and leaderboard and 
leaderboard button added*/
/*************************************************************************/
//constants for database paths
const DETAILS = "userDetails"
const STATS = "userStats"
const ROLES = "userRoles"

//userDetails object for database
var userDetails = {
	uid: '',
	email: '',
	name: '',
	photoURL: '',
	age: '',
	gender: '',
	phone: '',
	city: '',
	suburb: '',
	streetName: '',
	houseNumber: '',
	postalCode: '',
	bankAccount: '',
};

//userStats object for database
var userStats = {
	gameName: '',
	highScore: '',
};

var gameCanvas;

var activeGame = '';

// Variables for the ball game
const NUMBALLS = 15;
const BALLDIA = 100;
var ballsArray = [];
var velArray = [4, 5, 6, 7, -4, -5, -6,-7];
var levelArray = [1, 1.5, 2.5, 4];
var score = 0;
var misses = 0;
var hits = 0;
var counter = 10;

/*************************************************************************/
// function setup()
// called by p5.js once when program is started
/*************************************************************************/
function setup() {
	// FIREBASE SETUP 
	fb_initialise()
	fb_login(userDetails,fb_processUserLogin)	

	//Miscellaneous setup
	gameCanvas = createCanvas(0, 0);
}

/*************************************************************************/
// function draw() 
// called by p5.js 60 times per second  
/*************************************************************************/
function draw() {
	background(200,200,200)

	//When the active game is bouncing ball
	if (activeGame == 'bb') {
		//call ball draw loop
		bb_draw();
	}
}

/***********************************************/
// function windowResized() 
// called everytime the window is resized 
/*****************************************************/
function windowResized() {
	if(activeGame == "bb"){
	var elmnt = document.getElementById("d_gameArea")
	resizeCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
	}
}

/*************************************************************************/
// ui_leaderboardBtn()
// Displays the leaderboard when clicked TWICE!!!!
// Called by : leaderboard button
// Input: N/A
// Output: n/a
/*************************************************************************/
function ui_leaderboardBtn (){
	console.log("ui_leaderboardBtn")
	ui_switchScreens("s_gamePg","s_leaderPg")
	fb_createBBLeaderboard(STATS,5)
}

/*************************************************************************/
// ui_switchScreens(_hideScreen,_showScreen)
// Displays a screen and hides another
// Called by : Various buttons 
// Input: Which screen to dispay and hide
// Output: n/a
/*************************************************************************/
function ui_switchScreens(_hideScreen, _showScreen) {
	console.log("ui_switchScreens() /" + " Active Screen = " + _showScreen)
	document.getElementById(_hideScreen).style.display = "none";
	document.getElementById(_showScreen).style.display = "block";
}

/*************************************************************************/
// ui_changeHTML(_elmntID,_product)
// Changes the provided element to the product 
// Called by: various
// Input: element to change and product to change it to
// Output: n/a
/*************************************************************************/
function ui_changeHTML(_elmntID, _product) {
	document.getElementById(_elmntID).innerHTML = _product;
}
/**************************************************************/
//    END OF PROG
/**************************************************************/