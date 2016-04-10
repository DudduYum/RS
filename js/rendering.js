animate();

//animation loop
//invokes the methods for time flowing, spaceship and asteroid movement and so on
function animate() {
	if(gameRunning){
		flowTime();
		moveSpaceship(timePassed);
		moveAsteroids(timePassed);
		checkCollision();
		cleanAsteroids();
		if(clock > spawnDelay) {
 			clock = clock % spawnDelay;
 			generateAsteroid();
 		}
 		scoreNumber.innerHTML = gameScore;
	}
	requestAnimationFrame(animate);
	orbitControls.update();
	stats.update();
	render();
}

//renders from different cameras
function render() {
	if(useGameCamera){
		renderer.render(scene, gameCamera);
	} else {
		renderer.render(scene, freeCamera);
	}
}