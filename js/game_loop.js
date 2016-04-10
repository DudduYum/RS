//displayInitalScreen();


function gameStart() {
	// startMenu.style.display = "none";
	// renderer.domElement.style.display = "block";
	// document.body.style.background = "red";
	// backColor.style.opacity = "1";

	if(!gameRunning) {
		// startMenu.style.display = "none";
		// renderer.domElement.style.display = "block";
		// document.body.style.background = "red";
		// backColor.style.opacity = "1";
		//preperForTheGame()

		gameScore = 0;
		//removeScreen();
		resetAsteroids();
		initializeSpaceshipPosition();
		initializeClock();
		gameRunning = true;
	}
}


function gameOver() {
	//"remove" score bar
	

	//styles
	//endMenu.style.display = "block";
	//renderer.domElement.style.display = "none";
	//backColor.style.opacity = "0.8";
	//endMenu.style.opacity = "1";
	// document.getElementById("YourScore").value = "Your score is "+ gameScore;
	// put score in the right place
	// document.getElementById("YourScore").innerHTML = "Your score is "+ gameScore;


	gameRunning = false;
	//displayGameOver();
}