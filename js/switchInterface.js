function switchToFreeView(){
	var sw1 = document.getElementById("freeView");
	sw1.style.display = "none";
	var sw2 = document.getElementById("gameView");
	sw2.style.display = "block";


	//other actions
}

function switchToGameView(){
	var sw2 = document.getElementById("gameView");
	sw2.style.display = "none";
	var sw1 = document.getElementById("freeView");
	sw1.style.display = "block";


	//other actions
}