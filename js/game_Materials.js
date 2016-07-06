"use strict";

function MaterialManager(){
	
//=== VARIABLES ===

	this.asteroidTexture;
	this.spaceshipMaterial;
	this.sunMaterial;
	this.textureLoader = new THREE.TextureLoader();
	
	this.asteroidMaterial;
	
	this.asteroidNormalMap;

	this.asteroidDisplacementMap;
	this.asteroiSpecularMap;



//=== CONSTRUCTOR ===

	this.initAstMaterial();
	
}



//=== METHODS ===

MaterialManager.prototype.loadImg = function(imgSrc){

	var img = this.textureLoader.load(
		// resource URL
		imgSrc,
		// Function when resource is loaded
		function( texture ) {
			// do something with the texture
			// this.material = new THREE.MeshBasicMaterial( {
			// 	map: texture
			//  } );
		},
		// Function called when download progresses
		function( xhr ) {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		// Function called when download errors
		function( xhr ) {
			console.log( 'An error happened' );
		}
	);

	return img;
}


MaterialManager.prototype.createUniforms = function(){


	// asteroid texture
	this.asteroidTexture = this.loadImg('textures/asteroid.jpg');
	this.asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

	// normal map that is used for light calculation
	this.asteroidNormalMap = this.loadImg('textures/normalAst.png');
	this.asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

	// displaysmant map used for vertex distortion
	this.asteroidDisplacementMap = this.loadImg('textures/displaysmentAst.png');
	this.asteroidDisplacementMap.minFilter = THREE.LinearMipMapLinearFilter;
	// asteroidDisplacementMap.anisotropy = renderer.getMaxAnisotropy();

	this.asteroiSpecularMap = this.loadImg('textures/specularAst.png');

	var uniforms = {
		tex: {
			type: "t",
			value: this.asteroidTexture
		},
		normalMap: {
			type:  "t",
			value: this.asteroidNormalMap
		},
		displaysmentMap: {
			type:  "t",
			value: this.asteroiSpecularMap
		},
		specularMap:{
			type:	"t",
			value: new THREE.Vector2(0.2 , 0.2)
		},
		normalScale:{
			type:	"v2",
			value: new THREE.Vector2(3.0 , 3.0)
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
			value: 5.0
		},
		s :{
			type: "f",
			value: 0.6
		}
	};

	return uniforms;
}


MaterialManager.prototype.getMaterialByName = function(objectName){
	var vs = document.getElementById(objectName + "VS").textContent;
	var fs = document.getElementById(objectName + "FS").textContent;


	var material = new THREE.ShaderMaterial({
		uniforms: this.createUniforms(),

		vertexShader: vs,
		fragmentShader: fs
	});

	return material;
}


MaterialManager.prototype.initAstMaterial = function(){

	this.asteroidMaterial = this.getMaterialByName("asteroid");

	//this.asteroidMaterial.uniforms = this.createUniforms();

}


MaterialManager.prototype.getAsteroidMaterial = function(){

	/*var newMaterial = this.asteroidMaterial.clone();

	newMaterial.uniforms = this.createUniforms();

	return newMaterial;*/
	
	return this.asteroidMaterial;
}


// texture initialization
// function(){
//
//
//
//   // asteroid texture
//   asteroidTexture = loadImg('textures/asteroid.jpg');
//
//   // normal map that is used for light calculation
//   asteroidNormalMap = loadImg('textures/normalAst.png');
//
//   // displaysmant map used for vertex distortion
//   asteroidDisplacementMap = loadImg('textures/displaysmentAst.png');
//
//
//
//
// })();


// newMaterial.uniforms = {
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
	// displaysmentMap: {
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

// console.log(newMaterial.uniforms.lightPower);
// uniform

// scene.add(sphere);
