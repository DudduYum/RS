"use strict";

function MaterialManager(){
	
//=== VARIABLES ===
	this.textureLoader = new THREE.TextureLoader();
	
	this.spaceshipMaterial  = this.getMaterialByName("spaceship");;
	this.spaceshipTexture;
	this.spaceshipNormalMap;
	this.spaceshipSpecularMap;
	
	this.sunMaterial;
	
	this.asteroidTexture;
	this.asteroidMaterial = this.getMaterialByName("asteroid");
	this.asteroidNormalMap;
	this.asteroidDisplacementMap;
	this.asteroidSpecularMap;



//=== CONSTRUCTOR ===
	this.spaceshipMaterial.uniforms = this.createSpaceshipUniforms();
	this.asteroidMaterial.uniforms = this.createAsteroidUniforms();
	
}



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
	var vs = document.getElementById(objectName + "VS").textContent;
	var fs = document.getElementById(objectName + "FS").textContent;


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
			value: new THREE.Vector2(1.0 , 1.0)
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
			value: 0.5
		},
		s :{
			type: "f",
			value: 0.6
		}
	};

	return uniforms;
}
	
	

MaterialManager.prototype.createAsteroidUniforms = function(){

	// asteroid texture
	this.asteroidTexture = this.loadImage('textures/asteroid/asteroid.jpg');
	this.asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

	// normal map that is used for light calculation
	this.asteroidNormalMap = this.loadImage('textures/asteroid/normalAst.png');
	this.asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

	// displaysmant map used for vertex distortion
	this.asteroidDisplacementMap = this.loadImage('textures/asteroid/displaysmentAst.png');
	this.asteroidDisplacementMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidDisplacementMap.anisotropy = renderer.getMaxAnisotropy();

	this.asteroidSpecularMap = this.loadImage('textures/asteroid/specularAst.png');

	var uniforms = {
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
		alpha: {
			type: "f",
			value: 0.5
		},
		s :{
			type: "f",
			value: 0.6
		}
	};

	return uniforms;
}






// texture initialization
// function(){
//
//
//
//   // asteroid texture
//   asteroidTexture = loadImage('textures/asteroid.jpg');
//
//   // normal map that is used for light calculation
//   asteroidNormalMap = loadImage('textures/normalAst.png');
//
//   // displaysmant map used for vertex distortion
//   asteroidDisplacementMap = loadImage('textures/displaysmentAst.png');
//
//
//
//
// })();


// tempMaterialerial.uniforms = {
	// tex: {
	// 	type: "t",
	// 	value: asteroidTexture
	// },
	// normMap: {
	// 	type:  "t",
	// 	value: asteroidNormalMap
	// },
	// normalScale:{
	// 	type:	"vec2",
	// 	value: new THREE.Vector2(0.4 , 0.4)
	// },
	// displacementMap: {
	// 	type:  "t",
	// 	value: asteroidDisplacementMap
	// },
	// pointLightPosition: {
	// 	type:  "vec3",
	// 	value: new THREE.Vector3( .4 , .4 , 0)
	// },
	// lightPower: {
	// 	type: "vec3",
	// 	value: new THREE.Vector3( 30000.0, 30000.0, 30000.0 )
	// },
	// c_spec: {
	// 	type: "vec3",
	// 	value: new THREE.Vector3( 1.0 , .71 , .29)
	// },
	// alpha: {
	// 	type: "f",
	// 	value: 0.9
	// },
	// c_diff: {
	// 	type: "vec3",
	// 	value: new THREE.Vector3( 0.5 , 0.5 , 0.5)
	// },
	// s :{
	// 	type: "f",
	// 	value: 3.0
	// }

// }

// console.log(tempMaterialerial.uniforms.lightPower);
// uniform

// scene.add(sphere);
