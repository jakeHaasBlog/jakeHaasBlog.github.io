// var ballDistX = 100;
// var ballDistY = 100;
// var resolutionX = 1366 * 3;
// var resolutionY = 768 * 3;
// var noiseDetail1 = 7;
// var noiseDetail2 = 0.071;
// var noiseZoomX = 1;
// var noiseZoomY = 1;
// var timeDrawing = 2000;
// var lineWeight = 20;
// var lineLength = 30;

// default referance


var widthTextField = document.getElementById("widthInput");
var heightTextField = document.getElementById("heightInput");

var ballDistX = 40;
var ballDistY = 40;
var resolutionX = window.innerWidth - 50;
var resolutionY = window.innerHeight;
var noiseDetail1 = 5;
var noiseDetail2 = 1.2;
var noiseZoomX = 0.0002;
var noiseZoomY = 0.0002;
var timeDrawing = 400;
var lineWeight = 2;
var lineLength = 10;
var ballr = 255;
var ballg = 255;
var ballb = 255;
var balla = 255;

var backr = 0;
var backg = 0;
var balckb = 0;

var balls = new Array();

function perColor(x, y){

	//var n = Math.round(random()*16777215);
	//var n = Math.round(noise(x, y)*255);
	//var hex = '#'+n.toString(16);

	var r = ballr;
	var g = ballg;
	var b = ballb;
	var a = balla;
	var hex = color(r, g, b, a);
	
	return hex;
}

class Ball{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.direction = 1;
		this.acceleration = 0;
		this.velocity = lineLength;
		this.col = perColor(x, y);
	}

	update(){

		this.velocity += this.acceleration;

		var prevX = this.x;
		var prevY = this.y;

		this.direction = noise(this.x*noiseZoomX, this.y*noiseZoomY);
		this.direction = this.direction * (2 * Math.PI);

		this.x += Math.cos(this.direction)*this.velocity;
		this.y += Math.sin(this.direction)*this.velocity;
		stroke(this.col);
		fill(this.col);
		strokeWeight(lineWeight);
		line(Math.round(this.x), Math.round(this.y), Math.round(prevX), Math.round(prevY));
		//point(this.x, this.y);
		//rect(this.x, this.y, lineWeight, lineWeight);
	}
}

function createBall(x, y){
	balls.push(new Ball(x, y));
}

var length = 5;
var noise1;
var cnv;
function setup(){
	cnv = createCanvas(resolutionX, resolutionY);
	cnv.mousePressed(createBall);
	
	generateNewCanvas();

}

var x2;
var y2;
var itter = 0;
function draw(){
	itter++;
	if (itter < timeDrawing){
		for (var i = 0; i < balls.length; i++){
			balls[i].update();
		}
	}
}


function generateNewCanvas(){
	itter = 0;
	resolutionX = parseInt(document.getElementById("widthInput").value);
	resolutionY = parseInt(document.getElementById("heightInput").value);
	cnv.size(resolutionX, resolutionY);

	ballDistX = parseInt(document.getElementById("ballDistXInput").value);
	ballDistY = parseInt(document.getElementById("ballDistYInput").value);

	noiseZoomX = parseFloat(document.getElementById("zoomXInput").value);
	noiseZoomY = parseFloat(document.getElementById("zoomYInput").value);

	timeDrawing = parseInt(document.getElementById("drawTimeInput").value);

	lineLength = parseInt(document.getElementById("lengthInput").value);
	lineWeight = parseInt(document.getElementById("weightInput").value);

	ballr = parseInt(document.getElementById("rInput").value);
	ballg = parseInt(document.getElementById("gInput").value);
	ballb = parseInt(document.getElementById("bInput").value);
	balla = parseInt(document.getElementById("aInput").value);

	backr = parseInt(document.getElementById("backrInput").value);
	backg = parseInt(document.getElementById("backgInput").value);
	backb = parseInt(document.getElementById("backbInput").value);

	noiseDetail1 = parseInt(document.getElementById("octavesInput").value);
	noiseDetail2 = parseInt(document.getElementById("dropoffInput").value);

	balls = [];

	noiseDetail(noiseDetail, noiseDetail2);

	for (var x = -200; x < resolutionX + 200; x+=ballDistX){
		for (var y = -200; y < resolutionY + 200; y+=ballDistY){
			balls.push(new Ball(x, y));
		}
	}

	background(backr, backg, backb);

	draw();
}


function setToDefaults(){
	document.getElementById("widthInput").value = 500;
	document.getElementById("heightInput").value = 500;

	document.getElementById("ballDistXInput").value = 20;
	document.getElementById("ballDistYInput").value = 20;

	document.getElementById("zoomXInput").value = 0.005;
	document.getElementById("zoomYInput").value = 0.005;

	document.getElementById("drawTimeInput").value = 100;

	document.getElementById("lengthInput").value = 3;
	document.getElementById("weightInput").value = 1;

	document.getElementById("rInput").value = 255;
	document.getElementById("gInput").value = 255;
	document.getElementById("bInput").value = 255;
	document.getElementById("aInput").value = 255;

	document.getElementById("backrInput").value = 0;
	document.getElementById("backgInput").value = 0;
	document.getElementById("backbInput").value = 0;

	document.getElementById("octavesInput").value = 10;
	document.getElementById("dropoffInput").value = 0.02;
}