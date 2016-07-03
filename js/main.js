function main(){
	// configuration object
	var settingsObj = createGameSettings();

	// game timer
	var timer = createTimer();

	// game state manager
	var stateControl;

	// score counter
	var scoreControl = createScoreCounter( timer , settingsObj);

	// keyboard Input managment
	var inputControl = createGameIOManager( );
	window.addEventListener("keydown",inputControl.keyDownAction);
	window.addEventListener("keyup",inputControl.keyUpAction);

	// interface
	var interfaceControl = createInterfaceManager( scoreControl );

	// assign cameraswitch action to the botton
	switchToGameCamera = interfaceControl.switchToGameCamera;
	switchToFreeCamera = interfaceControl.switchToFreeCamera;

	// environment
	var envi = createEnvironment(settingsObj , 12 , 12 , 150 ,timer , inputControl);

	// init of environment
	envi.setPosition(0,	0, -((settingsObj.gameAreaDepth() / 2) + 4));

	//3D scene initialization
	var scene = new THREE.Scene();
	//scene.fog = new THREE.FogExp2( 0x000000, 0.01);

	//two cameras
	var gameCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);
	var freeCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);
	freeCamera.position.set(2,2,2);
	var useGameCamera = true
	
	//renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	//composer
	var composer = new THREE.EffectComposer(renderer);
	var effect = new THREE.ShaderPass(THREE.CopyShader);

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
	interfaceControl.setCameraSwitch(
		function(){
			// switch to game camera
			orbitControls.enabled = false;
			useGameCamera = true;
			switchComposerCamera(gameCamera)
		},
		function(){
			// switch to free camera
			useGameCamera = false;
			orbitControls.enabled = true;
			switchComposerCamera(freeCamera)
		}
	);


	


	//resizes the renderer and the game area if the window resizes
	window.addEventListener('resize',
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
	stateControl = createGameState(
		function(){
			timer.reset();
			envi.reset();
			scoreControl.reset();
			// interface
			interfaceControl.displayGame();
		},
		function(){
			interfaceControl.displayGameOver();
		}
	);


	// add some event listener to start the game and switch the camera
	inputControl.addKeyDownAction(32, stateControl.start);

	inputControl.addKeyDownAction(67,
		function(){
			if (!useGameCamera) {
				interfaceControl.switchToGameCamera();
			} else {
				interfaceControl.switchToFreeCamera();
			}
		}
	);
	interfaceControl.switchToGameCamera();
	
	
	//======= RENDERING =======
	
	//composing the scene with post-processing effects
	composer.addPass(new THREE.RenderPass(scene, gameCamera));
	//blurEffect = new THREE.ShaderPass( blurShader );
	//blurEffect.uniforms.width.value = window.innerWidth;
	//blurEffect.uniforms.height.value = window.innerHeight;
	//composer.addPass( blurEffect );
	effect.renderToScreen = true;
	composer.addPass(effect);
	
	function switchComposerCamera(activeCamera) {
		composer.passes = [];
		composer.reset();
		composer.addPass(new THREE.RenderPass(scene, activeCamera));
		//add dof pass
		composer.addPass(effect);
	}
	
	//renders from different cameras
	function renderingCall() {
		composer.render();
	};
	
	
	//animation loop
	function animate() {
		if(stateControl.isRunning) {
			try{
				envi.updateEnviroment();
				scoreControl.update();
				interfaceControl.update();
			}
			catch(exec) {
				stateControl.end();
			}
		}
		requestAnimationFrame(animate);
		stats.update();
		timer.update();
		composer.render();
	};
	animate();
}
