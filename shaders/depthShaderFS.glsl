//depthshader fragment shader

varying float depth;

void main(void) {
	gl_FragColor = vec4(vec3(1.0-depth), 1.0);
}
