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
	//seconds between asteroid spawn
	this.spawnDelay = 0.3;
	//asteroid speed in units per second
	this.asteroidSpeed = 20;
	this.AsteroidMinSize = 0.2;
	this.AsteroidMaxSize = 3;


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
	return - this.game_area_D/2;
}

GameSettings.prototype.asteroidSize = function(){
	return this.AsteroidMinSize + (this.AsteroidMaxSize - this.AsteroidMinSize) * Math.random();
}

GameSettings.prototype.updateRatio = function(ratio){
	this.game_area_W = this.game_area_H * ratio;
}
