// TODO
// some function must be passed as arguments, it's the best
// I can do right now

function createGameState(startFun, stopFun ){
  //true if game is running righ now
  var gameRunning = false,

  // i blochi che vengono chiamati dalla
  startAction = startFun,
  stopAction = stopFun,
  gameCntr = {};

  //constructor


  // getter
  gameCntr.isRunning = function(){
    return gameRunning;
  };

  //setters
  //set to start state and
  // execute some call back function
  gameCntr.start = function(){
    if( !gameRunning ){
      gameRunning = true;

      //use callBack function call
      if(startAction != undefined){
        startAction();
      }
    }

    if(gameRunning == true)
      console.log("warring: game is alredy running !");

  }

  //set to stop state and
  // execute some call back function
  gameCntr.end = function(){
    if( gameRunning ){
      gameRunning = false;

      //use callBack function call
      if(stopAction != undefined){
        stopAction();
      }
    }

    if(gameRunning == false)
      console.log("warring: game is alredy stopped !");

  }



  //init :)
  // gameCntr.stop();

  // unit tests
  gameCntr.testInit = function(){
    console.log(startAction);
    console.log(stopAction);
  };



  return gameCntr;

}
