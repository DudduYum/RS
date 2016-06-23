// todo remember to pass the correct
// arguments to this function

function createEnvironment(settingsObject , width, height, depth, timer, IO_controls){

  var
  // GameTimer = timer,
  // forse non serve
  // aWidth = width * settingsObject.screenRatio,
  // aHeight = height,
  // aDepth = depth,

  Settings = settingsObject,

  TextureManager,

  Envi = {},
// asteroid param
  AsteroidNumMax = 10,
  ActiveAsteroid = [],
  PassiveAsteroid = [],

  // spaceship
  spaceS ,



  spamTimeKeeper = timer.getTime(),

  game3Dscene = new THREE.Object3D()


  ;




  (function (){
    // set volume size
    resizeGameArea();
    Settings.setGameAreaDepth(depth);

    //game position
    // game3Dscene.position.set(
    //   0 ,
    //   0 ,
    //   -((Settings.gameAreaDepth() / 2) + 4));

    // init the texture manager
    // tmp code
    TextureManager = {
       asteroidMaterial: new THREE.MeshBasicMaterial({color:0xff0000}),
       shipMaterila : new THREE.MeshBasicMaterial({color:0x00ff00})
     };

    spaceS = createSpaceShip( Settings, TextureManager , IO_controls , timer);
    game3Dscene.add(spaceS.spaceShipObject());
    spaceS.reset();

  })();


  function resizeGameArea(){ //ma serve ancora sta roba... si
    Settings.setGameAreaWidth(width * Settings.screenRatio());
    Settings.setGameAreaHeight(height);
  };


  function activateAsteroids(){

    if(timer.getTime() - spamTimeKeeper > Settings.spawnDelay() ){
      var newAsteroid = PassiveAsteroid.pop();
      newAsteroid.update();
      ActiveAsteroid.push(newAsteroid);


      game3Dscene.add(newAsteroid.mesh());

      spamTimeKeeper = timer.getTime();
    }

  }


  Envi.gameScene = function(){
    return game3Dscene;
  };

  //I don't know why is it stll here
  Envi.updateRatio = function(){
    Settings.updateScreenRatio();
    resizeGameArea();
  };

  //game are position
  Envi.setPosition = function(px, py , pz){
    game3Dscene.position.set(
      px ,
      py ,
      pz
    );
  };

  //game area dimensions
  Envi.width = function(){
    return Settings.gameAreaWidth();
  };

  Envi.height = function(){
    return Settings.gameAreaHeight();
  };

  Envi.depth = function(){
    return Settings.gameAreaDepth();
  };



  //creat asteroid for the future use
  Envi.addAsteroids = function(){

    //if there aren't enough asteroid add some
    while(ActiveAsteroid.length + PassiveAsteroid.length < AsteroidNumMax ) {
      PassiveAsteroid.push( createAsteroid (
          Settings,
          TextureManager
        )
      );
    }


  };
// ASTEROIDS
  //this method moves asteroids and make them visible
  Envi.moveAsteroids = function(){
    if(PassiveAsteroid.length <= 0){
      AsteroidNumMax += 5;
    }

    // correct the number of asteroid dynimically

    this.addAsteroids();


    //activate passive asteroid
    activateAsteroids();
    // var newAsteroid = PassiveAsteroid.pop();
    // newAsteroid.update();
    // ActiveAsteroid.push(newAsteroid);
    //
    //
    // game3Dscene.add(newAsteroid.mesh());


    for (astIndex in ActiveAsteroid ){
      var asteroid = ActiveAsteroid[astIndex];


      asteroid.move( timer.getTime() );

      if( asteroid.hasCrossLimit()){

        ActiveAsteroid.splice(astIndex,1);
        game3Dscene.remove(asteroid.mesh());

        PassiveAsteroid.push(asteroid);
      }
    }
  };

  //return asteroid of index
  Envi.getAsteroid = function(index){
    return this.game3Dscene.children[index];
  };

  //remove all asteroid from the game area
  Envi.removeAsteroids = function(){
    this.game3Dscene = new THREE.Object3D();
    // this.asteroidList = [];
  };

  Envi.updateEniroment = function(){
    // here I will put update for asteroids
  }

// SPACE ship
  Envi.animateEnvironment = function(){
    spaceS.update( );
  }
// unit tests

  Envi.testIO = function(){
    IO_controls.unitTest();
  };
  Envi.initTest = function(){
    console.log("test init");
    console.log(Settings.gameAreaWidth());
    console.log(Settings.gameAreaHeight());
    console.log(Settings.gameAreaDepth());
    console.log(game3Dscene);
  };

  Envi.createAsteroidTest = function(){
    console.log("test crate ast");
    console.log(PassiveAsteroid);
  };

  Envi.moveAsteroidTest = function(){
    // console.log("test move ast");

    // console.log(tmpAsteroid.mesh().position);
    console.log(PassiveAsteroid.length);
    console.log(ActiveAsteroid.length);

    // console.log(ActiveAsteroid)

    // console.log(ActiveAsteroid);
    // console.log(game3Dscene.children.length);
  };

  Envi.positionTest = function(){
    console.log("test position");
    console.log("game position");
    console.log(game3Dscene.position);
    console.log("asteroid position");
    for (astIn in PassiveAsteroid){
      console.log(PassiveAsteroid[astIn].mesh().position);
    }

  };

  Envi.spaceShitTest = function(){
    console.log(game3Dscene);
  };
  // envi.removeAsteroids();

  return Envi;

}
