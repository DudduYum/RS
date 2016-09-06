function createPixelationShader() {
	pixelation = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"pixelationSize": {type: "f", value: 32.0},
			"lastModPoint": {type: "v2", value: new THREE.Vector2(0,0)},
			"lastColor": {type: "v3", value: new THREE.Vector3(0,0,0)}
		},


		vertexShader: document.getElementById("pixelationVS").textContent,

		fragmentShader: document.getElementById("pixelationFS").textContent
	};

	return pixelation;
}
