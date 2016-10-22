"use strict";
//clock to animate the game regardless of framerate
//this allows the game to run at the same "effective speed" at any framerate

function Timer(){
	
//=== VARIABLES ===

	this.previousTime = new Date();
	this.passedTime;
	this.paused = false;
	
	
	
//=== CONSTRUCTOR===

}



//=== METHODS ===

Timer.prototype.update = function(){
	var currentTime = new Date();
	this.passedTime = currentTime - this.previousTime;
	this.previousTime = currentTime;
	if(this.paused){
		this.passedTime = 0;
	}
}


Timer.prototype.pause = function(){
	this.paused = !this.paused;
	console.log("pause");
}


Timer.prototype.reset = function(){
	this.previousTime = new Date();
}