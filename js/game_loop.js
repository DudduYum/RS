displayInitalScreen();

function gameStart() {	
	if(!gameRunning) {
		gameScore = 0;
		resetAsteroids();
		initializeSpaceshipPosition();
		initializeClock();
		displayGame();
		gameRunning = true;
	}
}


function gameOver() {
	gameRunning = false;
	displayGameOver();
}