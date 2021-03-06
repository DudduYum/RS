"use strict";

function SettingsPanel(areaDepth) {

//=== VARIABLES ===

	//settings variables
	this.dynamic_depthOfField = false;
	this.focus_distance = 100;
	this.pixelation = false;
	this.pixel_size = 8;
	this.edgeDetection = false;

	this.background = true;
	this.inverseColors = false;
	this.saturation = 50;
	this.brightness = 50;
	
	this.music = true;
	this.music_volume = 50;
	this.soundEffects = true;
	this.soundEffects_volume = 100;


//=== CONSTRUCTOR ===
	var  presets = {
		"preset": "Default",
		"remembered": {
			"Default": {
				"0": {
					"dynamic_depthOfField": false,
					"focus_distance": 100,
					"pixelation": false,
					"pixel_size": 8,
					"edgeDetection": false,

					"background": true,
					"inverseColors": false,
					"saturation": 50,
					"brightness": 50,
				}
			},
			"Pen and paper": {
				"0": {
					"dynamic_depthOfField": false,
					"focus_distance": 100,
					"pixelation": false,
					"pixel_size": 8,
					"edgeDetection": true,

					"background": false,
					"inverseColors": true,
					"saturation": 50,
					"brightness": 50,
				}
			},
			"Modern art": {
				"0": {
					"dynamic_depthOfField": false,
					"focus_distance": 100,
					"pixelation": true,
					"pixel_size": 8,
					"edgeDetection": true,

					"background": false,
					"inverseColors": false,
					"saturation": 50,
					"brightness": 50,
				}
			}
		},
		"folders": {}
	}

	var settingsGui = new dat.GUI({load: presets, preset: 'Default', autoPlace: false, width: 350});
	settingsGui.remember(this);
	settingsGui.domElement.style.position = 'absolute';
	settingsGui.domElement.style.top = '0px';
	settingsGui.domElement.style.left = '0px';
	var container = document.getElementById('graphicSettings');
	container.appendChild(settingsGui.domElement);
	
	var graphicSettings_folder = settingsGui.addFolder('Graphic settings');
	
	var effects_folder = graphicSettings_folder.addFolder('Effects');
	effects_folder.open();
	var depthOfField_controller = effects_folder.add(this, 'dynamic_depthOfField');
	var depthOfFieldDistance_controller = effects_folder.add(this, 'focus_distance', 0, areaDepth*9/10).step(1);
	var pixelation_controller = effects_folder.add(this, 'pixelation');
	var pixelationSize_controller = effects_folder.add(this, 'pixel_size', 2, 8).step(1);
	var edgeDetection_controller = effects_folder.add(this, 'edgeDetection');

	var imageSettings_folder = graphicSettings_folder.addFolder('Image settings');
	imageSettings_folder.open();
	var background_controller = imageSettings_folder.add(this, 'background');
	var inverseColors_controller = imageSettings_folder.add(this, 'inverseColors');
	var saturation_controller = imageSettings_folder.add(this, 'saturation', 0, 100);
	var brightness_controller = imageSettings_folder.add(this, 'brightness', 0, 100);
	
	var soundSettings_folder = settingsGui.addFolder('Sound settings');
	var music_controller = soundSettings_folder.add(this, 'music');
	var musicVolume_controller = soundSettings_folder.add(this, 'music_volume', 0 , 100).step(1);
	var soundEffects_controller = soundSettings_folder.add(this, 'soundEffects');
	var soundEffects_volume_controller = soundSettings_folder.add(this, 'soundEffects_volume', 0, 100).step(1);
	

	background_controller.onChange(function(value) {
		setBackground(value);
	});

	inverseColors_controller.onChange(function(value) {
		setInverseColors(value);
	});

	saturation_controller.onChange(function(value) {
		setSaturation(value);
	});

	brightness_controller.onChange(function(value) {
		setBrightness(value);
	});


	depthOfField_controller.onChange(function(value) {
		setDepthOfField(value);
	});

	depthOfFieldDistance_controller.onChange(function(value) {
		setDepthOfFieldDistance(value);
	});

	pixelation_controller.onChange(function(value) {
		setPixelation(value);
	});

	pixelationSize_controller.onChange(function(value) {
		setPixelationSize(value);
	});

	edgeDetection_controller.onChange(function(value) {
		setEdgeDetection(value);
	});
	
	
	music_controller.onChange(function(value) {
		setMusic(value);
	});
	
	musicVolume_controller.onChange(function(value) {
		setMusicVolume(value);
	});
	
	soundEffects_controller.onChange(function(value) {
		setSoundEffects(value);
	});
	
	soundEffects_volume_controller.onChange(function(value) {
		setSoundEffectsVolume(value);
	});
	
}
