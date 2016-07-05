function createPointLight(){
	return {
		lightPower: new THREE.Vector3(),
		lightPosition: new THREE.Vector3()
	};
};

function createDirectionalLight(){
	return {
		lightPower: new THREE.Vector3(),
		lightDirection: new THREE.Vector3()
	};
};

function createAmbientLight(){
	return {
		lightPower: new THREE.Vector3(),
		lightDirection: new THREE.Vector3()
	};
};
