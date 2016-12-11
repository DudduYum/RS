(function (){
	"use strict";
})();
//"use strict";

function IOManager(){
	
//=== VARIABLES ===
	this.self = this;
	self.keyDownMapping = [];
	self.keyUpMapping = [];
	self.keyPressedStatus = [];
	
//=== CONSTRUCTOR ===

}



//=== METHODS ===

// KEY DOWN ACTIONS

// the first one shuld be a key code
// adds ongly key down function
IOManager.prototype.addKeyDownAction = function(funKey, funCode){
	self.keyDownMapping[funKey] = funCode;
};

// thanks to this method you don't need to add the same "callback"
// function each time, but insted you can create alias between the new key code
// and the function that has bees saved in the structure previosly
IOManager.prototype.addKeyDownAlias = function(frsKeyCode, scdKeyCode){
	if( self.keyDownMapping[scdKeyCode] !== undefined && ( typeof(self.keyDownMapping[scdKeyCode]) != "number")  ){
		self.keyDownMapping[frsKeyCode] = scdKeyCode;
	}else{
		console.log("Can't create alias to another alias or undefined!");
	}
};

// this method execute callback function given the key code
IOManager.prototype.keyDownAction = function(event){
	if( self.keyDownMapping[event.keyCode] !== undefined ){
		if( typeof( self.keyDownMapping[event.keyCode] ) !== "number" ){
			self.keyPressedStatus[event.keyCode] = true;
			self.keyDownMapping[event.keyCode]();
		} else {
			self.keyPressedStatus[keyUpMapping[event.keyCode]] = true;
			self.keyDownMapping[keyDownMapping[event.keyCode] ]();
		}
	}
};


// KEY UP FUNCTIONS

// the same as addKeyDownAction. Read the description abowe
IOManager.prototype.addKeyUpAction = function(funKey, funCode){
	self.keyUpMapping[funKey] = funCode ;
};

IOManager.prototype.addKeyUpAlias = function(frsKeyCode, scdKeyCode){
	if( self.keyUpMapping[scdKeyCode] !== undefined && ( typeof( self.keyUpMapping[scdKeyCode] ) != "number") ){
		self.keyUpMapping[frsKeyCode] = scdKeyCode;
	}else{
		console.log("Can't create alias to another alias or undefined!");
	}
};


// the same as addKeyDownAlias. Read the description abowe
IOManager.prototype.keyUpAction = function(event){
	if( self.keyUpMapping[event.keyCode] != undefined ){
		if( typeof( self.keyUpMapping [event.keyCode] ) != "number" ){
			self.keyPressedStatus[event.keyCode] = false;
			self.keyUpMapping [event.keyCode]();
		} else {
			self.keyPressedStatus[keyUpMapping[event.keyCode]] = false;
			self.keyUpMapping[ keyUpMapping[event.keyCode]]();
		}
	}
};


//get key status
IOManager.prototype.isKeyPressed = function(key) {
	if( !self.keyPressedStatus[key] || self.keyPressedStatus[key] === undefined )
		return false;
	else
		return true;
};
