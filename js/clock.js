var clock = 0;
var prevTime = new Date();
var currTime;
var timePassed;

function flowTime() {
	currTime =  new Date();
	timePassed = currTime - prevTime;
	clock = clock + timePassed;
	prevTime = currTime;
}