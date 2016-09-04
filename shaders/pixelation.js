function createPixelationShader() {
	pixelation = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"pixelation": {type: "f", value: 32.0},
		},


		vertexShader: document.getElementById("pixelationVS").textContent,

		fragmentShader: document.getElementById("pixelationFS").textContent
	};

	return pixelation;
}
