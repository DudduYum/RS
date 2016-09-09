"use strict";

function Spaceship(settingsObj, materialManager, IO_controls, timer){

//=== VARIABLES ===

	this.settingsObj = settingsObj;
	this.materialManager = materialManager;
	this.IO_controls = IO_controls;
	this.timer = timer;

	//spaceship3D size
	this.spaceshipRadius = 0.5;
	this.spaceshipLength = 5;

	//ratios compared to spaceship3D length (eg 0.4 is 40% of length)
	this.spaceshipFrontSize = 0.34;
	this.spaceshipBodySize = 0.34;
	this.spaceshipBackSize = 0.12;
	this.spaceshipFlameSize = 0.20;

	this.spaceship3D = new THREE.Object3D();


	//spaceship front
	this.spaceship_front_geometry = new THREE.CylinderGeometry(0, this.spaceshipRadius, this.spaceshipLength * this.spaceshipFrontSize, 32);
	this.spaceship_front_material = this.materialManager.redSpaceshipMaterial();
	this.spaceship_front = new THREE.Mesh(this.spaceship_front_geometry, this.spaceship_front_material);

	//spaceship body
	this.spaceship_body_geometry = new THREE.CylinderGeometry(this.spaceshipRadius, this.spaceshipRadius, this.spaceshipLength * this.spaceshipBodySize, 32);
	this.spaceship_body_material = this.materialManager.silverSpaceshipMaterial();
	this.spaceship_body = new THREE.Mesh(this.spaceship_body_geometry, this.spaceship_body_material);

	//spaceship back
	this.spaceship_back_geometry =  new THREE.CylinderGeometry(this.spaceshipRadius*3/5, this.spaceshipRadius*3/4, this.spaceshipLength * this.spaceshipBackSize, 32);
	this.spaceship_back_material = this.materialManager.darkSilverSpaceshipMaterial();
	this.spaceship_back = new THREE.Mesh(this.spaceship_back_geometry, this.spaceship_back_material);
	
	//spaceship flame
	this.spaceship_flame_geometry =  new THREE.CylinderGeometry(this.spaceshipRadius*3/5, 0.0, this.spaceshipLength * this.spaceshipFlameSize, 32);
	this.spaceship_flame_material = this.materialManager.azureSpaceshipMaterial();
	this.spaceship_flame = new THREE.Mesh(this.spaceship_flame_geometry, this.spaceship_flame_material);
	
	//spaceship3D collider, aproximated with 3 spheres
	this.spaceshipColliders = [];

	// struttura dati che serve per fare rimanere l'possibilità aggiungere
	// keydown eventi in magnera dinamica e muovere la nave in tutte le direzioni
	this.movementTracker = {
		hStep: 0.0,
		vStep: 0.0
	};

	this.spaceshipSpeed = {
		hSpeed: 0.0,
		vSpeed: 0.0
	};



//=== CONSTRUCTOR ===

	//key press movement binding
	//right = right arrow, D
	this.IO_controls.addKeyDownAction(39, this.moveRight.bind(this));
	this.IO_controls.addKeyDownAlias(68, 39);

	//left = left arrow, A
	this.IO_controls.addKeyDownAction(37, this.moveLeft.bind(this));
	this.IO_controls.addKeyDownAlias(65, 37);

	//up = up arrow, W
	this.IO_controls.addKeyDownAction(38, this.moveUp.bind(this));
	this.IO_controls.addKeyDownAlias(87, 38);

	//down = down arrow, S
	this.IO_controls.addKeyDownAction(40, this.moveDown.bind(this));
	this.IO_controls.addKeyDownAlias(83, 40);

	//key release movement binding
	//right = right arrow, D
	this.IO_controls.addKeyUpAction(39, this.horizontalInertia.bind(this));
	this.IO_controls.addKeyUpAlias(68, 39);

	//left = left arrow, A
	this.IO_controls.addKeyUpAction(37, this.horizontalInertia.bind(this));
	this.IO_controls.addKeyUpAlias(65, 37);

	//up = up arrow, W
	this.IO_controls.addKeyUpAction(38, this.verticalInertia.bind(this));
	this.IO_controls.addKeyUpAlias(87, 38);

	//down = down arrow, S
	this.IO_controls.addKeyUpAction(40, this.verticalInertia.bind(this));
	this.IO_controls.addKeyUpAlias(83, 40);


	//spaceship3D assembly
	this.spaceship3D.add(this.spaceship_front);
	this.spaceship_front.translateY((this.spaceshipFrontSize/2 + this.spaceshipBodySize + this.spaceshipBackSize + this.spaceshipFlameSize) * this.spaceshipLength);
	this.spaceship3D.add(this.spaceship_body);
	this.spaceship_body.translateY((this.spaceshipBodySize/2 + this.spaceshipBackSize + this.spaceshipFlameSize) * this.spaceshipLength);
	this.spaceship3D.add(this.spaceship_back);
	this.spaceship_back.translateY((this.spaceshipBackSize/2 + this.spaceshipFlameSize)* this.spaceshipLength);
	this.spaceship3D.add(this.spaceship_flame);
	this.spaceship_flame.translateY((this.spaceshipFlameSize/2 * this.spaceshipLength));

	this.spaceship3D.position.set(0, -this.spaceshipLength/2, 0);

	this.spaceshipColliders.push(new THREE.Sphere());
	this.spaceshipColliders.push(new THREE.Sphere());
	this.spaceshipColliders.push(new THREE.Sphere());

	this.initialize();
	this.reset();

}



