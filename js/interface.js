//back ground colore
var backColor = document.getElementById("backColor");

//start menu
var startMenu = document.getElementById("startMenu");

//endMenu
var endMenu = document.getElementById("endMenu");

//Score table
var scoreNumTab = document.getElementById("CurrentScore");
var scoreBackTab = document.getElementById("ScoreTable");

//codice HTML per l'interfaccia di base come lo score in un angolo
var score = document.createElement('divi');


function displayInitalScreen() {

	//codice HTML per le scritte iniziali
	//come per esempio il titolo del gioco e "Press [spacebar] to start"
	//update menu dimension
	startMenu.style.width = baseLength*16 * 0.7 + "px";
	startMenu.style.height = baseLength*9 * 0.7 + "px";
	// startMenu.style.background = "green";

	//offset
	startMenu.style.left = (baseLength*16 * 0.3)/2 + "px";
	startMenu.style.top = (baseLength*9 * 0.3)/2+ "px";

	//meke sure user can't see score bar
	removeScoreBar();

	//init
	document.body.style.background = "blue";
	backColor.style.opacity = "0.8";
	renderer.domElement.style.display = "none";
}

function displayGameOver() {
	
	//meke sure user can't see score bar
	removeScoreBar();
	
	// put score in the right place
	document.getElementById("YourScore").innerHTML = "Your score is "+ gameScore;

	// meke the menu fit in to the screen 
	endMenu.style.width= baseLength*16 * 0.8 + "px";
	endMenu.style.height= baseLength*9 * 0.8 + "px";

	//offset
	endMenu.style.left = (baseLength*16 * 0.2)/2 + "px";
	endMenu.style.top = (baseLength*9 * 0.2)/2+ "px";
}

function removeScreen() {
	//rimozione delle scritte a schermo

}

function removeScoreBar(){
	//score tab
	scoreNumTab.style.display = "none";
	scoreBackTab.style.display = "none";
}

function preperForTheGame(){
	startMenu.style.display = "none";

	// re set the score
	scoreNumTab.innerHTML =  0;

	scoreNumTab.style.display = "block";
	scoreBackTab.style.display = "block";

	renderer.domElement.style.display = "block";
	document.body.style.background = "red";
	backColor.style.opacity = "1";
	endMenu.style.display = "none";
}
