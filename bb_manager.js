// /**************************************************************/
// // bb_manager.js
// // Written by steven leishman 2021
// /**************************************************************/
// const NUMBALLS = 5;
// var ballsArray = [];
// var velArray = [3, 4,5,6, -3, -4,-5,-6];
// var levelArray = [1, 1.5, 2.5, 4]
// var score = 0;
// var scoreText;
// var misses = 0;
// var missesText;
// /*******************************************************/
// //function setup()
// //Called by p5.js once when the program runs
// /*******************************************************/
// function setup() {
//   createCanvas(windowWidth, windowHeight);
  
//   //creates balls with the amount of balls and the diameter
//   createBall(NUMBALLS,100);

//   scoreText = createP("Score : " + score);
//   missesText = createP("Misses : " + misses)
// }

// /*******************************************************/
// //function draw()
// //Called by p5.js 60 times per second
// /*******************************************************/
// function draw() {
//   background(200, 200, 200);
//   changeText();
//   for (var i = 0; i < ballsArray.length; i++) {
//     ballsArray[i].movement()
//     ballsArray[i].bounce()
//     ballsArray[i].display()
//   }
// }

// /*******************************************************/
// //function mousePressed()
// //Called whenever the mouse is clicked
// /*******************************************************/
// function mousePressed() {
//   checkBallHit()
// }

// /*******************************************************/
// //function checkBallHit()
// //Checks if the ball is hit then adds to score and deletes
// //Called by: mousePressed()
// //Input: N/A
// //Returns: N/A
// /*******************************************************/
// function checkBallHit() {
//   var ballHit = false;
//   for (var i = 0; i < ballsArray.length; i++) {
//     var px2Ball = dist(ballsArray[i].posX, ballsArray[i].posY, mouseX, mouseY);
//     if (px2Ball <= ballsArray[i].diameter / 2) {
//       ballHit = true;
//       ballsArray.splice(i, 1);
//     }
//   }
//   if (ballHit == true) {
//     score++;
//   } else {
//     misses++;
//   }
// }
// /*******************************************************/
// //function createBall()
// //Creates the ball/s depending on _ballAmount and -_diameter
// //Called by: setup()
// //Input: _ballAmount,_diameter
// //Returns: N/A
// /*******************************************************/
// function createBall(_ballAmount,_diameter) {

//   for (var i = 0; i < _ballAmount; i++) {
//     ballsArray[i] = {
//       posX: width / 2,
//       posY: height / 2,
//       diameter: _diameter,
//       speedX: random(velArray),
//       speedY: random(velArray),
//       colR: random(0, 255),
//       colG: random(0, 255),
//       colB: random(0, 255),

//       display: function () {
//         fill(this.colR, this.colG, this.colB);
//         ellipse(this.posX, this.posY, this.diameter);
//       },
//       movement: function () {
//         //Adjusts position of the ball by the speed
//         this.posY = this.posY + this.speedY * levelArray[0];
//         this.posX = this.posX + this.speedX * levelArray[0];
//       },
//       bounce: function () {
//         let rad = this.diameter / 2;
//         //checks if the ball is off screen on X axis
//         if (this.posX >= (width - (rad))) {
//           //reverses the speeds of the balls and adjusts the position when hits the edge
//           this.speedX = this.speedX * -1;
//           this.posX = (width - (this.diameter / 2))

//           //check if balls it is off the top of the screen  
//         } else if (this.posX <= (this.diameter / 2)) {
//           //reverses the speed and adjusts the position
//           this.speedX = this.speedX * -1;
//           this.posX = this.diameter / 2;
//         }

//         //checks if ball is off screen on Y axis
//         if (this.posY >= (height - (this.diameter / 2))) {
//           //reverse the speed of the ball and adjusts the position
//           this.speedY = this.speedY * -1;
//           this.posY = height - this.diameter / 2;

//         } else if (this.posY <= this.diameter / 2) {
//           //reverse the speed of the ball and adjusts the position
//           this.speedY = this.speedY * -1;
//           this.posY = this.diameter / 2;
//         }
//       }
//     }
//   }
// }
// /*******************************************************/
// //function changeText()
// //Creates the text that shows the score and the misses
// //Called by: draw()
// //Input: N/A
// //Returns: N/A
// /*******************************************************/
// function changeText(){
//   scoreText.html("Score : " + score)
//   scoreText.position(50,50)
//   scoreText.style("font-size","25px")
//   missesText.html("Misses : " + misses)
//   missesText.position(50,75)
//   missesText.style("font-size","25px")
// }
// /*******************************************************/
// // END OF APP
// /*******************************************************/