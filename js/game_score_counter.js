"use strict";

function ScoreCounter(timer){

//=== VARIABLES ===

	this.timer = timer;
	
	this.gameScore = 0;
	this.preciseScore = 0;
	
//=== CONSTRUCTOR ===
}



//=== METHODS ===

ScoreCounter.prototype.update = function(){
	this.preciseScore = this.preciseScore + this.timer.passedTime;
	this.gameScore = Math.floor(this.preciseScore/1000*10)/10;
}

ScoreCounter.prototype.reset = function(){
	this.preciseScore = 0;
	this.gameScore = 0;
}

ScoreCounter.prototype.getScore = function(){
	return this.gameScore;
}
