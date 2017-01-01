//spaceshipVS



varying vec3 tNorm;
varying vec2 vUv;
varying vec3 pointPosition;

varying vec3 lightVector;
varying vec3 spLightVector;

uniform vec3 pointLightPos;
uniform vec3 spLightPos;

void main() {
	vUv = uv;
	tNorm = normalMatrix * normal;

	
	pointPosition = (modelViewMatrix * vec4( position, 1.0 )).xyz;

	vec4 lPosition = viewMatrix * vec4( pointLightPos, 1.0 );
	vec4 splPosition = viewMatrix * vec4( spLightPos, 1.0 );


	lightVector = lPosition.xyz - pointPosition ;
	spLightVector = splPosition.xyz - pointPosition ;
	//lightVector = pointPosition - lPosition.xyz ;
	//spLightVector = pointPosition - splPosition.xyz ;
	

	gl_Position = projectionMatrix * vec4( pointPosition , 1.0) ;
}
