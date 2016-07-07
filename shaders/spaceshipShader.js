/*function SpaceshipShader() {
	
}

// point propertys
varying vec3 tNorm;
varying vec2 vUv;
varying vec3 pointPosition;

// light vectors
varying vec3 lightVector;


// light position
uniform vec3 pointLightPos;




void main() {

		vUv = uv;

		tNorm = normalMatrix * normal;

		// light vectors calculation
		vec4 lPosition = viewMatrix * vec4( pointLightPos, 1.0 );
		lightVector = lPosition.xyz - pointPosition;

		pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;

		gl_Position = projectionMatrix * vec4( pointPosition , 1.) ;

}*/