//SPACESHIP MOVEMENT SETTINGS
//spaceship movement speed in units per seconds
var moveSpeed = 3;


//basic spaceship
var spaceshipRadius = 0.5;
var spaceshipLength = 2;
var spaceship_geometry = new THREE.CylinderGeometry(spaceshipRadius/3, spaceshipRadius, spaceshipLength);
var spaceship_material = new THREE.MeshBasicMaterial({color:0xA03030});
var spaceship = new THREE.Mesh(spaceship_geometry, spaceship_material);
game.add(spaceship);
spaceship.position.set(0,0,areaDepth/2-spaceshipLength/2);
spaceship.rotation.x = degInRad(-90);


//spaceship movement
function moveSpaceship(time) {
	var distance = time/1000 * moveSpeed;
	var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition(spaceship.matrix);
	if(keyPressed[37] && spaceshipPosition.x > -areaWidth/2) {
		spaceship.translateX(-distance);
	}
	if(keyPressed[39] && spaceshipPosition.x < areaWidth/2) {
		spaceship.translateX(distance);
	}
	if(keyPressed[38] && spaceshipPosition.y < areaHeight/2) {
		spaceship.translateZ(distance);
	}
	if(keyPressed[40] && spaceshipPosition.y > -areaHeight/2) {
		spaceship.translateZ(-distance);
	}
	
}