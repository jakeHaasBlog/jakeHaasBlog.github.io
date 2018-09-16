

var canvas;
function setup(){
	canvas = createCanvas(500, 500);
	canvas.parent('finalCanvas');
	fill(0);
	rect(0, 0, 500, 500);
}


var xZoom = 0.02;
var yZoom = 0.02;

class lineOrigin {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.direction;
		this.speed = 2; // pixels traveled per frame
	}

	update(){
		this.direction = noise(this.x * xZoom, this.y * yZoom) * (2*Math.PI); // 2PI radians is same as 360 degrees
		var distanceX = Math.cos(this.direction) * this.speed;
		var distanceY = Math.sin(this.direction) * this.speed;

		var newX = this.x + distanceX;
		var newY = this.y + distanceY;

		stroke(255, 255, 255);
		line(newX, newY, this.x, this.y);

		this.x = newX;
		this.y = newY;
	}
}


var lineOrigins = [];
for (var x = 0; x < 500; x+=30){
	for (var y = 0; y < 500; y+=30){
		lineOrigins.push(new lineOrigin(x, y));
	}
}

var timeDrawing = 0;
function draw(){
	timeDrawing++;
	if (timeDrawing <= 300){
		for (var i = 0; i < lineOrigins.length; i++){
			lineOrigins[i].update();
		}
	} else {
		timeDrawing = 0;

		noiseSeed(Math.random()*4593);
		noiseDetail(Math.random()*20, Math.random()*3);

		fill(0);
		rect(0, 0, 500, 500);
		lineOrigins = [];
		for (var x = 0; x < 500; x+=30){
			for (var y = 0; y < 500; y+=30){
				lineOrigins.push(new lineOrigin(x, y));
			}
		}
	}
}