function createImageSettings() {
	imageSettings = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"inverseColors": {type: "f", value: 0.0},
			"saturation": {type: "f", value: 1.0},
			"brightness": {type: "f", value: 1.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("imageSettingsFS").textContent
	};

	return imageSettings;
}
