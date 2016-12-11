// sun (point light)
var pointLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
};

pointLight.lightPower.set(250000.0, 250000.0, 250000.0);
pointLight.lightPosition.set(60.0, 100.0, -20.0);


// flame (point light)
var spaceshipLight = {
	lightPower: new THREE.Vector3(),
	lightPosition: new THREE.Vector3()
};
spaceshipLight.lightPower.set(50.0, 50.0, 200.0);
spaceshipLight.lightPosition.set(0.0, 0.0, 0.0);


// light (ambient light)
var ambientLight = {
	lightPower: new THREE.Vector3(),
};
ambientLight.lightPower.set(0.1, 0.1 , 0.1);
