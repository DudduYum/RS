function createDepthShader() {
	depthShader = {
		uniforms: {
			"farPlane": {type: "f", value: 0.0}
		},


		vertexShader: document.getElementById("depthShaderVS").textContent,

		fragmentShader: document.getElementById("depthShaderFS").textContent
	};


	return depthShader;
}
