//pixelation fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float pixelation;

varying vec2 vUv;

void main(void) {
	vec3 color = vec3(0.0, 0.0, 0.0);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	
	float pixelSizeX = pixelation/2095.0;
	float pixelSizeY = pixelation/1339.0;
	float pixelCount = pow(pixelation, 2.0);
	
	vec2 currentPoint;
	float modPointX = pixelSizeX * floor(vUv.x / pixelSizeX);
	float modPointY = pixelSizeY * floor(vUv.y / pixelSizeY);
	
	
	for(float i=0.0; i < 32.0; i+=1.0) {
		for(float j=0.0; j < 32.0; j+=1.0) {
			currentPoint.x = modPointX + (step_h * i);
			currentPoint.y = modPointY + (step_v * j);
			
			if(currentPoint.x <= 1.0 && currentPoint.y <= 1.0) {
				color += texture2D(tDiffuse, currentPoint).rgb;
			} else {
				pixelCount -= 1.0;
			}
		}
	}
	
	
	
	
	color = color / pixelCount;
	//if(width > -0.01)
	//	color = vec3(0.0, 1.0, 0.0);
	//else
	//	color = vec3(1.0, 0.0, 0.0);
	gl_FragColor = vec4(color, 1.0);
}