

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
var uploadedFile = document.getElementById('inputFileButton');
var displayImage = document.getElementById('finalImage');

var saveButton = document.getElementById('saveLink');

var imageWidth;
var imageHeight;



var bubbleInputsInput = document.getElementById('bubbleInputsInput');
var bubblesPerInInput = document.getElementById('bubblesPerInInput');
var colorModeInput = document.getElementById('colorModeInput');
var minBrightnessInput = document.getElementById('minBrightnessInput');

var bubblesPerInput;
var bubbleInputs;
var colorMode;
var minBrightness;

function getInputs(){
	bubbleInputs = Number(bubbleInputsInput.value);
	bubblesPerInput = Number(bubblesPerInInput.value);
	colorMode = colorModeInput.value;
	minBrightness = Number(minBrightnessInput.value);

	if (bubbleInputs == '') bubbleInputs = 2000;
	if (isNaN(bubbleInputs)){
		bubbleInputs = 2000;
	}
	if (bubblesPerInput == '') bubblesPerInput = 7;
	if (isNaN(bubblesPerInput)){
		bubblesPerInput = 7;
	}
	if (colorMode == 'white bubbles'){

	} else if (colorMode == 'greyscale'){
		
	} else if (colorMode == 'full color'){
		
	} else {
		colorMode = 'full color';
	}
	if (minBrightness == '') minBrightness = 0;
	if (isNaN(minBrightness)){
		minBrightness = 0;
	}

}



saveButton.addEventListener('onclick', savePressed);

document.addEventListener('DOMContentLoaded', initImageLoader);

function initImageLoader(){

	document.addEventListener('change', choseFile);
	function choseFile(event){
		var filePath = event.target.files[0];
		handleFile(filePath);
	}

	function handleFile(filepath){
		var imageType = /image.*/;
		if (filepath.type.match(imageType)){
			var reader = new FileReader();

			reader.onloadend = function(onLoadEndEvent) {
				var tempImage = new Image();

				tempImage.onload = function(event) {
					canvas.height = event.target.height;
					canvas.width = event.target.width * 2;

					imageWidth = event.target.width;
					imageHeight = event.target.height;

					context.drawImage(event.target, 0, 0);

					clearCircles();
					filterImage();

					savePressed();
				}

				tempImage.src = onLoadEndEvent.target.result;
			}

			reader.readAsDataURL(filepath);

		}
	}
}

function filterImage(){
	getInputs();
	copyCanvasGreyscale();
	generateCircles();
	displayImage.src = canvas.toDataURL();
}


var newImageData;
function copyCanvasGreyscale(){
	newImageData = context.getImageData(0, 0, imageWidth, imageHeight);

	if (colorMode == 'white bubbles'){
		var data = newImageData.data;

		var r, g, b;
		var avg;
		for (var i = 0; i < data.length; i += 4){
			r = data[i];
			g = data[i+1];
			b = data[i+2];
			a = data[i+3];
			avg = (r + g + b) / 3;

			if (avg > 128) avg = 255;
			else avg = 0;

			data[i] = avg;
			data[i+1] = avg;
			data[i+2] = avg;
			data[i+3] = 255;
		}
	} else if (colorMode == 'greyscale'){
		var data = newImageData.data;

		var r, g, b;
		var avg;
		for (var i = 0; i < data.length; i += 4){
			r = data[i];
			g = data[i+1];
			b = data[i+2];
			a = data[i+3];
			avg = (r + g + b) / 3;

			data[i] = avg;
			data[i+1] = avg;
			data[i+2] = avg;
			data[i+3] = 255;
		}
	} else if (colorMode == 'full color'){

	}
}



function clearCircles(){
	circles = [];
	context.fillStyle = 'rgb(0, 0, 0)';
	context.fillRect(imageWidth, 0, imageWidth, imageHeight);
}



