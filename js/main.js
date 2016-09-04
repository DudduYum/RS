"use strict";

//======= GLOBAL VARIABLES AND METHODS =======
var switchCameraMode;
var setSaturation;
var setBrightness;
var setDof;
var setPixelation;
var setEdgeOnly;


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
	var graphicSettings = new GraphicSettings();


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
	var mainComposer = new THREE.EffectComposer(renderer, renderTarget);
	var depthComposer = new THREE.EffectComposer(renderer, depthRenderTarget);

	//shaders
	var depthShader = createDepthShader();
		depthShader.uniforms.farPlane.value = 40;
	var imageSettings = createImageSettings();
	var dofShader = createDofShader();
	var pixelationShader = createPixelationShader();

	//depth material
	var depthMaterial = new THREE.ShaderMaterial({
		fragmentShader : depthShader.fragmentShader,
		vertexShader : depthShader.vertexShader,
		uniforms : depthShader.uniforms
	});

	//passes
	var mainRenderPass;
	var depthRenderPass;
	var copyPass;
	var imageSettingsPass;
	var dofPass;
	var pixelationPass;
	




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
		mainComposer = new THREE.EffectComposer(renderer, renderTarget);
		depthComposer = new THREE.EffectComposer(renderer, depthRenderTarget);
		mainRenderPass = new THREE.RenderPass(scene, activeCamera);
		depthRenderPass = new THREE.RenderPass(scene, activeCamera, depthMaterial);
				
		resetShaders();
		
		resetPasses();
			
		depthComposer.addPass(depthRenderPass);
		depthComposer.addPass(copyPass);
		
		mainComposer.addPass(mainRenderPass);
		mainComposer.addPass(imageSettingsPass);
		mainComposer.addPass(pixelationPass);
		mainComposer.addPass(dofPass);
		mainComposer.addPass(copyPass);
		
		
	}
	
	function resetShaders() {
		dofShader.uniforms.width.value = window.innerWidth;
		dofShader.uniforms.height.value = window.innerHeight;
		dofShader.uniforms.tDepth.value = depthComposer.renderTarget1;
		pixelationShader.uniforms.width.value = window.innerWidth;
		pixelationShader.uniforms.height.value = window.innerHeight;
	}
	
	function resetPasses() {
		copyPass = new THREE.ShaderPass(THREE.CopyShader);
		copyPass.renderToScreen = true;
		imageSettingsPass = new THREE.ShaderPass(imageSettings);
		//imageSettingsPass.renderToScreen = true;
		dofPass = new THREE.ShaderPass(dofShader);
		dofPass.enabled = false;
		//dofPass.renderToScreen = false;
		pixelationPass = new THREE.ShaderPass(pixelationShader);
		pixelationPass.enabled = false;
		//pixelationPass.renderToScreen = false;
	}
	
	
	setSaturation = function(value) {
		imageSettings.uniforms.saturation.value = value;
		imageSettingsPass.material.uniforms.saturation.value = value;
	}
	
	setBrightness = function(value) {
		imageSettings.uniforms.brightness.value = value;
		imageSettingsPass.material.uniforms.brightness.value = value;
	}
	
	setDof = function(value) {
		dofPass.enabled = value;
		//dofPass.renderToScreen = value;
	}
	
	setPixelation = function(value) {
		pixelationPass.enabled = value;
		//pixelationPass.renderToScreen = value;
	}
	
	setEdgeOnly = function() {
		
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
		mainComposer.render();
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
		depthComposer.render();
		mainComposer.render();
	};

//LOOP START
	animate();
}
