"use strict";

function MaterialManager(){

//=== VARIABLES ===
	this.textureLoader = new THREE.TextureLoader();

	this.spaceshipMaterial = this.getMaterialByName("spaceship");
	this.flameMaterial = this.getMaterialByName("flame");



	this.spaceshipTexture;
	this.spaceshipNormalMap;
	this.spaceshipSpecularMap;
	this.flameTexture = this.loadImage("textures/spaceship/flameOriginal.jpg");
	this.flameDisplaysmentMap = this.loadImage("textures/spaceship/dispFlame.jpg")


	this.sunMaterial;


	this.asteroidTexture = this.loadImage('textures/asteroid/asteroid.jpg');

	this.asteroidNormalMap = this.loadImage('textures/asteroid/normalAst.png');

	this.asteroidDisplacementMap = this.loadImage('textures/asteroid/displaysmentAst.png');

	this.asteroidSpecularMap = this.loadImage('textures/asteroid/specularAst.png');

	this.asteroidMaterial = this.getMaterialByName("asteroid");

	// setting filters
	this.asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
	this.asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	this.asteroidDisplacementMap.minFilter = THREE.LinearMipMapLinearFilter;

	// setting offset

//=== CONSTRUCTOR ===
	// this.spaceshipMaterial.uniforms = this.createSpaceshipUniforms();
	// this.asteroidMaterial.uniforms = this.createAsteroidUniforms();

}


// console.log(MaterialManager)
//=== METHODS ===

MaterialManager.prototype.loadImage = function(imgSrc){

	var img = this.textureLoader.load(
		// resource URL
		imgSrc,
		// loaded
		function() {
			//console.log("image loaded");
		},
		// loading
		function() {
		},
		// error
		function() {
			console.log("image loading error");
		}
	);

	return img;
}


MaterialManager.prototype.getMaterialByName = function(objectName){

	let vs = document.getElementById(objectName + "VS").textContent;
	let fs = document.getElementById(objectName + "FS").textContent;


	var material = new THREE.ShaderMaterial({
		vertexShader: vs,
		fragmentShader: fs
	});

	return material;
}


MaterialManager.prototype.redSpaceshipMaterial = function(){
	var tempMaterial = this.spaceshipMaterial.clone();

	tempMaterial.uniforms = this.createSpaceshipUniforms();
	tempMaterial.uniforms.color = {
		type: "v3",
		value: new THREE.Vector3( 1.0 , 0.4 , 0.4)
	};

	return tempMaterial;
}

MaterialManager.prototype.silverSpaceshipMaterial = function(){
	var tempMaterial = this.spaceshipMaterial.clone();

	tempMaterial.uniforms = this.createSpaceshipUniforms();
	tempMaterial.uniforms.color = {
		type: "v3",
		value: new THREE.Vector3( 0.7 , 0.7 , 0.7)
	};

	return tempMaterial;
}

MaterialManager.prototype.darkSilverSpaceshipMaterial = function(){
	var tempMaterial = this.spaceshipMaterial.clone();

	tempMaterial.uniforms = this.createSpaceshipUniforms();
	tempMaterial.uniforms.color = {
		type: "v3",
		value: new THREE.Vector3( 0.2 , 0.2 , 0.2)
	};

	return tempMaterial;
}

MaterialManager.prototype.azureSpaceshipMaterial = function(){
	var tempMaterial = this.spaceshipMaterial.clone();

	tempMaterial.uniforms = this.createSpaceshipUniforms();
	tempMaterial.uniforms.color = {
		type: "v3",
		value: new THREE.Vector3( 0.8 , 0.8 , 1)
	};

	return tempMaterial;
}

MaterialManager.prototype.getFlameMaterial = function(){
	var tempMaterial = this.flameMaterial.clone();
	// console.log(tempMaterial);
	tempMaterial.uniforms = this.createFlameUniforms();
// console.log(tempMaterial);
	return tempMaterial;
}

// getters
MaterialManager.prototype.getAsteroidMaterial = function(){
	var res = this.asteroidMaterial.clone();
	res.uniforms = this.createAsteroidUniforms();

	return res;
}

MaterialManager.prototype.createSpaceshipUniforms = function(){

	// asteroid texture
	this.spaceshipTexture = this.loadImage('textures/spaceship/spaceshipTex.jpg');
	this.spaceshipTexture.minFilter = THREE.LinearMipMapLinearFilter;

	// normal map that is used for light calculation
	this.spaceshipNormalMap = this.loadImage('textures/spaceship/spaseshipNormal.png');
	this.spaceshipNormalMap.minFilter = THREE.LinearMipMapLinearFilter;

	this.spaceshipSpecularMap = this.loadImage('textures/spaceship/specular.png');

	var uniforms = {
		tex: {
			type: "t",
			value: this.spaceshipTexture
		},
		normalMap: {
			type:  "t",
			value: this.spaceshipNormalMap
		},
		specularMap:{
			type:	"t",
			value: this.spaceshipSpecularMap
		},
		normalScale:{
			type:	"v2",
			value: new THREE.Vector2(0.1 , 0.1)
		},
		pointLightPos: {
			type:  "v3",
			value: pointLight.lightPosition
		},
		lightPower: {
			type: "v3",
			value: pointLight.lightPower
		},
		// color:{
		// 	type: "v3",
		// 	value: new THREE.Vector3( 0.5 , 0.5 , 1.0)
		// },
		ambientLight: {
			type: "v3",
			value: ambientLight.lightPower
		},
		alpha: {
			type: "f",
			value: 1.0
		},
		s :{
			type: "f",
			value: 0.8
		}
	};

	return uniforms;
}

MaterialManager.prototype.createFlameUniforms = function(){
	var uniforms = {
		tex: {
			type: "t",
			value: this.flameTexture
		},
		displacementMap: {
			type:  "t",
			value: this.flameDisplaysmentMap
		},
		distortionFactor: {
			type: "f",
			value: 0.09
		}
		// ,
		// alpha: {
		// 	type: "f",
		// 	value: 0.1
		// }
		// ,
		// x_offset: {
		// 	type: "f",
		// 	value: 0.0
		// },
		// y_offset: {
		// 	type: "f",
		// 	value: 0.0
		// }
	};

	return uniforms;

}

MaterialManager.prototype.createAsteroidUniforms = function(){

	var uniforms = {
		// mapps
		tex: {
			type: "t",
			value: this.asteroidTexture
		},
		normalMap: {
			type:  "t",
			value: this.asteroidNormalMap
		},
		displacementMap: {
			type:  "t",
			value: this.asteroidSpecularMap
		},
		specularMap:{
			type:	"t",
			value:  this.asteroidSpecularMap
		},
		// normal parameters and lights
		normalScale:{
			type:	"v2",
			value: new THREE.Vector2(1.0 , 1.0)
		},
		spLightPos: {
			type:  "v3",
			value: spaceshipLight.lightPosition
		},
		spLightPower: {
			type: "v3",
			value: spaceshipLight.lightPower
		},
		pointLightPos: {
			type:  "v3",
			value: pointLight.lightPosition
		},
		lightPower: {
			type: "v3",
			value: pointLight.lightPower
		},
		ambientLight: {
			type: "v3",
			value: ambientLight.lightPower
		},
		//
		alpha: {
			type: "f",
			value: 0.1
		},
		s :{
			type: "f",
			value: 0.6
		},
		// distortion parameters
		distortionFactor: {
			type: "f",
			value: undefined
		},
		maxDistortion:{
			type: "f",
			value: undefined
		}

	};

	return uniforms;
}
