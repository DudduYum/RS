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

	this.direction = new THREE.Vector3();


	// punto di destinazione
	this.destination;
	// this.destination.x = settings.asteroid_spawn_X();
	// this.destination.y = settings.asteroid_spawn_Y();
	// this.destination.z = 0;

	// punto di partenza
	// this.asteroidMesh.position.set(
	// 	this.settings.asteroid_spawn_X(),
	// 	this.settings.asteroid_spawn_Y(),
	// 	this.settings.asteroid_spawn_Z()
	// );



	// define propertys and behavior

	//public methods
	this.asteroidMesh = new THREE.Mesh(geometry, material);

	this.asteroidObj = new THREE.Object3D();
	this.asteroidObj.add(this.asteroidMesh);

	this.previousTime;

	this.collider = this.asteroidMesh.geometry.boundingSphere.clone();

	// rotation animation
	this.rotationAnimation;
	this.rotationAnimationSpeed;

//=== CONSTRUCTOR ===

}



///=== METHODS ===

Asteroid.prototype.move = function(){
	// move quantity
	var step = this.timer.passedTime/1000  * this.settings.asteroidSpeed;

	// tells how much asteroid should move
	var displaysmentVec = new THREE.Vector3(
		step * this.direction.x,
		step * this.direction.y,
		step * this.direction.z
	);

	this.asteroidObj.translateX( displaysmentVec.x );
	this.asteroidObj.translateY( displaysmentVec.y );
	this.asteroidObj.translateZ( displaysmentVec.z );


	// rotation animation
	this.rotationAnimation += this.rotationAnimationSpeed;
	this.rotationAnimation = this.rotationAnimation % (2 * Math.PI);


	this.asteroidMesh.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.rotationAnimation );
	this.asteroidMesh.quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), this.rotationAnimation );

	// change displaysmentVec to apply movement to mesh
	var Qast = this.asteroidMesh.quaternion.clone().inverse();
	displaysmentVec.applyQuaternion(Qast);

	this.asteroidMesh.translateX(displaysmentVec.x);
	this.asteroidMesh.translateY(displaysmentVec.y);
	this.asteroidMesh.translateZ(displaysmentVec.z);

	this.collider.center.set(
		this.asteroidObj.position.x,
		this.asteroidObj.position.y,
		this.asteroidObj.position.z
	);

};

Asteroid.prototype.hasCrossedTheLine = function(){
	return this.asteroidMesh.position.z >= 1;
	//return asteroidMesh.position.z >= this.settings.game_area_D / 2;
};

Asteroid.prototype.initialize = function(){
	//reset timestamp
	this.previousTime = this.timer.getTime();

	//reset position
	this.asteroidObj.position.set(
		this.settings.asteroid_spawn_X(),
		this.settings.asteroid_spawn_Y(),
		this.settings.asteroid_spawn_Z()
	);
	this.asteroidMesh.position.set(
		this.asteroidObj.position.x,
		this.asteroidObj.position.y,
		this.asteroidObj.position.z
	);


	// where the asteroid shoul get to
	this.destination = new THREE.Vector3(
		this.settings.asteroid_spawn_X(),
		this.settings.asteroid_spawn_Y(),
		0
	);

	// reset direction based on two points ahead
	this.direction.subVectors(this.destination, this.asteroidObj.position);
	this.direction.normalize();


	// rescale asteroidMesh
	var size = this.settings.asteroidSize();
	this.asteroidMesh.scale.x = size;
	this.asteroidMesh.scale.y = size;
	this.asteroidMesh.scale.z = size;


	//initialize collider
	this.collider.center.set(this.asteroidObj.position.x, this.asteroidObj.position.y, this.asteroidObj.position.z);
	this.collider.radius = size;

	// material update
	this.asteroidMesh.material.uniforms.distortionFactor.value = size;
	this.asteroidMesh.material.uniforms.maxDistortion.value = this.settings.AsteroidMaxSize;

	// reset texture animation

	this.asteroidMesh.material.uniforms.x_shift.value += 1.0 + (1/size);
	this.asteroidMesh.material.uniforms.y_shift.value += 1.0 + (1/size);

	// reset rotation animation
	this.rotationAnimation = 0;
	this.rotationAnimationSpeed = Math.PI / 16;

};

Asteroid.prototype.isCollidingWith = function(sphere){
	return this.collider.intersectsSphere(sphere);
};
