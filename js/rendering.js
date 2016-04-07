function render() {
	flowTime();
	moveSpaceship(timePassed);
	moveAsteroids(timePassed);
	moveAsteroidColliders(timePassed);
	if(clock > spawnDelay) {
		clock = clock % spawnDelay;
		generateAsteroid();
		genereteAsteroidCollider();
	}
	cleanAsteroids();

	checkCollision();
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();