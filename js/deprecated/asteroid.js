var asteroidArray = [];
var asteroidColliderArray = [];

//asteroid apperance
var asteroid_texture = new THREE.TextureLoader().load('textures/asteroid.jpg');
var asteroid_material = new THREE.MeshPhongMaterial({map: asteroid_texture});



function getAsteroidMaterial(){
	var vs = document.getElementById("vertex").textContent;
	var fs = document.getElementById("fragment").textContent;
	var material = THREE.ShaderMaterial( {

		vertexShader: vs,
		fragmentShader: fs
	});

	return meterial;
}

console.log(getAsteroidMaterial());

//generate asteroids
function generateAsteroid() {
	var size = 0.5 + 2 * Math.random();
	var posX = -(areaWidth/2) + areaWidth * Math.random();
	var posY = -(areaHeight/2) + areaHeight * Math.random();

	var asteroid_geometry = new THREE.SphereGeometry(size);
	var asteroid = new THREE.Mesh(asteroid_geometry, asteroid_material);
	asteroid.position.set(posX, posY, -areaDepth/2);
	asteroidArray.push(asteroid);
	var asteroidCollider = asteroid.geometry.boundingSphere.clone();
	asteroidCollider.center.set(asteroid.position.x, asteroid.position.y, asteroid.position.z);
	asteroidColliderArray.push(asteroidCollider);
	game.add(asteroid);
}

//move asteroids towards spaceship
//input: time passed since last movement
function moveAsteroids(time) {
	for(var i=0;i<asteroidArray.length;i++) {
		asteroidArray[i].translateZ(time/1000 * asteroidSpeed);
		asteroidColliderArray[i].translate(new THREE.Vector3(0,0,time/1000 * asteroidSpeed));
	}
}

//remove asteroids out of game
function cleanAsteroids() {
	for(var i=0;i<asteroidArray.length;i++) {
		var asteroidPosition = new THREE.Vector3().setFromMatrixPosition(asteroidArray[i].matrix);
		if(asteroidPosition.z >= areaDepth/2 + 5) {
			scene.remove(new THREE.Object3D().add(asteroidArray[i]));
			//remove asteroid from asteroidArray
			asteroidArray.splice(i,1);
			//remove collider
			asteroidColliderArray.splice(i,1);
			gameScore++;
		}
	}
}

//remove all asteroids
function resetAsteroids() {
	for(var i=0;i<asteroidArray.length;i++) {
		var asteroidPosition = new THREE.Vector3().setFromMatrixPosition(asteroidArray[i].matrix);
		scene.remove(new THREE.Object3D().add(asteroidArray[i]));
	}
	asteroidArray = [];
	asteroidColliderArray = [];
}
