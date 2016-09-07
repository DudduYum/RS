function createImageSettings() {
	imageSettings = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"saturation": {type: "f", value: 1.0},
			"brightness": {type: "f", value: 1.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("imageSettingsFS").textContent
	};

	return imageSettings;
}
