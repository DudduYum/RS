//depthshader fragment shader

varying float depth;

void main(void) {
	gl_FragColor = vec4(vec3(depth), 1.0);
}
