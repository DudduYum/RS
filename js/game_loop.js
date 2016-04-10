displayInitalScreen();

//starts the game by calling all initializing functions
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

//stops game execution
function gameOver() {
	gameRunning = false;
	displayGameOver();
}