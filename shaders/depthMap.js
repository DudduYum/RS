function createDepthShader() {
	depthShader = {
		uniforms: {
			"farPlane": {type: "f", value: 0.0}
		},
		
		vertexShader: [
			"uniform float farPlane;",
			
			"varying float depth;",
			
			"void main() {",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
				"depth = gl_Position.z / farPlane;",
			"}"
		].join("\n"),

		fragmentShader: [
			"varying float depth;",

			"void main(void) {",
				"gl_FragColor = vec4(depth,depth,depth,1.0);",
			"}"
		].join("\n")
	};
	
	return depthShader;
}
