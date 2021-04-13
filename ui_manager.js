/*************************************************************************/
//ui_manager.js
//Written by Steven Leishman term 1 2021
// Manages everything in the interface
/*************************************************************************/
const DETAILS = "userDetails"
const STATS = "userStats"

var userDetails = {
  uid:      	'',
  email:    	'',
  name:				'',
  photoURL:		'',
  score:	    '',
	age:				'',
	gender:			'',
	phone:			'',
	city:				'',
	suburb:			'',
	streetName:	'',
	houseNumber:'',
	postalCode:	'',
	backAccount:'',
};

var userStats = {
	gameName: '',
	highScore:'',
	
}


var gameCanvas;
function setup() {
	gameCanvas = createCanvas(0, 0);
console.log(userDetails)
	// FIREBASE SETUP 
	fb_initialise()
}

function draw() {
	background(220);
}
/*************************************************************************/
// ui_switchScreens(_hideScreen,_showScreen)
// Displays a screen and hides another
// Input: Which screen to dispay and hide
// Output: n/a
/*************************************************************************/
function ui_switchScreens(_hideScreen, _showScreen) {
	document.getElementById(_hideScreen).style.display = "none";
	document.getElementById(_showScreen).style.display = "block";
}