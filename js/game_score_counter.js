function createScoreCounter(timer, settings){


  //private score counter
  var gameScore;
  var sCount = {};

  sCount.update = function(){
    gameScore = Math.round(timer.getTime() * settings.getForwardVelocity());
    // gameScore++;
  };

  sCount.reset = function(){
    gameScore = 0;
  };

  sCount.getScore = function(){
    return gameScore;
  };

  sCount.reset();

  return sCount;

}
