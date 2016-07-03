function createInterfaceManager( ScoreCTRL ){
	var interfaceManager = {};

	var initialScreen = document.getElementById("initialScreen");
	var gameoverScreen = document.getElementById("gameoverScreen");
	var scoreNumber = document.getElementById("currentScore");
	var scoreTable = document.getElementById("scoreTable");
	var cameraSwitch = document.getElementById("cameraSwitch");


	var freeSwitch = document.getElementById("freeCameraButton");
	var gameSwitch = document.getElementById("gameCameraButton");

	var activateGameCamera = undefined;
	var activateFreeCamera = undefined;

	interfaceManager.displayInitalScreen = function(){
		{
			//hides game, score and camera switch divs
			scoreNumber.style.display = "none";
			scoreTable.style.display = "none";
			cameraSwitch.style.display = "none";
			//displays initial screen and spaceship
			initialScreen.style.display = "block";
			canvas.style.display = "block";
		}
	}

	interfaceManager.displayGame = function(){
		//hides initial or gameover divs
		initialScreen.style.display = "none";
		gameoverScreen.style.display = "none";


		//resets the score
		scoreNumber.innerHTML = ScoreCTRL.getScore();

		//adjusts z-indexes
		initialScreen.style.zIndex = "-1";
		gameoverScreen.style.zIndex = "-1";
		scoreTable.style.zIndex = "1";
		canvas.style.zIndex = "0";

		//display game, score and camera switch divs
		canvas.style.display = "block";
		scoreNumber.style.display = "block";
		scoreTable.style.display = "block";
		cameraSwitch.style.display = "block";
	};

	interfaceManager.displayGameOver = function(){
		//adjusts z-indexes
		gameoverScreen.style.zIndex = "0";

		//hides game, score and camera switch divs
		scoreTable.style.display = "none";

		document.getElementById("yourScore").innerHTML = "Your score is "+ ScoreCTRL.getScore();
		gameoverScreen.style.display = "block";
	};

	// interfaceManager.setScoreCTRL = function( scoreMng ){
	//   ScoreCTRL = scoreMng;
	// }

	interfaceManager.update = function(value){
		scoreNumber.innerHTML = ScoreCTRL.getScore();
	};

	interfaceManager.setCameraSwitchs = function( toGame, toFree){
		activateGameCamera = toGame;
		activateFreeCamera = toFree;
	}

	interfaceManager.switchToFreeCamera  = function(){

		gameSwitch.style.display = "block";
		freeSwitch.style.display = "none";

		if (activateFreeCamera != undefined) {
			activateFreeCamera();
		}
	};

	interfaceManager.switchToGameCamera = function(){

		gameSwitch.style.display = "none";
		freeSwitch.style.display = "block";

		if (activateGameCamera != undefined) {
			activateGameCamera();
		}
	};

	// interfaceManager. = function(){
	//
	// }

	return interfaceManager;
}
