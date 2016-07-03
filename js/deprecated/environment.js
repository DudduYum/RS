//GAME SCENE
var game = new THREE.Object3D();
scene.add(game);

//sphere map
var openSpaceGeometry  = new THREE.SphereGeometry(150,32, 32);
var openSpaceTexture = new THREE.TextureLoader.load('textures/space.png');
var openSpaceMaterial  = new THREE.MeshBasicMaterial({map: openSpaceTexture});
//openSpaceMaterial.side  = THREE.BackSide;
var openSpace  = new THREE.Mesh(openSpaceGeometry, openSpaceMaterial);
scene.add(openSpace);


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
