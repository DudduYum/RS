//ASTEROID SPAWN SETTINGS
//miliseconds between asteroid spawn
var spawnDelay = 1500;
//asteroid speed in units per second
var asteroidSpeed = 3;
var asteroidArray = [];


//basic asteroid
var asteroid_material = new THREE.MeshBasicMaterial({color:0x5f3f00, wireframe:true});

//generate asteroids
function generateAsteroid() {		
	var size = 1 + 2 * Math.random();
	var posX = -(areaWidth/2) + areaWidth * Math.random();
	var posY = -(areaHeight/2) + areaHeight * Math.random();

	var asteroid_geometry = new THREE.SphereGeometry(size);
	var asteroid = new THREE.Mesh(asteroid_geometry, asteroid_material);
	asteroid.position.set(posX, posY, -areaDepth/2);
	asteroidArray.push(asteroid);
	game.add(asteroid);
}

//move asteroids towards spaceship
//input: time passed since last movement
function moveAsteroids(time) {
	for(var i=0;i<asteroidArray.length;i++) {
		asteroidArray[i].translateZ(time/1000 * asteroidSpeed);
	}
}

//remove asteroids out of game
function cleanAsteroids() {
	for(var i=0;i<asteroidArray.length;i++) {
		var asteroidPosition = new THREE.Vector3().setFromMatrixPosition(asteroidArray[i].matrix);
		if(asteroidPosition.z >= areaDepth/2 + 5) {
			scene.remove(new THREE.Object3D().add(asteroidArray[i]));
		}
	}
}



//radius to degree functions
function degInRad(deg) {
	return deg * Math.PI / 180;
}