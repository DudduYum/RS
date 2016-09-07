"use strict";

function GraphicSettings(areaDepth) {

//=== VARIABLES ===

	//settings variables
	this.depthOfField = false;
	this.depthOfField_distance = 35;
	this.pixelation = false;
	this.pixelation_size = 16;
	this.edgeOnly = false;
	this.waving = false;
	
	this.background = true;
	this.saturation = 50;
	this.brightness = 50;



//=== CONSTRUCTOR ===

	var settingsGui = new dat.GUI();

	var postProcessing_folder = settingsGui.addFolder('Post-processing');
	postProcessing_folder.open();
	var depthOfField_controller = postProcessing_folder.add(this, 'depthOfField');
	var depthOfField_distance_controller = postProcessing_folder.add(this, 'depthOfField_distance', 0, areaDepth).step(1);
	var pixelation_controller = postProcessing_folder.add(this, 'pixelation');
	var pixelation_size_controller = postProcessing_folder.add(this, 'pixelation_size', 1, 16).step(1);
	var edgeOnly_controller = postProcessing_folder.add(this, 'edgeOnly');
	var waving_controller = postProcessing_folder.add(this, 'waving');

	var imageSettings_folder = settingsGui.addFolder('Image settings');
	imageSettings_folder.open();
	var background_controller = imageSettings_folder.add(this, 'background');
	var saturation_controller = imageSettings_folder.add(this, 'saturation', 0, 100);
	var brightness_controller = imageSettings_folder.add(this, 'brightness', 0, 100);


	background_controller.onChange(function(value) {
		setBackground(value);
	});
	
	saturation_controller.onChange(function(value) {
		setSaturation(value/50);
	});

	brightness_controller.onChange(function(value) {
		setBrightness(value/50);
	});
	

	depthOfField_controller.onChange(function(value) {
		setDepthOfField(value);
	});

	depthOfField_distance_controller.onChange(function(value) {
		setDepthOfFieldDistance(value);
	});
	
	waving_controller.onChange(function(value) {
		setWaving(value);
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

	


}


//=== METHODS ===