//=== METHODS ===


//check area borders for limit reach
Spaceship.prototype.checkLeftBorder = function(){
	if(this.spaceship3D.position.x > -this.settingsObj.game_area_W/2 + 1)
		return true;
	else
		return false;
}
Spaceship.prototype.checkRightBorder = function(){
	if(this.spaceship3D.position.x < this.settingsObj.game_area_W/2 - 1)
		return true;
	else
		return false;
}
Spaceship.prototype.checkUpBorder = function(){
	if(this.spaceship3D.position.y < this.settingsObj.game_area_H/2 - 1)
		return true;
	else
		return false;
}
Spaceship.prototype.checkDownBorder = function(){
	if(this.spaceship3D.position.y > -this.settingsObj.game_area_H/2 + 1)
		return true;
	else
		return false;
}

//spaceship movement
Spaceship.prototype.moveRight = function(){
	this.spaceshipSpeed.hSpeed = this.settingsObj.normalSpeed;
}

Spaceship.prototype.moveLeft = function(){
	this.spaceshipSpeed.hSpeed = - this.settingsObj.normalSpeed;
}

Spaceship.prototype.moveUp = function(){
	this.spaceshipSpeed.vSpeed = this.settingsObj.normalSpeed;
}

Spaceship.prototype.moveDown = function(){
	this.spaceshipSpeed.vSpeed = - this.settingsObj.normalSpeed;
}

Spaceship.prototype.horizontalInertia = function(){
	if(!this.IO_controls.isKeyPressed(37) && !this.IO_controls.isKeyPressed(65) && !this.IO_controls.isKeyPressed(39) && !this.IO_controls.isKeyPressed(68)) {
		this.spaceshipSpeed.hSpeed = this.spaceshipSpeed.hSpeed * this.settingsObj.inertia;
	}
}

Spaceship.prototype.verticalInertia = function(){
	if(!this.IO_controls.isKeyPressed(38) && !this.IO_controls.isKeyPressed(87) && !this.IO_controls.isKeyPressed(40) && !this.IO_controls.isKeyPressed(83)) {
		this.spaceshipSpeed.vSpeed = this.spaceshipSpeed.vSpeed * this.settingsObj.inertia;
	}
}

