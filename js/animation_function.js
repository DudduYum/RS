//obj - object to move around
//subdivision - tell how many path pint do you want to generate 
function Animator(obj, subdivision , center, callback){ 
	// the object that should be moved aroudn
	this.animatedObj = obj;
	
	//test stuf
	this.dispatchOnce = true;

	//start point, shoudl never be changed in this class
	this.startPoint = this.animatedObj.position;

	// animation is like a cycle, need a center
	this.center = center;
	
	// is called when animation step is overe
	this.callback = callback;	

	//fundamental points
	this.superPoints = this.makeFundamentalPoints(this.startPoint);

	//path of the animation, object passes through thi points
	this.pathOfAnimation = this.createPath(
		subdivision,
		this.superPoints
	);
	
	
	//local timer
	this.timer = new Timer();
	this.timer.reset();

	//time staps
	
	// thels when the last animation has been done
	// need it in upadete function
	this.lastAnimation = this.timer.getTime();

	//animatin speed
	this.stepTime = 0.2;

	//the animation function sruff
	
	// the point in animation path 
	// max step is path length - 1
	this.step = 0;
	



	//testing method
	this.unitTest();
}





//this method define points that will be used to create the path for animation. It takes 
//start point and produce other points.
//
//startPoint - THREE.Vector3
//
//res - array of THREE.Vector3
//
Animator.prototype.makeFundamentalPoints = function(startPoint){

	console.log("fundamental points");
	
	function randomYval(){
		return startPoint.y + ( Math.random() * 6 - 3);
	}


	var angle = [
		undefined,
		- Math.PI / 2,
		- 3 * Math.PI / 4,
		Math.PI,
		3 * Math.PI / 4,
		Math.PI / 2,
		Math.PI / 4,
		0,
		-Math.PI / 4,
		undefined
	];



	var points = [
		startPoint,
		new THREE.Vector3(),
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		new THREE.Vector3(),	
		startPoint
	];

	for(i = 1 ; i < 9 ; i++){
		points[i].set(
			Math.cos( angle[i] ) * 5, // I use 5 to set the distance from the object
			randomYval(),
			Math.sin( angle[i] ) * 5
		);
	}


	return points;
};


// points - array of THREE.Vector3
// subdivisin - the numbero of points to generate
// --
// res - array of THREE.Vector3
Animator.prototype.createPath = function(subdivision , points){
	var res;
	
	var curve = new THREE.CatmullRomCurve3(points);
	res = curve.getPoints( subdivision ); 
	
	return res;
};






// update function, should be private pethod. Don't call it form outside
// this function is responsible for change the state of this object
// not the state of animated object
Animator.prototype.update = function(){
	this.timer.update();
	
	var currentTime = this.timer.getTime();
	if( currentTime - this.lastAnimation > this.stepTime ){
		
		console.log(this.step);
		this.step = this.step % (this.pathOfAnimation.length - 1)  ;
		this.step++;
		this.lastAnimation = currentTime;

	}
};


//this function animate animated object, and perform the call back. It does't interfear with life propertys of this object
//do not return, and it shouldn't, perform all needed animation stuf on onimated bject
//this is this 
Animator.prototype.doAnimation = function(){
	//console.log("do animation");

	this.update();	

	//console.log(this.animatedObj );
	this.animatedObj.position.set(
		this.pathOfAnimation[ this.step ].x,
		this.pathOfAnimation[ this.step ].y,
		this.pathOfAnimation[ this.step ].z
	);
	// call callback function
	this.callback();
	
	
};	





 


 // this function don't do much, it just shows me 
 // all definition and property of the object
 Animator.prototype.unitTest = function(){

 	console.log("initialization");
	console.log(this.pathOfAnimation);
 	console.log(this.startPoint);
};

Animator.prototype.anTest = function(){

	//console.log( this.step);
 	this.doAnimation();
 };
