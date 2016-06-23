var screenRatio = window.innerWidth/window.innerHeight;

//creates scene, add fog
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x000000, 0.01);

//creates two camers
var gameCamera = new THREE.PerspectiveCamera(75, screenRatio, 0.1, 1000);
var freeCamera = new THREE.PerspectiveCamera(75, screenRatio, 0.1, 1000);
//initial free camera position
freeCamera.position.set(2,2,2);
var useGameCamera = true;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);window.addEventListener( 'resize', onWindowResize, false );
//resizes the renderer and the game area if the window resizes
function onWindowResize(){
	screenRatio = window.innerWidth/window.innerHeight;
    gameCamera.aspect = screenRatio;
	freeCamera.aspect = screenRatio;
    gameCamera.updateProjectionMatrix();
	freeCamera.updateProjectionMatrix();
	resizeGameArea();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

//initializes mouse controls for free camera
var orbitControls = new THREE.OrbitControls(freeCamera, renderer.domElement);
orbitControls.enableKeys = false;
orbitControls.enabled = false;
orbitControls.target = new THREE.Vector3(0,0,-10);


//lights to simulate sunlight from behind on the left
var light = new THREE.PointLight(0xffd0a0);
light.position.set(-10,0,5);
scene.add(light);
light = new THREE.AmbientLight(0x505050);
scene.add(light);

//rendering stats
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';


canvas = document.getElementById('canvas');
canvas.appendChild(renderer.domElement);
canvas.appendChild(stats.domElement);
