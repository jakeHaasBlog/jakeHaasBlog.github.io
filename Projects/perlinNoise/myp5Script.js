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

// default reference


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

var currentSeed = 1;

var balls = new Array();

var percentComplete = 0.0;

function perColor(x, y){

	var ballRstr = document.getElementById("rInput").value;
	var ballGstr = document.getElementById("gInput").value;
	var ballBstr = document.getElementById("bInput").value;
	var ballAstr = document.getElementById("aInput").value;

	var redOne = '';
	var redTwo = '';

	var greenOne = '';
	var greenTwo = '';

	var blueOne = '';
	var blueTwo = '';

	var alphaOne = '';
	var alphaTwo = '';

	var atRedDash = false;
	for (var i = 0; i < ballRstr.length; i++){
		if (ballRstr.charAt(i) == '-'){
			atRedDash = true;
			i++;
		}
		if (!atRedDash) {
			redOne += ballRstr.charAt(i);
		}
		if (atRedDash) {
			redTwo += ballRstr.charAt(i);
		}
	}
	var atGreenDash = false;
	for (var i = 0; i < ballGstr.length; i++){
		if (ballGstr.charAt(i) == '-'){
			atGreenDash = true;
			i++;
		}
		if (!atGreenDash) {
			greenOne += ballGstr.charAt(i);
		}
		if (atGreenDash) {
			greenTwo += ballGstr.charAt(i);
		}
	}
	var atBlueDash = false;
	for (var i = 0; i < ballBstr.length; i++){
		if (ballBstr.charAt(i) == '-'){
			atBlueDash = true;
			i++;
		}
		if (!atBlueDash) {
			blueOne += ballBstr.charAt(i);
		}
		if (atBlueDash) {
			blueTwo += ballBstr.charAt(i);
		}
	}
	var atAlphaDash = false;
	for (var i = 0; i < ballAstr.length; i++){
		if (ballAstr.charAt(i) == '-'){
			atAlphaDash = true;
			i++;
		}
		if (!atAlphaDash) {
			alphaOne += ballAstr.charAt(i);
		}
		if (atAlphaDash) {
			alphaTwo += ballAstr.charAt(i);
		}
	}


	if (redTwo == '') redTwo = redOne;
	if (greenTwo == '') greenTwo = greenOne;
	if (blueTwo == '') blueTwo = blueOne;
	if (alphaTwo == '') alphaTwo = alphaOne;
	var r = (Math.random() * (parseInt(redTwo) - parseInt(redOne))) + parseInt(redOne);
	var g = (Math.random() * (parseInt(greenTwo) - parseInt(greenOne))) + parseInt(greenOne);
	var b = (Math.random() * (parseInt(blueTwo) - parseInt(blueOne))) + parseInt(blueOne);
	var a = (Math.random() * (parseInt(alphaTwo) - parseInt(alphaOne))) + parseInt(alphaOne);
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

	deleteOffScreen(){
		var off = false;
		if (this.x > resolutionX + 200) off = true;
		if (this.y > resolutionY + 200) off = true;
		if (this.x < -200) off = true;
		if (this.y < -200) off = true;
		return off;
	}
}

function createBall(x, y){
	balls.push(new Ball(x, y));
}

var mouseBalls = [];
function createBallMouse(){
	mouseBalls.push(new Ball(mouseX, mouseY));
}

var length = 5;
var noise1;
var cnv;

function setup(){

	cnv = createCanvas(resolutionX, resolutionY);
	cnv.mousePressed(createBallMouse);
	
	generateNewCanvas();

}

var x2;
var y2;
var itter = 0;
function draw(){
	if (document.getElementById("showAnimBox").checked){
		itter++;
		if (itter < timeDrawing){
			for (var i = 0; i < balls.length; i++){
				if (balls[i].deleteOffScreen()){
					balls.splice(i, 1);
					i--;
				}
			}
			for (var i = 0; i < balls.length; i++){
				balls[i].update();
			}

			document.getElementById("percentComplete").innerHTML = ((itter / timeDrawing) * 100) + "%";
		}

		for (var i = 0; i < mouseBalls.length; i++){
			if (mouseBalls[i].deleteOffScreen()){
				mouseBalls.splice(i, 1);
				i--;
			}
		}

		for (var i = 0; i < mouseBalls.length; i++){
			mouseBalls[i].update();
		}

	} else {
		while (itter < timeDrawing){
			itter++;
			for (var i = 0; i < balls.length; i++){
				if (balls[i].deleteOffScreen()){
					balls.splice(i, 1);
					i--;
				}
			}
			for (var i = 0; i < balls.length; i++){
				balls[i].update();
			}

			document.getElementById("percentComplete").innerHTML = ((itter / timeDrawing) * 100) + "%";
		}

	}

}


function generateNewCanvas(){
	noiseSeed(currentSeed);
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

	backr = parseInt(document.getElementById("backrInput").value);
	backg = parseInt(document.getElementById("backgInput").value);
	backb = parseInt(document.getElementById("backbInput").value);

	noiseDetail1 = parseFloat(document.getElementById("octavesInput").value);
	noiseDetail2 = parseFloat(document.getElementById("dropoffInput").value);

	mouseBalls = [];
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

	document.getElementById("showAnimBox").checked = true;

}

function setNewSeed(){
	currentSeed = random() * 10000000;
}