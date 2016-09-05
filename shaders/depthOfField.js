function createDofShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"gaussianBlurKernel": {type: "fv1", value: [2, 4, 5, 4, 2,
														4, 9, 12, 9, 4,
														5, 12, 15, 12, 5,
														4, 9, 12, 9, 4,
														2, 4, 5, 4, 2]},
			"kernelSum": {type: "f", value: 85.0},
			"focusLimit": {type: "f", value: 20.0},
			"areaDepth": {type: "f", value: 0.0}
		},




		vertexShader: document.getElementById("depthOfFieldVS").textContent,

		fragmentShader: document.getElementById("depthOfFieldFS").textContent
	};

	return dofShader;
}
