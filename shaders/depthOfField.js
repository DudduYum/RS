function createDofVerShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"kernel": {type: "fv1", value: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596, 0.175713, 0.121703, 0.065984, 0.028002, 0.0093]},
			"focusLimit": {type: "f", value: 100.0},
			"areaDepth": {type: "f", value: 0.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("depthOfField_VerStepFS").textContent
	};

	return dofShader;
}

function createDofHorShader() {
	dofShader = {
		uniforms: {
			"tDiffuse": {type: "t", value: null},
			"tDepth": {type: "t", value: null},
			"width": {type: "f", value: 0.0 },
			"height": {type: "f", value: 0.0},
			"kernel": {type: "fv1", value: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596, 0.175713, 0.121703, 0.065984, 0.028002, 0.0093]},
			"focusLimit": {type: "f", value: 100.0},
			"areaDepth": {type: "f", value: 0.0}
		},


		vertexShader: document.getElementById("defaultVS").textContent,

		fragmentShader: document.getElementById("depthOfField_HorStepFS").textContent
	};

	return dofShader;
}

