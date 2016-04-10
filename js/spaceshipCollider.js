
function generateSpaceshipColliders(){

//create colliders
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());

//set the radius for the colliders
	spaceshipColliders[0].radius = spaceshipRadius;
	spaceshipColliders[1].radius = spaceshipRadius;
	spaceshipColliders[2].radius = spaceshipRadius;
	 
	spaceshipColliders[0].center.set(0,0,spaceship.position.z - ((spaceshipFrontSize + spaceshipBodySize/2 )* spaceshipLength));
	spaceshipColliders[1].center.set(0,0,spaceship.position.z);
	spaceshipColliders[2].center.set(0,0,spaceship.position.z + ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));

}

function resetShipCollider(){
	spaceshipColliders = [];
}

function translateSpaceshipColliderX(x){
	translateSpaceshipCollider(x,0);
}

function translateSpaceshipColliderY(y){
	translateSpaceshipCollider(0,y);
}

function translateSpaceshipCollider(x, y){
	for (var i = 0 ; i < spaceshipColliders.length ; i++) {
		spaceshipColliders[i].translate(new THREE.Vector3(x,y,0));
	}
}