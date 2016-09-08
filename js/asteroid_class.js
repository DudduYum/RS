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
	// this.asteroidMesh.translateZ(step);
	// this.collider.center.setZ(this.asteroidMesh.position.z);

	// new move code

	this.asteroidMesh.translateX( step * this.direction.x );
	this.asteroidMesh.translateY( step * this.direction.y );
	this.asteroidMesh.translateZ( step * this.direction.z );

	this.collider.center.set(
		this.asteroidMesh.position.x,
		this.asteroidMesh.position.y,
		this.asteroidMesh.position.z
	);
	// simple animation
	// this.asteroidMesh.rotation.z += Math.PI/(this.collider.radius*124);
	// this.asteroidMesh.rotation.z = this.asteroidMesh.rotation.z % (2*Math.PI);

	// texture animation
	// 1.1, perche 0.1 non e' ammesso
	// this.asteroidMesh.material.uniforms.x_shift.value += 1.001;
	// this.asteroidMesh.material.uniforms.y_shift.value -= 1.001;

	// this.asteroidMesh.material.uniforms.x_shift.value = this.asteroidMesh.material.uniforms.x_shift.value % 1.0;
	// this.asteroidMesh.material.uniforms.y_shift.value = this.asteroidMesh.material.uniforms.y_shift.value % 1.0;
	// this.asteroidMesh.material.needsUpdate = true;

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

	// direction settings
	this.direction.set( 0 , 0 , 1);


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

	// reset texture animation

	this.asteroidMesh.material.uniforms.x_shift.value += 1.0 + (1/size);
	this.asteroidMesh.material.uniforms.y_shift.value += 1.0 + (1/size);

	// console.log("/////////////////////////////");
	// console.log(size);
	// console.log(this.asteroidMesh.material.uniforms);
};

Asteroid.prototype.isCollidingWith = function(sphere){
	return this.collider.intersectsSphere(sphere);
};
