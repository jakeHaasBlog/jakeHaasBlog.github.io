
// timeline



var numberOfPages = 3;
var currentPageNumber = 1;

var blogspace = document.getElementById('blogspace');


var blogPages = []; // this aray holds all blogs, they must have a run function
					// the run function is called page changes


var runDNA = true;
var canvasCopy = document.createElement('canvas');
var canvasCopyContext = canvasCopy.getContext('2d');
var canvasCopyData;

function updateBlogSpace(){
	blogPages[currentPageNumber-1].run();
}

var prePage = currentPageNumber;
var wasMousePressed = false;
function updateBlogspaceCondition(){

	if (currentPageNumber != prePage){
		prePage = currentPageNumber;
		updateBlogSpace();
	}
}

var timelineCanvas = document.getElementById('timeline');
var timelineContext = timelineCanvas.getContext('2d');

var mousePressed = false;
var mouse = {x: 0, y: 0};

function mouseDown(event){
	mousePressed = true;
}
function mouseUp(event){
	mousePressed = false;
}
function mouseOutOfDna(){
	mousePressed = false;
}
function mouseMove(event){
	var rect = timelineCanvas.getBoundingClientRect();
	mouse = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	}
}
function touchStart(event){
	mousePressed = true;
	//var rect = timelineCanvas.getBoundingClientRect();
	mouse = {
		x: event.clientX,
		y: event.clientY
	}
}
function touchend(event){
	mousePressed = false;
}

timelineCanvas.addEventListener('mousedown', mouseDown);
timelineCanvas.addEventListener('mouseup', mouseUp);
timelineCanvas.addEventListener('mousemove', mouseMove);
timelineCanvas.addEventListener('mouseout', mouseOutOfDna);

timelineCanvas.addEventListener('touchstart', touchStart);
timelineCanvas.addEventListener('touchend', touchend);

var timeLinePercent = 0;
var markerX = 0;

var rotateVar = 0;
var dnaStrandsRed = [];
// red strands
for (var i = 0; i < 300; i++){
	dnaStrandsRed.push({
		xOffset: i * -20,
		getX(){
			return this.xOffset + markerX;
		},
		getY(){
			return  Math.round((Math.cos((this.getX()+rotateVar)*0.02)*40) + timelineCanvas.height/2);
		},
		getZ(){
			return Math.round((Math.sin((this.getX()+rotateVar)*0.02)*4)) + 7;
		}
	});
}
var dnaStrandsBlue = [];
// blue Strands
for (var i = 0; i < 300; i++){
	dnaStrandsBlue.push({
		xOffset: i * -20,
		getX(){
			return this.xOffset + markerX + 3;
		},
		getY(){
			return  Math.round((Math.cos((this.getX()+rotateVar)*0.02)*-40) + timelineCanvas.height/2);
		},
		getZ(){
			return Math.round(Math.sin(((this.getX()+rotateVar)*0.02)*4)) + 7;
		}
	});
}

function drawDNAonce(){
	timelineContext.fillStyle = 'rgb(0, 0, 0)';
	timelineContext.fillRect(0, 0, timelineCanvas.width, timelineCanvas.height);
	// z between 3 and 11
	var brightness;
	for (var r = 0; r < dnaStrandsRed.length; r++){
		if (dnaStrandsRed[r].getZ() < dnaStrandsBlue[r].getZ()){
			brightness = 255 - (dnaStrandsRed[r].getZ() * 35) + 145;
			timelineContext.fillStyle = 'rgb('+brightness+', 0, 0)';
			timelineContext.beginPath();
			timelineContext.arc(dnaStrandsRed[r].getX(), dnaStrandsRed[r].getY(), dnaStrandsRed[r].getZ(), 0, 2*Math.PI);
			timelineContext.fill();

			makeChromosomes(r);
			
			brightness = 255 - (dnaStrandsBlue[r].getZ() * 35) + 145;
			timelineContext.fillStyle = 'rgb(0, 0, '+brightness+')';
			timelineContext.beginPath();
			timelineContext.arc(dnaStrandsBlue[r].getX(), dnaStrandsBlue[r].getY(), dnaStrandsBlue[r].getZ(), 0, 2*Math.PI);
			timelineContext.fill();
		} else {
			brightness = 255 - (dnaStrandsRed[r].getZ() * 35) + 145;
			timelineContext.fillStyle = 'rgb(0, 0, '+brightness+')';
			timelineContext.beginPath();
			timelineContext.arc(dnaStrandsBlue[r].getX(), dnaStrandsBlue[r].getY(), dnaStrandsBlue[r].getZ(), 0, 2*Math.PI);
			timelineContext.fill();

			makeChromosomes(r);

			brightness = 255 - (dnaStrandsBlue[r].getZ() * 35) + 145;
			timelineContext.fillStyle = 'rgb('+brightness+', 0, 0)';
			timelineContext.beginPath();
			timelineContext.arc(dnaStrandsRed[r].getX(), dnaStrandsRed[r].getY(), dnaStrandsRed[r].getZ(), 0, 2*Math.PI);
			timelineContext.fill();
		}
	}

	rotateVar--;
}

function drawCanvas(){
	timelineCanvas.width = window.innerWidth * 0.8 - 4;
	timelineCanvas.width = timelineCanvas.offsetWidth;
	timeLinePercent = markerX / timelineCanvas.width;

	if (mousePressed){
		markerX = mouse.x;
	}

	decidePage();

	if (runDNA)drawDNAonce();
	else if (!runDNA && mousePressed) drawDNAonce();

	updateBlogspaceCondition();
	window.requestAnimationFrame(drawCanvas);
}

function makeChromosomes(r){
	var redx = dnaStrandsRed[r].getX();
	var bluex = dnaStrandsBlue[r].getX();
	var redy = dnaStrandsRed[r].getY();
	var bluey = dnaStrandsBlue[r].getY();
	var halfX = (redx + bluex)/2;
	var halfy = (redy + bluey)/2;
	
	var n = r%4;
	if (n == 0) timelineContext.strokeStyle='rgb(0, 255, 0)';
	else if (n == 1) timelineContext.strokeStyle='rgb(0, 255, 255)';
	else if (n == 2) timelineContext.strokeStyle='rgb(255, 255, 0)';
	else timelineContext.strokeStyle='rgb(255, 0, 255)';
	
	timelineContext.beginPath();
	timelineContext.moveTo(redx, redy);
	timelineContext.lineTo(halfX, halfy);
	timelineContext.stroke();

	var n = (r * 7)%4;
	if (n == 0) timelineContext.strokeStyle='rgb(0, 255, 0)';
	else if (n == 1) timelineContext.strokeStyle='rgb(0, 255, 255)';
	else if (n == 2) timelineContext.strokeStyle='rgb(255, 255, 0)';
	else timelineContext.strokeStyle='rgb(255, 0, 255)';
	
	timelineContext.beginPath();
	timelineContext.moveTo(halfX, halfy);
	timelineContext.lineTo(bluex, bluey);
	timelineContext.stroke();
}


function decidePage(){
	currentPageNumber = Math.round(timeLinePercent * (numberOfPages-1));
	currentPageNumber++;
}

drawCanvas();


