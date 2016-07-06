"use strict";

var freeSwitch = document.getElementById("freeCameraButton");
var gameSwitch = document.getElementById("gameCameraButton");

//enables mouse controls over the free camera and changes the variable
//that determine which camera is used to render
function switchToFreeCamera(){
	freeSwitch.style.display = "none";
	gameSwitch.style.display = "block";
	useGameCamera = false;
	orbitControls.enabled = true;
}

//disables mouse controls over the free camera and changes the variable
//that determine which camera is used to render
function switchToGameCamera(){
	gameSwitch.style.display = "none";
	freeSwitch.style.display = "block";
	orbitControls.enabled = false;
	useGameCamera = true;
}