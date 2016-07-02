//this file saves all sheders
// asteroid

function createMaterialManager(){
	
	var materialManager = {};
	var asteroidTexture;
	var spaceshipMaterial;
	var sunMaterial;
	var textureLoader;
	

	materialManager.asteroidMaterial;



	(function (){
		// textureLoader manager initialization
		var textureLoader = new THREE.TextureLoader();


		// load a resource
		asteroidTexture = textureLoader.load(
			// resource URL
			'textures/asteroid.jpg',
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
	})();

	materialManager.getAsteroidMaterial = function(){



		var material = this.getMaterialByName("asteroid");
		console.log(asteroidTexture);

		var uniforms = {
			tex: {
				type: "t",
				value: asteroidTexture
			}
		};

		material.uniforms = uniforms;


		return material;
	}

	materialManager.getMaterialByName = function(objectName){
		var vs = document.getElementById(objectName + "VS").textContent;
		var fs = document.getElementById(objectName + "FS").textContent;

		var uniforms = {};

		var material = new THREE.ShaderMaterial({
			uniforms: uniforms,

			vertexShader: vs,
			fragmentShader: fs
		});

		return material;
	}


	// crete default materials
	materialManager.asteroidMaterial = materialManager.getAsteroidMaterial();

	return materialManager;
}
