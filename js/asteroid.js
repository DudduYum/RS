var asteroidArray = [];


//asteroid apperance
var textureL = new THREE.TextureLoader(THREE.DefaultLoadingManager);
// var asteroid_material = new THREE.MeshBasicMaterial({color:0x604000, wireframe:true});
var asteroid_material;

textureL.load('textures/asteroid.jpg',
	function (texture){
		asteroid_material = new THREE.MeshBasicMaterial({map:texture});
	},
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	function ( xhr ) {
		console.log( 'An error happened while louding textures' );
	}
);

//var asteroid_texture = new THREE.TextureLoader().load('textures/asteroid.jpg');
//var asteroid_material = new THREE.MeshBasicMaterial({map: asteroid_texture});


//generate asteroids
function generateAsteroid() {		
	var size = 0.5 + 2 * Math.random();
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
	moveAsteroidColliders(time);
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


//radius to degree functions
function degInRad(deg) {
	return deg * Math.PI / 180;
}