//GAME SCENE
var game = new THREE.Object3D();
//whole game rotation for testing purposes
//game.rotation.y = degInRad(90);
scene.add(game);


//playable zone
var areaWidth = 16;
var areaHeight = 9;
var areaDepth = 100;
//creating a box corresponding to the game area for testing purposes
//var gameArea_geometry = new THREE.BoxGeometry(areaWidth, areaHeight, areaDepth);
//var gameArea_material = new THREE.MeshBasicMaterial({wireframe:true});
//var gameArea = new THREE.Mesh(gameArea_geometry, gameArea_material);
//game.add(gameArea);
game.position.set(0,0,-((areaDepth/2)+4));



//radius to degree functions
function degInRad(deg) {
	return deg * Math.PI / 180;
}