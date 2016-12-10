//"use strict";

//======= GLOBAL VARIABLES AND METHODS =======
var switchCameraMode;
var setBackground;
var setInverseColors;
var setSaturation;
var setBrightness;
var setDepthOfField;
var setDepthOfFieldDistance;
var setMotionBlur;
var setMotionBlurPersistence;
var setPixelation;
var setPixelationSize;
var setEdgeDetection;
var setMusic;
var setMusicVolume;



function ProjectOLA(){

//======= VARIABLES =======

	var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		stats.domElement.style.left = '300px';

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
	var score = new ScoreCounter(timer, settings);


	// keyboard Input managment
	var inputControl = new IOManager();
		window.addEventListener("keydown",inputControl.keyDownAction);
		window.addEventListener("keyup",inputControl.keyUpAction);

	// interface
	var userInterface = new InterfaceManager(canvas, score);
	userInterface.displayLoading();

	// graphic settings
	var settingsPanel = new SettingsPanel(settings.game_area_D);


	// environmentronment
	var environment = new Environment(settings, timer, inputControl);


	//3D scene initialization
	var scene = new THREE.Scene();
	scene.add(environment.game3Dscene);


	//renderer
	var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		canvas.appendChild(renderer.domElement);


	//composers
	var depth_composer = new THREE.EffectComposer(renderer);
	var main_composer = new THREE.EffectComposer(renderer);
	THREE.EffectComposer.prototype.swapTargets = function() {
		var tmp = this.renderTarget2;
		this.renderTarget2 = this.renderTarget1;
		this.renderTarget1 = tmp;
	};

	//shaders
	var depth_shader = createDepthShader();
		depth_shader.uniforms.areaDepth.value = settings.game_area_D / 2;
	var imageSettings_shader = createImageSettings();
	var depthOfField_shader = createDofShader();
		depthOfField_shader.uniforms.areaDepth.value = settings.game_area_D / 2;
	var pixelation_shader = createPixelationShader();
	var edgeDetection_shader = createEdgeDetectionShader();

	//depth material
	var depthMaterial = new THREE.ShaderMaterial({
		side: THREE.DoubleSide,
		fragmentShader : depth_shader.fragmentShader,
		vertexShader : depth_shader.vertexShader,
		uniforms : depth_shader.uniforms
	});

	//passes
	var mainRender_pass;
	var depthRender_pass;
	//var copy_pass;

	var imageSettings_pass;
	var depthOfField_pass;
	var pixelation_pass;
	var edgeDetection_pass;



	//initializes mouse controls for free camera
	var orbitControls = new THREE.OrbitControls(freeCamera, renderer.domElement);
		// orbitControls.addEventListener( 'change', animate );
		orbitControls.enableKeys = false;
		orbitControls.enabled = false;
		orbitControls.target = new THREE.Vector3(0,0,-10);
		
		
//======= SOUND =======
	
	var musicIsLoaded = false;
	var listener = new THREE.AudioListener();
	gameCamera.add(listener);
	freeCamera.add(listener);
	var music = new THREE.Audio(listener);
	var explosion = new THREE.Audio(listener);
	music.load('sound/music.mp3');
	
	explosion.load('sound/explosion.mp3');
	/*var loader = new THREE.AudioLoader();
	loader.load(
			'sound/music.mp3',
			function(audioBuffer){
				music.setBuffer(audioBuffer);
				musicIsLoaded = true;
			},
			function() {},
			function() {}
	);
	loader.load(
			'sound/explosion.mp3',
			function(audioBuffer) {
				explosion.setBuffer(audioBuffer);
			},
			function() {},
			function() {}
	);*/
	music.setVolume(0.5);
	scene.add(music);
	scene.add(explosion);


	
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
	switchCameraMode = function() {
		if(!useGameCamera) {
			userInterface.switchToGameCamera();
		} else {
			userInterface.switchToFreeCamera();
		}
	};



//======= RENDERING METHODS =======

	function resetComposers(activeCamera) {
		depth_composer = new THREE.EffectComposer(renderer);
		main_composer = new THREE.EffectComposer(renderer);

		mainRender_pass = new THREE.RenderPass(scene, activeCamera);
		depthRender_pass = new THREE.RenderPass(scene, activeCamera, depthMaterial);

		resetShaders();

		resetPasses();

		depth_composer.addPass(depthRender_pass);

		main_composer.addPass(mainRender_pass);
		main_composer.addPass(depthOfField_pass);
		main_composer.addPass(pixelation_pass);
		main_composer.addPass(edgeDetection_pass);
		main_composer.addPass(imageSettings_pass);

	}

	function resetShaders() {

		depthOfField_shader.uniforms.width.value = window.innerWidth;
		depthOfField_shader.uniforms.height.value = window.innerHeight;
		depthOfField_shader.uniforms.tDepth.value = depth_composer.renderTarget2;

		pixelation_shader.uniforms.width.value = window.innerWidth;
		pixelation_shader.uniforms.height.value = window.innerHeight;

		edgeDetection_shader.uniforms.width.value = window.innerWidth;
		edgeDetection_shader.uniforms.height.value = window.innerHeight;
	}

	function resetPasses() {

		imageSettings_pass = new THREE.ShaderPass(imageSettings_shader);
		imageSettings_pass.renderToScreen = true;

		depthOfField_pass = new THREE.ShaderPass(depthOfField_shader);
		depthOfField_pass.enabled = settingsPanel.dynamic_depthOfField;

		pixelation_pass = new THREE.ShaderPass(pixelation_shader);
		pixelation_pass.enabled = settingsPanel.pixelation;

		edgeDetection_pass = new THREE.ShaderPass(edgeDetection_shader);
		edgeDetection_pass.enabled = settingsPanel.edgeDetection;
	}




//======= GRAPHIC SETTINGS METHODS =======

	setBackground = function(value) {
		environment.openSpace.visible = value;
	};

	setInverseColors = function(value) {
		var bool;
		if(value)
			bool = 1.0;
		else
			bool = 0.0;
		imageSettings_shader.uniforms.inverseColors.value = bool;
		imageSettings_pass.material.uniforms.inverseColors.value = bool;
	};

	setSaturation = function(value) {
		imageSettings_shader.uniforms.saturation.value = value / 50;
		imageSettings_pass.material.uniforms.saturation.value = value / 50;
	};

	setBrightness = function(value) {
		imageSettings_shader.uniforms.brightness.value = value / 50;
		imageSettings_pass.material.uniforms.brightness.value = value / 50;
	};

	setDepthOfField = function(value) {
		depthOfField_pass.enabled = value;
	};

	setDepthOfFieldDistance = function(value) {
		depthOfField_shader.uniforms.focusLimit.value = value;
		depthOfField_pass.material.uniforms.focusLimit.value = value;
	};

	setPixelation = function(value) {
		pixelation_pass.enabled = value;
	};

	setPixelationSize = function(value) {
		pixelation_shader.uniforms.pixelationSize.value = value;
		pixelation_pass.material.uniforms.pixelationSize.value = value;
	};

	setEdgeDetection = function(value) {
		edgeDetection_pass.enabled = value;
	};
	
	setMusic = function(value) {
		if(value) {
			setMusicVolume(settingsPanel.music_volume);
		} else {
			music.setVolume(0.0);
		}
	}
	
	setMusicVolume = function(value) {
		if(settingsPanel.music) {
			music.setVolume(value/100);
		}
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
			depth_composer.setSize(window.innerWidth, window.innerHeight);
			main_composer.setSize(window.innerWidth, window.innerHeight);

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
			settings.reset();
			environment.reset();
			userInterface.displayGame();
			music.play();
		},
		function(){
			timer.pause();
			if(music.isPlaying == true) {
				music.pause();
			} else {
				music.play();
			}
		},
		function(){
			userInterface.displayGameOver();
			music.stop();
		}
	);



	//======= KEY BINDING =======

	//assign camera switch method to C key
	inputControl.addKeyDownAction(67, switchCameraMode);
	//assign game pause method to P key
	inputControl.addKeyDownAction(
		80,
		function(){
			gameState.pauseGame();
		});
	//assign game start or spaceship lock to Spacebar key

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

//LOADING COMPLETE
	//wait 4 second to be sure everything is loaded correctly
	setTimeout(function(){
		userInterface.displayInitialScreen();
		gameState.gameCanStart = true;
	},4000);
	
	
	//animation loop
	function animate() {
		if(gameState.isRunning()) {
			try{
				environment.update();
			}
			catch(exec) {
				explosion.play();
				gameState.stopGame();
				console.log(exec);
			}
			userInterface.update();
			score.update();
		} else if(!gameState.isOver()){
			environment.rotateSpaceship();
		}

		requestAnimationFrame(animate);
		stats.update();
		timer.update();
		depth_composer.render();
		main_composer.render();
	}

//LOOP START
	animate();
}
