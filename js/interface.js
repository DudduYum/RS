var initialScreen = document.getElementById("initialScreen");
var gameoverScreen = document.getElementById("gameoverScreen");
var scoreNumber = document.getElementById("currentScore");
var scoreTable = document.getElementById("scoreTable");
var cameraSwitch = document.getElementById("cameraSwitch");


function displayInitalScreen() {
	//hide game, score and camera switch divs
	scoreNumber.style.display = "none";
	scoreTable.style.display = "none";
	cameraSwitch.style.display = "none";
	//display initial screen and spaceship
	initialScreen.style.display = "block";
	canvas.style.display = "block";
}


function displayGame(){
	//hides initial or gameover divs
	initialScreen.style.display = "none";
	gameoverScreen.style.display = "none";

	
	//reset the score
	scoreNumber.innerHTML =  0;
	
	//adjust z-indexes
	initialScreen.style.zIndex = "-1";
	gameoverScreen.style.zIndex = "-1";
	scoreTable.style.zIndex = "1";
	canvas.style.zIndex = "0";
	
	//display game, score and camera switch divs
	canvas.style.display = "block";
	scoreNumber.style.display = "block";
	scoreTable.style.display = "block";
	cameraSwitch.style.display = "block";
}


//displays game over screen
function displayGameOver() {
	//adjust z-indexes
	gameoverScreen.style.zIndex = "0";
	
	//hide game, score and camera switch divs
	scoreTable.style.display = "none";
	
	document.getElementById("yourScore").innerHTML = "Your score is "+ gameScore;
	
	gameoverScreen.style.display = "block";
}