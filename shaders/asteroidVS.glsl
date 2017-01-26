//asteroid VS


varying vec3 tNorm;
varying vec2 vUv;
varying vec3 pointPosition;

// light vectors
varying vec3 lightVector;
varying vec3 spLightVector;

// displacement
uniform float distortionFactor;
uniform float maxDistortion;
uniform sampler2D displaysmentMap;

//normals test
uniform sampler2D normMap;



// light position
uniform vec3 pointLightPos;
uniform vec3 spLightPos;





void main(){
		vUv = uv;

		tNorm = normalMatrix * normal;

		// get texture coordinates
		vec3 distortion = texture2D( displaysmentMap , vUv).xyz * 2.0 - 1.0;

		//correct the normal
		vec3 newNormal = tNorm * distortion ;

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

		lightVector = pointPosition - lPosition.xyz;
		spLightVector = pointPosition - splPosition.xyz;

		gl_Position = projectionMatrix * vec4( pointPosition , 1.) ;


}
