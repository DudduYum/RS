//asteroidVS


varying vec3 tNorm;
varying vec2 vUv;
varying vec3 pointPosition;

// light vectors
varying vec3 lightVector;
varying vec3 spLightVector;

// displasment
uniform float distortionFactor;
uniform float maxDistortion;
uniform sampler2D displaysmentMap;
uniform float x_shift;
uniform float y_shift;
uniform vec2 shift_direction;

// light position
uniform vec3 pointLightPos;
uniform vec3 spLightPos;





void main(){
		//must be unpdated{
		vUv = uv;
		//float x_sh = mod(x_shift,1.0);
		//float y_sh = mod(y_shift,1.0);
		//vUv = mod(uv + vec2( x_sh  , y_sh ), vec2( 1.0 , 1.0)) ;
		//}

		tNorm = normalMatrix * normal;

		// get texture coordinates
		vec4 distortion = texture2D( displaysmentMap , vUv);

		//correct the normal
		vec3 newNormal = (tNorm * distortion.x) ;

		// calculate the displaysment of each point using
		// actual radius of asteroid, the max radious each asteroid
		// could be and displaysment from displaysment map

		// distortionFactor = actual radius of asteroid
		// maxDistortion = the max radious of asteroid
		// distortion = displaysment  from displaysment map
		float astRadius = (distortionFactor / maxDistortion);
		vec3 astDistortion = (0.5 * astRadius * distortion).xyz;

		//applaing the distortion
		vec3 nPosition = position + (newNormal * astDistortion);

		pointPosition = (modelViewMatrix * vec4( nPosition, 1.0 )).xyz;

		// light vectors calculation
		vec4 lPosition = viewMatrix * vec4( pointLightPos, 1.0 );
		vec4 splPosition = viewMatrix * vec4( spLightPos, 1.0 );

		lightVector = lPosition.xyz - pointPosition;
		spLightVector = splPosition.xyz - pointPosition;

		gl_Position = projectionMatrix * vec4( pointPosition , 1.) ;


}
