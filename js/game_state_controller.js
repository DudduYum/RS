"use strict";

function GameState(startFun, stopFun){
//VARIABLES
	//true if game is running
	this.gameRunning = false;;
	//true if game is over, not just not running
	this.gameOver = false;;
	this.startAction = startFun;;
	this.stopAction = stopFun;;


//CONSTRUCTOR
}



//METHODS
GameState.prototype.isRunning = function(){
	return this.gameRunning;
};

GameState.prototype.isOver = function() {
	return this.gameOver;
}

//set to start state
GameState.prototype.startGame = function(){
	if(!this.gameRunning){
		this.gameRunning = true;
		this.gameOver = false;
		//use callBack function call
		//if(startAction != undefined){
			this.startAction();
		//}
	}		
}

//set to stop state
GameState.prototype.stopGame = function(){
	if(this.gameRunning){
		this.gameRunning = false;
		this.gameOver = true;
		//use callBack function call
		//if(stopAction != undefined){
			this.stopAction();
		//}
	} else {
		console.log("warring: game is alredy stopped!");
	}
}
