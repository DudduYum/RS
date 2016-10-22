"use strict";

function GraphicSettings(areaDepth) {

//=== VARIABLES ===

	//settings variables
	this.dynamic_depthOfField = false;
	this.focus_distance = 35;
	this.pixelation = false;
	this.pixel_size = 12;
	this.edgeDetection = false;
	
	this.background = true;
	this.inverseColors = false;
	this.saturation = 50;
	this.brightness = 50;



//=== CONSTRUCTOR ===
	var  presets = {
		"preset": "Default",
		"remembered": {
			"Default": {
				"0": {
					"dynamic_depthOfField": false,
					"focus_distance": 35,
					"pixelation": false,
					"pixel_size": 12,
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
					"focus_distance": 35,
					"pixelation": false,
					"pixel_size": 12,
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
					"focus_distance": 35,
					"pixelation": true,
					"pixel_size": 12,
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

	var settingsGui = new dat.GUI({load: presets, preset: 'Default', autoPlace: false, width: 300});
	settingsGui.remember(this);
	settingsGui.domElement.style.position = 'absolute';
	settingsGui.domElement.style.top = '0px';
	settingsGui.domElement.style.left = '0px';
	var container = document.getElementById('graphicSettings');
	container.appendChild(settingsGui.domElement);

	var effects_folder = settingsGui.addFolder('Effects');
	effects_folder.open();
	var depthOfField_controller = effects_folder.add(this, 'dynamic_depthOfField');
	var depthOfField_distance_controller = effects_folder.add(this, 'focus_distance', 0, areaDepth).step(1);
	var pixelation_controller = effects_folder.add(this, 'pixelation');
	var pixelation_size_controller = effects_folder.add(this, 'pixel_size', 2, 12).step(1);
	var edgeDetection_controller = effects_folder.add(this, 'edgeDetection');
	
	var imageSettings_folder = settingsGui.addFolder('Image settings');
	imageSettings_folder.open();
	var background_controller = imageSettings_folder.add(this, 'background');
	var inverseColors_controller = imageSettings_folder.add(this, 'inverseColors');
	var saturation_controller = imageSettings_folder.add(this, 'saturation', 0, 100);
	var brightness_controller = imageSettings_folder.add(this, 'brightness', 0, 100);


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

	depthOfField_distance_controller.onChange(function(value) {
		setDepthOfFieldDistance(value);
	});
	
	pixelation_controller.onChange(function(value) {
		setPixelation(value);
	});

	pixelation_size_controller.onChange(function(value) {
		setPixelationSize(value);
	});

	edgeDetection_controller.onChange(function(value) {
		setEdgeDetection(value);
	});

	
}