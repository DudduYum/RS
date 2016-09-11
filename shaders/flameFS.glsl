//spaceship's flame FS

varying vec3 tNorm;

varying vec2 vUv;

//uniform float alpha;

uniform sampler2D tex;


void main(){

	vec3 c_diff = texture2D( tex, vUv).rgb;

	gl_FragColor = vec4( c_diff , 1.0);



}
