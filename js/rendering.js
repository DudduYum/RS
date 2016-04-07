function render() {
	if (gameRunning) {
		flowTime();
		moveSpaceship(timePassed);
		moveAsteroids(timePassed);
		if(clock > spawnDelay) {
			clock = clock % spawnDelay;
			generateAsteroid();
		}
		cleanAsteroids();
	}
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();