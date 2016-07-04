function createGameSettings(){
	var configObject = {};
	
	
	//general gameSettings
	//screen ratio
	var sRatio = window.innerWidth/window.innerHeight;

	//game area mesurements


	//SPACESHIP SETTINGS
	// spce ship forward velocity
	var forwardVelocity = 1;
	//spaceship movement speed in units per seconds
	var moveSpeed = 3;

	var inertiaValue = 0.4;
	//ASTEROID SETTINGS
	//miliseconds between asteroid spawn
	// old value = .3
	var spawnDelay = 0.1;
	//asteroid speed in units per second
	var asteroidSpeed = 20;

	var game_area_H;
	var game_area_W;
	var game_area_D;

	var gameTimer;



	configObject.randomCoordinate = function(val){
		return val * Math.random() - (val/2);
	};

	configObject.randomSize = function(){
		return 0.2 + 2 * Math.random();
	};



	// set timer
	configObject.setTimerGameTimer = function( newTimer){
		gameTimer = newTimer;
	}

	// spaceship
	configObject.getForwardVelocity = function(){
		return forwardVelocity;
	};

	configObject.getInertiaValue = function(){
		return inertiaValue;
	};


	configObject.moveSpeed = function(){
		return moveSpeed;
	};

	//asteroid propertys
	configObject.asteroidStartPoint = function(){
		return - game_area_D/2;
	};

	configObject.screenRatio = function(){
		return sRatio;
	};

	configObject.spawnDelay = function (){
		return spawnDelay;
	};

	configObject.asteroidSpeed = function(){
		return asteroidSpeed;
	};




	// game area propertys
	// getters
	configObject.gameAreaWidth = function(){
		return game_area_W;
	};

	configObject.gameAreaHeight = function(){
		return game_area_H;
	};

	configObject.gameAreaDepth = function(){
		return game_area_D;
	};


	// setters
	configObject.setGameAreaWidth = function(width){
		game_area_W = width;
	};

	configObject.setGameAreaHeight = function(height){
		game_area_H = height;
	};

	configObject.setGameAreaDepth = function(depth){
		game_area_D = depth;
	};


	//upadate state
	configObject.updateScreenRatio = function(){
		sRatio = window.innerWidth/window.innerHeight;
	}

	// MUST REMOVE...
	configObject.test = function(){
		console.log(configObject.coordinatRandValue(12));
		console.log(configObject.sizeRandValue());
	}
	return configObject;

}
