
var finalImge = document.getElementById("fractalImage");
var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
context.createImageData(1600, 1080);

var canvasWidth = 2000;
var canvasHeight = 2000;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var lineLength = 100;
var lineWeight = 1;
var lineChange = 0;
var lineR = 254;
var redChange = 0;
var lineG = 254;
var greenChange = -40;
var lineB = 254;
var blueChange = 125;
var angle = 0;
var lineAngleChange = 0.1;
var branches = 2;
var branchesChange = 0;
var itterations = 10;

var backgroundR = 0;
var backgroundG = 0;
var backgroundB = 0;
var backgroundA = 255;

var seedBranches = 10;



var marco = function(x, y, z){
	alert(x + y + z);
}

marco("Ryan ", "is a ", "nerd");



var ryan = function(){

	this.x = 90;
	this.y = 7;

	this.dothing = function(){
		alert("cats are life... batman");
	};

};


ryan.dothing();




var defaultButton = document.getElementById("defaults");
defaultButton.addEventListener("click", defaults);

var generateButton = document.getElementById("generate");
generateButton.addEventListener("click", main);


function defaults(){
	document.getElementById('backgroundR').value = '0';
	document.getElementById('backgroundG').value = '0';
	document.getElementById('backgroundB').value = '0';
	document.getElementById('backgroundA').value = '255';
	document.getElementById('lineR').value = '254';
	document.getElementById('lineG').value = '254';
	document.getElementById('lineB').value = '254';
	document.getElementById('lineRchange').value = '0';
	document.getElementById('lineGchange').value = '-40';
	document.getElementById('lineBchange').value = '125';
	document.getElementById('lineLength').value = '100';
	document.getElementById('lengthChange').value = '0';
	document.getElementById('angleStart').value = '0';
	document.getElementById('angleChange').value = '0.1';
	document.getElementById('branches').value = '2';
	document.getElementById('lineWeight').value = '1';
	document.getElementById('branchesChange').value = '0';
	document.getElementById('branchSeeds').value = '10';
	document.getElementById('itterations').value = '10';
	document.getElementById('width').value = 4000;
	document.getElementById('height').value = 2000;
}


function main(){

	backgroundR = parseInt(document.getElementById('backgroundR').value);
	backgroundG = parseInt(document.getElementById('backgroundG').value);
	backgroundB = parseInt(document.getElementById('backgroundB').value);
	backgroundA = parseInt(document.getElementById('backgroundA').value);
	lineR = parseInt(document.getElementById('lineR').value);
	lineG = parseInt(document.getElementById('lineG').value);
	lineB = parseInt(document.getElementById('lineB').value);
	redChange = parseInt(document.getElementById('lineRchange').value);
	greenChange = parseInt(document.getElementById('lineGchange').value);
	blueChange = parseInt(document.getElementById('lineBchange').value);
	lineLength = parseInt(document.getElementById('lineLength').value);
	lineChange = parseInt(document.getElementById('lengthChange').value);
	angle = parseFloat(document.getElementById('angleStart').value);
	lineAngleChange = parseFloat(document.getElementById('angleChange').value);
	branches = parseInt(document.getElementById('branches').value);
	lineWeight = parseInt(document.getElementById('lineWeight').value);
	branchesChange = parseInt(document.getElementById('branchesChange').value);
	seedBranches = parseInt(document.getElementById('branchSeeds').value);
	itterations = parseInt(document.getElementById('itterations').value);
	canvasWidth = parseInt(document.getElementById('width').value);
	canvasHeight = parseInt(document.getElementById('height').value);
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.fillStyle = "rgba("+backgroundR+", "+backgroundG+", "+backgroundB+", "+backgroundA+")";
	context.fillRect(0, 0, canvasWidth, canvasHeight);

	for(var initialBranches = 0; initialBranches < 2*Math.PI; initialBranches += (2*Math.PI)/seedBranches){
		makeBranch(canvas.width/2, canvas.height/2, lineR, lineG, lineB, lineLength, initialBranches, angle, branches, 1);
	}
	
	finalImge.src = canvas.toDataURL();
	document.getElementById("savebutton").href = canvas.toDataURL();

}

function makeBranch(x, y, r, g, b, length, startAngle, angleChange, branches, itter){

	var xLen = Math.cos(startAngle) * length;
	var yLen = Math.sin(startAngle) * length;

	var toX = x + xLen;
	var toY = y + yLen;

	context.strokeStyle = "rgb("+r+", "+g+", "+b+")";

	context.beginPath();
	context.moveTo(Math.round(x), Math.round(y));
	context.lineTo(Math.round(toX), Math.round(toY));
	context.stroke();

	var inputAngle;
	var newR, newG, newB;
	if (itter < itterations) {
		for (var i = 0; i < branches; i++){

			inputAngle = (startAngle + (angleChange*(0.25*branches)*-1) + (angleChange*i));

			newR = r + redChange;
			newG = g + greenChange;
			newB = b + blueChange;

			newR = (newR) % 256;
			newG = (newG) % 256;
			newB = (newB) % 256;

			if(newR < 0) newR*=-1;
			if(newG < 0) newG*=-1;
			if(newB < 0) newB*=-1;

			makeBranch(toX, toY, newR, newG, newB, length + lineChange, inputAngle, angleChange + lineAngleChange, branches + branchesChange, itter+1);
		}
	}
}


