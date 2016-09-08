"use strict";

//======= GLOBAL VARIABLES AND METHODS =======
var switchCameraMode;
var setSaturation;
var setBrightness;
var setDepthOfField;
var setDepthOfFieldDistance;
var setPixelation;
var setPixelationSize;
var setEdgeOnly;
var setDrunkPilot;


function ProjectOLA(){

//======= VARIABLES =======

	var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
	var canvas = document.getElementById('canvas');
		canvas.appendChild(stats.domElement);



	//cameras
	var aspectRatio = window.innerWidth/window.innerHeight;
	var gameCamera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
	var freeCamera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
		freeCamera.position.set(2,2,2);
	var useGameCamera = true



	// configuration object
	var settings = new GameSettings(12, 12, 300, aspectRatio);

	// game timer
	var timer = new Timer();

	// game state manager
	var gameState;

	// score counter
	var score = new ScoreCounter(timer);


	// keyboard Input managment
	var inputControl = new IOManager();
		window.addEventListener("keydown",inputControl.keyDownAction);
		window.addEventListener("keyup",inputControl.keyUpAction);

	// interface
	var userInterface = new InterfaceManager(canvas, score);

	// graphic settings
	var graphicSettings = new GraphicSettings(settings.game_area_D / 2);


	// environmentronment
	var environment = new Environment(settings, timer, inputControl);


	//3D scene initialization
	var scene = new THREE.Scene();
	scene.add(environment.game3Dscene);



	//renderer and render targets
	var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		canvas.appendChild(renderer.domElement);
	var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	var depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);


	//composers
	var main_composer = new THREE.EffectComposer(renderer, renderTarget);
	var depth_composer = new THREE.EffectComposer(renderer, depthRenderTarget);

	//shaders
	var depth_shader = createDepthShader();
		depth_shader.uniforms.areaDepth.value = settings.game_area_D / 2;
	var imageSettings_shader = createImageSettings();
	var depthOfField_shader = createDofShader();
		depthOfField_shader.uniforms.areaDepth.value = settings.game_area_D / 2;
	var pixelation_shader = createPixelationShader();
	var edgeOnly_shader = createEdgeOnlyShader();

	//depth material
	var depthMaterial = new THREE.ShaderMaterial({
		fragmentShader : depth_shader.fragmentShader,
		vertexShader : depth_shader.vertexShader,
		uniforms : depth_shader.uniforms
	});

	//passes
	var mainRander_pass;
	var depthRender_pass;
	var copy_pass;
	var imageSetttings_pass;
	var depthOfField_pass;
	var pixelation_pass;
	var edgeOnly_pass;




	//initializes mouse controls for free camera
	var orbitControls = new THREE.OrbitControls(freeCamera, renderer.domElement);
		orbitControls.enableKeys = false;
		orbitControls.enabled = false;
		orbitControls.target = new THREE.Vector3(0,0,-10);


//======= CAMERA METHODS =======

	userInterface.setCameraSwitching(
		function(){
			// switch to game camera
			orbitControls.enabled = false;
			useGameCamera = true;
			resetComposers(gameCamera);
		},
		function(){
			// switch to free camera
			useGameCamera = false;
			orbitControls.enabled = true;
			resetComposers(freeCamera);
		}
	);

	//generale camera switch method
	function switchCamera() {
		if(!useGameCamera) {
			userInterface.switchToGameCamera();
		} else {
			userInterface.switchToFreeCamera();
		}
	}

	//assign the camera switch method to a global variable
	switchCameraMode = switchCamera;
	//assign camera switch method to button C
	inputControl.addKeyDownAction(67, switchCamera);


