function createPixelationShader() {
	pixelation = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"pixelationSize": {type: "f", value: 8.0},
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("pixelationFS").textContent
	};

	return pixelation;
}
