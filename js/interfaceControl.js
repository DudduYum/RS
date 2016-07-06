"use strict";

function InterfaceManager(canvas, score){
	
//=== VARIABLES ===
	
	this.canvas = canvas;
	this.score = score;

	this.initialScreen = document.getElementById("initialScreen");
	this.gameoverScreen = document.getElementById("gameoverScreen");
	this.scoreNumber = document.getElementById("currentScore");
	this.scoreTable = document.getElementById("scoreTable");
	this.cameraSwitch = document.getElementById("cameraSwitch");


	this.freeSwitch = document.getElementById("freeCameraButton");
	this.gameSwitch = document.getElementById("gameCameraButton");

	this.activateGameCamera;
	this.activateFreeCamera;



//=== CONSTRUCTOR ===

	
}



//=== METHODS ===

InterfaceManager.prototype.displayInitalScreen = function(){
		//hides game, score and camera switch divs
		this.scoreNumber.style.display = "none";
		this.scoreTable.style.display = "none";
		this.cameraSwitch.style.display = "none";
		//displays initial screen and spaceship
		this.initialScreen.style.display = "block";
		this.canvas.style.display = "block";
}


InterfaceManager.prototype.displayGame = function(){
		//hides initial or gameover divs
		this.initialScreen.style.display = "none";
		this.gameoverScreen.style.display = "none";


		//resets the score
		this.scoreNumber.innerHTML = this.score.getScore();

		//adjusts z-indexes
		this.initialScreen.style.zIndex = "-1";
		this.gameoverScreen.style.zIndex = "-1";
		this.scoreTable.style.zIndex = "1";
		this.canvas.style.zIndex = "0";

		//display game, score and camera switch divs
		this.canvas.style.display = "block";
		this.scoreNumber.style.display = "block";
		this.scoreTable.style.display = "block";
		this.cameraSwitch.style.display = "block";
}


InterfaceManager.prototype.displayGameOver = function(){
	//adjusts z-indexes
	this.gameoverScreen.style.zIndex = "0";

	//hides game, score and camera switch divs
	this.scoreTable.style.display = "none";

	document.getElementById("yourScore").innerHTML = "Your score is "+ this.score.getScore();
	this.gameoverScreen.style.display = "block";
}


InterfaceManager.prototype.update = function(value){
	this.scoreNumber.innerHTML = this.score.getScore();
}

InterfaceManager.prototype.setCameraSwitching = function(toGame, toFree){
	this.activateGameCamera = toGame;
	this.activateFreeCamera = toFree;
}


InterfaceManager.prototype.switchToFreeCamera  = function(){
	this.gameSwitch.style.display = "block";
	this.freeSwitch.style.display = "none";

	this.activateFreeCamera();
}


InterfaceManager.prototype.switchToGameCamera = function(){
	this.gameSwitch.style.display = "none";
	this.freeSwitch.style.display = "block";

	this.activateGameCamera();
}