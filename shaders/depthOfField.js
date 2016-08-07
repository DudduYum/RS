function createDofShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"gaussianBlurKernel": {type: "fv1", value: [1, 2, 1, 2, 4, 2, 1, 2, 1]},
			"kernelFactor": {type: "f", value: 0.0833},
			"centerNormalization": {type: "f", value: 0.25}
		},
		
		vertexShader: [
			"varying vec2 vUv;",
			"void main() {",
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform sampler2D tDiffuse;",
			"uniform sampler2D tDepth;",
			"uniform float width;",
			"uniform float height;",
			"uniform float gaussianBlurKernel[9];",
			"uniform float kernelFactor;",
			
			"varying vec2 vUv;",

			"void main(void) {",
				"vec3 color = vec3(0.0, 0.0, 0.0);",
				"float step_h = 1.0/width;",
				"float step_v = 1.0/height;",
				
				"vec2 offset[9];",
				"offset[0] = vec2(-step_h, step_v);",
				"offset[1] = vec2(0.0, step_v);", 
				"offset[2] = vec2(step_h, step_v);",
				"offset[3] = vec2(-step_h, 0.0);",
				"offset[4] = vec2(0.0, 0.0);",
				"offset[5] = vec2(step_h, 0.0);",
				"offset[6] = vec2(-step_h, -step_v);",
				"offset[7] = vec2(0.0, -step_v);",
				"offset[8] = vec2(step_h, -step_v);",
				
				"for( int i=0; i<9; i++ ) {",
					"if(i!=4) {",
						"color += texture2D(tDiffuse, vUv + offset[i]).rgb",
							"* kernelFactor * gaussianBlurKernel[i]",
							"* texture2D(tDepth, vUv).r;",
					"} else {",
						"color += texture2D(tDiffuse, vUv).rgb",
							"* (1.0 - ( (1.0 - kernelFactor * gaussianBlurKernel[i]) * texture2D(tDepth, vUv).r));",
					"}",
				"}",

				 "gl_FragColor = vec4(color, 1.0);",
			"}"
		].join("\n")
	};
	
	return dofShader;
}