function generateCircles(){
	
	var randX;
	var randY;
	for (var cir = 0; cir < bubbleInputs; cir++){

		for (var c = 0; c < bubblesPerInput; c++){
			randX = Math.floor(Math.random() * imageWidth);
			randY = Math.floor(Math.random() * imageHeight);
			circles.push(new Circle(randX, randY));
		}


		for (var i = 0; i < circles.length; i++){
			if (circles[i].draw == false) circles.remove[i];
			circles[i].grow();
		}
	}




	// context.strokeStyle = 'rgb(255, 255, 255)';
	// for (var i = 0; i < circles.length; i++){
	// 	if (circles[i].draw){
	// 		context.beginPath();
	// 		context.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2*Math.PI, false);
	// 		context.stroke();
	// 	}
	// }
	context.fillStyle = 'rgb(255, 255, 255)';
	var r, g, b;
	var originData = context.getImageData(0, 0, imageWidth, imageHeight).data;
	for (var i = 0; i < circles.length; i++){
		if (circles[i].draw){

			r = newImageData.data[getXY(circles[i].x, circles[i].y)];
			g = newImageData.data[getXY(circles[i].x, circles[i].y) + 1];
			b = newImageData.data[getXY(circles[i].x, circles[i].y) + 2];

			context.fillStyle = 'rgb('+r+', '+g+', '+b+')';

			context.beginPath();
			context.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2*Math.PI, false);
			context.fill();
		}
	}



	// context.beginPath();
	// context.arc(500, 50, 50, 0, 2 * Math.PI, false);
	// context.stroke();

	//context.putImageData(newImageData, imageWidth, 0);
}


function getXY(x, y){
	var pixels = newImageData.data.length / 4;
	var pixIn = ((y * imageWidth) + x);
	return Math.round(pixIn * 4);
}

function distanceBetweenPoints(x, y, x2, y2){
	// a2 + b2 = c2
	// c = sqrt(a2 + b2)
	var xDist = x2 - x;
	var yDist = y2 - y;
	return Math.sqrt((xDist*xDist)+(yDist*yDist));
}

//circles get drawn on white
var circles = new Array();
class Circle{
	constructor(x, y){
		this.draw = true;
		this.fullGrown = false;
		this.x = x + imageWidth;
		this.y = y;
		this.radius = 0;
		var r = newImageData.data[getXY(this.x, this.y)];
		var g = newImageData.data[getXY(this.x, this.y)+1];
		var b = newImageData.data[getXY(this.x, this.y)+2];
		var avg = (r + g + b) / 3;
		if (avg < minBrightness){
			this.fullGrown = true;
		}

		for (var i = 0; i < circles.length; i++){
			if (distanceBetweenPoints(this.x, this.y, circles[i].x, circles[i].y) < this.radius*2){
				if (distanceBetweenPoints(this.x, this.y, circles[i].x, circles[i].y) != 0){
					this.fullGrown = true;
					this.draw = false;
					circles[i].fullGrown = true;
					circles[i].draw = false;
				}
			}
		}
	}

	grow(){
		if (this.fullGrown == false){
			for(var i = 0; i < circles.length; i++){
				if (distanceBetweenPoints(this.x, this.y, circles[i].x, circles[i].y) < this.radius*2){
					if (distanceBetweenPoints(this.x, this.y, circles[i].x, circles[i].y) != 0){
						this.fullGrown = true;
						circles[i].fullGrown = true;
					}
				}
			}

			if (this.fullGrown == false) this.radius++;
		}

	}
}


function savePressed(){
	var tmpFullImage = context.getImageData(0, 0, imageWidth*2, imageHeight);
	var tmpFinishedImage = context.getImageData(imageWidth, 0, imageWidth, imageHeight);
	context.fillStyle = 'rgb(0, 0, 0)';
	context.fillRect(0, 0, imageWidth*2, imageHeight);
	canvas.width = imageWidth;
	context.putImageData(tmpFinishedImage, 0, 0);
	saveButton.href = canvas.toDataURL();
	canvas.width = imageWidth * 2;
	context.putImageData(tmpFullImage, 0, 0);
}