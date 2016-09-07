//depthOfField fragment shaders

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float width;
uniform float height;
uniform float focusLimit;
uniform float areaDepth;

varying vec2 vUv;

void main(void) {
	vec3 baseColor = texture2D(tDiffuse, vUv).rgb;
	vec3 blurredColor = vec3(0.0, 0.0, 0.0);
	vec3 finalColor = vec3(0.0, 0.0, 0.0);
	
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	vec2 newCoord;
	float newCoordDepth;
	
	float pointDistance = texture2D(tDepth, vUv).r;
	float distanceFactor;
	
	if(pointDistance <= (focusLimit / areaDepth)) {
		if(pointDistance != 0.0)
			distanceFactor = pointDistance * (areaDepth/focusLimit);
		else
			distanceFactor = 0.0;
	} else {
		distanceFactor = 1.0;
	}
	

	for(int i=0; i<15; i++) {
		for(int j=0; j<15; j++) {
			newCoord.x = vUv.x + (step_h * float(i-7));
			newCoord.y = vUv.y + (step_v * float(j-7));
			newCoordDepth = texture2D(tDepth, newCoord).r;
			if(newCoord.x >= 0.0 && newCoord.y >= 0.0 && newCoord.x <= 1.0 && newCoord.y <= 1.0 && newCoordDepth <= pointDistance) {
				blurredColor += texture2D(tDiffuse, newCoord).rgb;
			} else {
				blurredColor += baseColor;
			}
		}
	}
	
	blurredColor = blurredColor / 225.0;
	
	finalColor = mix(baseColor, blurredColor, distanceFactor);

	gl_FragColor = vec4(finalColor, 1.0);
}
