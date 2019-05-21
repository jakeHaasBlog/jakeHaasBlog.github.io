
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

var minX = 0;
var minY = canvas.width;
var scaleX = 1;
var scaleY = 1;

function mainloop(){

	window.requestAnimationFrame(mainloop);

	elapsedTime = Date.now() - frameBegin;

	if (elapsedTime > fpsInterval){

		frameBegin = Date.now() - (elapsedTime % fpsInterval);

		canvasContext.fillStyle = "#ffffff";
		canvasContext.fillRect(0, 0, 2000, 1600);
		canvasContext.strokeStyle = '#000000';

		canvasContext.beginPath();
		x = 0;
		canvasContext.moveTo(0, -1*graphAt(0) + canvas.height);
		for (var i = 1; i < canvas.width; i++){
			x = i;
			canvasContext.lineTo(i, -1*graphAt(i) + canvas.height);
		}
		canvasContext.stroke();

		canvasContext.fillStyle = '#000000';
		drawUnits();

	}

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
	canvasContext.font = "30px Arial";
	for (var i = 0; i < 10; i++){
		canvasContext.fillText(minX + (i * (canvas.width / 10)) * scaleX, (i * (canvas.width / 10)) * 50, canvas.height - 50);
	}
}

graphButton.onclick = graph;

window.requestAnimationFrame(mainloop);