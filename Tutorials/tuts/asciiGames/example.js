class Key {
	constructor(){
		this.down = false;
	}
}

class KeyBoard {
	constructor(){
		this.keys = new Array(222);   // there are 222 keycodes
		for (var i = 0; i < 222; i++){
			this.keys[i] = new Key;
		}
	}
}

var keyboard = new KeyBoard;

function keyPressed(event){
	keyboard.keys[event.keyCode].down = true; // the index in the array will corrospond to the keycode
}

function keyReleased(event){
	keyboard.keys[event.keyCode].down = false;    
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

class ASCIIchar {
	constructor(){
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.c = 'x';
	}
}

var WIDTH = 30;
var HEIGHT = 30;

class ASCIImap {
	constructor(){
		this.asciiArray = new Array(WIDTH);
		for (var x = 0; x < WIDTH; x++){
			this.asciiArray[x] = new Array(HEIGHT);
		}
		for (var x = 0; x < WIDTH; x++){
			for (var y = 0; y < HEIGHT; y++){
				this.asciiArray[x][y] = new ASCIIchar;
			}
		}
	}

	drawRect(x, y, width, height, r, g, b, c){
		for(var x2 = x; x2 < x + width; x2++){
			for(var y2 = y; y2 < y + height; y2++){
				this.asciiArray[x2][y2].r = r;
				this.asciiArray[x2][y2].g = g;
				this.asciiArray[x2][y2].b = b;
				this.asciiArray[x2][y2].c = c;
			}
		}
	}

	drawCircle(x, y, radius, r, g, b, c){
		for(var x2 = x; x2 < x + radius; x2++){
			for(var y2 = y; y2 < y + radius; y2++){
				if (Math.sqrt((x*x) + (y*y)) <= radius){
					this.asciiArray[x2][y2].r = r;
					this.asciiArray[x2][y2].g = g;
					this.asciiArray[x2][y2].b = b;
					this.asciiArray[x2][y2].c = c;
				}
			}
		}
	}
}

var foreground = new ASCIImap;

var currentMapX = 0;
var currentMapY = 0;

var mapsInXdirection = 10;
var mapsInYdirection = 10;

var maps = new Array(mapsInXdirection);
for (var x = 0; x < maps.length; x++){
	maps[x] = new Array(mapsInYdirection);
}
for (var x = 0; x < maps.length; x++){
	for (var y = 0; y < mapsInYdirection; y++){
		maps[x][y] = new ASCIImap;
	}
}


function clearForeground(){
	for(var x = 0; x < WIDTH; x++){
		for(var y = 0; y < HEIGHT; y++){
			foreground.asciiArray[x][y].c = maps[currentMapX][currentMapY].asciiArray[x][y].c;
			foreground.asciiArray[x][y].r = maps[currentMapX][currentMapY].asciiArray[x][y].r;
			foreground.asciiArray[x][y].g = maps[currentMapX][currentMapY].asciiArray[x][y].g;
			foreground.asciiArray[x][y].b = maps[currentMapX][currentMapY].asciiArray[x][y].b;
		}
	}
}

var mainTextBody = document.getElementById("maindiv");
// var mainTextBody = document.createElement("div");
// mainTextBody.innerHTML = "hello";
// mainTextBody.style.width = "1000px";
// mainTextBody.style.height = "500px";

document.getElementsByTagName("body")[0].appendChild(mainTextBody);




class Character {
	constructor(){
		this.x = 3;
		this.y = 3;
		this.speed = 1;

		this.c = '@';
		this.r = 255;
		this.g = 0;
		this.b = 0;

		this.wall = '#';
	}

	update(){

		var toX = this.x;
		var toY = this.y;

		// w
		if(keyboard.keys[87].down == true) toY-=this.speed;

		// a
		if(keyboard.keys[65].down == true) toX-=this.speed;

		// s
		if(keyboard.keys[83].down == true) toY+=this.speed;

		// d
		if(keyboard.keys[68].down == true) toX+=this.speed;

		if (maps[currentMapX][currentMapY].asciiArray[toX][toY].c != this.wall){
			this.x = toX;
			this.y = toY;
		}

		var roundedX = Math.round(this.x);
		var roundedY = Math.round(this.y);

		//alert(x +"   "+ y);

		foreground.asciiArray[roundedX][roundedY].c = this.c;
		foreground.asciiArray[roundedX][roundedY].r = this.r;
		foreground.asciiArray[roundedX][roundedY].g = this.g;
		foreground.asciiArray[roundedX][roundedY].b = this.b;

	}
}

var bob = new Character;


maps[0][0].drawRect(5, 14, 10, 2, 0, 255, 0, '#');



function mainloop(){
	
	clearForeground(); // this is the function we made previously

	bob.update();
	
	var finalTxt = "";
	var r;
	var g;
	var b;
	var c;
	for (var y = 0; y < HEIGHT; y++){
		for (var x = 0; x < WIDTH; x++){
			r = foreground.asciiArray[x][y].r;
			g = foreground.asciiArray[x][y].g;
			b = foreground.asciiArray[x][y].b;
			c = foreground.asciiArray[x][y].c;
		
			finalTxt += "<text style='color: rgb("+r+", "+g+", "+b+");'>"+c+"</text>";
		}
		finalTxt += "<br>";
	}
	mainTextBody.innerHTML = finalTxt;
	

	requestAnimationFrame(mainloop);

}