var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth-100, window.innerHeight-100);
document.body.appendChild(renderer.domElement);


scene.add(game);


//rendering stats
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

function render() {
	spawnTick = (spawnTick + 1) % spawnFrequency;
	if(spawnTick === (spawnFrequency-1)) {
		var newAsteroid = generateAsteroid();
		asteroidArray.push(newAsteroid);
	}
	moveAsteroids();
	cleanAsteroids();
	requestAnimationFrame(render);
	stats.update();
	renderer.render(scene, camera);
}

render();