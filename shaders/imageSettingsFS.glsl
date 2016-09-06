//imageSettings fragment shaders

uniform sampler2D tDiffuse;
uniform float saturation;
uniform float brightness;

varying vec2 vUv;

void main(void) {
	float greyScaleColor;
	vec3 baseColor = texture2D(tDiffuse, vUv).rgb;
	vec3 finalColor = vec3(0.0, 0.0, 0.0);
	vec3 luminanceFactor = vec3(0.2126, 0.7152, 0.0722);

	
	//saturation
	greyScaleColor = dot(baseColor, luminanceFactor);
	finalColor = mix(baseColor, vec3(greyScaleColor), 1.0 - saturation);
	
	//brightness
	finalColor = max(min(finalColor + (brightness - 1.0), 1.0), 0.0);
		
	gl_FragColor = vec4(finalColor, 1.0);
}