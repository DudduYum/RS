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

	vec2 modPoint = vec2(mod(vUv.x, pixelation), mod(vUv.y, pixelation));

	for(int i=0; i<pixelation; i++) {
		for(int j=0; j<pixelation; j++) {
			color += texture2D(tDiffuse, modPoint + (step_h * i) + (step_v * j)).rgb * (1/pow(pixelation, 2));
		)
	}
	
	color = vec3(0.5, 0.5, 0.5);
	gl_FragColor = vec4(color, 1.0);
}
