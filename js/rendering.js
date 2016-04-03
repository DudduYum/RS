function render() {
	spawnTick = (spawnTick + 1) % spawnFrequency;
	if(spawnTick === (spawnFrequency-1)) {
		generateAsteroid();
	}
	moveAsteroids();
	cleanAsteroids();
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();