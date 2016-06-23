function createSpaceShip( settingsObj, materialManager, IO_controls ,timer){
  //spaceship size
  var spaceshipRadius = 0.5;
  var spaceshipLength = 5;

  //ratios compared to spaceship length (eg 0.4 is 40% of length)
  var spaceshipFrontSize = 0.4;
  var spaceshipBodySize = 0.4;
  var spaceshipBackSize = 0.2;

  //spaceship front
  var spaceship_front_geometry = new THREE.CylinderGeometry(0, spaceshipRadius, spaceshipLength*spaceshipFrontSize);
  var spaceship_front_material = materialManager.shipMaterila;
  var spaceship_front = new THREE.Mesh(spaceship_front_geometry, spaceship_front_material);

  //spaceship body
  var spaceship_body_geometry = new THREE.CylinderGeometry(spaceshipRadius, spaceshipRadius, spaceshipLength*spaceshipBodySize);
  var spaceship_body_material = materialManager.shipMaterila;
  var spaceship_body = new THREE.Mesh(spaceship_body_geometry, spaceship_body_material);

  //spaceship tail
  var spaceship_back_geometry =  new THREE.CylinderGeometry(spaceshipRadius/2, spaceshipRadius*4/5, spaceshipLength*spaceshipBackSize);
  var spaceship_back_material = materialManager.shipMaterila;
  var spaceship_back = new THREE.Mesh(spaceship_back_geometry, spaceship_back_material);

  //spaceship collider, aproximated with 3 spheres
  var spaceshipColliders = [];

	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());

  var timeStump = timer.getTime();

  //spaceship assembly
  var spaceship = new THREE.Object3D();
  spaceship.add(spaceship_front);
  spaceship_front.translateY((spaceshipFrontSize/2 + spaceshipBodySize + spaceshipBackSize) * spaceshipLength);
  spaceship.add(spaceship_body);
  spaceship_body.translateY((spaceshipBodySize/2 + spaceshipBackSize) * spaceshipLength);
  spaceship.add(spaceship_back);
  spaceship_back.translateY((spaceshipBackSize/2 * spaceshipLength));

  spaceship.position.set(
    0,
    -spaceshipLength/2,
    settingsObj.gameAreaDepth()/2-spaceshipLength/2
  );

  var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition( spaceship.matrix  );
  var step = 0;

  // collider translation functions
  function translateSpaceshipCollider(x, y){
  	for (var i = 0 ; i < spaceshipColliders.length ; i++) {
  		spaceshipColliders[i].translate(new THREE.Vector3(x,y,0));
  	}
  }
  function translateSpaceshipColliderX(x){
  	translateSpaceshipCollider(x,0);
  }
  function translateSpaceshipColliderY(y){
  	translateSpaceshipCollider(0,y);
  }
  function updateColliders(){
    for (var i = 0 ; i < spaceshipColliders.length ; i++) {
      spaceshipColliders[i].center.setX(spaceship.x);
      spaceshipColliders[i].center.setY(spaceship.z);
    }
  };


  // space ship movement initialization
  IO_controls.addFunction(
    37,
    moveLeft
  );

  IO_controls.addFunction(
    65,
    moveLeft
  );

  IO_controls.addFunction(
    39,
    moveRight
  );

  IO_controls.addFunction(
    68,
    moveRight
  );

  IO_controls.addFunction(
    38,
    moveUp
  );

  IO_controls.addFunction(
    87,
    moveUp
  );

  IO_controls.addFunction(
    40,
    moveDown
  );

  IO_controls.addFunction(
    83,
    moveDown
  );

  //space ship move function definition
  function moveLeft(){
    console.log("left");
    if( spaceshipPosition.x > -settingsObj.gameAreaWidth() / 2+1 ){
      spaceship.translateX(-step);
      // translateSpaceshipColliderX(-step);
      updateColliders();
    }
  }
  function moveRight(){
    console.log("right");
    if(spaceshipPosition.x < settingsObj.gameAreaWidth() / 2-1){
      spaceship.translateX(step);
      // translateSpaceshipColliderX(step);
      updateColliders();
    }
  }
  function moveUp(){
    console.log("up");
    if(spaceshipPosition.y < settingsObj.gameAreaHeight() / 2-1){
      spaceship.translateZ(step);
      // translateSpaceshipColliderY(step);
      updateColliders();
    }
  }
  function moveDown(){
    console.log("down");
    if(spaceshipPosition.y > -settingsObj.gameAreaHeight() / 2+1) {
      spaceship.translateZ(-step);
      // translateSpaceshipColliderY(-step);
      updateColliders();
    }
  }




  var space_ship = {};

  //initialize spaceship position
  // function initializeSpaceshipPosition() {
  //   // spaceship.rotation.x = degInRad(-90);
  //   spaceship.rotation.x = -90 * Math.PI/180;
  //   spaceship.position.set(
  //     0 ,
  //     0 ,
  //     settingsObj.gameAreaDepth()/2-spaceshipLength/2
  //   );
  //
  //
  // };

  //rotate the ship towards asteroids
  spaceship.rotation.x = -90 * Math.PI/180;



  space_ship.reset = function(){

    // reset the ship
    spaceship.position.set(
      0 ,
      0 ,
      settingsObj.gameAreaDepth()/2-spaceshipLength/2
    );

    // reset colliders
    spaceshipColliders[0].radius = spaceshipRadius;
    spaceshipColliders[1].radius = spaceshipRadius;
    spaceshipColliders[2].radius = spaceshipRadius;

    spaceshipColliders[0].center.set(0,0,spaceship.position.z - ((spaceshipFrontSize + spaceshipBodySize/2 )* spaceshipLength));
    spaceshipColliders[1].center.set(0,0,spaceship.position.z);
    spaceshipColliders[2].center.set(0,0,spaceship.position.z + ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));
  };



  //move the spaceship and keep it inside game borders
  space_ship.update = function(){
    var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition( spaceship.matrix );
    step = (timer.getTime() - timeStump) * settingsObj.moveSpeed();
    timeStump = timer.getTime();
    // var step = time * settingsObj.moveSpeed();
    // var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition(spaceship.matrix);
    //
    // if((keyPressed[37] || keyPressed[65]) && spaceshipPosition.x > -settingsObj.gameAreaWidth() / 2+1) {
  	// 	spaceship.translateX(-step);
  	// 	translateSpaceshipColliderX(-step);
  	// }
  	// if((keyPressed[39] || keyPressed[68]) && spaceshipPosition.x < settingsObj.gameAreaWidth() / 2-1) {
  	// 	spaceship.translateX(step);
  	// 	translateSpaceshipColliderX(step);
  	// }
  	// if((keyPressed[38] || keyPressed[87]) && spaceshipPosition.y < settingsObj.gameAreaHeight() / 2-1) {
  	// 	spaceship.translateZ(step);
  	// 	translateSpaceshipColliderY(step);
  	// }
  	// if((keyPressed[40] || keyPressed[83]) && spaceshipPosition.y > -settingsObj.gameAreaHeight() / 2+1) {
  	// 	spaceship.translateZ(-step);
  	// 	translateSpaceshipColliderY(-step);
  	// }
  }





  space_ship.spaceShipObject = function(){
    return spaceship;
  };
  space_ship.isColliding = function(ast){
    // var res = false;
    for (piece in spaceshipColliders){
      if(ast.isCollidingWith(piece)){
        return true;
      }
    }
    return false;
  };

  space_ship.testGenerale = function(){
    console.log(spaceship);
    console.log(spaceshipColliders);
  }

  // initialization
  space_ship.update();

  return space_ship;
}
