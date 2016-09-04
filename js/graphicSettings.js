"use strict";

function GraphicSettings() {

//=== VARIABLES ===
	
	//settings variables
	this.depthOfField = false;
	this.pixelation = false;
	this.edgeOnly = false;
	
	
	this.saturation = 50;
	this.brightness = 50;
	
	
	
//=== CONSTRUCTOR ===
	
	var settingsGui = new dat.GUI();
	
	var shaderFolder = settingsGui.addFolder('Post-processing');
	shaderFolder.open();
	var dofController = shaderFolder.add(this, 'depthOfField');
	var pixelationController = shaderFolder.add(this, 'pixelation');
	var edgeOnlyController = shaderFolder.add(this, 'edgeOnly');
	
	var imageFolder = settingsGui.addFolder('Image settings');
	imageFolder.open();
	var saturationController = imageFolder.add(this, 'saturation', 0, 100);
	var brightnessController = imageFolder.add(this, 'brightness', 0, 100);
	
	
	
	saturationController.onChange(function(value) {
	  this.saturation = value;
	  setSaturation(value/50);
	});

	brightnessController.onChange(function(value) {
	  this.brightness = value;
	  setBrightness(value/50);
	});
	
	
	dofController.onChange(function(value) {
	  this.depthOfField = value;
	  setDof(value);
	});

	pixelationController.onChange(function(value) {
	  this.pixelation = value;
	  console.log(value);
	  setPixelation(value);
	});

	edgeOnlyController.onChange(function(value) {
	  this.edgeOnly = value;
	});


	

}


//=== METHODS ===

