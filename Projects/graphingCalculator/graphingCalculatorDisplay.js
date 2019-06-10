
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-130;
canvasContext = canvas.getContext('2d');

var frameBegin = Date.now();
var elapsedTime;
var fpsInterval = 1000/30;

var equationField = document.getElementById("equationField");
var graphButton = document.getElementById("graphButton");

var expr = "x";
var x;

var viewX = 0;
var viewY = 0;
var scaleX = 1;
var scaleY = 1;

var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;
var viewSpeedY = 0;
var viewSpeedX = 0;

function cameraLogic(){
	if(wDown) viewSpeedY += 0.3;
	else if(sDown) viewSpeedY -= 0.3;
	else {
		if (viewSpeedY > 0) viewSpeedY -= 0.3;
		if (viewSpeedY < 0) viewSpeedY += 0.3;
		if (Math.abs(viewSpeedY) <= 0.5) viewSpeedY = 0;
	}
	if (viewSpeedY > 10) viewSpeedY = 10;
	if (viewSpeedY < -10) viewSpeedY = -10;

	if(dDown) viewSpeedX += 0.3;
	else if(aDown) viewSpeedX -= 0.3;
	else {
		if (viewSpeedX > 0) viewSpeedX -= 0.3;
		if (viewSpeedX < 0) viewSpeedX += 0.3;
		if (Math.abs(viewSpeedX) <= 0.5) viewSpeedX = 0;
	}
	if (viewSpeedX > 10) viewSpeedX = 10;
	if (viewSpeedX < -10) viewSpeedX = -10;


	viewY += viewSpeedY;
	viewX += viewSpeedX;
}

function mainloop(){

	window.requestAnimationFrame(mainloop);

	elapsedTime = Date.now() - frameBegin;

	if (elapsedTime > fpsInterval){

		frameBegin = Date.now() - (elapsedTime % fpsInterval);

		canvasContext.fillStyle = "#000000";
		canvasContext.fillRect(0, 0, 2000, 1600);

		drawGrid();

		canvasContext.strokeStyle = '#aa00ff';

		graph();

		var previousY;
		var y;

		canvasContext.beginPath();
		x = 0;
		y = pixYatGraphY(-1*graphAt(graphXatPixX(0)) + canvas.height);
		canvasContext.moveTo(0, y);
		previousY = y;
		for (var i = 1; i < canvas.width; i++){
			x = i;
			y = pixYatGraphY(-1*graphAt(graphXatPixX(i)) + canvas.height);
			canvasContext.lineTo(i, y);
			previousY = pixYatGraphY(-1*graphAt(graphXatPixX(i)) + canvas.height);
		}
		canvasContext.stroke();

		canvasContext.fillStyle = '#000000';

		drawUnits();

	}

	cameraLogic();

}

function graphXatPixX(x){
	return (x+viewX) * scaleX;
}

function graphYatPixY(y){
	return (y+viewY);
}

function pixYatGraphY(y){
	return (y+viewY) * scaleY;
}


function graph(){
	expr = equationField.value;
}

function graphAt(x){
	var replacedExp = expr;
	replacedExp.replace("x", x);
	return eval(replacedExp);
}

function drawUnits(){

	canvasContext.font = "10px Arial";
	canvasContext.fillStyle = '#ffffff';
	var x = 0;
	for (var i = 0; i < 10; i++){
		canvasContext.fillText(Math.round((i*(canvas.width/10)+viewX)*scaleX), x, canvas.height-5);
		x += canvas.width / 10;
	}
	var y = canvas.height;
	for (var i = 0; i < 10; i++){
		canvasContext.fillText(Math.round((i*(canvas.height/10)+viewY)*scaleY), 5, y);
		y -= canvas.height / 10;
	}

}

function drawGrid(){
	var x = 0;
	for (var i = 0; i < 10; i++){
		x += canvas.width / 10;
		canvasContext.strokeStyle = '#111111';
		canvasContext.beginPath();
		canvasContext.moveTo(x, 0);
		canvasContext.lineTo(x, canvas.height);
		canvasContext.stroke();
	}
	var y = canvas.height;
	for (var i = 0; i < 10; i++){
		y -= canvas.height / 10;
		canvasContext.strokeStyle = '#111111';
		canvasContext.beginPath();
		canvasContext.moveTo(0, y);
		canvasContext.lineTo(canvas.width, y);
		canvasContext.stroke();
	}
}

document.addEventListener('keydown', function(event){
	if (event.key == 'd'){
		dDown = true;
	} else if (event.key == 'a'){
		aDown = true;
	} else if (event.key == 'w'){
		wDown = true;
	} else if (event.key == 's'){
		sDown = true;
	}

	if (event.key == '['){
		scaleX -= 0.001;
	} else if (event.key == '{'){
		scaleY -= 0.001;
	}
	if (event.key == ']'){
		scaleX += 0.001;
	} else if (event.key == '}'){
		scaleY += 0.001;
	}
});
document.addEventListener('keyup', function(event){
	if (event.key == 'd'){
		dDown = false;
	} else if (event.key == 'a'){
		aDown = false;
	} else if (event.key == 'w'){
		wDown = false;
	} else if (event.key == 's'){
		sDown = false;
	}
});

window.requestAnimationFrame(mainloop);