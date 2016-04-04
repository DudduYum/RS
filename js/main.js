var baseLength = Math.min(window.innerWidth/16, window.innerHeight/9);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(baseLength*16-50, baseLength*9-50);


//scene.add(game);


//rendering stats
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';