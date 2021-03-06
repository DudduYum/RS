"use strict";

function InterfaceManager(canvas, score){
	
//=== VARIABLES ===
	
	this.canvas = canvas;
	this.score = score;
	
	this.loadingScreen = document.getElementById("loadingScreen");
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

InterfaceManager.prototype.displayLoading = function(){
	//displays loading scren
	this.loadingScreen.style.display = "block";
	this.loadingScreen.style.zIndex = "1";
}



InterfaceManager.prototype.displayInitialScreen = function(){
	//hide loading screen
	this.loadingScreen.style.display = "none";
	this.loadingScreen.style.zIndex = "-2";
	
	//displays initial screen and spaceship
	this.initialScreen.style.display = "block";
	this.initialScreen.style.zIndex = "1";
	this.canvas.style.display = "block";
	this.canvas.style.zIndex = "0";
	this.cameraSwitch.style.display = "block";
	this.cameraSwitch.style.zIndex = "1";
}


InterfaceManager.prototype.displayGame = function(){
	//hides initial and gameover screens
	this.initialScreen.style.display = "none";
	this.initialScreen.style.zIndex = "-2";
	this.gameoverScreen.style.display = "none";
	this.gameoverScreen.style.zIndex = "-1";

	//resets the score
	this.scoreNumber.innerHTML = this.score.getScore();
	this.scoreTable.style.display = "block";
	this.scoreTable.style.zIndex = "1";
}


InterfaceManager.prototype.displayGameOver = function(){
	//hide game score
	this.scoreTable.style.display = "none";
	this.scoreTable.style.zIndex = "-1";
	
	//display game over screen
	document.getElementById("yourScore").innerHTML = "Your score is "+ this.score.getScore();
	this.gameoverScreen.style.display = "block";
	this.gameoverScreen.style.zIndex = "1";
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
