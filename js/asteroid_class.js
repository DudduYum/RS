"use strict";

function createAsteroid(settingsObject, materialManager, timer){

	// var AsteroidMaterial = materialManager.asteroidMaterial();

	var asteroid = {};


	// create asteroidMesh
	var geom = new THREE.SphereGeometry(1, 32, 32);


	var mat = materialManager.getAsteroidMaterial();

	// console.log(mat.map);
	// mat.needsinitialize = true;

	// console.log(mat);

	// define propertys and behavior

	//public methods
	var asteroidMesh = new THREE.Mesh(geom , mat);

	var previousTime;

	var collider = asteroidMesh.geometry.boundingSphere.clone();




	// define propertys and behavior

	//public methods

	asteroid.asteroidMesh = function(){
		return asteroidMesh;
	};

	asteroid.move = function(time){
		// move quantity
		var step = timer.passedTime()  * settingsObject.asteroidSpeed() ;
		// move asteroidMesh and collider
		asteroidMesh.translateZ(step);
		collider.center.setZ(asteroidMesh.position.z);
	};

	asteroid.hasCrossedTheLine = function(){
		return asteroidMesh.position.z >= 1;
		//return asteroidMesh.position.z >= settingsObject.gameAreaDepth() / 2;
	};

	asteroid.initialize = function(){
		//reset timestamp
		previousTime = timer.getTime();

		//reset position
		asteroidMesh.position.set(
			settingsObject.randomCoordinate(settingsObject.gameAreaWidth()*2),  //X
			settingsObject.randomCoordinate(settingsObject.gameAreaHeight()*2),  //Y
			settingsObject.asteroidStartPoint()
		);

		// rescale asteroidMesh
		var size = settingsObject.randomSize();
		asteroidMesh.scale.x = size;
		asteroidMesh.scale.y = size;
		asteroidMesh.scale.z = size;

		//initialize collider
		collider.center.set(asteroidMesh.position.x, asteroidMesh.position.y, asteroidMesh.position.z);
		collider.radius = size;
	};

	asteroid.isCollidingWith = function(sphere){
		return collider.intersectsSphere(sphere);
	};
	

	/*asteroid.testCreation = function(){
		console.log(asteroidMesh.position);
		console.log(collider.center);
	};*/

	/*asteroid.testMove = function(){
		console.log(asteroidMesh.position);
		console.log(- settingsObject.gameAreaDepth() / 2 + 5);

		console.log(asteroid.hasCrossedTheLine());
	};*/

	/*asteroid.testAnomalia = function(){
		console.log(asteroidMesh.position.z);
	};*/


	return asteroid;


}
