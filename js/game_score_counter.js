

function ScoreCounter(timer, settingsObj){

//=== VARIABLES ===

	this.timer = timer;

	this.gameScore = 0;
	this.preciseScore = 0;

	this.settings = settingsObj;
	
	this.difficultyLock = true;


//=== CONSTRUCTOR ===
}



//=== METHODS ===

ScoreCounter.prototype.update = function(){
	
	
	this.preciseScore = this.preciseScore + this.timer.passedTime;
	this.gameScore = Math.trunc((this.preciseScore/1000)*10)/10;
	if(!this.difficultyLock && this.gameScore % this.settings.difficultyIncreaseTime == 0) {
		this.difficultyLock = true;
		this.settings.increaseDifficulty();
	}
	if(this.difficultyLock && this.gameScore % this.settings.difficultyIncreaseTime == 1) {
		this.difficultyLock = false;
	}
};

ScoreCounter.prototype.reset = function(){
	this.difficultyMultiplier = 1;
	this.preciseScore = 0;
	this.gameScore = 0;
	this.difficultyLock = true;
}

ScoreCounter.prototype.getScore = function(){
	return this.gameScore;
};
