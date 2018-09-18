
// timeline

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
function mouseMove(event){
	var rect = timelineCanvas.getBoundingClientRect();
	mouse = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	}
}

timelineCanvas.addEventListener('mousedown', mouseDown);
timelineCanvas.addEventListener('mouseup', mouseUp);
timelineCanvas.addEventListener('mousemove', mouseMove)

var timeLinePercent = 0;
var markerX = 0;
function drawCanvas(){
	//timelineCanvas.width = window.innerWidth * 0.8 - 4;
	timelineCanvas.width = timelineCanvas.offsetWidth;
	timeLinePercent = mouse.x / timelineCanvas.width;
	timelineContext.fillStyle = 'rgb(0, 0, 0)';
	timelineContext.fillRect(0, 0, timelineCanvas.width, timelineCanvas.height);
	timelineContext.fillStyle = 'rgb(255, 0, 0)';
	timelineContext.fillRect(0, timelineCanvas.height/2 - 2, timelineCanvas.width, 4);

	if (mousePressed){
		markerX = mouse.x;
	}

	timelineContext.fillStyle = 'rgb(200, 0, 0)';
	timelineContext.fillRect(markerX - 50, timelineCanvas.height/2 - 2, 100, 4);
	timelineContext.fillStyle = 'rgb(150, 0, 0)';
	timelineContext.fillRect(markerX - 30, timelineCanvas.height/2 - 2, 60, 4);
	timelineContext.fillStyle = 'rgb(100, 0, 0)';
	timelineContext.fillRect(markerX - 20, timelineCanvas.height/2 - 2, 40, 4);

	timelineContext.fillStyle = 'rgb(255, 0, 0)';
	timelineContext.beginPath();
	timelineContext.arc(markerX, timelineCanvas.height/2, 10, 0, 2*Math.PI);
	timelineContext.fill();

	window.requestAnimationFrame(drawCanvas);
}

drawCanvas();