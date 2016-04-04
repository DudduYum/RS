//GAME SCENE
var game = new THREE.Object3D();
game.position.set(0,0,-23);
game.rotation.y = degInRad(0);
scene.add(game);


//playable zone
var areaWidth = 16;
var areaHeight = 9;
var areaDepth = 30;
var gameArea_geometry = new THREE.BoxGeometry(areaWidth, areaHeight, areaDepth);
var gameArea_material = new THREE.MeshBasicMaterial({wireframe:true});
var gameArea = new THREE.Mesh(gameArea_geometry, gameArea_material);
game.add(gameArea);



//radius to degree functions
function degInRad(deg) {
	return deg * Math.PI / 180;
}