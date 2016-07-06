"use strict";
//clock to animate the game regardless of framerate
//this allows the game to run at the same "effective speed" at any framerate

function Timer(){
	
//=== VARIABLES ===

	this.clock = 0;
	this.previousTime = new Date();;
	this.passedTime;
	
	
	
//=== CONSTRUCTOR===

}



//=== METHODS ===

Timer.prototype.update = function(){
	var currentTime =  new Date();
	this.passedTime = (currentTime - this.previousTime);
	this.clock += this.passedTime;
	this.previousTime = currentTime;
}


Timer.prototype.getTime = function(){
	return this.clock/1000;
}


Timer.prototype.reset = function(){
	this.clock = 0;
	this.previousTime = new Date();
}