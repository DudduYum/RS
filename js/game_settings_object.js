"use strict";

function GameSettings(){

//=== VARIABLES===
	
	//general gameSettings
	//screen ratio
	this.sRatio = window.innerWidth/window.innerHeight;


	//SPACESHIP SETTINGS
	// spce ship forward velocity
	//this.forwardVelocity = 1;
	//spaceship movement speed in units per seconds
	this.normalSpeed = 5;
	this.inertia = 0.4;
	
	//ASTEROID SETTINGS
	//seconds between asteroid spawn
	this.spawnDelay = 0.1;
	//asteroid speed in units per second
	this.asteroidSpeed = 20;

	this.game_area_H;
	this.game_area_W;
	this.game_area_D;

	this.gameTimer;
	
	
	
//=== CONSTRUCTOR===

}



//=== METHODS ===

GameSettings.prototype.randomCoordinate = function(val){
	return val * Math.random() - (val/2);
}

GameSettings.prototype.randomSize = function(){
	return 0.2 + 2 * Math.random();
}


// set timer
GameSettings.prototype.setTimerGameTimer = function(newTimer){
	this.gameTimer = newTimer;
}


//asteroid properties
GameSettings.prototype.asteroidStartPoint = function(){
	return -this.game_area_D/2;
}

GameSettings.prototype.screenRatio = function(){
	return this.sRatio;
}


// game area propertys
// getters
GameSettings.prototype.gameAreaWidth = function(){
	return this.game_area_W;
}

GameSettings.prototype.gameAreaHeight = function(){
	return this.game_area_H;
}

GameSettings.prototype.gameAreaDepth = function(){
	return this.game_area_D;
}


// setters
GameSettings.prototype.setGameAreaWidth = function(width){
	this.game_area_W = width;
}

GameSettings.prototype.setGameAreaHeight = function(height){
	this.game_area_H = height;
}

GameSettings.prototype.setGameAreaDepth = function(depth){
	this.game_area_D = depth;
}


//upadate state
GameSettings.prototype.updateScreenRatio = function(){
	this.sRatio = window.innerWidth/window.innerHeight;
}
