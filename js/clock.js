//clock to animate the game regardless of framerate
var clock;
var prevTime;
var currTime;
var timePassed;

function initializeClock() {
	clock = 0;
	prevTime =  new Date();
}

function flowTime() {
	currTime =  new Date();
	timePassed = currTime - prevTime;
	clock = clock + timePassed;
	prevTime = currTime;
}