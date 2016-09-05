//imageSettings fragment shaders

uniform sampler2D tDiffuse;
uniform float saturation;
uniform float brightness;

varying vec2 vUv;

void main(void) {
	float greyScaleColor;
	vec3 color = vec3(0.0, 0.0, 0.0);
	
	color = texture2D(tDiffuse, vUv).rgb;
	
	greyScaleColor = (color.r + color.g + color.b) / 3.0;
	
	color = max(min(greyScaleColor + ((color - greyScaleColor) * saturation), 1.0), 0.0);
	
	color = max(min(color + (brightness - 1.0) * greyScaleColor, 1.0), 0.0);
		
	gl_FragColor = vec4(color, 1.0);
}