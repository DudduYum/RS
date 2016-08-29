//pixelation fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float pixelation;

varying vec2 vUv;

void main(void) {
	vec3 color = vec3(0.0, 0.0, 0.0);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	float invPixel = 1.0/pixelation;
	float modPointX = vUv.x - mod(vUv.x, invPixel);
	float modPointY = vUv.y - mod(vUv.y, invPixel);
	
	vec2 modPoint;

	for(int i=0; i<16; i++) {
		for(int j=0; j<16; j++) {
			modPoint = vec2(
				min(modPointX + (step_h * float(i)), 1.0),
				min(modPointY + (step_v * float(j)), 1.0));
			color += texture2D(tDiffuse, modPoint).rgb * (1.0/pow(pixelation, 2.0));
		}
	}
	color = texture2D(tDiffuse, vUv).rgb;
	gl_FragColor = vec4(color, 1.0);
}