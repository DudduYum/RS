function switchToFreeCamera(){
	var sw1 = document.getElementById("freeCamera");
	var sw2 = document.getElementById("gameCamera");
	sw1.style.display = "none";
	sw2.style.display = "block";
	useGameCamera = false;
}

function switchToGameCamera(){
	var sw2 = document.getElementById("gameCamera");
	var sw1 = document.getElementById("freeCamera");
	sw2.style.display = "none";
	sw1.style.display = "block";
	useGameCamera = true;
}