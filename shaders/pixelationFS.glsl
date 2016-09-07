//pixelation step 1 fragment shaders

uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float pixelationSize;

varying vec2 vUv;

void main(void) {
	vec3 color = vec3(0.5, 0.5, 0.5);
	float step_h = 1.0/width;
	float step_v = 1.0/height;
	
	vec2 currentPoint;
	float pixelCount = 0.0;
	
	float pixelSizeX = pixelationSize * step_h;
	float pixelSizeY = pixelationSize * step_v;
	
	
	float modPoint_X = pixelSizeX * floor(vUv.x / pixelSizeX);
	float modPoint_Y = pixelSizeY * floor(vUv.y / pixelSizeY);
	
	
	for(int i=0; i < 16; i++) {
		for(int j=0; j < 16; j++) {
			if(float(i) < pixelationSize && float(j) < pixelationSize) {
			
				currentPoint.x = modPoint_X + (step_h * float(i));
				currentPoint.y = modPoint_Y + (step_v * float(j));
				
				if(currentPoint.x <= 1.0 && currentPoint.y <= 1.0) {
					color += texture2D(tDiffuse, currentPoint).rgb;
					pixelCount += 1.0;
				}
			}
		}
	}
	
	color = color / pixelCount;
		
	
	gl_FragColor = vec4(color, 1.0);
}