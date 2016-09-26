"use strict";

var pointLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
};

pointLight.lightPower.set(100000.0, 100000.0, 100000.0);
pointLight.lightPosition.set(50.0, 60.0, 30.0);

var spaceshipLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
}
spaceshipLight.lightPower.set(50.0, 50.0, 200.0);
spaceshipLight.lightPosition.set(0.0, 0.0, -1.5);



var ambientLight = {
	lightPower: new THREE.Vector3(),
};
ambientLight.lightPower.set(0.1, 0.1 , 0.1);
