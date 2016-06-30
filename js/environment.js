//GAME SCENE
var game = new THREE.Object3D();
scene.add(game);

//sphere map
var geometry  = new THREE.SphereGeometry(50,32, 32)
var material  = new THREE.MeshBasicMaterial()
material.map   = THREE.ImageUtils.loadTexture('textures/space.png')
material.side  = THREE.BackSide
// create the mesh based on geometry and material
var mesh  = new THREE.Mesh(geometry, material)


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
