//keyboard controls
window.addEventListener('keydown', handleKeyDown, false);
function handleKeyDown(event) {
	if (event.keyCode === 39) {
		spaceship.translateX(0.5);
	}
	if (event.keyCode === 37) {
		spaceship.translateX(-0.5);
	}
	if (event.keyCode === 38) {
		spaceship.translateZ(0.1);
	}
	if (event.keyCode === 40) {
		spaceship.translateZ(-0.1);
	}
}