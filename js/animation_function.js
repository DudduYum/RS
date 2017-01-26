//obj - object to move around
//subdivision - tell how many path pint do you want to generate 
//
//
function Animator(obj, subdivision , center, callback){ 
	// the object that should be moved aroudn
	this.animatedObj = obj;
	
	//test stuf
	this.dispatchOnce = true;




	//start point, shoudl never be changed in this class
	this.startPoint = this.animatedObj.position.clone();

	// animation is like a cycle, need a center
	this.center = center.clone();
	
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
	this.stepTime = 0.06;
	
	//speed in points/sec
	this.speed = 1;	
	
	//the animation function sruff
	
	// the point in animation path 
	// max step is path length - 1
	this.step = 0;
	



	//testing method
	this.unitTest();
}

function createTranslation( a , b , c ){
	mat = new THREE.Matrix4();
	mat1 = new THREE.Matrix4();
	transformation = {
		"translation": mat.makeTranslation( a , b , c),
		"antiTranslation": mat1.makeTranslation( -a, -b, -c)
	};
	return transformation;
}	


function createRotationAxis(axis, ang ){
	mat = new THREE.Matrix4();
	mat1 = new THREE.Matrix4();
	transformation = {
		"rotation": mat.makeRotationAxis(axis,  ang ),
		"antiRotation": mat1.makeRotationAxis(axis,  ang )
	};
	return transformation;
}

function angleFromAxisToPlane( point , norm , axes){

	var projection = point.clone();
	projection.projectOnPlane( norm );

	projection.normalize();
	
	var angle = axes.angleTo( point );
	
	return angle;
}

function randomisePosition( factor , point){
	function perturbation ( val ){
		
		return  ( Math.random() * val ) % ( factor * val) - ((factor * val) /2); 
	}


	var newX = point.x + perturbation( point.x );

	var newY = point.y + perturbation( point.y );

	var newZ = point.z + perturbation( point.z );
	
	var newPoint = new THREE.Vector3(
		newX,
		newY,
		newZ
	);
	return newPoint;

}






