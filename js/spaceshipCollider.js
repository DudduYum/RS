

function generateSpaceshipColliders(){


	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());
	spaceshipColliders.push(new THREE.Sphere());

	spaceshipColliders[0].radius = spaceshipRadius+ 0.1;
	spaceshipColliders[1].radius = spaceshipRadius;
	spaceshipColliders[2].radius = spaceshipRadius+ 0.1;

	// spaceshipColliders[0].center.set(0,0, spaceship.position.z + game.position.z + ( (spaceshipFrontSize/2)* spaceshipLength) -4) ;
	// spaceshipColliders[1].center.set(0,0, spaceship.position.z + game.position.z + ( (spaceshipFrontSize + spaceshipBodySize/2)* spaceshipLength) -4) ;
	// spaceshipColliders[2].center.set(0,0, spaceship.position.z + game.position.z + ( (spaceshipFrontSize + spaceshipFrontSize + spaceshipBackSize/2)* spaceshipLength) -4) ;
	spaceshipColliders[0].center.set(0,0,spaceship.position.z - ((spaceshipFrontSize/2 + spaceshipBodySize  + spaceshipBackSize)* spaceshipLength));
 	spaceshipColliders[1].center.set(0,0,spaceship.position.z - ((spaceshipBodySize/2 + spaceshipBackSize)* spaceshipLength));
	spaceshipColliders[2].center.set(0,0,spaceship.position.z - ((spaceshipBackSize/2)* spaceshipLength));
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
		//spaceshipColliders[i].center.set(spaceshipColliders[i].center.x + X, spaceshipColliders[i].center.y + Y, spaceshipColliders[i].center.z);
	}
	// mesh.position.set(mesh.position.x + X, mesh.position.y + Y, mesh.position.z);
	// mesh1.position.set(mesh1.position.x + X, mesh1.position.y + Y, mesh1.position.z);
	// mesh2.position.set(mesh2.position.x + X, mesh2.position.y + Y, mesh2.position.z);
}