/*

interface

The first thing to do when you create a game is to initialize a CollisionManager. You may add CollisionManager
to your game object, just to make sure you don't destroy it by accident.


to add an asteroid to the scene just use makeGameTargetObject function, it returns to you an "extended" 
three.Mesh objecct. To move the returned object you must use moveGameObj(obj,x,y,z) function, it's important 'couse if 
you don't use it you may separete the objcet from his collider. 
When you use makeGameTargetObject you must pass default CollisionManager object as an argument, this is importante 'couse,
if not do this the objcet will be lost in scene.











*/






//      COLLIDERS

//THREE.Mesh {quello che c'era prima }  ---->   THREE.Mesh{quello che c'era prima,  collider:..., rays:..., rayCaster:...}
function preperPlayerObject(obj,manager){
	//obj = addColliderToPlayerObject(obj,manager);
	//tmp
	obj.collider = new THREE.Sphere(obj.position, 5);
	console.log(obj.collider);
	manager.Players.push(obj);
	//end tmp
	//obj = addRayCaster(obj,rays);
	return obj;
}

function addColliderToPlayerObject(obj,manager){
	var collider = THREE.Sphere();
	//THREE.Sphere.setFromPoints(obj.geometry.vertices,obj.position);
	//collider.setFromPoints(obj.geometry.vertices,obj.position);
	console.log(collider);
	//qui manca da inserire il codice efettivo che aggiunge collider
	obj.collider = collider;
	manager.Players.push(obj); 
	return obj;
}

//number hexNum ---->  THREE.Mesh {quello che c'era prima ,radius:...}
function makeGameTargetObject(radius,obj,material){
//define mesh
	var objGeometry = new THREE.SphereGeometry( radius, 8, 8 );
	//var objMaterial;
	//if(color != undefined){
	//	objMaterial = new THREE.MeshBasicMaterial( {color:color} );
	//}else{
	//	objMaterial = new THREE.MeshBasicMaterial( {wireframe:true} );
	//}
	
	var objMesh = new THREE.Mesh(objGeometry  , material );
	//define new property
	objMesh.radius = radius;
//define collider
	var objMesh = addSphereCollider(objMesh);
	obj.Targets.push(objMesh);
	//var gObj = {mesh:objMesh , radius:radius};
	return objMesh;
}

//THREE.Mesh {quello che c'era prima ,radius:...}  ---->   THREE.Mesh{quello che c'era prima, collider:...}
function addSphereCollider(obj,manager){
	center = obj.position;
	radius = obj.radius;
	objCollider = new THREE.Sphere(center,radius);
	obj.collider = objCollider;
	//test
	//obj.collider = objCollider;

	return obj;
}

//No meteoriti per ora
//THREE.Mesh{quello che c'era prima, collider:...}   ---->  THREE.Mesh{quello che c'era prima, array:..., rayCaster:...}
function addRayCaster(obj,arr){
	//add rays, rays are used by collision manager to detect object the playObject may collide with	
	obj.rays = arr;
	//raycater use rays to progect a vectors
	// maybe I will delete it in the future
	var ray = new THREE.Raycaster();
	obj.rayCaster = ray;
	return obj;
}


//obj{mesh:...,  x:..., y:..., z:...,} ---->  void
function moveGameObj(obj,x,y,z){
	obj.position.set(x,y,z);
	obj.collider.center.set(x,y,z);
	
}
function translateZ(obj,value){
	obj.collider.center.z += value;
	return obj.translateZ(value);
}



//	COLLIDER MANAGER
var nonloso = 0;
function createCollisionManager(){
	obj = {};
	obj.Targets = new Array();
	obj.Players = new Array();

	return obj;
}
//Throws 1 if a player collides with something
function checkCollision(obj){
	for(i = 0 ; i < obj.Players.length ; i++){
		directions = obj.Players[i].rays;
		ray = obj.Players[i].rayCaster;
		for(j = 0 ; j < directions.length ; j++){
			ray.set(obj.Players[i].position, direction[j]);
			var collisions = ray.intersectObjects(obj.Targets);
			if(collisions.length > 0){
				if(obj.Players[i].collider.intersectsSphere(collisions[0].object.collider)){
					//do something bro ...
					throw i;
				}
			}
		}
	}
}
function checkCollisionWithoutRays(obj){
	for(i = 0 ; i < obj.Players.length ; i++){
		var colliderPlayer = obj.Players[i].collider;
		console.log("\t Player" );
		console.log("\t \t \t")
		console.log(colliderPlayer);
		for(j = 0 ; j < obj.Targets.length; j++){
			var colliderTargets = obj.Targets[j].collider;
			console.log("\t target" + colliderTargets);
			console.log("--------------------------------");
			if(colliderPlayer.intersectsSphere(colliderTargets)){
				//do something bro ...
				console.log("entrato");
				res = {player:i,asteroid:j};
				throw res;
			}
		}
	}
}


function checkCollision(){
	for(i = 0 ; i < spaceshipColliders.length ; i++){
		for(j = 0 ; j < asteroidColliderArray.length ; j++){
			if(spaceshipColliders[i].intersectsSphere(asteroidColliderArray[j])){
				//throw {index:i , asteroid:asteroidColliderArray[i]};
				gameOver();
			}
		}
	}
	
}	
