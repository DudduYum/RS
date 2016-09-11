//spaceship's flame VS



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

		vec2 newUv = vec2(uv.s + x_offset, uv.t + y_offset);

		// get texture coordinates
		vec4 distortion = texture2D( displacementMap , newUv);

		//correct the normal
		vec3 newNormal = (tNorm * distortion.y);

		//applaing the distortion
		vec3 nPosition = position + (newNormal * distortionFactor);

		gl_Position = projectionMatrix * modelViewMatrix * vec4( nPosition , 1.);

}
