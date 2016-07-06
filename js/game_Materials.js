//this file saves all sheders
// asteroid

function createMaterialManager(){


	var materialManager = {};



	var textureLoader = new THREE.TextureLoader();


	// asteroid section
	var asteroidMaterial;

	var asteroidTexture;
	var asteroidNormalMap;
	var asteroidDisplaysmentMap;
	var asteroiSpecularMap;




	// spaceship section
	var spacesipMaterial;

	var spacesipTexture;
	var spacesipNormalMap;
	var spacesipSpecularMap;

	// private methods
	// materialManager.asteroidMaterial;
	// materialManager.spacesipMaterial;

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


	function getMaterialByName(objectName){
		var vs = document.getElementById(objectName + "VS").textContent;
		var fs = document.getElementById(objectName + "FS").textContent;

		var material = new THREE.ShaderMaterial({
			vertexShader: vs,
			fragmentShader: fs
		});

		return material;
	}

	// asteroid section
	function createUniformsAst(){


		// asteroid texture
		asteroidTexture = loadImg('textures/asteroid/asteroid.jpg');
		asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

		// normal map that is used for light calculation
		asteroidNormalMap = loadImg('textures/asteroid/normalAst.png');
		asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

		// displaysmant map used for vertex distortion
		asteroidDisplaysmentMap = loadImg('textures/asteroid/displaysmentAst.png');
		asteroidDisplaysmentMap.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidDisplaysmentMap.anisotropy = renderer.getMaxAnisotropy();

		asteroiSpecularMap = loadImg('textures/asteroid/specularAst.png');

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
				value: asteroiSpecularMap
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


	function initAstMaterial (){

		asteroidMaterial = getMaterialByName("asteroid");


		asteroidMaterial.uniforms = createUniformsAst();


	}

	materialManager.getAsteroidMaterial = function(){

		var newMat = asteroidMaterial.clone();

		newMat.uniforms = createUniformsAst();

		return   newMat;
	}









	// spaceship section
	function createUniformsSp(){

		// asteroid texture
		spacesipTexture = loadImg('textures/spaceship/spaceshipTex.jpg');
		asteroidTexture.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidTexture.anisotropy = renderer.getMaxAnisotropy();

		// normal map that is used for light calculation
		spacesipNormalMap = loadImg('textures/spaceship/spaseshipNormal.png');
		asteroidNormalMap.minFilter = THREE.LinearMipMapLinearFilter;
		// asteroidNormalMap.anisotropy = renderer.getMaxAnisotropy

		spacesipSpecularMap = loadImg('textures/spaceship/specular.png');

		var uniforms = {
			tex: {
				type: "t",
				value: spacesipTexture
			},
			normalMap: {
				type:  "t",
				value: spacesipNormalMap
			},
			specularMap:{
				type:	"t",
				value: spacesipSpecularMap
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


	function initSpMaterial (){

		spacesipMaterial = getMaterialByName("spaceship");

		spacesipMaterial.uniforms = createUniformsSp();

	}

	materialManager.redSpaceshipMaterial = function(){
		var newMat = spacesipMaterial.clone();

		newMat.uniforms = createUniformsSp();
		newMat.uniforms.color = {
			type: "v3",
			value: new THREE.Vector3( 1.0 , 0.4 , 0.4)
		};

		return   newMat;
		// return new THREE.MeshBasicMaterial({color:0xff0000});
	}

	materialManager.silverSpaceshipMaterial = function(){
		var newMat = spacesipMaterial.clone();

		newMat.uniforms = createUniformsSp();
		newMat.uniforms.color = {
			type: "v3",
			value: new THREE.Vector3( 0.7 , 0.7 , 0.7)
		};

		return   newMat;
	}

	// crete default materials

	initAstMaterial();
	initSpMaterial();

	return materialManager;


}
