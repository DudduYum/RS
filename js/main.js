function main(){
	// configuration object
	var settingsObj = createGameSettings();

	// game timer
	var timer = createTimer();

	// game state manager
	var gameStateControl;

	// score counter
	var scoreControl = createScoreCounter( timer , settingsObj);

	// keyboard Input managment
	var inputControl = createGameIOManager();
	window.addEventListener("keydown",inputControl.keyDownAction);
	window.addEventListener("keyup",inputControl.keyUpAction);

	// interface
	var interfaceControl = createInterfaceManager( scoreControl );

	// assign cameraswitch action to the botton
	switchToGameCamera = interfaceControl.switchToGameCamera;
	switchToFreeCamera = interfaceControl.switchToFreeCamera;

	// environment
	var envi = createEnvironment(settingsObj, 12, 12, 300, timer, inputControl, scoreControl);

	// init of environment
	envi.setPosition(0,	0, 0);
	//-((settingsObj.gameAreaDepth() / 2) + 4));

	//3D scene initialization
	var scene = new THREE.Scene();
	//scene.fog = new THREE.FogExp2(0x000000, 0.0015);

	//two cameras
	var gameCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);
	var freeCamera = new THREE.PerspectiveCamera(75, settingsObj.screenRatio(), 0.1, 1000);
		freeCamera.position.set(2,2,2);
	var useGameCamera = true
	
	//renderer and render targets
	var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
	var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	var depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	
	//composers
	var mainComposer = new THREE.EffectComposer(renderer, renderTarget);
	var depthComposer = new THREE.EffectComposer(renderer, depthRenderTarget);
	
	//shaders
	var depthShader = createDepthShader();
		depthShader.uniforms.farPlane.value = 140;
	var dofShader = createDofShader();
		dofShader.uniforms.width.value = window.innerWidth;
		dofShader.uniforms.height.value = window.innerHeight;
		dofShader.uniforms.tDepth.value = depthComposer.renderTarget1;
	
	
	//passes
	var mainRenderPass;
	var depthRenderPass;
	var dofPass = new THREE.ShaderPass(dofShader);
		dofPass.renderToScreen = true;
	var depthPass = new THREE.ShaderPass(THREE.CopyShader);
		depthPass.renderToScreen = true;

	
	//depth material
	var depthMaterial = new THREE.ShaderMaterial({
		fragmentShader : depthShader.fragmentShader,
		vertexShader : depthShader.vertexShader,
		uniforms : depthShader.uniforms
	});
	

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
			switchComposerCamera(gameCamera);
		},
		function(){
			// switch to free camera
			useGameCamera = false;
			orbitControls.enabled = true;
			switchComposerCamera(freeCamera);
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
			
			renderer.setSize(window.innerWidth, window.innerHeight);
			depthRenderTarget.setSize(window.innerWidth, window.innerHeight);
		},
		false
	);



	// GAME LOOP //
	// game state initializzation (function for game start and end)
	gameStateControl = createGameState(
		function(){
			
			scoreControl.reset();
			timer.reset();
			envi.reset();
			interfaceControl.displayGame();
		},
		function(){
			interfaceControl.displayGameOver();
		}
	);


	// add some event listener to start the game and switch the camera
	inputControl.addKeyDownAction(32, 
		function(){
			if(gameStateControl.isRunning()) {
				envi.immobilizeSpaceship();
			} else {
				gameStateControl.startGame();
			}
		}
	);

	inputControl.addKeyDownAction(67,
		function(){
			if (!useGameCamera) {
				interfaceControl.switchToGameCamera();
			} else {
				interfaceControl.switchToFreeCamera();
			}
		}
	);
	
	//interfaceControl.switchToGameCamera();
	
	
	//======= RENDERING =======
	//set render passes
	mainRenderPass = new THREE.RenderPass(scene, gameCamera);
	depthRenderPass = new THREE.RenderPass(scene, gameCamera, depthMaterial);
	
	//rendering depth image
	depthComposer.addPass(depthRenderPass);
	depthComposer.addPass(depthPass);
	
	//composing final image
	mainComposer.addPass(mainRenderPass);
	mainComposer.addPass(dofPass);
	
	function switchComposerCamera(activeCamera) {
		mainRenderPass = new THREE.RenderPass(scene, activeCamera);
		depthRenderPass = new THREE.RenderPass(scene, activeCamera, depthMaterial);
		depthComposer.addPass(depthRenderPass);
		depthComposer.addPass(depthPass);
		mainComposer.addPass(mainRenderPass);
		mainComposer.addPass(dofPass);
	}
	
	//renders from different cameras
	function renderingCall() {
		mainComposer.render();
	};
	
	//animation loop
	function animate() {
		if(gameStateControl.isRunning()) {
			try{
				envi.updateEnviroment();
				interfaceControl.update();
				scoreControl.update();
			}
			catch(exec) {
				gameStateControl.stopGame();
			}
		} else if(!gameStateControl.isOver()){
			envi.rotateSpaceship();
		}
		requestAnimationFrame(animate);
		stats.update();
		timer.update();
		depthComposer.render();
		mainComposer.render();
	};
	
	animate();
}
