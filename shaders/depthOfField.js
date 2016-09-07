function createDofShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"focusLimit": {type: "f", value: 35.0},
			"areaDepth": {type: "f", value: 0.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("depthOfFieldFS").textContent
	};

	return dofShader;
}
