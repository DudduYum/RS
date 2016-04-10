//spaceship size
var spaceshipRadius = 0.5;
var spaceshipLength = 5;
//ratios compared to spaceship length (eg 0.4 is 40% of length)
var spaceshipFrontSize = 0.4;
var spaceshipBodySize = 0.4;
var spaceshipBackSize = 0.2;


//spaceship front
var spaceship_front_geometry = new THREE.CylinderGeometry(0, spaceshipRadius, spaceshipLength*spaceshipFrontSize);
var spaceship_front_material = new THREE.MeshPhongMaterial({color:0xA03030});
var spaceship_front = new THREE.Mesh(spaceship_front_geometry, spaceship_front_material);

//spaceship body
var spaceship_body_geometry = new THREE.CylinderGeometry(spaceshipRadius, spaceshipRadius, spaceshipLength*spaceshipBodySize);
var spaceship_body_material = new THREE.MeshPhongMaterial({color:0xa0a0a0});
var spaceship_body = new THREE.Mesh(spaceship_body_geometry, spaceship_body_material);

//spaceship tail
var spaceship_back_geometry =  new THREE.CylinderGeometry(spaceshipRadius/2, spaceshipRadius*4/5, spaceshipLength*spaceshipBackSize);
var spaceship_back_material = new THREE.MeshPhongMaterial({color:0xa0a0ff});
var spaceship_back = new THREE.Mesh(spaceship_back_geometry, spaceship_back_material);

//spaceship assembly
var spaceship = new THREE.Object3D();
spaceship.add(spaceship_front);
spaceship_front.translateY((spaceshipFrontSize/2 + spaceshipBodySize + spaceshipBackSize) * spaceshipLength);
spaceship.add(spaceship_body);
spaceship_body.translateY((spaceshipBodySize/2 + spaceshipBackSize) * spaceshipLength);
spaceship.add(spaceship_back);
spaceship_back.translateY((spaceshipBackSize/2 * spaceshipLength));
spaceship.position.set(0,-spaceshipLength/2,areaDepth/2-spaceshipLength/2)
game.add(spaceship);


//spaceship collider, aproximated with 3 spheres
var spaceshipColliders;


//initialize spaceship position
function initializeSpaceshipPosition() {
	spaceship.rotation.x = degInRad(-90);
	spaceship.position.set(0,0,areaDepth/2-spaceshipLength/2);
	initializeSpaceshipColliders();
}


//move the spaceship and keep it inside game borders
function moveSpaceship(time) {
	var distance = time/1000 * moveSpeed;
	var spaceshipPosition = new THREE.Vector3().setFromMatrixPosition(spaceship.matrix);
	if((keyPressed[37] || keyPressed[65]) && spaceshipPosition.x > -areaWidth/2+1) {
		spaceship.translateX(-distance);
		translateSpaceshipColliderX(-distance);
	}
	if((keyPressed[39] || keyPressed[68]) && spaceshipPosition.x < areaWidth/2-1) {
		spaceship.translateX(distance);
		translateSpaceshipColliderX(distance);
	}
	if((keyPressed[38] || keyPressed[87]) && spaceshipPosition.y < areaHeight/2-1) {
		spaceship.translateZ(distance);
		translateSpaceshipColliderY(distance);
	}
	if((keyPressed[40] || keyPressed[83]) && spaceshipPosition.y > -areaHeight/2+1) {
		spaceship.translateZ(-distance);
		translateSpaceshipColliderY(-distance);
	}
}


//creates spaceship colliders and set them in spaceship position
function initializeSpaceshipColliders(){
	spaceshipColliders = [];
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());

	spaceshipColliders[0].radius = spaceshipRadius;
	spaceshipColliders[1].radius = spaceshipRadius;
	spaceshipColliders[2].radius = spaceshipRadius;
	 
	spaceshipColliders[0].center.set(0,0,spaceship.position.z - ((spaceshipFrontSize + spaceshipBodySize/2 )* spaceshipLength));
	spaceshipColliders[1].center.set(0,0,spaceship.position.z);
	spaceshipColliders[2].center.set(0,0,spaceship.position.z + ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));
}


//main function to move spaceship colliders
function translateSpaceshipCollider(x, y){
	for (var i = 0 ; i < spaceshipColliders.length ; i++) {
		spaceshipColliders[i].translate(new THREE.Vector3(x,y,0));
	}
}

function translateSpaceshipColliderX(x){
	translateSpaceshipCollider(x,0);
}

function translateSpaceshipColliderY(y){
	translateSpaceshipCollider(0,y);
}