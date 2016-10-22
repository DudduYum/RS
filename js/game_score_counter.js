"use strict";

function ScoreCounter(timer, settings){

//=== VARIABLES ===

	this.timer = timer;
	this.settings = settings;
	
	this.gameScore = 0;
	this.preciseScore = 0;
	
	this.difficultyMultiplier = 1;
	
//=== CONSTRUCTOR ===
}



//=== METHODS ===

ScoreCounter.prototype.update = function(){
	this.preciseScore = this.preciseScore + this.timer.passedTime;
	this.gameScore = Math.floor(this.preciseScore/1000*10)/10;
	if(this.gameScore % 5 > this.difficultyMultiplier) {
		this.difficultyMultiplier++;
		this.settings.spawnDelay -= 1;
		this.settings.asteroidSpeed += 1; 
	}
}

ScoreCounter.prototype.reset = function(){
	this.preciseScore = 0;
	this.gameScore = 0;
}

ScoreCounter.prototype.getScore = function(){
	return this.gameScore;
}
