function createDofShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": { type: "t", value: null },
			"width": { type: "f", value: 0.0 },
			"height": { type: "f", value: 0.0 },
			"minKernel": { type: "fv1", value: [0, 0, 0, 0, 1, 0, 0, 0, 0]},
			"maxKernel": { type: "fv1", value: [0.09, 0.13, 0.09, 0.13, 0.12, 0.13, 0.09, 0.13, 0.09]}
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
			"varying vec2 vUv;",
			"uniform float width;",
			"uniform float height;",
			"uniform float maxKernel[9];",

			"void main(void)",
			"{",
				"float step_w = 1.0/width;",
				"float step_h = 1.0/height;",
			
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
				"vec3 sum = vec3(0.0);",

				 "for( int i=0; i<9; i++ )",
					"sum += texture2D(tDiffuse, vUv + offset[i]).rgb * maxKernel[i];",
				 "gl_FragColor = vec4(sum,1.0);",
			"}",
		].join("\n")
	};
	
	return dofShader;
}
