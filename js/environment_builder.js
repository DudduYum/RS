"use strict";

function createEnvironment(settingsObject, width, height, depth, timer, IO_controls, scoreControl){



	var settings = settingsObject;
	var textureManager;
	var materialManager;
	var envi = {};
	
	//asteroid param
	var asteroidBufferMinimum = 5;
	var activeAsteroids = [];
	var asteroidBuffer = [];
	var lastSpawnTime;

	// spaceship
	var spaceship;
	
	var game3Dscene = new THREE.Object3D();
	
	//sphere map
	var openSpaceGeometry  = new THREE.SphereGeometry(600, 32, 32);
	var openSpaceTexture = new THREE.TextureLoader().load('textures/spaceD2.jpg');
	var openSpaceMaterial  = new THREE.MeshBasicMaterial({map: openSpaceTexture});
	openSpaceMaterial.side  = THREE.BackSide;
	var openSpace  = new THREE.Mesh(openSpaceGeometry, openSpaceMaterial);
	openSpace.position.set(0,0,0);

	game3Dscene.add(openSpace);
	
	
	var tempAsteroid;

	(function (){
		// set volume size
		resizeGameArea();
		settings.setGameAreaDepth(depth);
		
		materialManager = createMaterialManager();

		materialManager.shipMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});

		spaceship =  new Spaceship(settings, materialManager, IO_controls, timer);

		game3Dscene.add(spaceship.spaceshipObject());
		
		spaceship.initialize();
		lastSpawnTime = timer.getTime()
		// test
		// spaceship.colliderMoveTest();
		fillBuffer();
	})();

	// thow exeption
	// collision detection
	function detectCollisions(){
		for(i=0; i < activeAsteroids.length; i++){
			if(spaceship.isColliding(activeAsteroids[i])){
				throw {asteroid: activeAsteroids[j].mesh};
			}
		}
	};

	function resizeGameArea(){
		settings.setGameAreaWidth(width * settings.screenRatio());
		settings.setGameAreaHeight(height);
	};
	
	
	// ASTEROIDS
	//create asteroid for the future use
	function fillBuffer(){
		while(asteroidBuffer.length < asteroidBufferMinimum + 5) {
			asteroidBuffer.push(createAsteroid(settings, materialManager, timer));
		}
	};
	
	//this method moves asteroids and make them visible
	envi.moveAsteroids = function(){
		
		for (astIndex in activeAsteroids ){
			tempAsteroid = activeAsteroids[astIndex];
			tempAsteroid.move();
			if(tempAsteroid.hasCrossedTheLine()){
				this.removeAsteroid(astIndex); 
			}
		}
		
		//check if it's spawn time!!
		if(timer.getTime() - lastSpawnTime > settings.spawnDelay() ) {
			addAsteroid();
		}
		
	};


	function addAsteroid(){
		tempAsteroid = asteroidBuffer.pop();
		tempAsteroid.initialize();
		activeAsteroids.push(tempAsteroid);
		game3Dscene.add(tempAsteroid.asteroidMesh());
		lastSpawnTime = timer.getTime();
		
		//check buffer status
		if(asteroidBuffer.length < asteroidBufferMinimum){
			fillBuffer();
		}
	}
	
	
	//remove all asteroid from the game area
	envi.removeAsteroid = function(astIndex){
		tempAsteroid = activeAsteroids[astIndex];
		activeAsteroids.splice(astIndex,1);
		asteroidBuffer.push(tempAsteroid);
		game3Dscene.remove(tempAsteroid.asteroidMesh());
	};
	
	envi.gameScene = function(){
		return game3Dscene;
	};

	//I don't know why is it stll here
	envi.updateRatio = function(){
		settings.updateScreenRatio();
		resizeGameArea();
	};

	//game are position
	envi.setPosition = function(px, py, pz){
		game3Dscene.position.set(px, py, pz);
	};


	//get asteroid of index
	envi.getAsteroid = function(index){
		return this.game3Dscene.children[index];
	};

	

	envi.updateEnviroment = function(){
			this.moveAsteroids();
			spaceship.updateSpaceship();
			detectCollisions();
	};

	envi.reset = function(){
		while ( activeAsteroids.length > 0 ){
			this.removeAsteroid(0);
		}
		spaceship.reset();
		lastSpawnTime = timer.getTime();
	};
	
	envi.rotateSpaceship = function() {
		spaceship.rotate();
	}
	
	envi.immobilizeSpaceship = function() {
		spaceship.immobilize();
	}

	// unit tests

	/*envi.testIO = function(){
		IO_controls.unitTest();
	};*/
	/*envi.initTest = function(){
		console.log("test init");
		console.log(settings.gameAreaWidth());
		console.log(settings.gameAreaHeight());
		console.log(settings.gameAreaDepth());
		console.log(game3Dscene);
	};*/

	/*envi.createAsteroidTest = function(){
		console.log("test crate ast");
		console.log(asteroidBuffer);
	};*/

	/*envi.moveAsteroidTest = function(){
		// console.log("test move ast");

		// console.log(tmpAsteroid.asteroidMesh().position);
		console.log(asteroidBuffer.length);
		console.log(activeAsteroids.length);

		// console.log(activeAsteroids)
		// console.log(activeAsteroids);
		// console.log(game3Dscene.children.length);
	};*/

	/*envi.positionTest = function(){
		console.log("test position");
		console.log("game position");
		console.log(game3Dscene.position);
		console.log("asteroid position");
		for (astIn in asteroidBuffer){
			console.log(asteroidBuffer[astIn].mesh().position);
		}
	};*/

	/*envi.spaceshiphitTest = function(){
		console.log(game3Dscene);
	};*/
	// envi.removeAsteroids();

	/*(function (){
		envi.fillBuffer();
	})();*/

	return envi;

}
