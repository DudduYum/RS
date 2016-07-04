// todo remember to pass the correct
// arguments to this function

function createEnvironment(settingsObject, width, height, depth, timer, IO_controls, scoreControl){


	// GameTimer = timer,
	// forse non serve
	// aWidth = width * settingsObject.screenRatio,
	// aHeight = height,
	// aDepth = depth,


	var settings = settingsObject;
	var textureManager;
	var envi = {};
	//asteroid param
	var asteroidNumMax = 10;
	var activeAsteroids = [];
	var passiveAsteroids = [];

	// spaceship
	var spaceship;
	var spamTimeKeeper = timer.getTime();
	var game3Dscene = new THREE.Object3D();
	
	//sphere map
	var openSpaceGeometry  = new THREE.SphereGeometry(600, 32, 32);
	var openSpaceTexture = new THREE.TextureLoader().load('textures/space.jpg');
	var openSpaceMaterial  = new THREE.MeshBasicMaterial({map: openSpaceTexture});
	openSpaceMaterial.side  = THREE.BackSide;
	var openSpace  = new THREE.Mesh(openSpaceGeometry, openSpaceMaterial);
	openSpace.position.set(0,0,0);

	game3Dscene.add(openSpace);


	(function (){
		// set volume size
		resizeGameArea();
		settings.setGameAreaDepth(depth);

		//game position
		// game3Dscene.position.set(
		//   0 ,
		//   0 ,
		//   -((settings.gameAreaDepth() / 2) + 4));

		// init the texture manager
		// tmp code

		//questo codice era nel mio environment_builder
		/*textureManager = {
			 asteroidMaterial: new THREE.MeshBasicMaterial({color:0xff0000}),
			 shipMaterial : new THREE.MeshBasicMaterial({color:0x00ff00})
		 };*/

		materialManager = createMaterialManager();

		materialManager.shipMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});

		spaceship = createSpaceship(settings, materialManager, IO_controls, timer);

		// test
		// spaceship.colliderMoveTest();

		game3Dscene.add(spaceship.spaceshipObject());
		spaceship.initialize();

		// test
		// spaceship.colliderMoveTest();

	})();

	// thow exeption
	// collision detection
	function detectCollisions(){
		for(j=0; j < activeAsteroids.length; j++){
			if(spaceship.isColliding(activeAsteroids[j])){
				throw {
					asteroid: activeAsteroids[j].mesh
				};
			}
		}
	};

	function resizeGameArea(){ //ma serve ancora sta roba... si
		settings.setGameAreaWidth(width * settings.screenRatio());
		settings.setGameAreaHeight(height);
	};




	function activateAsteroids(){

		if(timer.getTime() - spamTimeKeeper > settings.spawnDelay() ){
			var newAsteroid = passiveAsteroids.pop();
			newAsteroid.initialize();
			activeAsteroids.push(newAsteroid);


			game3Dscene.add(newAsteroid.mesh());

			spamTimeKeeper = timer.getTime();
		}

	}


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

	//game area dimensions
	envi.width = function(){
		return settings.gameAreaWidth();
	};

	envi.height = function(){
		return settings.gameAreaHeight();
	};

	envi.depth = function(){
		return settings.gameAreaDepth();
	};


	//creat asteroid for the future use
	envi.addAsteroids = function(){
		//if there aren't enough asteroid add some
		while(activeAsteroids.length + passiveAsteroids.length < asteroidNumMax ) {
			passiveAsteroids.push(createAsteroid(settings, materialManager, timer));
		}
	};

	// ASTEROIDS
	//this method moves asteroids and make them visible
	envi.moveAsteroids = function(){
		if(passiveAsteroids.length <= 0){
			asteroidNumMax += 5;
		}


		//if there aren't enough asteroid add some
		while(activeAsteroids.length + passiveAsteroids.length < asteroidNumMax ) {
			passiveAsteroids.push(createAsteroid(settings, materialManager, timer));
		}

		this.addAsteroids();

		//activate passive asteroid
		activateAsteroids();

		for (astIndex in activeAsteroids ){
			var asteroid = activeAsteroids[astIndex];

			asteroid.move(timer.getTime());

			if(asteroid.hasCrossLimit()){
				activeAsteroids.splice(astIndex,1);
				game3Dscene.remove(asteroid.mesh());
				scoreControl.update();
				passiveAsteroids.push(asteroid);
			}
		}
	};


	//get asteroid of index
	envi.getAsteroid = function(index){
		return this.game3Dscene.children[index];
	};

	//remove all asteroid from the game area
	envi.removeAsteroids = function(){
		this.game3Dscene = new THREE.Object3D();
		// this.asteroidList = [];
	};

	envi.updateEnviroment = function(){
			this.moveAsteroids();
			spaceship.updateSpaceship(0);
			detectCollisions();
	};

	envi.reset = function(){
		while ( activeAsteroids.length != 0 ){
			var ast = activeAsteroids.pop();
			game3Dscene.remove(ast.mesh());
			passiveAsteroids.push(ast);
		}

		spaceship.reset();
	};
	
	envi.rotateSpaceship = function() {
		spaceship.rotate();
	}

// unit tests

	envi.testIO = function(){
		IO_controls.unitTest();
	};
	envi.initTest = function(){
		console.log("test init");
		console.log(settings.gameAreaWidth());
		console.log(settings.gameAreaHeight());
		console.log(settings.gameAreaDepth());
		console.log(game3Dscene);
	};

	envi.createAsteroidTest = function(){
		console.log("test crate ast");
		console.log(passiveAsteroids);
	};

	envi.moveAsteroidTest = function(){
		// console.log("test move ast");

		// console.log(tmpAsteroid.mesh().position);
		console.log(passiveAsteroids.length);
		console.log(activeAsteroids.length);

		// console.log(activeAsteroids)
		// console.log(activeAsteroids);
		// console.log(game3Dscene.children.length);
	};

	envi.positionTest = function(){
		console.log("test position");
		console.log("game position");
		console.log(game3Dscene.position);
		console.log("asteroid position");
		for (astIn in passiveAsteroids){
			console.log(passiveAsteroids[astIn].mesh().position);
		}

	};

	envi.spaceshiphitTest = function(){
		console.log(game3Dscene);
	};
	// envi.removeAsteroids();

	(function (){
		envi.addAsteroids();
	})();

	return envi;

}
