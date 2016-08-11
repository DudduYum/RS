//asteroidVS


varying vec3 tNorm;
varying vec2 vUv;
varying vec3 pointPosition;

// light vectors
varying vec3 lightVector;
varying vec3 spLightVector;

uniform sampler2D displaysmentMap;

// light position
uniform vec3 pointLightPos;
uniform vec3 spLightPos;





void main() {

		vUv = uv;

		tNorm = normalMatrix * normal;

		// get texture coordinates
		vec4 distortion = texture2D( displaysmentMap , uv);

		//change the normal
		vec3 newNormal = (tNorm * distortion.x) ;

		// actually make displaysment
		vec3 nPosition = position + (newNormal * 0.4);

		pointPosition = (modelViewMatrix * vec4( nPosition, 1.0 )).xyz;

		// light vectors calculation
		vec4 lPosition = viewMatrix * vec4( pointLightPos, 1.0 );
		vec4 splPosition = viewMatrix * vec4( spLightPos, 1.0 );

		lightVector = lPosition.xyz - pointPosition;
		spLightVector = splPosition.xyz - pointPosition;

		gl_Position = projectionMatrix * vec4( pointPosition , 1.) ;


}
