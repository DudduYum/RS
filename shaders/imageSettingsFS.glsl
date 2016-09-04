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
	
	color.r = max(min(greyScaleColor + ((color.r - greyScaleColor) * saturation), 1.0), 0.0);
	color.g = max(min(greyScaleColor + ((color.g - greyScaleColor) * saturation), 1.0), 0.0);
	color.b = max(min(greyScaleColor + ((color.b - greyScaleColor) * saturation), 1.0), 0.0);
	
	color.r = max(min(color.r + (brightness - 1.0) * greyScaleColor, 1.0), 0.0);
	color.g = max(min(color.g + (brightness - 1.0) * greyScaleColor, 1.0), 0.0);
	color.b = max(min(color.b + (brightness - 1.0) * greyScaleColor, 1.0), 0.0);
		
	gl_FragColor = vec4(color, 1.0);
}