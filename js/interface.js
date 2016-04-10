var backColor = document.getElementById("backColor");
var initialScreen = document.getElementById("initialScreen");
var gameoverScreen = document.getElementById("gameoverScreen");
var scoreNumber = document.getElementById("currentScore");
var scoreTable = document.getElementById("scoreTable");

//codice HTML per l'interfaccia di base come lo score in un angolo
var score = document.createElement('divi');


function displayInitalScreen() {
	//hide game, score and camera switch divs
	canvas.style.display = "block";
	scoreNumber.style.display = "none";
	scoreTable.style.display = "none";
	cameraSwitch.style.display = "none";
	
	initialScreen.style.width = baseLength * 16 * 0.7 + "px";
	initialScreen.style.height = baseLength * 9 * 0.7 + "px";

	//offset
	initialScreen.style.left = (baseLength * 16 * 0.3)/2 + "px";
	initialScreen.style.top = (baseLength * 9 * 0.3)/2+ "px";

	
	initialScreen.style.display = "block";
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


function displayGameOver() {
	//adjust z-indexes
	gameoverScreen.style.zIndex = "0";
	scoreTable.style.zIndex = "-1";
	canvas.style.zIndex = "-1";
	
	//hide game, score and camera switch divs
	canvas.display = "none";
	scoreNumber.style.display = "none";
	scoreTable.style.display = "none";
	cameraSwitch.style.display = "none";
	
	document.getElementById("yourScore").value = "Your score is "+ gameScore;
	// put score in the right place
	document.getElementById("yourScore").innerHTML = "Your score is "+ gameScore;
	
	// put score in the right place
	document.getElementById("yourScore").innerHTML = "Your score is "+ gameScore;

	// meke the menu fit in to the screen 
	gameoverScreen.style.width= baseLength * 16 * 0.8 + "px";
	gameoverScreen.style.height= baseLength * 9 * 0.8 + "px";

	//offset
	gameoverScreen.style.left = (baseLength * 16 * 0.2)/2 + "px";
	gameoverScreen.style.top = (baseLength * 9 * 0.2)/2+ "px";
	
	gameoverScreen.style.display = "block";
}



