"use strict";

function Asteroid(settings, materialManager, timer){

//=== VARIABLES ===

	this.settings = settings;
	this.timer = timer;
	// create asteroidMesh
	var geometry = new THREE.SphereGeometry(1, 32, 32);
	var material = materialManager.getAsteroidMaterial();
	// mat.needsinitialize = true;


	// define propertys and behavior

	//public methods
	this.asteroidMesh = new THREE.Mesh(geometry, material);
	this.previousTime;

	this.collider = this.asteroidMesh.geometry.boundingSphere.clone();

	
	
//=== CONSTRUCTOR ===

}

Asteroid.prototype.move = function(){
	// move quantity
	var step = this.timer.passedTime/1000  * this.settings.asteroidSpeed;
	// move asteroidMesh and collider
	this.asteroidMesh.translateZ(step);
	this.collider.center.setZ(this.asteroidMesh.position.z);
};

Asteroid.prototype.hasCrossedTheLine = function(){
	return this.asteroidMesh.position.z >= 1;
	//return asteroidMesh.position.z >= this.settings.gameAreaDepth() / 2;
};

Asteroid.prototype.initialize = function(){
	//reset timestamp
	this.previousTime = this.timer.getTime();
	
	//reset position
	this.asteroidMesh.position.set(
		this.settings.randomCoordinate(this.settings.gameAreaWidth()*2),  //X
		this.settings.randomCoordinate(this.settings.gameAreaHeight()*2),  //Y
		this.settings.asteroidStartPoint()
	);
	

	// rescale asteroidMesh
	var size = this.settings.randomSize();
	this.asteroidMesh.scale.x = size;
	this.asteroidMesh.scale.y = size;
	this.asteroidMesh.scale.z = size;
	
	
	//initialize collider
	this.collider.center.set(this.asteroidMesh.position.x, this.asteroidMesh.position.y, this.asteroidMesh.position.z);
	this.collider.radius = size;
};

Asteroid.prototype.isCollidingWith = function(sphere){
	return this.collider.intersectsSphere(sphere);
};
