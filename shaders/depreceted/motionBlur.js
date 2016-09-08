function createWavingShader() {
	motionBlur = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"blurPersistence": {type: "f", value: 0.5}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("motionBlurFS").textContent
	};

	return motionBlur;
}
