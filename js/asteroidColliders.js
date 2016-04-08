

function genereteAsteroidCollider(){
	index = asteroidArray.length-1;
	
	var asteroid = asteroidArray[index];
 
	asteroidColliderArray.push(asteroid.geometry.boundingSphere.clone());

	
	// asteroidColliderArray[index].center.set(
	// 	asteroidArray[index].position.x + game.position.x,
	// 	asteroidArray[index].position.y + game.position.y,
	// 	asteroidArray[index].position.z + game.position.z
	// );
	asteroidColliderArray[index].center.set(
		asteroidArray[index].position.x ,
		asteroidArray[index].position.y ,
		asteroidArray[index].position.z 
	);
}

function moveAsteroidColliders(time) {
	for(var i=0;i<asteroidColliderArray.length;i++) {
		//asteroidColliderArray[i].translate(0,0,time/1000 * asteroidSpeed);
		asteroidColliderArray[i].center.z +=time/1000 * asteroidSpeed;
		// console.log("funziona1");
	}
}