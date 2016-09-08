//imageSettings fragment shaders

uniform sampler2D tDiffuse;
uniform float inverseColors;
uniform float saturation;
uniform float brightness;

varying vec2 vUv;

void main(void) {
	float greyScaleColor;
	vec3 color = texture2D(tDiffuse, vUv).rgb;
	vec3 luminanceFactor = vec3(0.2126, 0.7152, 0.0722);

	
	//inverse colors
	if(inverseColors == 1.0)
		color = vec3(1.0-color.r, 1.0-color.g, 1.0-color.b);
	
	//saturation
	greyScaleColor = dot(color, luminanceFactor);
	color = mix(color, vec3(greyScaleColor), 1.0 - saturation);
	
	//brightness
	color = max(min(color + (brightness - 1.0), 1.0), 0.0);
		
	gl_FragColor = vec4(color, 1.0);
}