//this method define points that will be used to create the path for animation. It takes 
//start point and produce other points.
//
//startPoint - THREE.Vector3
//
//res - array of THREE.Vector3
//
Animator.prototype.makeFundamentalPoints = function(){

		

		//traslazione
	var tr = createTranslation( 
		- this.center.x,
		- this.center.y,
		- this.center.z
	);


	this.startPoint.applyMatrix4( tr.translation );
	this.center.applyMatrix4( tr.translation );
	
	//XZ
	var angle = angleFromAxisToPlane(
		this.startPoint, // point 
		new THREE.Vector3(0 , 1 , 0), // norm
		new THREE.Vector3(1 , 0 , 0) // axis
	); 

	var ro1 = createRotationAxis(
		new THREE.Vector3( 0 , 1 , 0),
		angle
	);

	this.startPoint.applyMatrix4( ro1.rotation );

	//XY
	var angle1 = angleFromAxisToPlane(
		this.startPoint, // point
		new THREE.Vector3( 0 , 0 , 1), //norm
		new THREE.Vector3( 1 , 0 , 0) //axis
	);

	var ro2 = createRotationAxis( 
		new THREE.Vector3( 0 , 0 , 1),
		angle1
	);

	this.startPoint.applyMatrix4( ro2.rotation );

	
	var ar = [
		this.startPoint.clone(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		this.startPoint.clone()
	];
	var le = this.startPoint.length();
	
	console.log(ar);
	//random orbit rotation 
	rr =  createRotationAxis(
	       new THREE.Vector3( 1 , 0 , 0),
	       Math.random() % Math.PI
	);
	
	console.log(tr);
	console.log(ro1);
	console.log(ro2);

	for( i = 1 , a = Math.PI/4 ; i < ar.length -1 ; i++ , a += Math.PI/4 ){
		
		var randLe = Math.random() * 3;
		ar[ i ].set(
			le * randLe * Math.cos( a ),
			0,
			le * randLe * Math.sin( a )
		);


		ar[i] = randomisePosition( 0.3 , ar[i]);
//		
//		//apply random rotation 
		ar[ i ].applyMatrix4( rr.rotation );

		ar[ i ].applyMatrix4( ro2.antiRotation);

		ar[ i ].applyMatrix4( ro1.antiRotation);

		ar[ i ].applyMatrix4( tr.antiTranslation);
	}
	
	this.startPoint.applyMatrix4( ro2.antiRotation);
	this.startPoint.applyMatrix4( ro1.antiRotation);
	this.startPoint.applyMatrix4( tr.antiTranslation);


	this.center.applyMatrix4( tr.antiTranslation);


	return ar;
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
		
		//console.log(this.step);
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


// this method let you stop animation
//
Animator.prototype.stop = function(){
	//stop the timer 
	//this.timer.stop();


	//translate the camere to original position
	this.animatedObj.position.set(
		this.startPoint.x,
		this.startPoint.y,
		this.startPoint.z
	);
	
	// call callback function
	this.callback();

};


 


 // this function don't do much, it just shows me 
 // all definition and property of the object
 Animator.prototype.unitTest = function(){

 	console.log("****** initialization");
	console.log(this.pathOfAnimation);
 	console.log(this.startPoint);
	console.log("****** end initialization");
	console.log(); 
};

Animator.prototype.anTest = function(){

	//console.log( this.step);
 	this.doAnimation();
 };


Animator.prototype.newTeckTest = function(vect , cent){
//	function makeRotation( axis , theta ){
//
//		rotation = new THREE.Matrix4();
//		antiRotation = new THREE.Matrix4();
//		return {
//			rotation : rotation.makeRotationAxis( axis , theta ),
//		
//			backRotation : antiRotation.makeRotationAxis( axis , -theta )
//		};
//	}
//
//	function makeTranslation( X , Y , Z){
//		translation = new THREE.Matrix4();
//		antiTranslation = new THREE.Matrix4();
//
//		return {
//			translation : translation.makeTranslation( X , Y, Z),
//			backTranslation : translation.makeTranslation( -X, -Y, -Z)
//		};
//	}
//
//	if(this.dispatchOnce === true){
//	
//		console.log("here go a new tecknology");
//
//
//		//Transformation
//		var c = cent.clone();
//		var v = vect.clone();
//
//
//	
//		var tr = makeTranslation( -c.x , -c.y , -c.z );
//		c.applyMatrix4( tr.translation );
//		v.applyMatrix4( tr.translation );
//	
//	
//	
//
//		// to XY			
//		var vXY = v.clone();
//		vXY.projectOnPlane( new THREE.Vector3( 0 , 0 , 1));
//
//		var ang = new THREE.Vector3( 1, 0 , 0).angleTo( vXY.clone().normalize() );
//		
//		var rXY = makeRotation( new THREE.Vector3( 0 , 0 , 1) , ang );
//		
//		v.applyMatrix4( rXY.rotation );
//		// end to XY
//
//		// to X
//		ang = new THREE.Vector3( 1 , 0 , 0).angleTo( v.clone().normalize() );
//
//		var rX = makeRotation( new THREE.Vector3( 0 , 1 , 0) ,  ang );
//
//		v.applyMatrix4( rX.rotation );
//		// end to X
//		// end Transformation
//
//		//point generation
//
//		// DEFINITIONS
//		//
//		//
//		//
//		//points declaration and initializzation
//		var startPoints = [
//			v,
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			new THREE.Vector3(),
//			v
//		];
//
//		//beware!!! angls[i] is the angle of startPoints[i]
//		var angls = [
//			0,
//			Math.PI/4 ,
//			Math.PI/2 ,
//			3 * Math.PI/4 ,
//			Math.PI ,
//			5 * Math.PI/4 ,
//			3 * Math.PI/2 ,
//			7 * Math.PI/4 ,
//			0
//		];
//
//		// the radius, this way I don't need to calculate it every loop interattion
//		var len = v.length();
//		
//		// here I create all points in easy way, they alla are on XZ plain thanks to trasformation
//		for( i = 1; i < startPoints.length - 2 ; i++){
//			startPoints[ i ].set(
//				len * Math.cos( angls[ i ] ) ,
//				v.y,
//				len * Math.sin( angls[ i ] )
//			);
//		}
//
//
//		// end point generation
//
//		//back trasformation
//
//
//		for( i = 0 ; i < startPoints.length - 1 ; i++){
//
//			startPoints[ i ].applyMatrix4( rX.backRotation );
//			startPoints[ i ].applyMatrix4( rXY.backRotation );
//			startPoints[ i ].applyMatrix4( tr.backTranslation );
//
//		}
//
//		// end back trasformation
//
//
////		for( i = 0 ; i < startPoints.length ; i++){
////			console.log( "-------" );
////			console.log( i );
////			console.log(  startPoints[ i ]);
////		}
//		
//	
//		
//		this.dispatchOnce = false;
//	}
};
