animate();

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
 			genereteAsteroidCollider();
 		}
 		scoreNumber.innerHTML = gameScore;
	}
	
	requestAnimationFrame(animate);
	orbitControls.update();
	stats.update();
	render();
}


function render() {
	if(useGameCamera){
		renderer.render(scene, gameCamera);
	} else {
		renderer.render(scene, freeCamera);
	}
}

orbitControls.addEventListener( 'change', render );