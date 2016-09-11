//spaceship's flame FS

varying vec3 tNorm;

varying vec2 vUv;

//uniform float alpha;

uniform sampler2D tex;

//flame propertys
uniform float brightness;
uniform float texAnimation;


void main(){
	//float tex_off = mod(texAnimation , 1.0);

	//vec2 newUv = vec2(vUv.s , tex_off);

	vec3 c_diff = texture2D( tex, vec2(vUv.s , texAnimation)).rgb;
	//aggiustamento
	vec3 color = vec3(c_diff.r/8.0, c_diff.g/4.0 , c_diff.b  );

	color = color * brightness;
	gl_FragColor = vec4( color , 1.0);

}
