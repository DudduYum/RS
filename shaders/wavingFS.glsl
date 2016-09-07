//waving fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float offset;

varying vec2 vUv;

void main(void) {
	vec3 finalColor = vec3(0.0, 0.0, 0.0);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	
	vec2 newCoord = vUv;
	
	finalColor = texture2D(tDiffuse, newCoord).rgb;
	
	gl_FragColor = vec4(finalColor, 1.0);
}