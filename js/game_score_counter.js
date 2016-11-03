"use strict";

function ScoreCounter(timer, settingsObj){

//=== VARIABLES ===

	this.timer = timer;

	this.gameScore = 0;
	this.preciseScore = 0;

	this.settings = settingsObj;

	this.difficultyMultiplier = 1;
	this.difficultyLevel = 1;


//=== CONSTRUCTOR ===
}



//=== METHODS ===

ScoreCounter.prototype.update = function(){

	this.preciseScore = this.preciseScore + this.timer.passedTime;
	this.gameScore = Math.floor(this.preciseScore/1000*10)/10;
	if(this.gameScore % 7 == 0) {
	// if(this.gameScore % 5 > this.difficultyMultiplier) {
		// this.difficultyMultiplier++;
		// this.difficultyLevel++;
		this.settings.spawnDelay -= 0.001;
		this.settings.asteroidSpeed += 0.1;
	}
}

ScoreCounter.prototype.reset = function(){
	this.difficultyMultiplier = 1;
	this.preciseScore = 0;
	this.gameScore = 0;
}

ScoreCounter.prototype.getScore = function(){
	return this.gameScore;
}
