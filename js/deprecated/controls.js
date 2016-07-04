
//keyboard controls
var keyPressed = [];
window.addEventListener("keydown", registerKeydown);
window.addEventListener("keyup", registerKeyup);

function registerKeydown(event) {
	if(event.keyCode == 32) {
		// gameStart();
	} else if(event.keyCode == 67) {
		if(useGameCamera) {
			// switchToFreeCamera();
		} else {
			// switchToGameCamera();
		}
	} else {
		keyPressed[event.keyCode] = true;
	}
}

function registerKeyup(event) {
	keyPressed[event.keyCode] = false;
}
