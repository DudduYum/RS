"use strict";

function GraphicSettings() {

//=== VARIABLES ===
	
	//settings variables
	this.depthOfField = false;
	this.pixelation = false;
	this.edgeOnly = false;
	
	
	this.contrast = 50;
	this.brightness = 50;
	
	
	
//=== CONSTRUCTOR ===
	
	var settingsGui = new dat.GUI();
	
	var shaderFolder = settingsGui.addFolder('Shaders');
	shaderFolder.open();
	var dofController = shaderFolder.add(this, 'depthOfField');
	var pixelController = shaderFolder.add(this, 'pixelation');
	var edgeController = shaderFolder.add(this, 'edgeOnly');
	
	var imageFolder = settingsGui.addFolder('Image settings');
	imageFolder.open();
	var contrastController = imageFolder.add(this, 'contrast', 0, 100);
	var brightnessController = imageFolder.add(this, 'brightness', 0, 100);
	
	
	
	dofController.onChange(function(value) {
	  this.depthOfField = value;
	});

	pixelController.onChange(function(value) {
	  this.pixelation = value;
	});

	edgeController.onChange(function(value) {
	  this.edgeOnly = value;
	});


	contrastController.onChange(function(value) {
	  this.contrast = value;
	});

	brightnessController.onChange(function(value) {
	  this.brightness = value;
	});

}


//=== METHODS ===

