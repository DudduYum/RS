//keyboard controls
var keyPressed = [];
window.addEventListener("keydown", registerKeydown);
window.addEventListener("keyup", registerKeyup);

function registerKeydown(event) {
	if(event.keyCode != 32) {
		keyPressed[event.keyCode] = true;
	} else {

		preperForTheGame();
		gameStart();
	}
}

function registerKeyup(event) {
	keyPressed[event.keyCode] = false;
}