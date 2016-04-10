//verify if asteroid colliders touch spaceship colliders
function checkCollision(){
	for(i=0; i < spaceshipColliders.length; i++){
		for(j=0; j < asteroidColliderArray.length; j++){
			if(spaceshipColliders[i].intersectsSphere(asteroidColliderArray[j])){
				gameOver();
			}
		}
	}
}	
