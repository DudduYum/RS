"use strict";

function GraphicSettings() {

//=== VARIABLES ===
	
	//settings variables
	this.depthOfField = false;
	this.edgeOnly = false;
	this.pixelation = false;
	
	this.contrast = 50;
	this.brightness = 50;
	
	
	
//=== CONSTRUCTOR ===
	
	var settingsGui = new dat.GUI();
	
	var shaderFolder = settingsGui.addFolder('Shaders');
	shaderFolder.open();
	shaderFolder.add(this, 'depthOfField');
	shaderFolder.add(this, 'edgeOnly');
	shaderFolder.add(this, 'pixelation');
	
	var imageFolder = settingsGui.addFolder('Image settings');
	imageFolder.open();
	imageFolder.add(this, 'contrast', 0, 100);
	imageFolder.add(this, 'brightness', 0, 100);

}


//=== METHODS ===