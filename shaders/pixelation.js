function createPixelationShader() {
	pixelationShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"pixelation": {type: "f", value: 16.0},
		},


		vertexShader: document.getElementById("pixelationVS").textContent,

		fragmentShader: document.getElementById("pixelationFS").textContent
	};

	return pixelationShader;
}
