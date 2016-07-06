"use strict";

//this file saves all sheders
// asteroid

function createMaterialManager(){


	var materialManager = {};
	var asteroidTexture;
	var spaceshipMaterial;
	var sunMaterial;
	var textureLoader = new THREE.TextureLoader();



	var asteroidMaterial;

	var asteroidNormalMap;

	var asteroidDisplaysmentMap;
	var asteroiSpecularMap;



	// var pointLightPositio,
	// pointLightPower
	// ;

	// private methods
	materialManager.asteroidMaterial;

	function loadImg(imgSrc){

		var img = textureLoader.load(
			// resource URL
			imgSrc,
			// Function when resource is loaded
			function ( texture ) {
				// do something with the texture
				// var material = new THREE.MeshBasicMaterial( {
				// 	map: texture
				//  } );
			},
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			});


			return img;
	}

	// texture initialization
	// (function (){
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
	//   asteroidDisplaysmentMap = loadImg('textures/displaysmentAst.png');
	//
	//
	//
	//
	// })();


	function createUniforms(){


		// asteroid texture
		asteroidTexture = loadImg('textures/asteroid.jpg');
		asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

		// normal map that is used for light calculation
		asteroidNormalMap = loadImg('textures/normalAst.png');
		asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

		// displaysmant map used for vertex distortion
		asteroidDisplaysmentMap = loadImg('textures/displaysmentAst.png');
		asteroidDisplaysmentMap.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidDisplaysmentMap.anisotropy = renderer.getMaxAnisotropy();

		asteroiSpecularMap = loadImg('textures/specularAst.png');

		var uniforms = {
			tex: {
				type: "t",
				value: asteroidTexture
			},
			normalMap: {
				type:  "t",
				value: asteroidNormalMap
			},
			displaysmentMap: {
				type:  "t",
				value: asteroiSpecularMap
			},
			specularMap:{
				type:	"t",
				value: new THREE.Vector2(0.2 , 0.2)
			},
			normalScale:{
				type:	"v2",
				value: new THREE.Vector2(3.0 , 3.0)
			},
			pointLightPos: {
				type:  "v3",
				value: pointLight.lightPosition
			},
			lightPower: {
				type: "v3",
				value: pointLight.lightPower
			},
			alpha: {
				type: "f",
				value: 3.0
			},
			s :{
				type: "f",
				value: 0.6
			}
		};

		return uniforms;
	}








	function getMaterialByName(objectName){
		var vs = document.getElementById(objectName + "VS").textContent;
		var fs = document.getElementById(objectName + "FS").textContent;





		var material = new THREE.ShaderMaterial({
			uniforms: createUniforms(),

			vertexShader: vs,
			fragmentShader: fs
		});

		return material;
	}

	function initAstMaterial (){

		asteroidMaterial = getMaterialByName("asteroid");


		asteroidMaterial.uniforms = createUniforms();;

	}

	materialManager.getAsteroidMaterial = function(){

		var newMat = asteroidMaterial.clone();

		newMat.uniforms = createUniforms();

		return   newMat;
	}





	// crete default materials
	// materialManager.asteroidMaterial = materialManager.getAsteroidMaterial();
	initAstMaterial();

	var newMat = asteroidMaterial.clone();

	// newMat.uniforms = {
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
		// 	value: asteroidDisplaysmentMap
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

	// console.log(newMat.uniforms.lightPower);
	// uniform

	// scene.add(sphere);

	return materialManager;


}
