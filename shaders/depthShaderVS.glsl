//depthShader vertex shader

uniform float areaDepth;

varying float depth;

void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	depth = min(gl_Position.z / areaDepth, 1.0);
}
