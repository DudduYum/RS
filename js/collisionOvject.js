//      COLLIDERS


//THREE.Mesh {quello che c'era prima }  ---->   THREE.Mesh{quello che c'era prima,  collider:..., rays:..., rayCaster:...}
function preperPlayerObject(obj,rays){
	obj.collider = addColliderToPlayerObject(obj.vertex);
	//tmp
	obj.collider new THREE.Sphere(obj.position, 5);
	//end tmp
	obj = addRayCaster(obj,rays);
	return obj;
}

function addColliderToPlayerObject(obj,manager){
	//.setFromPoints (vertex, optionalCenter);
	
	//qui manca da inserire il codice efettivo che aggiunge collider

	manager.Players.push(obj.collider); 
}

//number hexNum ---->  THREE.Mesh {quello che c'era prima ,radius:...}
function makeGameTargetObject(radius,color){
//define mesh
	var objGeometry = new THREE.SphereGeometry( radius, 32, 32 );
	var objMaterial = new THREE.MeshBasicMaterial( {color:color} );
	var objMesh = new THREE.Mesh(objGeometry  , objMaterial );
	//define new property
	objMesh.radius = radius;
//define collider
	var objMesh = addSphereCollider(objMesh);
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

//add to target objects
	manager.Targets.push(obj);
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
	obj.mesh.position.set(x,y,z);
	obj.mesh.collider.center.set(x,y,z);
}



//	COLLIDER MANAGER

function createCollisionManager(){
	obj = {};
	obj.Targets = new Array();
	obj.Players = new Array();
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
