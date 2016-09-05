//pixelation fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float pixelationSize;

varying vec2 vUv;

void main(void) {
	vec3 color = vec3(0.0, 0.0, 0.0);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	vec2 currentPoint;
	
	float pixelSizeX = pixelationSize / width;
	float pixelSizeY = pixelationSize / height;
	
	float pixelCount = pow(pixelationSize, 2.0);
	
	float modPointX = pixelSizeX * floor(vUv.x / pixelSizeX);
	float modPointY = pixelSizeY * floor(vUv.y / pixelSizeY);
	
	
	for(int i=0; i < 128; i++) {
		for(int j=0; j < 128; j++) {
			if(float(i) < pixelationSize && float(j) < pixelationSize) {
				currentPoint.x = modPointX + (step_h * float(i));
				currentPoint.y = modPointY + (step_v * float(j));
				
				if(currentPoint.x <= 1.0 && currentPoint.y <= 1.0) {
					color += texture2D(tDiffuse, currentPoint).rgb;
				} else {
					pixelCount -= 1.0;
				}
			}
		}
	}
	
	
	color = color / pixelCount;
		
	gl_FragColor = vec4(color, 1.0);
}