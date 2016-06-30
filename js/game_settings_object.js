function createGameSettings(){
  //general gameSettings
  //screen ratio
  var sRatio = window.innerWidth/window.innerHeight;

  //game area mesurements


  //SPACESHIP SETTINGS
  // spce ship forward velocity
  var forwardVelocity = .5;
  //spaceship movement speed in units per seconds
  var moveSpeed = 3;

  var inertiaValue = .4;
  //ASTEROID SETTINGS
  //miliseconds between asteroid spawn
  // old value = .3
  var spawnDelay = .3;
  //asteroid speed in units per second
  var asteroidSpeed = 20;

  var game_area_H,
  game_area_W,
  game_area_D



  ;

  var ganeTimer;



  function randomCordinate(val){
    return -(val/2) + val * Math.random();
  };

  function randomSize(){
    return 0.5 + 2 * Math.random();
  };

  //default settings
  var configObj = {};


  // set timer
  configObj.setTimerGameTimer = function( newTimer){
    ganeTimer = newTimer;
  }

  // spaceship
  configObj.getForwardVelocity = function(){
    return forwardVelocity;
  };

  configObj.getInertiaValue = function(){
    return inertiaValue;
  };


  configObj.moveSpeed = function(){
    return moveSpeed;
  };

  //asteroid propertys
  configObj.asteroidStartPoint = function(){
    return - game_area_D/2;
  };

  configObj.screenRatio = function(){
    return sRatio;
  };

  configObj.spawnDelay = function (){
    return spawnDelay;
  };

  configObj.asteroidSpeed = function(){
    return asteroidSpeed;
  };




  // game area propertys
  // getters
  configObj.gameAreaWidth = function(){
    return game_area_W;
  };

  configObj.gameAreaHeight = function(){
    return game_area_H;
  };

  configObj.gameAreaDepth = function(){
    return game_area_D;
  };


  // setters
  configObj.setGameAreaWidth = function(width){
    game_area_W = width;
  };

  configObj.setGameAreaHeight = function(height){
    game_area_H = height;
  };

  configObj.setGameAreaDepth = function(depth){
    game_area_D = depth;
  };



  configObj.coordinatRandValue = randomCordinate;
  configObj.sizeRandValue = randomSize;


  //upadate state
  configObj.updateScreenRatio = function(){
    sRatio = window.innerWidth/window.innerHeight;
  }

  // MUST REMOVE...
  configObj.test = function(){
    console.log(configObj.coordinatRandValue(12));
    console.log(configObj.sizeRandValue());
  }
  return configObj;

}