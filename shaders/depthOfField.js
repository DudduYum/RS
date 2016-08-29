function createDofShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"gaussianBlurKernel": {type: "fv1", value: [1, 2, 1, 2, 4, 2, 1, 2, 1]},
			"kernelFactor": {type: "f", value: 0.0625},
		},




		vertexShader: document.getElementById("depthOfFieldVS").textContent,

		fragmentShader: document.getElementById("depthOfFieldFS").textContent
	};

	return dofShader;
}
