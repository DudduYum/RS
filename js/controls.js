//keyboard controls
var keyPressed = [];
window.addEventListener("keydown", registerKeydown);
window.addEventListener("keyup", registerKeyup);

function registerKeydown(event) {
	keyPressed[event.keyCode] = true;
}

function registerKeyup(event) {
	keyPressed[event.keyCode] = false;	
}