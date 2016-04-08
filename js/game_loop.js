var gameScore;
var gameRunning = false;

//gameStart();

function gameStart() {
	if(!gameRunning) {
		gameScore = 0;
		removeScreen();
		resetAsteroids();
		initializeSpaceshipPosition();
		initializeClock();
		gameRunning = true;
	}
}


function gameOver() {
	gameRunning = false;
	displayGameOver();
}