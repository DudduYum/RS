
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
	this.destination = new THREE.Vector3();

	// define propertys and behavior

	//public methods
	this.asteroidMesh = new THREE.Mesh(geometry, material);

	this.asteroidObj = new THREE.Object3D();
	this.asteroidObj.add(this.asteroidMesh);

	this.previousTime = 0;

	this.collider = this.asteroidMesh.geometry.boundingSphere.clone();

	// rotation animation
	this.rotationAnimation = 0;
	this.rotationAnimationSpeed = 0;
	this.rotationDirection = 0;
	this.rotationSubdivision = 2.5;

//=== CONSTRUCTOR ===

}



///=== METHODS ===
Asteroid.prototype.setQuaternion = function(){

};

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
	this.rotationAnimation += this.timer.passedTime/1000 * this.rotationAnimationSpeed;

	this.rotationAnimation = this.rotationAnimation % (2 * Math.PI);

	// change displaysmentVec to apply movement to mesh
	var Qast;

	//correct asteroid rotation
	var yRot;

	this.asteroidMesh.quaternion.setFromEuler(
		new THREE.Euler(
			this.rotationAnimation * this.rotationDirection.x,
			this.rotationAnimation * this.rotationDirection.y,
			this.z_rotation,
			'XZY' )
		 );

//debugging code
	// light possition transformation according to meshrotation
	//
	var tmpSunPosition = pointLight.lightPosition.clone();
	tmpSunPosition.applyQuaternion(this.asteroidMesh.quaternion);
	this.asteroidMesh.material.uniforms.pointLightPos = tmpSunPosition;	
	
	var tmpFlamePosition = spaceshipLight.lightPosition.clone();
	tmpFlamePosition.applyQuaternion(this.asteroidMesh.quaternion);
	this.asteroidMesh.material.uniforms.lightPosition = tmpFlamePosition;


	// computing inverse trasformation 
	// need it to correct asteroid direction
	Qast = this.asteroidMesh.quaternion.clone().inverse();
	displaysmentVec.applyQuaternion(Qast);

	// tmp code start

	// tmp code end

	//lights position update
	var sunPosition = pointLight.lightPosition.clone();
	sunPosition = sunPosition.applyQuaternion(Qast);

	var flamePosition = spaceshipLight.lightPosition.clone();
	flamePosition = flamePosition.applyQuaternion(Qast);

	// move the mesh
	this.asteroidMesh.translateX(displaysmentVec.x);
	this.asteroidMesh.translateY(displaysmentVec.y);
	this.asteroidMesh.translateZ(displaysmentVec.z);

		// move collider
	this.collider.center.set(
		this.asteroidObj.position.x,
		this.asteroidObj.position.y,
		this.asteroidObj.position.z
	);

};

Asteroid.prototype.hasCrossedTheLine = function(){
	if(this.asteroidMesh.position.z >= this.settings.game_area_D / 8) {
		return true;
	} else {
		return false;
	}

};

Asteroid.prototype.initialize = function(){
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

	//z rotation 
	this.z_rotation = Math.PI * Math.random();

	//initialize collider
	this.collider.center.set(this.asteroidObj.position.x, this.asteroidObj.position.y, this.asteroidObj.position.z);
	this.collider.radius = size;

	// material update
	this.asteroidMesh.material.uniforms.distortionFactor.value = size;
	this.asteroidMesh.material.uniforms.maxDistortion.value = this.settings.asteroidMaxSize;

	// reset rotation animation
	this.rotationAnimation = 0;
	this.rotationAnimationSpeed = (2 * Math.PI) / (this.rotationSubdivision * size);

	// reset rotation Axes
	var coin = Math.random();
	this.rotationDirection = new THREE.Vector3();
	this.rotationDirection.y = 1;

	
};

Asteroid.prototype.isCollidingWith = function(sphere){
	return this.collider.intersectsSphere(sphere);
};
