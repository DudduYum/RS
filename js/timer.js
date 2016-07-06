"use strict";
//clock to animate the game regardless of framerate
//this allows the game to run at the same "effective speed" at any framerate

function Timer(){
//VARIABLES
	this.clock = 0;
	this.previousTime = new Date();;
	this.timePassed;
	this.currentTimer;
	
//CONSTRUCTOR
}



//METHODS
Timer.prototype.update = function(){
	this.currentTimer =  new Date();
	this.timePassed = this.currentTimer - this.previousTime;
	this.clock += this.timePassed;
	this.previousTime = this.currentTimer;
};

Timer.prototype.getTime = function(){
	return this.clock/1000;
};

Timer.prototype.passedTime = function(){
	return this.timePassed/1000;
};

Timer.prototype.reset = function(){
	this.clock = 0;
	this.previousTime = new Date();
};

//unit tests

/*Timer.prototype.updateTest = function(){
	console.log("update test")
	console.log(this.getTime());
	for(var i = 0; i< 10000 ; i++){
		this.update();
	}
	console.log(this.getTime());

};*/

/*Timer.initTest = function(){
	console.log("init test")
	console.log(clock);
};*/