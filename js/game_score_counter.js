function createScoreCounter(){


  //private score counter
  var gameScore;
  var sCount = {};

  sCount.updateGame = function(){
    this.gameScore++;
  };

  sCount.reset = function(){
    this.gameScore = 0;
  };

  sCount.getScore = function(){
    return this.gameScore;
  };

  sCount.reset();

  return sCount;

}
