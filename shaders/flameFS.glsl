//spaceship flame FS

varying vec3 tNorm;

varying vec2 vUv;

//uniform float alpha;

uniform sampler2D tex;

//flame propertys
uniform float brightness;
uniform float texAnimation;


void main(){
	float tex_offX = mod(vUv.s + texAnimation , 1.0);
	float tex_offY = mod(vUv.t + texAnimation , 1.0);

	vec2 newUv = vec2(vUv.s , tex_offY);

	vec3 c_diff = texture2D( tex,  newUv).rgb;


	//aggiustamento
	vec3 color = vec3(c_diff.r/16.0, c_diff.g/8.0 , c_diff.b  );

	color = color * brightness;
	gl_FragColor = vec4( color , 1.0);

}
