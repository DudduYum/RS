"use strict";

var pointLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
};

pointLight.lightPower.set(10000.0, 10000.0, 10000.0);
pointLight.lightPosition.set(10.0, 20.0, 10.0);

var spaceshipLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
}
spaceshipLight.lightPower.set(20.0, 20.0, 100.0);
spaceshipLight.lightPosition.set(0.0, 0.0, -4.0);


// function createDirectionalLight(){
// 	lightPower: new THREE.Vector3(),
// 	lightDirection: new THREE.Vector3()
// }

var ambientLight = {
	lightPower: new THREE.Vector3(),
};
ambientLight.lightPower.set(0.1, 0.1 , 0.1);
