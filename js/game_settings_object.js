"use strict";

function GameSettings(width, height, depth, aspectRatio){

//=== VARIABLES===


	this.game_area_H = height;
	this.game_area_W = width * aspectRatio;
	this.game_area_D = depth;
	
	this.difficultyLevel = 0;
	this.maxDifficulty = 15;

	//SPACESHIP SETTINGS
	this.normalSpeed = 5;
	this.inertia = 0.4;

	//ASTEROID SETTINGS
	//seconds between asteroid spawn
	this.initialSpawnDelay = 0.3;
	this.spawnDelay = 0.3;
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
	// return - this.game_area_D/2;
	return - (7 * this.game_area_D/8);
}

GameSettings.prototype.asteroidSize = function(){
	return this.asteroidMinSize + (this.asteroidMaxSize - this.asteroidMinSize) * Math.random();
}

GameSettings.prototype.updateRatio = function(ratio){
	this.game_area_W = this.game_area_H * ratio;

}

GameSettings.prototype.increaseDifficulty = function(){
	if(this.difficultyLevel < this.maxDifficulty) {
		this.spawnDelay -= 0.02;
		this.asteroidSpeed += 1;
		this.difficultyLevel += 1;
	}
}

GameSettings.prototype.reset = function(){
	this.spawnDelay = this.initialSpawnDelay;
	this.asteroidSpeed = this.initialAsteroidSpeed;
	this.difficultyLevel = 0;
}
