// TODO
// some function must be passed as arguments, it's the best
// I can do right now

function createGameState(startFun, stopFun ){
  //true if game is running righ now
  var gameRunning,

  // i blochi che vengono chiamati dalla
  startAction = startFun,
  stopAction = stopFun,
  gameCntr = {};

  //constructor


  // getter
  gameCntr.isRunning = function(){
    return this.gameRunning;
  };

  //setters
  //set to start state and
  // execute some call back function
  gameCntr.start = function(){
    if(this.gameRunning == true)
      console.log("warring: game is alredy running !");
    this.gameRunning = true;

    //use callBack function call
    if(startAction != undefined){
      startAction();
    }

  }

  //set to stop state and
  // execute some call back function
  gameCntr.stop = function(){
    if(this.gameRunning == false)
      console.log("warring: game is alredy stopped !");
    this.gameRunning = false;

    //use callBack function call
    if(stopAction != undefined){
      stopAction();
    }
  }



  //init :)
  gameCntr.stop();

  // unit tests
  gameCntr.testInit = function(){
    console.log(startAction);
    console.log(stopAction);
  };



  return gameCntr;

}
