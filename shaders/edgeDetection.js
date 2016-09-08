function createEdgeDetectionShader() {
	edgeDetection = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"xSobelKernel": {type: "fv1", value: [-1, 0, +1, -2, 0, +2, -1, 0, +1]},
			"ySobelKernel": {type: "fv1", value: [-1, -2, -1, 0, 0, 0, +1, +2, +1]}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("edgeDetectionFS").textContent
	};

	return edgeDetection;
}
