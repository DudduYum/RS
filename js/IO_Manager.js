
function createGameIOManager( ){
	var IO_controller = {},
	// keyPressed = [],
	keyDownMapping = {},
	keyUpMapping = {}
	;

	// KEY DOWN ACTIONS

	// the first one shuld be a key code
	// adds ongly key down function
	IO_controller.addKeyDownAction = function(funKey, funCode){
		keyDownMapping[funKey] = funCode ;
	};

	// thanks to this method you don't need to add the same "callback"
	// function each time, but insted you can create alias between the new key code
	// and the function that has bees saved in the structure previosly
	IO_controller.addKeyDownAlias = function(frsKeyCode, scdKeyCode){
		if( keyDownMapping[scdKeyCode] != undefined && (typeof( keyDownMapping[ scdKeyCode ]) != "number")  ){
		  keyDownMapping[frsKeyCode] = scdKeyCode;
		}else{
		  console.log("Can't create alias to another alias or undefined!");
		}
	};

	// this method execute callback function given the key code
	IO_controller.keyDownAction = function(event){
		if( keyDownMapping[ event.keyCode] != undefined ){
		  if(typeof( keyDownMapping[ event.keyCode]) != "number"){
		    keyDownMapping[event.keyCode]();
		  }else{
		    keyDownMapping[ keyDownMapping[ event.keyCode] ]();
		  }
		}
	};


	// KEY UP FUNCTIONS

	// the same as addKeyDownAction. Read the description abowe
	IO_controller.addKeyUpAction = function(funKey, funCode){
		keyUpMapping[funKey] = funCode ;
	};

	IO_controller.addKeyUpAlias = function(frsKeyCode, scdKeyCode){
		if( keyUpMapping[scdKeyCode] != undefined && (typeof( keyUpMapping[ scdKeyCode ]) != "number")  ){
		  keyUpMapping[frsKeyCode] = scdKeyCode;
		}else{
		  console.log("Can't create alias to another alias or undefined!");
		}
	};


	// the same as addKeyDownAlias. Read the description abowe
	IO_controller.keyUpAction = function(event){
		if( keyUpMapping [ event.keyCode ] != undefined ){
		  if(typeof( keyUpMapping [ event.keyCode ]) != "number"){
		    keyUpMapping [event.keyCode]();
		  }else{
		    keyUpMapping[ keyUpMapping[ event.keyCode ]]();
		  }
		}
	};

	IO_controller.unitTest = function(){

		console.log(keyMapping);
	};



	return IO_controller;
}
