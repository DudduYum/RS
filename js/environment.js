//GAME SCENE
var game = new THREE.Object3D();
scene.add(game);


//playable zone
var areaWidth = 12 * screenRatio;
var areaHeight = 12;
var areaDepth = 150;
game.position.set(0,0,-((areaDepth/2)+4));

//resize the game area
function resizeGameArea() {
	areaWidth = 12 * screenRatio;
	areaHeight = 12;
}