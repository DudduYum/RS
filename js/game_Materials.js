"use strict";

function MaterialManager(){

//=== VARIABLES ===
	this.textureLoader = new THREE.TextureLoader();


	this.spaceshipMaterial = this.getMaterialByName("spaceship");


	this.spaceshipTexture;
	this.spaceshipNormalMap;
	this.spaceshipSpecularMap;

	this.sunMaterial;

	// this.asteroidTexture;
	this.asteroidTexture = this.loadImage('textures/asteroid/asteroid.jpg');
	// this.asteroidNormalMap;
	this.asteroidNormalMap = this.loadImage('textures/asteroid/normalAst.png');
	// this.asteroidDisplacementMap;
	this.asteroidDisplacementMap = this.loadImage('textures/asteroid/displaysmentAst.png');
	// this.asteroidSpecularMap;
	this.asteroidSpecularMap = this.loadImage('textures/asteroid/specularAst.png');

	this.asteroidMaterial = this.getMaterialByName("asteroid");

	// setting filters
	this.asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
	this.asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	this.asteroidDisplacementMap.minFilter = THREE.LinearMipMapLinearFilter;

	// setting offset








//=== CONSTRUCTOR ===
	this.spaceshipMaterial.uniforms = this.createSpaceshipUniforms();
	this.asteroidMaterial.uniforms = this.createAsteroidUniforms();

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
		// vertexShader: shaders.vertexShader,
		vertexShader: vs,
		// fragmentShader: shaders.fragmentShader
		fragmentShader: fs
	});
	// console.log(vs);

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
	// return new THREE.MeshBasicMaterial({color:0xff0000});
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

// getters
MaterialManager.prototype.getAsteroidMaterial = function(){
	var res = this.asteroidMaterial.clone();

	res.uniforms.tex.value = this.asteroidTexture;
	res.uniforms.normalMap.value = this.asteroidNormalMap;
	res.uniforms.displacementMap.value = this.asteroidDisplacementMap;
	// res.uniforms.x_shift.value = Math.random() + 0.1;
	// res.uniforms.y_shift.value = Math.random() + 0.1;
	res.uniforms.shift_direction.value.x = 1.0 + Math.random();
	res.uniforms.shift_direction.value.y = 1.0 + Math.random();
	// console.log(res.uniforms);
	return res;
}

MaterialManager.prototype.createSpaceshipUniforms = function(){

	// asteroid texture
	this.spaceshipTexture = this.loadImage('textures/spaceship/spaceshipTex.jpg');
	this.spaceshipTexture.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

	// normal map that is used for light calculation
	this.spaceshipNormalMap = this.loadImage('textures/spaceship/spaseshipNormal.png');
	this.spaceshipNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

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



MaterialManager.prototype.createAsteroidUniforms = function(){

	// asteroid texture
	// this.asteroidTexture = this.loadImage('textures/asteroid/asteroid.jpg');
	// this.asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

	// normal map that is used for light calculation
	// this.asteroidNormalMap = this.loadImage('textures/asteroid/normalAst.png');
	// this.asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

	// displaysmant map used for vertex distortion
	// this.asteroidDisplacementMap = this.loadImage('textures/asteroid/displaysmentAst.png');
	// this.asteroidDisplacementMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidDisplacementMap.anisotropy = renderer.getMaxAnisotropy();

	// this.asteroidSpecularMap = this.loadImage('textures/asteroid/specularAst.png');

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
		},
		// texture shift
		// serve per fare animazione della mappe
		x_shift:{
			type: "f",
			value: 1.0
		},
		y_shift:{
			type: "f",
			value: 1.0
		},
		shift_direction:{
			type: "v2",
			value: new THREE.Vector2()
		}

	};

	return uniforms;
}
