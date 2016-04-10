animate();

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
	
	requestAnimationFrame(animate);
	orbitControls.update();
	stats.update();
	render();
}


function render() {
	renderer.render(scene, camera);
}