Spaceship.prototype.immobilize = function(){
	this.spaceshipSpeed.hSpeed = 0;
	this.spaceshipSpeed.vSpeed = 0;
}


//move the spaceship3D and keep it inside game borders
Spaceship.prototype.updateSpaceship = function(){
	this.movementTracker.hStep = this.timer.passedTime/1000 * this.spaceshipSpeed.hSpeed;
	this.movementTracker.vStep = this.timer.passedTime/1000 * this.spaceshipSpeed.vSpeed;
	if(Math.sign(this.movementTracker.hStep) < 0){
		if(this.checkLeftBorder())
			this.spaceship3D.translateX(this.movementTracker.hStep);
	} else {
		if(this.checkRightBorder())
			this.spaceship3D.translateX(this.movementTracker.hStep);
	}
	if(Math.sign(this.movementTracker.vStep) < 0){
		if(this.checkDownBorder())
			this.spaceship3D.translateZ(this.movementTracker.vStep);
	} else {
		if(this.checkUpBorder())
			this.spaceship3D.translateZ(this.movementTracker.vStep);
	}
	this.updateColliders();

	spaceshipLight.lightPosition.setX(this.spaceship3D.position.x);
	spaceshipLight.lightPosition.setY(this.spaceship3D.position.z);

}


//updates collider position
Spaceship.prototype.updateColliders = function() {
	for(var i = 0 ; i < this.spaceshipColliders.length ; i++) {
		this.spaceshipColliders[i].center.setX(this.spaceship3D.position.x);
		this.spaceshipColliders[i].center.setY(this.spaceship3D.position.y);
	}
}



Spaceship.prototype.initialize = function() {
	//set the ship
	this.spaceship3D.position.set(0, -this.spaceshipLength/2, -this.spaceshipLength);

	//set colliders
	this.spaceshipColliders[0].radius = this.spaceshipRadius;
	this.spaceshipColliders[1].radius = this.spaceshipRadius;
	this.spaceshipColliders[2].radius = this.spaceshipRadius;


	this.spaceshipColliders[0].center.set(0,0,this.spaceship3D.position.z - ((this.spaceshipFrontSize + this.spaceshipBodySize/2 )* this.spaceshipLength));
	this.spaceshipColliders[1].center.set(0,0,this.spaceship3D.position.z);
	this.spaceshipColliders[2].center.set(0,0,this.spaceship3D.position.z + ((this.spaceshipBodySize/2 + this.spaceshipBackSize)* this.spaceshipLength));
}


Spaceship.prototype.reset = function(){
	this.spaceshipSpeed.hSpeed = 0;
	this.spaceshipSpeed.vSpeed = 0;

	// reset the ship
	this.spaceship3D.position.set(0, 0, -this.spaceshipLength);
	this.spaceship3D.rotation.x = -90 * Math.PI/180;
	this.spaceship3D.rotation.y = 0;

	//reset colliders position
	this.spaceshipColliders[0].center.set(0,0,this.spaceship3D.position.z - ((this.spaceshipFrontSize + this.spaceshipBodySize/2 ) * this.spaceshipLength));
	this.spaceshipColliders[1].center.set(0,0,this.spaceship3D.position.z);
	this.spaceshipColliders[2].center.set(0,0,this.spaceship3D.position.z + ((this.spaceshipBodySize/2 + this.spaceshipBackSize) * this.spaceshipLength));
}



Spaceship.prototype.rotate = function() {
	this.spaceship3D.rotation.y += 1 * Math.PI/180;
}



Spaceship.prototype.isColliding = function(ast){
	for (var index in this.spaceshipColliders){
		// console.log("in isColliding method strt");
		// console.log(spaceshipColliders[index].center);
		// console.log(ast.testCreation() );
		// console.log("in isColliding method STOP");
		if(ast.isCollidingWith(this.spaceshipColliders[index])){
			return true;
		}
	}
	return false;
}
