//imageSettings fragment shaders

uniform sampler2D tDiffuse;
uniform float saturation;
uniform float brightness;

varying vec2 vUv;

void main(void) {
	float greyScaleColor;
	vec3 baseColor = texture2D(tDiffuse, vUv).rgb;
	vec3 finalColor = vec3(0.0, 0.0, 0.0);
	
	
	greyScaleColor = (baseColor.r + baseColor.g + baseColor.b) / 3.0;
	
	finalColor = mix(baseColor, vec3(greyScaleColor), saturation / 2.0);
	
	//finalColor = max(min(greyScaleColor + ((baseColor - greyScaleColor) * saturation), 1.0), 0.0);
	
	finalColor = max(min(baseColor + (brightness - 1.0) * greyScaleColor, 1.0), 0.0);
		
	gl_FragColor = vec4(finalColor, 1.0);
}