//======= RENDERING METHODS =======

	function resetComposers(activeCamera) {
		main_composer = new THREE.EffectComposer(renderer, renderTarget);
		depth_composer = new THREE.EffectComposer(renderer, depthRenderTarget);
		mainRander_pass = new THREE.RenderPass(scene, activeCamera);
		depthRender_pass = new THREE.RenderPass(scene, activeCamera, depthMaterial);

		resetShaders();

		resetPasses();

		depth_composer.addPass(depthRender_pass);
		depth_composer.addPass(copy_pass);

		main_composer.addPass(mainRander_pass);
		main_composer.addPass(imageSetttings_pass);
		main_composer.addPass(depthOfField_pass);

		main_composer.addPass(pixelation_pass);
		main_composer.addPass(edgeOnly_pass);
		main_composer.addPass(copy_pass);

	}

	function resetShaders() {
		depthOfField_shader.uniforms.width.value = window.innerWidth;
		depthOfField_shader.uniforms.height.value = window.innerHeight;
		depthOfField_shader.uniforms.tDepth.value = depth_composer.renderTarget1;

		pixelation_shader.uniforms.width.value = window.innerWidth;
		pixelation_shader.uniforms.height.value = window.innerHeight;

		edgeOnly_shader.uniforms.width.value = window.innerWidth;
		edgeOnly_shader.uniforms.height.value = window.innerHeight;
	}

	function resetPasses() {
		copy_pass = new THREE.ShaderPass(THREE.CopyShader);
		copy_pass.renderToScreen = true;

		imageSetttings_pass = new THREE.ShaderPass(imageSettings_shader);

		depthOfField_pass = new THREE.ShaderPass(depthOfField_shader);
		depthOfField_pass.enabled = false;

		pixelation_pass = new THREE.ShaderPass(pixelation_shader);
		pixelation_pass.enabled = false;

		edgeOnly_pass = new THREE.ShaderPass(edgeOnly_shader);
		edgeOnly_pass.enabled = false;
	}




//======= GRAPHIC SETTINGS METHODS =======

	setSaturation = function(value) {
		imageSettings_shader.uniforms.saturation.value = value;
		imageSetttings_pass.material.uniforms.saturation.value = value;
	}

	setBrightness = function(value) {
		imageSettings_shader.uniforms.brightness.value = value;
		imageSetttings_pass.material.uniforms.brightness.value = value;
	}

	setDepthOfField = function(value) {
		depthOfField_pass.enabled = value;
	}

	setDepthOfFieldDistance = function(value) {
		depthOfField_shader.uniforms.focusLimit.value = value;
		depthOfField_pass.material.uniforms.focusLimit.value = value;
	}

	setPixelation = function(value) {
		pixelation_pass.enabled = value;
	}

	setPixelationSize = function(value) {
		pixelation_shader.uniforms.pixelationSize.value = value;
		pixelation_pass.material.uniforms.pixelationSize.value = value;
	}

	setEdgeOnly = function(value) {
		edgeOnly_pass.enabled = value;
	}

	setDrunkPilot = function(value) {

	}


//======= OTHER METHODS =======

	//resizes the renderer and the game area if the window resizes
	window.addEventListener('resize',
		function(){
			aspectRatio = window.innerWidth/window.innerHeight;

			gameCamera.aspect = aspectRatio;
			freeCamera.aspect = aspectRatio;

			gameCamera.updateProjectionMatrix();
			freeCamera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
			depthRenderTarget.setSize(window.innerWidth, window.innerHeight);

			resetShaders();
			resetPasses();

			settings.updateRatio(aspectRatio);
		},
		false
	);



//======= GAME LOOP =======

	// game state initializzation (function for game start and end)
	gameState = new GameState(
		function(){
			score.reset();
			timer.reset();
			environment.reset();
			userInterface.displayGame();
		},
		function(){
			userInterface.displayGameOver();
		}
	);


	//add event listener to start the game and switch the camera

	inputControl.addKeyDownAction(32,
		function(){
			if(gameState.isRunning()) {
				environment.immobilizeSpaceship();
			} else {
				gameState.startGame();
			}
		}
	);





//======= RENDERING =======

	resetComposers(gameCamera);



	//renders from different cameras
	function renderingCall() {
		main_composer.render();
	};

	//animation loop
	function animate() {
		if(gameState.isRunning()) {
			try{
				environment.update();
				userInterface.update();
				score.update();
			}
			catch(exec) {
				//console.log(exec);
				gameState.stopGame();
			}
		} else if(!gameState.isOver()){
			environment.rotateSpaceship();
		}

		requestAnimationFrame(animate);
		stats.update();
		timer.update();
		depth_composer.render();
		main_composer.render();
	};

//LOOP START
	animate();
}
