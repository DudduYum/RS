function main(){
	// configuration object
	var settingsObj = createGameSettings();



	// game timer
	var timer = createTimer();



	// game state manager
	var stateCTRL;



	// score counter
	var scoreCTRL = createScoreCounter( timer , settingsObj);



	// keyboard Input managment
	var inputCTRL = createGameIOManager( );
	window.addEventListener("keydown",inputCTRL.keyDownAction);
	window.addEventListener("keyup",inputCTRL.keyUpAction);



	// interface
	// init global variable
	var interfaceCTRL = createInterfaceManager( scoreCTRL );

	// assign cameraswitch action to the botton
	switchToGameCamera = interfaceCTRL.switchToGameCamera;
	switchToFreeCamera = interfaceCTRL.switchToFreeCamera;



	// environment
	var envi = createEnvironment(settingsObj , 12 , 12 , 150 ,timer , inputCTRL);

	// init of environment
	envi.setPosition(
		0 ,
		0 ,
		-((settingsObj.gameAreaDepth() / 2) + 4)
	);




	// 3D scene initialization //
	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.01);


	//creates two camers
	var gameCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);
	var freeCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);

	// freeCamera initialization
	freeCamera.position.set(2,2,2);

	// flag variable
	var useGameCamera = true;

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	function render() {
		if(useGameCamera){
			renderer.render(scene, gameCamera);
		} else {
			renderer.render(scene, freeCamera);
		}
	};

	canvas = document.getElementById('canvas');
	canvas.appendChild(renderer.domElement);

	//initializes mouse controls for free camera
	var orbitControls = new THREE.OrbitControls(freeCamera, renderer.domElement);
	orbitControls.enableKeys = false;
	orbitControls.enabled = false;
	orbitControls.target = new THREE.Vector3(0,0,-10);



	// add ship and asteroid to the scene
	scene.add(envi.gameScene());




	// stat init
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';

	canvas = document.getElementById('canvas');
	canvas.appendChild(renderer.domElement);
	canvas.appendChild(stats.domElement);




	// camera switch init
	interfaceCTRL.setCameraSwitchs(
		function(){
			// switch to game camera

			orbitControls.enabled = false;
			useGameCamera = true;
		} ,
		function(){
			// switch to free camera

			useGameCamera = false;
			orbitControls.enabled = true;
		}
	);






	//resizes the renderer and the game area if the window resizes
	window.addEventListener(
		'resize',
		function(){
			envi.updateRatio();

			gameCamera.aspect = settingsObj.screenRatio();
			freeCamera.aspect = settingsObj.screenRatio();

			gameCamera.updateProjectionMatrix();
			freeCamera.updateProjectionMatrix();


		},
		false
	);



	// GAME LOOP //
	// game state initializzation (function for game start and end)
	stateCTRL = createGameState(
		function(){
			timer.reset();
			envi.reset();
			scoreCTRL.reset();

			// interface
			interfaceCTRL.displayGame();
			console.log("here come dat boi");
		},
		function(){
			interfaceCTRL.displayGameOver();
			console.log("shit waddupp?");
		}
	);


	// add some event listener to start the game and switch the camera
	inputCTRL.addKeyDownAction(
		32 ,
		stateCTRL.start
	);

	inputCTRL.addKeyDownAction(
		67 ,
		function(){
			if ( !useGameCamera ) {
				interfaceCTRL.switchToGameCamera();
			}else {
				interfaceCTRL.switchToFreeCamera();
			}
		}
	);

//
	interfaceCTRL.switchToGameCamera();

	//game loop function
	function animate() {

		requestAnimationFrame(animate);
		// envi.updateEnviroment();

		// console.log(stateCTRL.isRunning());
		if( stateCTRL.isRunning() ){
			try{
				envi.updateEnviroment();
				scoreCTRL.update();
				interfaceCTRL.update();
			}
			catch ( exes ) {
				stateCTRL.end();
			}

		}

		stats.update();
		timer.update();


		render();
	};

	animate();
}
