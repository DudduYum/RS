"use strict";

function GameSettings(width, height, depth, aspectRatio){

//=== VARIABLES===


	this.game_area_H = height;
	this.game_area_W = width * aspectRatio;
	this.game_area_D = depth;
	
	this.difficultyLevel = -1;
	this.maxDifficulty = 12;
	this.difficultyTimer = 5;

	//SPACESHIP SETTINGS
	this.standardSpaceshipSpeed = 5;
	this.adjustedSpaceshipSpeed = this.standardSpaceshipSpeed * 0.707;
	this.spaceshipInertia = 0.4;
	this.inertialSpaceshipSpeed = this.standardSpaceshipSpeed * this.spaceshipInertia;

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
	return this.game_area_W * 3 * Math.random() - (3/2 * this.game_area_W);
}

GameSettings.prototype.asteroid_spawn_Y = function(){
	return this.game_area_H * 3 * Math.random() - (3/2 * this.game_area_H);
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

GameSettings.prototype.increaseDifficulty = function(){
	if(this.difficultyLevel < this.maxDifficulty) {
		this.difficultyLevel += 1;
		this.spawnDelay -= 0.02;
		this.asteroidSpeed += 1;
		console.log("difficulty: " + this.difficultyLevel);
	}
}

GameSettings.prototype.reset = function(){
	this.spawnDelay = this.initialSpawnDelay;
	this.asteroidSpeed = this.initialAsteroidSpeed;
	this.difficultyLevel = -1;
}
