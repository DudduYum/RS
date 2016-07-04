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







	// var pointLightPositio,
	// pointLightPower
	// ;

	// private methods
	materialManager.asteroidMaterial;

	function loadImg(imgSrc){

		img = textureLoader.load(
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

		// normal map that is used for light calculation
		asteroidNormalMap = loadImg('textures/normalAst.png');

		// displaysmant map used for vertex distortion
		asteroidDisplaysmentMap = loadImg('textures/displaysmentAst.png');

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
				value: asteroidDisplaysmentMap
			}
			// ,
			// pLight: {
			//   type: "vec3",
			//   value: new THREE.Vector3()
			// }
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

	console.log(asteroidMaterial);
	console.log(asteroidMaterial.clone());
	var newMat = asteroidMaterial.clone();

	newMat.uniforms = {
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
			value: asteroidDisplaysmentMap
		}
	}
	return materialManager;


}
