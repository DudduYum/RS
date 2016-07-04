function createAsteroid(settingsObject, materialManager, timer){

	// var AsteroidMaterial = materialManager.asteroidMaterial();


	var asteroid = {};




	// create mesh
	var geom = new THREE.SphereGeometry(1, 32, 32);


	var mat = materialManager.getAsteroidMaterial();

	// console.log(mat.map);
	// mat.needsinitialize = true;

	// console.log(mat);




	// define propertys and behavior

	//public methods
	var mesh = new THREE.Mesh(geom , mat);

	var activationTime;

	var collider = mesh.geometry.boundingSphere.clone();




	// define propertys and behavior

	//public methods

	asteroid.mesh = function(){
		return mesh;
	};

	asteroid.move = function(time){
		//time passed since the creation
		passedTime = time - activationTime;

		// move quantity
		var step = passedTime  * settingsObject.asteroidSpeed() ;

		// move mesh
		mesh.position.setZ(settingsObject.asteroidStartPoint() + step);
		// move collider
		collider.center.setZ(settingsObject.asteroidStartPoint() + step);
	};

	asteroid.hasCrossLimit = function(){
		// return mesh.position.z >= - settingsObject.gameAreaDepth() / 2 + 5;
		return mesh.position.z >= settingsObject.gameAreaDepth() / 2 + 5;
	};

	asteroid.initialize = function(){
		//reset timestamp
		activationTime = timer.getTime();

		//reset position
		mesh.position.set(
			settingsObject.randomCoordinate(settingsObject.gameAreaWidth()*2),  //X
			settingsObject.randomCoordinate(settingsObject.gameAreaHeight()*2),  //Y
			settingsObject.asteroidStartPoint()
		);

		// rescale mesh
		var size = settingsObject.randomSize();
		mesh.scale.x = size;
		mesh.scale.y = size;
		mesh.scale.z = size;

		//initialize collider
		collider.center.set(mesh.position.x, mesh.position.y, mesh.position.z);
		collider.radius = size;
	};

	asteroid.isCollidingWith = function(sphere){
		return collider.intersectsSphere(sphere);
	};
	
	// change position
	(function (){
		// mesh.position.set(
		//   settingsObject.coordinatRandValue( settingsObject.gameAreaWidth() ),  //X
		//   settingsObject.coordinatRandValue( settingsObject.gameAreaHeight() ),  //Y
		//   settingsObject.gameAreaDepth());

		asteroid.initialize();
	})();

	asteroid.testCreation = function(){
		console.log(mesh.position);
		console.log(collider.center);
	};

	asteroid.testMove = function(){
		console.log(mesh.position);
		console.log(- settingsObject.gameAreaDepth() / 2 + 5);

		console.log(asteroid.hasCrossLimit());
	};

	asteroid.testAnomalia = function(){
		console.log(mesh.position.z);
	};


	return asteroid;


}
