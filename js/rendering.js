generateSpaceshipColliders();

function render() {
	if(gameRunning){


		flowTime();
		moveSpaceship(timePassed);
		moveAsteroids(timePassed);
		if(clock > spawnDelay) {
 			clock = clock % spawnDelay;
 			generateAsteroid();
 			genereteAsteroidCollider();

 		}
 

 		scoreNumTab.innerHTML =  gameScore;
		cleanAsteroids();
		checkCollision();

	}
	
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}



render();