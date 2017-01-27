//depthOfField vertical step fragment shaders

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float width;
uniform float height;
uniform float kernel[11];
uniform float focusLimit;
uniform float areaDepth;

varying vec2 vUv;

void main(void) {
	vec3 baseColor = texture2D(tDiffuse, vUv).rgb;
	vec3 blurredColor = vec3(0.0, 0.0, 0.0);
	vec3 finalColor = vec3(0.0, 0.0, 0.0);

	float step_v = 1.0/height;
	vec2 newCoord;
	newCoord.x = vUv.x;
	float newCoordDistance;

	float pointDistance = texture2D(tDepth, vUv).r;
	float distanceFactor;
	
	distanceFactor = abs(pointDistance - (focusLimit / areaDepth));
	
	for(int i=0; i<11; i++) {
		newCoord.y = vUv.y + (step_v * float(i-5));
		newCoordDistance = texture2D(tDepth, newCoord).r;
		if(newCoordDistance <= pointDistance) {
			blurredColor += texture2D(tDiffuse, newCoord).rgb * kernel[i];
		} else {
			blurredColor += baseColor * kernel[i];
		}
	}

	finalColor = mix(baseColor, blurredColor, distanceFactor);

	gl_FragColor = vec4(finalColor, 1.0);
}
