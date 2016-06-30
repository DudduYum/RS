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




  // struttura dati che serve per fare rimanere l'possibilità aggiungere
  // keydown eventi in magnera dinamica e muovere la nave in tutte le direzioni
  movementTraker = {
    hStep: .0,
    vStep: .0
  };

  // function give the ship "random" movement direction on the start
  var randMoveDirection = -1;
  var randMoveSpeed = 0.001;
  function randomMovement(){
    randMoveDirection *= -1 ;

    if(movementTraker.vStep == 0){
      movementTraker.vStep = randMoveSpeed * randMoveDirection;
    }

    if(movementTraker.hStep == 0){
      movementTraker.hStep = randMoveSpeed * randMoveDirection * -1;
    }

  }


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

  // // collider translation functions
  // function translateSpaceshipCollider(x, y){
  // 	for (var i = 0 ; i < spaceshipColliders.length ; i++) {
  // 		spaceshipColliders[i].translate(new THREE.Vector3(x,y,0));
  // 	}
  // }
  // function translateSpaceshipColliderX(x){
  // 	translateSpaceshipCollider(x,0);
  // }
  // function translateSpaceshipColliderY(y){
  // 	translateSpaceshipCollider(0,y);
  // }

  function updateColliders(){
    for (var i = 0 ; i < spaceshipColliders.length ; i++) {
      spaceshipColliders[i].center.setX(spaceship.position.x);
      spaceshipColliders[i].center.setY(spaceship.position.y);
    }
  };


  // space ship movement initialization
  // left
  IO_controls.addKeyDownAction(
    37,
    moveLeft
  );

  IO_controls.addKeyDownAlias(
    65,
    37
  );

  // right
  IO_controls.addKeyDownAction(
    39,
    moveRight
  );

  IO_controls.addKeyDownAlias(
    68,
    39
  );

  // Up
  IO_controls.addKeyDownAction(
    38,
    moveUp
  );

  IO_controls.addKeyDownAlias(
    87,
    38
  );

  //down
  IO_controls.addKeyDownAction(
    40,
    moveDown
  );

  IO_controls.addKeyDownAlias(
    83,
    40
  );

  //space ship move function definition
  function moveLeft(){
    // console.log("left");
    if( spaceshipPosition.x > -settingsObj.gameAreaWidth() / 2+1 ){
      movementTraker.hStep = -step;
      // spaceship.translateX(-step);
      // updateColliders();
    }
  }
  function moveRight(){
    // console.log("right");
    if(spaceshipPosition.x < settingsObj.gameAreaWidth() / 2-1){
      movementTraker.hStep = step;
      // spaceship.translateX(step);
      // updateColliders();
    }
  }
  function moveUp(){
    // console.log("up");
    if(spaceshipPosition.y < settingsObj.gameAreaHeight() / 2-1){
      movementTraker.vStep = step;
      // spaceship.translateZ(step);
      // updateColliders();
    }
  }
  function moveDown(){
    // console.log("down");
    if(spaceshipPosition.y > -settingsObj.gameAreaHeight() / 2+1) {
      movementTraker.vStep = -step;
      // spaceship.translateZ(-step);
      // updateColliders();
    }
  }

  // ship stops moving
  // left
  IO_controls.addKeyUpAction(
    37,
    stopMovingHorizontally
  );

  IO_controls.addKeyUpAlias(
    65,
    37
  );

  // right
  IO_controls.addKeyUpAction(
    39,
    stopMovingHorizontally
  );

  IO_controls.addKeyUpAlias(
    68,
    39
  );

  // Up
  IO_controls.addKeyUpAction(
    38,
    stopMovingVertically
  );

  IO_controls.addKeyUpAlias(
    87,
    38
  );

  //Up
  IO_controls.addKeyUpAction(
    40,
    stopMovingVertically
  );

  IO_controls.addKeyUpAlias(
    83,
    40
  );



  function stopMovingHorizontally(){
    movementTraker.hStep *= settingsObj.getInertiaValue();
    // movementTraker.vStep *= settingsObj.getInertiaValue();
    // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHH senpai notice me");
  };

  function stopMovingVertically(){
    movementTraker.vStep *= settingsObj.getInertiaValue();
    // movementTraker.hStep *= settingsObj.getInertiaValue();
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA senpai notice me");
  };




  var spaceship = {};

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
  //spaceship.rotation.x = -90 * Math.PI/180;



  spaceship.reset = function(){



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
  spaceship.update = function(){
    var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition( spaceship.matrix );
    // step = (timer.getTime() - timeStump) * settingsObj.moveSpeed();
    step = timer.passedTime() * settingsObj.moveSpeed();

    randomMovement();

    if (spaceship.position.x > settingsObj.gameAreaWidth()/2 && movementTraker.hStep > 0 )
      movementTraker.hStep = 0;
    if (spaceship.position.x < - settingsObj.gameAreaWidth()/2 && movementTraker.hStep < 0 )
      movementTraker.hStep = 0;
    if (spaceship.position.y > settingsObj.gameAreaWidth()/2 && movementTraker.vStep > 0 )
      movementTraker.vStep = 0;
    if (spaceship.position.y < - settingsObj.gameAreaWidth()/2 && movementTraker.vStep < 0 )
      movementTraker.vStep = 0;


    spaceship.translateX(movementTraker.hStep);
    spaceship.translateZ(movementTraker.vStep);
    updateColliders();


  }

  spaceship.spaceShipObject = function(){
    return spaceship;
  };

  spaceship.isColliding = function(ast){
    // var res = false;

    for (index in spaceshipColliders){
      // console.log("in isColliding method strt");
      // console.log(spaceshipColliders[index].center);
      // console.log(ast.testCreation() );
      // console.log("in isColliding method STOP");
      if(ast.isCollidingWith(spaceshipColliders[index])){
        return true;
      }
    }
    return false;
  };



// unit tests
  spaceship.testGenerale = function(){
    console.log(spaceship);
    console.log(spaceshipColliders);
  }

  spaceship.colliderMoveTest = function(){
    console.log("--------");
    console.log("--------");
    console.log(spaceship.position);

    console.log("--------");
    console.log(spaceshipColliders[0].center);
    console.log(spaceshipColliders[1].center);
    console.log(spaceshipColliders[2].center);
    console.log("--------");
    console.log("--------");
  }

  // initialization
  spaceship.update();

  return spaceship;
}
