//GAME SCENE
var game = new THREE.Object3D();
game.position.set(0,0,-25);
game.rotation.y = degInRad(30);

//ASTEROID SPAWN SETTINGS
var spawnFrequency = 30;
var asteroidSpeed = 0.1;
var spawnTick = 0;
var asteroidArray = [];


//playable zone
var areaWidth = 16;
var areaHeight = 9;
var areaDepth = 30;
var gameArea_geometry = new THREE.BoxGeometry(areaWidth, areaHeight, areaDepth);
var gameArea_material = new THREE.MeshBasicMaterial({wireframe:true});
var gameArea = new THREE.Mesh(gameArea_geometry, gameArea_material);
game.add(gameArea);


//basic spaceship
var spaceshipRadius = 1;
var spaceshipLength = 3;
var spaceship_geometry = new THREE.CylinderGeometry(spaceshipRadius/2, spaceshipRadius, spaceshipLength);
var spaceship_material = new THREE.MeshBasicMaterial({color:0x303060});
var spaceship = new THREE.Mesh(spaceship_geometry, spaceship_material);
game.add(spaceship);
spaceship.position.set(0,0,areaDepth/2-spaceshipLength/2);
spaceship.rotation.x = degInRad(-90);


//basic asteroid
var asteroid_material = new THREE.MeshBasicMaterial({color:0x5f3f00, wireframe:true});

//generate asteroids
function generateAsteroid() {		
	var size = 4 * Math.random();
	var posX = areaWidth * Math.random();
	var posY = areaHeight * Math.random();

	var asteroid_geometry = new THREE.SphereGeometry(size);
	var asteroid = new THREE.Mesh(asteroid_geometry, asteroid_material);
	asteroid.position.set(posX, posY, -areaDepth/2);
	asteroidArray.push(asteroid);
	game.add(asteroid);
}

//move asteroids towards spaceship
function moveAsteroids() {
	for(var i=0;i<asteroidArray.length;i++) {
		asteroidArray[i].translateZ(asteroidSpeed);
	}
}

//remove asteroids out of game
function cleanAsteroids() {
	for(var i=0;i<asteroidArray.length;i++) {
		var asteroidPosition = new THREE.Vector3().setFromMatrixPosition(asteroidArray[i].matrix);
		if(asteroidPosition.z === areaDepth/2) {
			scene.remove(new THREE.Object3D().add(asteroidArray[i]));
		}
	}
}



//radius to degree functions
function degInRad(deg) {
	return deg * Math.PI / 180;
}