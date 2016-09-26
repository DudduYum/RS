//asteroidFS


// fragment propertys
varying vec3 tNorm;
varying vec3 pointPosition;

//texture coordinates
varying vec2 vUv;

// light vectors
varying vec3 lightVector;
varying vec3 spLightVector;

// lights power
uniform vec3 lightPower;
uniform vec3 spLightPower;
uniform vec3 ambientLight;

uniform float alpha;

// maps & texture
uniform sampler2D tex;
uniform sampler2D normMap;
uniform sampler2D specularMap;

uniform float s;
uniform vec2 normalScale;

// start ininitializzation
#define PI 3.14159265
#extension GL_OES_standard_derivatives : enable



vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {
	vec3 q0 = dFdx( eye_pos.xyz );
	vec3 q1 = dFdy( eye_pos.xyz );

	vec2 st0 = dFdx( vUv.st );
	vec2 st1 = dFdy( vUv.st );

	vec3 S = normalize( q0 * st1.t - q1 * st0.t );
	vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
	vec3 N = normalize( surf_norm );

	vec3 mapN = texture2D( normMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy = normalScale * mapN.xy;
	mat3 tsn = mat3( S, T, N );

	return normalize( tsn * mapN );
}


//
float G(float LdotH) {
	return 1.0/pow(LdotH,2.0);
}

vec3 F(float LdotH ) {
	//vec3 c_spec = (texture2D(specularMap,vUv)).rgb;
	//la specular map genera effetto di trasparenza degli asteroid
	//per questo motivo e stata tolta

	vec3 c_spec = vec3( 0.0 , 0.0 , 0.0);
	return c_spec + (vec3(1.0) - c_spec) * pow( 1.0 - LdotH , 5.0);
}



float D(float NdotH) {
	float A = pow(alpha,2.0);
	float B = PI * pow(pow(NdotH,2.0)*(A-1.0) + 1.0, 2.0);
	return A/B;
}

vec3 calcBeta(vec3 power, vec3 lvec){
	return power / (4.0 * PI * pow( length(lvec) , 2.0));
}

void main(){

	vec3 c_diff = texture2D(tex,vUv).rgb;
	vec3 newNormal = texture2D( normMap, vUv ).xyz;


	// comon for both lights
	vec3 n = perturbNormal2Arb( pointPosition, normalize( newNormal ));
	vec3 v = normalize( -pointPosition );
	// sun
	vec3 l = normalize( lightVector );
	vec3 h = normalize( v + l );

	// space ship flame
	vec3 spl = normalize( spLightVector );
	vec3 sph = normalize( v + spl );

	// comon
	float NdotV = max(0.000001, dot( n, v ));
	// sun light
	float NdotH = max(0.000001, dot( n, h ));
	float VdotH = max(0.000001, dot( v, h ));
	float NdotL = max(0.000001, dot( n, l ));
	// space ship flame (light)
	float spNdotH = max(0.000001, dot( n, sph ));
	float spVdotH = max(0.000001, dot( v, sph ));
	float spNdotL = max(0.000001, dot( n, spl ));



	// sun light
	vec3 Specular = F(VdotH ) * G(VdotH) * D(NdotH) / 4.0;
	vec3 beta = calcBeta( lightPower , lightVector);

	// spaceship light
	vec3 spSpecular = F( VdotH  ) * G(VdotH) * D(NdotH) / 4.0;
	vec3 spBeta = calcBeta( spLightPower , spLightVector);




	vec3 color1 = beta * (s * c_diff  + (1.0 - s) * Specular );
	vec3 color2 = spBeta * (s * c_diff  + (1.0 - s) * spSpecular );
	vec3 color3 = ambientLight;

	//lightVector = normalize(lightVector);
	//float c1dot = dot(tNorm, lightVector);
	//c1dot = max( 0.0 , c1dot);


	gl_FragColor = vec4(  (color2  + color1 + color3) , 1.0);


}
