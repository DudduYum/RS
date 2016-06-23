
function createGameIOManager(  ){
  var IO_controller = {},
  keyPressed = [],
  keyMapping = {}
  ;

  // the first one shuld a key code
  // adds ongly key down function
  IO_controller.addFunction = function(funKey, funCode){
    keyMapping[funKey] = funCode ;
  };

  IO_controller.keyDownAction = function(event){
    if( keyMapping[ event.keyCode] != undefined ){
      keyMapping[event.keyCode]();
    }
  }

  IO_controller.unitTest = function(){

    console.log(keyMapping);
  };



  return IO_controller;
}
