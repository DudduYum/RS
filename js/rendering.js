generateSpaceshipColliders();

// var geo = new THREE.SphereGeometry(spaceshipFrontSize,8,8);
// var mat = new THREE.MeshBasicMaterial({color:0xff0000});
// var mesh = new THREE.Mesh(geo, mat);
// mesh.position.z = spaceship.position.z + game.position.z - ( (spaceshipFrontSize/2+spaceshipBodySize+spaceshipBackSize)* spaceshipLength) ;


// var geo1 = new THREE.SphereGeometry(spaceshipFrontSize,8,8);
// var mat1 = new THREE.MeshBasicMaterial({color:0x00ff00});
// var mesh1 = new THREE.Mesh(geo1, mat1);
// mesh1.position.z = spaceship.position.z + game.position.z - ( (spaceshipBodySize/2+spaceshipBackSize)* spaceshipLength) ;

// var geo2 = new THREE.SphereGeometry(spaceshipFrontSize,8,8);
// var mat2 = new THREE.MeshBasicMaterial({color:0x0000ff});
// var mesh2 = new THREE.Mesh(geo2, mat2);
// mesh2.position.z = spaceship.position.z + game.position.z - ( (+spaceshipBackSize/2)* spaceshipLength) ;


// scene.add(mesh);
// scene.add(mesh1);
// scene.add(mesh2);



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
		cleanAsteroids();
	}
	checkCollision();
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();