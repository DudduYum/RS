

function genereteAsteroidCollider(){
	index = asteroidArray.length-1;
	// console.log(asteroidArray[index]);
	var asteroid = asteroidArray[index];
	// console.log("generete collider "+ index);
	// var collider = new THREE.Sphere();
	asteroidColliderArray.push(asteroid.geometry.boundingSphere.clone());
	// asteroidColliderArray.push(new THREE.Sphere(asteroid.geometry.position,4));
	// asteroidColliderArray.push(collider);
//  	
	
	asteroidColliderArray[index].center.set(
		asteroidArray[index].position.x + game.position.x,
		asteroidArray[index].position.y + game.position.y,
		asteroidArray[index].position.z + game.position.z
	);
}

function moveAsteroidColliders(time) {
	for(var i=0;i<asteroidColliderArray.length;i++) {
		asteroidColliderArray[i].center.z +=time/1000 * asteroidSpeed;
		// console.log("funziona1");
	}
}