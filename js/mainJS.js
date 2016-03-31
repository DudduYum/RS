//this variabls should be global perche si!
var scene;
var camera;
var renderer;
 
function main() {

	// create a scene, that will hold all our elements such as objects, cameras and lights.
	scene = new THREE.Scene();

	 // create a camera, which defines where we're looking at.
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	 // create a render and set the size
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor({color: 0x0f0f0f});
	renderer.setSize(window.innerWidth, window.innerHeight);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	//yes I still help myself with axes
	axes = new THREE.AxisHelper(20);
	scene.add(axes);

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	//INSERT YOUR CODE HERE 





	// add the output of the renderer to the html element
	document.getElementById("WebGL_output").appendChild(renderer.domElement);
	render();
}

function render() {
	requestAnimationFrame(render);
	
		stats.update();
	
	renderer.render(scene, camera);
}
