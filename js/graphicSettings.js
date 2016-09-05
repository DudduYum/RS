"use strict";

function GraphicSettings(areaDepth) {

//=== VARIABLES ===
	
	//settings variables
	this.depthOfField = false;
	this.depthOfField_distance = 20;
	this.pixelation = false;
	this.pixelation_size = 32;
	this.edgeOnly = false;
	this.drunkPilot = false;
	
	
	this.saturation = 50;
	this.brightness = 50;
	
	
	
//=== CONSTRUCTOR ===
	
	var settingsGui = new dat.GUI();
	
	var postProcessing_folder = settingsGui.addFolder('Post-processing');
	postProcessing_folder.open();
	var depthOfField_controller = postProcessing_folder.add(this, 'depthOfField');
	var depthOfField_distance_controller = postProcessing_folder.add(this, 'depthOfField_distance', 0, areaDepth).step(1);
	var pixelation_controller = postProcessing_folder.add(this, 'pixelation');
	var pixelation_size_controller = postProcessing_folder.add(this, 'pixelation_size', 8, 128).step(8);
	var edgeOnly_controller = postProcessing_folder.add(this, 'edgeOnly');
	var drunkPilot_controller = postProcessing_folder.add(this, 'drunkPilot');
	
	var imageSettings_folder = settingsGui.addFolder('Image settings');
	imageSettings_folder.open();
	var saturationController = imageSettings_folder.add(this, 'saturation', 0, 100);
	var brightnessController = imageSettings_folder.add(this, 'brightness', 0, 100);
	
	
	
	saturationController.onChange(function(value) {
		setSaturation(value/50);
	});

	brightnessController.onChange(function(value) {
		setBrightness(value/50);
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

	edgeOnly_controller.onChange(function(value) {
		setEdgeOnly(value);
	});

	drunkPilot_controller.onChange(function(value) {
		setDrunkPilot(value);
	});


}


//=== METHODS ===


