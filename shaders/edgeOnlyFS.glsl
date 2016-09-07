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
	float edge_H;
	float edge_V;
	
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
			edge_H += length( texture2D(tDiffuse, newCoord).rgb ) * xSobelKernel[i];
			edge_V += length( texture2D(tDiffuse, newCoord).rgb ) * ySobelKernel[i];
		} else {
			edge_H += length( texture2D(tDiffuse, vUv).rgb ) * xSobelKernel[i];
			edge_V += length( texture2D(tDiffuse, vUv).rgb ) * ySobelKernel[i];
		}
	}
	
	color = vec3(sqrt(pow(edge_H, 2.0) + pow(edge_V, 2.0)));
	
	gl_FragColor = vec4(color, 1.0);
}