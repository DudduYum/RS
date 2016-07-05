function createScoreCounter(timer, settings){


	//private score counter
	var gameScore;
	var preciseScore;
	var sCount = {};

	sCount.update = function(){
		//gameScore = Math.round(timer.getTime() * settings.getForwardVelocity());
		preciseScore = preciseScore + timer.passedTime();
		gameScore = Math.floor(preciseScore*10)/10;
	};

	sCount.reset = function(){
		preciseScore = 0;
		gameScore = 0;
	};

	sCount.getScore = function(){
		return gameScore;
	};

	sCount.reset();

	return sCount;

}
