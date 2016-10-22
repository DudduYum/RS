"use strict";

function GameSettings(width, height, depth, aspectRatio){

//=== VARIABLES===


	this.game_area_H = height;
	this.game_area_W = width * aspectRatio;
	this.game_area_D = depth;

	//SPACESHIP SETTINGS
	this.normalSpeed = 5;
	this.inertia = 0.4;

	//ASTEROID SETTINGS
	//miliseconds between asteroid spawn
	this.initialSpawnDelay = 300;
	this.spawnDelay = 300;
	//asteroid speed in units per second
	this.initialAsteroidSpeed = 20;
	this.asteroidSpeed = 20;
	this.asteroidMinSize = 0.2;
	this.asteroidMaxSize = 3;


//=== CONSTRUCTOR===

}



//=== METHODS ===

GameSettings.prototype.asteroid_spawn_X = function(){
	return this.game_area_W * 2 * Math.random() - this.game_area_W;
}

GameSettings.prototype.asteroid_spawn_Y = function(){
	return this.game_area_H * 2 * Math.random() - this.game_area_H;
}

GameSettings.prototype.asteroid_spawn_Z = function(){
	return - (7 * this.game_area_D/8);
}

GameSettings.prototype.asteroidSize = function(){
	return this.asteroidMinSize + (this.asteroidMaxSize - this.asteroidMinSize) * Math.random();
}

GameSettings.prototype.updateRatio = function(ratio){
	this.game_area_W = this.game_area_H * ratio;
}

GameSettings.prototype.reset = function(){
	this.spawnDelay = this.initialSpawnDelay;
	this.asteroidSpeed = this.initialAsteroidSpeed;
}
