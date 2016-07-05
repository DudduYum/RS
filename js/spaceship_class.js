function createSpaceship(settingsObj, materialManager, IO_controls, timer){
	
	var spaceship = {};

	
	//spaceship3D size
	var spaceshipRadius = 0.5;
	var spaceshipLength = 5;

	//ratios compared to spaceship3D length (eg 0.4 is 40% of length)
	var spaceshipFrontSize = 0.4;
	var spaceshipBodySize = 0.4;
	var spaceshipBackSize = 0.2;

	//spaceship3D front
	var spaceship_front_geometry = new THREE.CylinderGeometry(0, spaceshipRadius, spaceshipLength*spaceshipFrontSize);
	var spaceship_front_material = materialManager.shipMaterial;
	var spaceship_front = new THREE.Mesh(spaceship_front_geometry, spaceship_front_material);

	//spaceship3D body
	var spaceship_body_geometry = new THREE.CylinderGeometry(spaceshipRadius, spaceshipRadius, spaceshipLength*spaceshipBodySize);
	var spaceship_body_material = materialManager.shipMaterial;
	var spaceship_body = new THREE.Mesh(spaceship_body_geometry, spaceship_body_material);

	//spaceship3D tail
	var spaceship_back_geometry =  new THREE.CylinderGeometry(spaceshipRadius/2, spaceshipRadius*4/5, spaceshipLength*spaceshipBackSize);
	var spaceship_back_material = materialManager.shipMaterial;
	var spaceship_back = new THREE.Mesh(spaceship_back_geometry, spaceship_back_material);

	//spaceship3D collider, aproximated with 3 spheres
	var spaceshipColliders = [];


	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());


	// var timeStump = timer.getTime();




	// struttura dati che serve per fare rimanere l'possibilità aggiungere
	// keydown eventi in magnera dinamica e muovere la nave in tutte le direzioni
	movementTracker = {
		hStep: 0.0,
		vStep: 0.0
	};
	
	spaceshipSpeed = {
		hSpeed: 0.0,
		vSpeed: 0.0
	}

	// function give the ship "random" movement direction on the start
	/* var randMoveDirection = -1;
	var randMoveSpeed = 0.001;
	function randomMovement(){
		randMoveDirection *= -1 ;

		if(movementTracker.vStep == 0){
			movementTracker.vStep = randMoveSpeed * randMoveDirection;
		}

		if(movementTracker.hStep == 0){
			movementTracker.hStep = randMoveSpeed * randMoveDirection * -1;
		}

	} */


	//spaceship3D assembly
	var spaceship3D = new THREE.Object3D();
	spaceship3D.add(spaceship_front);
	spaceship_front.translateY((spaceshipFrontSize/2 + spaceshipBodySize + spaceshipBackSize) * spaceshipLength);
	spaceship3D.add(spaceship_body);
	spaceship_body.translateY((spaceshipBodySize/2 + spaceshipBackSize) * spaceshipLength);
	spaceship3D.add(spaceship_back);
	spaceship_back.translateY((spaceshipBackSize/2 * spaceshipLength));

	spaceship3D.position.set(0, -spaceshipLength/2, 0);
	//settingsObj.gameAreaDepth()/2-spaceshipLength/2);
	

	var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition( spaceship3D.matrix  );

	// // collider translation functions
	// function translateSpaceshipCollider(x, y){
	// 	for (var i = 0 ; i < spaceshipColliders.length ; i++) {
	// 		spaceshipColliders[i].translate(new THREE.Vector3(x,y,0));
	// 	}
	// }
	// function translateSpaceshipColliderX(x){
	// 	translateSpaceshipCollider(x,0);
	// }
	// function translateSpaceshipColliderY(y){
	// 	translateSpaceshipCollider(0,y);
	// }

	


	// space ship movement initialization
	// left
	IO_controls.addKeyDownAction(37, moveLeft);
	IO_controls.addKeyDownAlias(65, 37);

	// right
	IO_controls.addKeyDownAction(39, moveRight);
	IO_controls.addKeyDownAlias(68, 39);

	// Up
	IO_controls.addKeyDownAction(38, moveUp);
	IO_controls.addKeyDownAlias(87, 38);

	//down
	IO_controls.addKeyDownAction(40, moveDown);
	IO_controls.addKeyDownAlias(83, 40);
	
	
	var step;
	
	//check area borders for limit reach
	function checkLeftBorder() {
		if(spaceship3D.position.x > -settingsObj.gameAreaWidth()/2 + 1)
			return true;
		else
			return false;
	}
	function checkRightBorder() {
		if(spaceship3D.position.x < settingsObj.gameAreaWidth()/2 - 1)
			return true;
		else
			return false;
	}
	function checkUpBorder() {
		if(spaceship3D.position.y < settingsObj.gameAreaHeight()/2 - 1)
			return true;
		else
			return false;
	}
	function checkDownBorder() {
		if(spaceship3D.position.y > -settingsObj.gameAreaHeight()/2 + 1)
			return true;
		else
			return false;
	}
	
	
	//space ship move function definition
		
	function moveRight(isInertial){
		spaceshipSpeed.hSpeed = settingsObj.normalSpeed();
	}
	
	function moveLeft(){
		spaceshipSpeed.hSpeed = -settingsObj.normalSpeed();
	}
	
	function moveUp(isInertial){
		spaceshipSpeed.vSpeed = settingsObj.normalSpeed();
	}
	
	function moveDown(isInertial){
		spaceshipSpeed.vSpeed = -settingsObj.normalSpeed();
	}
	
	function horizontalInertia(){
		if(!IO_controls.isKeyPressed(37) && !IO_controls.isKeyPressed(65) && !IO_controls.isKeyPressed(39) && !IO_controls.isKeyPressed(68)) {
			spaceshipSpeed.hSpeed = spaceshipSpeed.hSpeed * settingsObj.inertia();
		}
	};

	function verticalInertia(){
		if(!IO_controls.isKeyPressed(38) && !IO_controls.isKeyPressed(87) && !IO_controls.isKeyPressed(40) && !IO_controls.isKeyPressed(83)) {
			spaceshipSpeed.vSpeed = spaceshipSpeed.vSpeed * settingsObj.inertia();
		}
	};
	
	spaceship.immobilize = function(){
		spaceshipSpeed.hSpeed = 0;
		spaceshipSpeed.vSpeed = 0;
	}
	
	//move the spaceship3D and keep it inside game borders
	spaceship.updateSpaceship = function(){
		movementTracker.hStep = timer.passedTime() * spaceshipSpeed.hSpeed;
		movementTracker.vStep = timer.passedTime() * spaceshipSpeed.vSpeed;
		if(Math.sign(movementTracker.hStep) < 0){
			if(checkLeftBorder())
				spaceship3D.translateX(movementTracker.hStep);
		} else {
			if(checkRightBorder())
				spaceship3D.translateX(movementTracker.hStep);
		}
		if(Math.sign(movementTracker.vStep) < 0){
			if(checkDownBorder())
				spaceship3D.translateZ(movementTracker.vStep);
		} else {
			if(checkUpBorder())
				spaceship3D.translateZ(movementTracker.vStep);
		}
		updateColliders();
	}


	// ship stops moving
	// left
	IO_controls.addKeyUpAction(37, horizontalInertia);
	IO_controls.addKeyUpAlias(65, 37);

	// right
	IO_controls.addKeyUpAction(39, horizontalInertia);
	IO_controls.addKeyUpAlias(68, 39);

	// Up
	IO_controls.addKeyUpAction(38, verticalInertia);
	IO_controls.addKeyUpAlias(87, 38);

	//Up
	IO_controls.addKeyUpAction(40, verticalInertia);
	IO_controls.addKeyUpAlias(83, 40);
	
	
	
	//updates collider position
	function updateColliders() {
		for(var i = 0 ; i < spaceshipColliders.length ; i++) {
			spaceshipColliders[i].center.setX(spaceship3D.position.x);
			spaceshipColliders[i].center.setY(spaceship3D.position.y);
		}
	}



	spaceship.initialize = function() {
		//set the ship
		spaceship3D.position.set(0, -spaceshipLength/2, -spaceshipLength);

		//set colliders
		spaceshipColliders[0].radius = spaceshipRadius;
		spaceshipColliders[1].radius = spaceshipRadius;
		spaceshipColliders[2].radius = spaceshipRadius;


		spaceshipColliders[0].center.set(0,0,spaceship3D.position.z - ((spaceshipFrontSize + spaceshipBodySize/2 )* spaceshipLength));
		spaceshipColliders[1].center.set(0,0,spaceship3D.position.z);
		spaceshipColliders[2].center.set(0,0,spaceship3D.position.z + ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));
	}
	
	
	spaceship.reset = function(){
		spaceshipSpeed.hSpeed = 0;
		spaceshipSpeed.vSpeed = 0;

		// reset the ship
		spaceship3D.position.set(0, 0, -spaceshipLength);
		spaceship3D.rotation.x = -90 * Math.PI/180;
		spaceship3D.rotation.y = 0;

		//reset colliders position
		spaceshipColliders[0].center.set(0,0,spaceship3D.position.z - ((spaceshipFrontSize + spaceshipBodySize/2 )* spaceshipLength));
		spaceshipColliders[1].center.set(0,0,spaceship3D.position.z);
		spaceshipColliders[2].center.set(0,0,spaceship3D.position.z + ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));
	};

	
	
	spaceship.rotate = function() {
		spaceship3D.rotation.y += 1 * Math.PI/180;
	}

	spaceship.spaceshipObject = function(){
		return spaceship3D;
	};

	spaceship.isColliding = function(ast){

		for (index in spaceshipColliders){
			// console.log("in isColliding method strt");
			// console.log(spaceshipColliders[index].center);
			// console.log(ast.testCreation() );
			// console.log("in isColliding method STOP");
			if(ast.isCollidingWith(spaceshipColliders[index])){
				return true;
			}
		}
		return false;
	};



// unit tests

	/*spaceship.testGenerale = function(){
		console.log(spaceship3D);
		console.log(spaceshipColliders);
	}*/

	/*spaceship.colliderMoveTest = function(){
		console.log("--------");
		console.log("--------");
		console.log(spaceship3D.position);

		console.log("--------");
		console.log(spaceshipColliders[0].center);
		console.log(spaceshipColliders[1].center);
		console.log(spaceshipColliders[2].center);
		console.log("--------");
		console.log("--------");
	}*/

	// initialization
	//spaceship.update();

	return spaceship;

}