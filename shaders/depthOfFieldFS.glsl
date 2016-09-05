//depthOfField fragment shaders

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float width;
uniform float height;
uniform float gaussianBlurKernel[9];
uniform float kernelSum;
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
	
	float kernelFactor = 1.0 / kernelSum;
	
	float distanceFactor = texture2D(tDepth, vUv).r;
	if(distanceFactor <= (focusLimit / areaDepth)) {
		distanceFactor = distanceFactor * (areaDepth/focusLimit);
	} else {
		distanceFactor = 1.0;
	}
	

	for(int i=0; i<5; i++) {
		for(int j=0; j<5; j++) {
			newCoord.x = vUv.x + (step_h * float(i-2));
			newCoord.y = vUv.y + (step_v * float(j-2));
			if(newCoord.x >= 0.0 && newCoord.y >= 0.0 && newCoord.x <= 1.0 && newCoord.y <= 1.0) {
				blurredColor += texture2D(tDiffuse, newCoord).rgb
					* kernelFactor * gaussianBlurKernel[i];
			} else {
				blurredColor += baseColor
					* kernelFactor * gaussianBlurKernel[i];
			}
		}
	}
	
	
	finalColor = baseColor + ( (blurredColor - baseColor) * distanceFactor );	
	//finalColor = vec3(distanceFactor, distanceFactor, distanceFactor);
	gl_FragColor = vec4(finalColor, 1.0);
}
