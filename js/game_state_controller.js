(function (){
	"use strict";
})();
	

function GameState(startFun, pauseFun, stopFun){

//=== VARIABLES ===

	//true if loading is complete
	this.gameCanStart = false;
	//true if game is running
	this.gameRunning = false;
	//true if game is over, not just not running
	this.gameOver = false;
	this.startAction = startFun;
	this.pauseAction = pauseFun;
	this.stopAction = stopFun;



//=== CONSTRUCTOR ===

}



//=== METHODS ===

GameState.prototype.isRunning = function(){
	return this.gameRunning;
};


GameState.prototype.isOver = function() {
	return this.gameOver;
};


//set to start state
GameState.prototype.startGame = function(){
	if(!this.gameRunning && this.gameCanStart){
		this.gameRunning = true;
		this.gameOver = false;
		this.startAction();
	}
};

//set to start state
GameState.prototype.pauseGame = function(){
	if(this.gameRunning){
		this.pauseAction();
	}
};


//set to stop state
GameState.prototype.stopGame = function(){
	if(this.gameRunning){
		this.gameRunning = false;
		this.gameOver = true;
		this.stopAction();
	} else {
		console.log("warring: game is alredy stopped!");
	}
};
