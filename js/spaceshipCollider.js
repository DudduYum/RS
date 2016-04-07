

function generateSpaceShipColliders(){

	// console.log(spaceship_front.geometry.boundingSphere);
	// console.log(spaceship_body.geometry.boundingSphere);
	// console.log(spaceship_back.geometry.boundingSphere);

	// console.log(spaceship_front.geometry.boundingSphere);
	// console.log(spaceship_body);
	// console.log(spaceship_back);
	//to review latter 
	spaceshipColliders.push(new THREE.Sphere(spaceship_front.position, 0.4));
	spaceshipColliders.push(new THREE.Sphere(spaceship_front.position, 0.4));
	spaceshipColliders.push(new THREE.Sphere(spaceship_front.position, 0.2));

	// spaceshipColliders.push(spaceship_front.geometry.boundingSphere.clone());
	// spaceshipColliders.push(spaceship_body.geometry.boundingSphere.clone());
	// spaceshipColliders.push(spaceship_back.geometry.boundingSphere.clone());

	// spaceshipColliders[0].center.set(
	// 		spaceship_front.position.x + game.position.x,
	// 		spaceship_front.position.y + game.position.y,
	// 		spaceship_front.position.z + game.position.z
	// 	);
	// spaceshipColliders[1].center.set(
	// 		spaceship_body.position.x + game.position.x,
	// 		spaceship_body.position.y + game.position.y,
	// 		spaceship_body.position.z + game.position.z
	// 	);
	// spaceshipColliders[2].center.set(
	// 		spaceship_back.position.x + game.position.x,
	// 		spaceship_back.position.y + game.position.y,
	// 		spaceship_back.position.z + game.position.z
	// 	);
	spaceshipColliders[0].center.set(
			spaceship_front.position.x ,
			spaceship_front.position.y ,
			spaceship_front.position.z 
		);
	spaceshipColliders[1].center.set(
			spaceship_body.position.x ,
			spaceship_body.position.y ,
			spaceship_body.position.z 
		);
	spaceshipColliders[2].center.set(
			spaceship_back.position.x ,
			spaceship_back.position.y ,
			spaceship_back.position.z 
		);
}