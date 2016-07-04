// TODO
// some function must be passed as arguments, it's the best
// I can do right now

function createGameState(startFun, stopFun){
	//true if game is running righ now
	var gameRunning = false;
	var gameOver = false;

	// i blochi che vengono chiamati dalla
	var startAction = startFun;
	var stopAction = stopFun;
	var gameControl = {};

	//constructor


	// getter
	gameControl.isRunning = function(){
		return gameRunning;
	};
	
	gameControl.isOver = function() {
		return gameOver;
	}

	//setters
	//set to start state and
	//execute some call back function
	gameControl.startGame = function(){
		if(!gameRunning){
			gameRunning = true;
			gameOver = false;
			//use callBack function call
			if(startAction != undefined){
				startAction();
			}
		}		
	}

	//set to stop state and
	//execute some call back function
	gameControl.stopGame = function(){
		if(gameRunning){
			gameRunning = false;
			gameOver = true;
			//use callBack function call
			if(stopAction != undefined){
				stopAction();
			}
		} else {
			console.log("warring: game is alredy stopped!");
		}
	}



	//init :)
	// gameControl.stop();

	// unit tests
	gameControl.testInit = function(){
		console.log(startAction);
		console.log(stopAction);
	};



	return gameControl;

}
