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
	float newCoordDistance;
	
	float pointDistance = 1.0 - texture2D(tDepth, vUv).r;
	float distanceFactor;
	
	if(pointDistance <= (focusLimit / areaDepth)) {
		if(pointDistance != 0.0)
			distanceFactor = pointDistance * (areaDepth/focusLimit);
		else
			distanceFactor = 0.0;
	} else {
		distanceFactor = 1.0;
	}
	

	for(int i=0; i<9; i++) {
		for(int j=0; j<9; j++) {
			newCoord.x = vUv.x + (step_h * float(i-4));
			newCoord.y = vUv.y + (step_v * float(j-4));
			newCoordDistance = 1.0 - texture2D(tDepth, newCoord).r;
			if(newCoordDistance <= pointDistance) {
				blurredColor += texture2D(tDiffuse, newCoord).rgb;
			} else {
				blurredColor += baseColor;
			}
		}
	}
	
	blurredColor = blurredColor / 81.0;
	
	finalColor = mix(baseColor, blurredColor, distanceFactor);

	gl_FragColor = vec4(finalColor, 1.0);
}
