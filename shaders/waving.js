function createWavingShader() {
	waving = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"offset": {type: "f", value: 0.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("wavingFS").textContent
	};

	return waving;
}
