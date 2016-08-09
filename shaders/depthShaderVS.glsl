//depthShader vertex shader

uniform float farPlane;

varying float depth;

void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	depth = min(gl_Position.z / farPlane, 1.0);
}
