function createRenderingLoop(renderer, rendererCall) {
	
	var renLoop = {};
	
	renLoop.animate = function(stateControl, scoreControl, interfaceControl, stats, timer) {
		if(stateControl.isRunning) {
			try{
				envi.updateEnviroment();
				scoreControl.update();
				interfaceControl.update();
			}
			catch(exec) {
				stateControl.end();
			}
		}
		requestAnimationFrame(this.animate);
		stats.update();
		timer.update();
		rendererCall();
	};
	
	//animate();
	return renLoop;
}