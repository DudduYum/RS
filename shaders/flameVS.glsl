//spaceship's flame VS



// displasment
uniform float distortionFactor;
uniform sampler2D displacementMap;
//need offset for distortion

varying vec3 tNorm;
varying vec2 vUv;


void main(){

		vUv = uv;

		tNorm = normalMatrix * normal;

		// get texture coordinates
		vec4 distortion = texture2D( displacementMap , vUv);

		//correct the normal
		vec3 newNormal = (tNorm * distortion.y);

		//applaing the distortion
		vec3 nPosition = position + (newNormal * distortionFactor);

		gl_Position = projectionMatrix * modelViewMatrix * vec4( nPosition , 1.);

}
