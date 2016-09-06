//edgeOnly fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float xSobelKernel[9];
uniform float ySobelKernel[9];

varying vec2 vUv;

void main(void) {
	vec3 color = vec3(0.0, 0.0, 0.0);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	
	vec2 newCoord;
	
	vec2 offset[9];
	offset[0] = vec2(-step_h, step_v);
	offset[1] = vec2(0.0, step_v);
	offset[2] = vec2(step_h, step_v);
	offset[3] = vec2(-step_h, 0.0);
	offset[4] = vec2(0.0, 0.0);
	offset[5] = vec2(step_h, 0.0);
	offset[6] = vec2(-step_h, -step_v);
	offset[7] = vec2(0.0, -step_v);
	offset[8] = vec2(step_h, -step_v);
	
	for(int i = 0; i<9; i++) {
		newCoord = vUv + offset[i];
		if(newCoord.x >= 0.0 && newCoord.y >= 0.0 && newCoord.x <= 1.0 && newCoord.y <= 1.0) {
			color += texture2D(tDiffuse, newCoord).rgb
				* xSobelKernel[i]
				* ySobelKernel[i];
		} else {
			color += texture2D(tDiffuse, vUv).rgb
				* xSobelKernel[i]
				* ySobelKernel[i];
		}
	}
	
	float brightness = (color.r + color.g + color.b) / 3.0;
	
	if(brightness > 0.1) {
		color = vec3(1.0, 1.0, 1.0);
	} else {
		color = vec3(0.0, 0.0, 0.0);
	}
	
	gl_FragColor = vec4(color, 1.0);
}