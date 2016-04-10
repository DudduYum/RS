var baseLength = Math.min(window.innerWidth/16, window.innerHeight/9);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
scene.add(camera);

var light = new THREE.PointLight(0xffd0a0);
light.position.set(-10,0,5);
scene.add(light);
light = new THREE.AmbientLight(0x909090);
scene.add(light);


//specify the resize factor
var par = 50;
renderer.setSize(baseLength*16-par, baseLength*9-par);

//offsets 
var topOffset = par/2;
var leftOffset = par/2;

//put the output in the middle 
renderer.domElement.id = "WebGLoutput";
renderer.domElement.style.left = topOffset + "px" ;
renderer.domElement.style.top = leftOffset + "px";


//rendering stats
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
