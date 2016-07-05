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
				"float step_w = 3.0/width;",
				"float step_h = 3.0/height;",
				
				"vec3 blurPasses[9];",
				"vec2 offset[9];",
				"offset[0] = vec2(-step_w, -step_h);",
				"offset[1] = vec2(0.0, -step_h);", 
				"offset[2] = vec2(step_w, -step_h);",
				"offset[3] = vec2(-step_w, 0.0);",
				"offset[4] = vec2(0.0, 0.0);",
				"offset[5] = vec2(step_w, 0.0);",
				"offset[6] = vec2(-step_w, step_h);",
				"offset[7] = vec2(0.0, step_h);",
				"offset[8] = vec2(step_w, step_h);",
				
				"for( int i=0; i<9; i++ ) {",
					"if(i!=4) {",
						"color += texture2D(tDiffuse, vUv + offset[i]).rgb",
							//"* 0.111",
							"* kernelFactor * gaussianBlurKernel[i]",
							"* texture2D(tDepth, vUv).r;",
					"} else {",
						"color += texture2D(tDiffuse, vUv).rgb",
							//"* 1.0 - (0.111 * texture2D(tDepth, vUv).r);",
							"* (1.0 - ( (1.0 - kernelFactor * gaussianBlurKernel[i]) * texture2D(tDepth, vUv).r));",
					"}",
				"}",
				
				"blurPasses[0] = color;",
				"for(int j=1; j<1; j++) {",
					"vec3 color = vec3(0.0, 0.0, 0.0);",
					"for( int i=0; i<9; i++ ) {",
						"if(i!=4) {",
							"color += texture2D(tDiffuse, vUv + offset[i]).rgb",
								//"* 0.111",
								"* kernelFactor * gaussianBlurKernel[i]",
								"* texture2D(tDepth, vUv).r;",
						"} else {",
							"color += blurPasses[j-1].xyz",
								//"* 1.0 - (0.111 * texture2D(tDepth, vUv).r);",
								"* (1.0 - ( (1.0 - kernelFactor * gaussianBlurKernel[i]) * texture2D(tDepth, vUv).r));",
						"}",
					"}",
					"blurPasses[j] = color;",
				"}",
				
				//"color = texture2D(tDiffuse, vUv).rgb;",
				 "gl_FragColor = vec4(color, 1.0);",
				 //"gl_FragColor = vec4(texture2D(tDepth, vUv).rg, 0.5, 1.0);",
			"}"
		].join("\n")
	};
	
	return dofShader;
}