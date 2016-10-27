//spaceship flame VS



// displasment
uniform float distortionFactor;
uniform sampler2D displacementMap;

//offset
uniform float x_offset;
uniform float y_offset;

varying vec3 tNorm;
varying vec2 vUv;


void main(){

		vUv = uv;

		tNorm = normalMatrix * normal;

		vec2 newUv = vec2( x_offset , y_offset );

		// get texture coordinates
		vec3 distortion = texture2D( displacementMap , newUv).rgb;

		//correct the normal
		vec3 newNormal = (tNorm * distortion * 2.0);

		//applaing the distortion
		vec3 nPosition = position + (newNormal * distortionFactor);

		gl_Position = projectionMatrix * modelViewMatrix * vec4( nPosition , 1.);

}
