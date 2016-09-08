//waving fragment shaders

uniform sampler2D tDiffuse;
uniform float blurPersistence;


varying vec2 vUv;

void main(void) {
	vec3 finalColor = vec3(0.0, 0.0, 0.0);
	vec3 luminanceFactor = vec3(0.2126, 0.7152, 0.0722);
	
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	vec2 newCoord;
	
	vec3 color = texture2D(tDiffuse, vUv).rgb;
	float luminance = dot(color, luminanceFactor);
	float newLuminance;
	
	if(luminance >= blurPersistence) {
		color = color + 0.2;
	} else {
		for(int i=0; i<15; i++) {
			for(int j=0; j<15; j++) {
				newCoord.x = vUv.x + (step_h * float(i-7));
				newCoord.y = vUv.y + (step_v * float(j-7));
				newLuminance = dot(te)
				if(newCoord.x >= 0.0 && newCoord.y >= 0.0 && newCoord.x <= 1.0 && newCoord.y <= 1.0
					&& dot(texture) {
					
				}
			}
		}
	}
	gl_FragColor = vec4(color, 1.0);
}