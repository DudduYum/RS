//generateSpaceshipColliders();

function animate() {
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
	
	orbitControls.update();
	requestAnimationFrame(animate);
	stats.update();
	renderer.render(scene, camera);
}


animate();