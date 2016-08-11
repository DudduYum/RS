"use strict";

//======= GLOBAL VARIABLES AND METHODS =======
var switchCameraMode;


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



	// environmentronment
	var environment = new Environment(settings, timer, inputControl);


	//3D scene initialization
	var scene = new THREE.Scene();
	//scene.fog = new THREE.FogExp2(0x000000, 0.0015);
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
	// var depthShader

	var depthShader = createDepthShader();
		depthShader.uniforms.farPlane.value = 140;
	var dofShader = createDofShader();
		dofShader.uniforms.width.value = window.innerWidth;
		dofShader.uniforms.height.value = window.innerHeight;
		dofShader.uniforms.tDepth.value = depthComposer.renderTarget1;

	//depth material
	var depthMaterial = new THREE.ShaderMaterial({
		fragmentShader : depthShader.fragmentShader,
		vertexShader : depthShader.vertexShader,
		uniforms : depthShader.uniforms
	});

	//passes
	var mainRenderPass;
		mainRenderPass = new THREE.RenderPass(scene, gameCamera);
	var depthRenderPass;
		depthRenderPass = new THREE.RenderPass(scene, gameCamera, depthMaterial);
	var dofPass = new THREE.ShaderPass(dofShader);
		dofPass.renderToScreen = true;
	var depthPass = new THREE.ShaderPass(THREE.CopyShader);

		depthPass.renderToScreen = true;




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
			resetComposer(gameCamera);
		},
		function(){
			// switch to free camera
			useGameCamera = false;
			orbitControls.enabled = true;
			resetComposer(freeCamera);
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

	//assign the camera switch method to a globarl variable
	switchCameraMode = switchCamera;
	//assign camera switch method to button C
	inputControl.addKeyDownAction(67, switchCamera);

	//switches the camera used by the composer by recreating composing order
	//with new render passes
	function resetComposer(activeCamera) {
		mainComposer = new THREE.EffectComposer(renderer, renderTarget);
		depthComposer = new THREE.EffectComposer(renderer, depthRenderTarget);
		mainRenderPass = new THREE.RenderPass(scene, activeCamera);
		depthRenderPass = new THREE.RenderPass(scene, activeCamera, depthMaterial);
		depthComposer.addPass(depthRenderPass);
		depthComposer.addPass(depthPass);
		mainComposer.addPass(mainRenderPass);
		mainComposer.addPass(dofPass);
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

	//rendering depth image
	depthComposer.addPass(depthRenderPass);
	depthComposer.addPass(depthPass);

	//composing final image
	mainComposer.addPass(mainRenderPass);
	mainComposer.addPass(dofPass);




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
