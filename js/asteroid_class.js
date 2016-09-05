"use strict";

function Asteroid(settings, materialManager, timer){

//=== VARIABLES ===

	this.settings = settings;
	this.timer = timer;
	// create asteroidMesh
	var geometry = new THREE.SphereGeometry(1, 32, 32);
	// materialManager.getAsteroidMaterial();
	// var material = materialManager.asteroidMaterial;
	var material = materialManager.getAsteroidMaterial();
	// mat.needsinitialize = true;


	// define propertys and behavior

	//public methods
	this.asteroidMesh = new THREE.Mesh(geometry, material);
	this.previousTime;

	this.collider = this.asteroidMesh.geometry.boundingSphere.clone();



//=== CONSTRUCTOR ===

}



///=== METHODS ===

Asteroid.prototype.move = function(){
	// move quantity
	var step = this.timer.passedTime/1000  * this.settings.asteroidSpeed;
	// move asteroidMesh and collider
	this.asteroidMesh.translateZ(step);
	this.collider.center.setZ(this.asteroidMesh.position.z);

};

Asteroid.prototype.hasCrossedTheLine = function(){
	return this.asteroidMesh.position.z >= 1;
	//return asteroidMesh.position.z >= this.settings.game_area_D / 2;
};

Asteroid.prototype.initialize = function(){
	//reset timestamp
	this.previousTime = this.timer.getTime();

	//reset position
	this.asteroidMesh.position.set(
		this.settings.asteroid_spawn_X(),
		this.settings.asteroid_spawn_Y(),
		this.settings.asteroid_spawn_Z()
	);

	//this.asteroidMesh.position.set(0,0,0);

	// rescale asteroidMesh
	var size = this.settings.asteroidSize();
	this.asteroidMesh.scale.x = size;
	this.asteroidMesh.scale.y = size;
	this.asteroidMesh.scale.z = size;


	//initialize collider
	this.collider.center.set(this.asteroidMesh.position.x, this.asteroidMesh.position.y, this.asteroidMesh.position.z);
	this.collider.radius = size;

	// material update
	this.asteroidMesh.material.uniforms.distortionFactor.value = size;
	this.asteroidMesh.material.uniforms.maxDistortion.value = this.settings.AsteroidMaxSize;

	// console.log("/////////////////////////////");
	// console.log(size);
	// console.log(this.asteroidMesh.material.uniforms);
};

Asteroid.prototype.isCollidingWith = function(sphere){
	return this.collider.intersectsSphere(sphere);
};
