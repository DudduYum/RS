var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

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
 		scoreNumTab.innerHTML = gameScore;
	}
	
	requestAnimationFrame(animate);
	orbitControls.update();
	stats.update();
	render();
}


function render() {
	renderer.render(scene, camera);
}