var gameScore;
var gameRunning;

gameStart();

function gameStart() {
	score = 0;
	removeScreen();
	initializeClock();
	gameRunning = true;
}


function gameOver() {
	gameRunning = false;
	displayGameOver();
}