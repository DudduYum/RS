"use strict";

function Environment(settingsObject, timer, IO_controls){

//=== VARIABLES ===

	this.settingsObject = settingsObject;
	this.materialManager = new MaterialManager();
	this.IO_controls = IO_controls;
	this.timer = timer;

	//asteroid param
	this.asteroidBufferMinimum = 10;
	this.activeAsteroids = [];
	this.asteroidBuffer = [];
	this.lastSpawnTime = 0;

	// spaceship
	this.spaceship = new Spaceship(this.settingsObject, this.materialManager, this.IO_controls, this.timer);

	this.game3Dscene = new THREE.Object3D();



//=== CONSTRUCTOR ===

	//sphere map
	this.openSpaceGeometry  = new THREE.SphereGeometry(600, 32, 32);
	this.openSpaceTexture = new THREE.TextureLoader().load("textures/spaceDark.jpg");
	this.openSpaceMaterial  = new THREE.MeshBasicMaterial({map: this.openSpaceTexture, side: THREE.DoubleSide});
	this.openSpace  = new THREE.Mesh(this.openSpaceGeometry, this.openSpaceMaterial);
	this.openSpace.position.set(0,0,0);

	//reference sun
	this.sunGeometry = new THREE.SphereGeometry(60, 32, 32);
	this.sunMaterial = new THREE.MeshBasicMaterial({color:0xffffe6});
	this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
	this.sun.position.set(100.0, 100.0, -10.0);
	
	
	this.materialManager.shipMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
	
	this.game3Dscene.add(this.openSpace);
	this.game3Dscene.add(this.sun);
	this.game3Dscene.add(this.spaceship.spaceship3D);

	this.spaceship.initialize();
	this.fillBuffer();

}



//=== METHODS ===

// throw exeption
// collision detection
Environment.prototype.detectCollisions = function(){
	for(var i=0; i < this.activeAsteroids.length; i++){
		if(this.spaceship.isColliding(this.activeAsteroids[i])){
			throw {asteroid: this.activeAsteroids[i].mesh};
		}
	}
}


// ASTEROIDS
//create asteroid for the future use
Environment.prototype.fillBuffer = function(){
	while(this.asteroidBuffer.length < this.asteroidBufferMinimum + 5) {
		this.asteroidBuffer.push(new Asteroid(this.settingsObject, this.materialManager, this.timer));
	}
}


//this method moves asteroids and make them visible
Environment.prototype.moveAsteroids = function (){
	var tempAsteroid;

	for(var astIndex in this.activeAsteroids ){
		tempAsteroid = this.activeAsteroids[astIndex];
		tempAsteroid.move();
		if(tempAsteroid.hasCrossedTheLine()){
			this.removeAsteroid(astIndex);
		}
	}
	
	this.lastSpawnTime += this.timer.passedTime;
	//check if it's spawn time!!
	if(this.lastSpawnTime > this.settingsObject.spawnDelay ) {
		this.addAsteroid();
		this.lastSpawnTime = 0;
	}

}


Environment.prototype.addAsteroid = function(){
	var tempAsteroid;

	tempAsteroid = this.asteroidBuffer.pop();
	tempAsteroid.initialize();
	this.activeAsteroids.push(tempAsteroid);
	this.game3Dscene.add(tempAsteroid.asteroidMesh);
	
	//check buffer status
	if(this.asteroidBuffer.length < this.asteroidBufferMinimum){
		this.fillBuffer();
	}
}


//remove all asteroid from the game area
Environment.prototype.removeAsteroid = function(astIndex){
	var tempAsteroid;

	tempAsteroid = this.activeAsteroids[astIndex];
	this.activeAsteroids.splice(astIndex,1);
	this.asteroidBuffer.push(tempAsteroid);
	this.game3Dscene.remove(tempAsteroid.asteroidMesh);
}


Environment.prototype.update = function(){
		this.moveAsteroids();
		this.spaceship.updateSpaceship();
		this.detectCollisions();
}

Environment.prototype.reset = function(){
	while ( this.activeAsteroids.length > 0 ){
		this.removeAsteroid(0);
	}
	this.spaceship.reset();
	this.lastSpawnTime = 0;
}


Environment.prototype.rotateSpaceship = function() {
	this.spaceship.rotate();
}


Environment.prototype.immobilizeSpaceship = function() {
	this.spaceship.immobilize();
}
