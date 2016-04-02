function render() {
	spawnTick = (spawnTick + 1) % spawnFrequency;
	if(spawnTick === (spawnFrequency-1)) {
		var newAsteroid = generateAsteroid();
		asteroidArray.push(newAsteroid);
	}
	moveAsteroids();
	cleanAsteroids();
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();