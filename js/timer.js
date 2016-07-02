
function createTimer(){
	//clock to animate the game regardless of framerate
	//this allows the game to run at the same "effective speed" at any framerate
	var Timer = {},
	clock ,
	prevTime,
	currTime,
	timePassed;

	(function(){
		clock = 0;
		prevTime = new Date();
	})();

	Timer.update = function(){
		currTime =  new Date();
		timePassed = currTime - prevTime;
		clock = clock + timePassed;
		prevTime = currTime;
	};

	Timer.getTime = function(){
		return clock/1000;
	};

	Timer.passedTime = function(){
		return timePassed/1000;
	};

	Timer.reset = function(){
		clock = 0;
		prevTime = new Date();
	};

	//unit tests

	Timer.updateTest = function(){
		console.log("update test")
		console.log(this.getTime());
		for(var i = 0; i< 10000 ; i++){
			this.update();
		}
		console.log(this.getTime());

	};

	Timer.initTest = function(){
		console.log("init test")
		console.log(clock);
	};


	return Timer;

}
