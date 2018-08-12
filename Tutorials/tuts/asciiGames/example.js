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
		this.asciiArray = new Array(WIDTH)
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
		for(var x2 = x; x2 < x + width, x2++){
			for(var y2 = y; y2 < y + height; y2++){
				this.asciiArray[x2][y2].r = r;
				this.asciiArray[x2][y2].g = g;
				this.asciiArray[x2][y2].b = b;
				this.asciiArray[x2][y2].c = c;
			}
		}
	}

	drawCircle(x, y, radius, r, g, b, c){
		for(var x2 = x; x2 < x + radius, x2++){
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

ASCIImap foreground = new ASCIImap;

var currentMapX = 0;
var currentMapY = 0;

var mapsInXdirection = 10;
var mapsInYdirection = 10;

var maps = new Array(mapsInXdirection);
for (var x = 0; x < maps.length; x++){
	maps[x] = new Array(10);
}
for (var x = 0; x < maps.length; x++){
	for (var y = 0; y < mapsInYdirection; y++){
		maps[x][y] = new ASCIImap;
	}
}


function clearForeground(){
	for(var x = 0; x < foreground.ASCIIarray.length; x++){
		for(var y = 0; y < foreground.ASCIIarray[0].length; y++){
			foreground.ASCIIarray[x][y] = maps[currentMapX][currentMapY].ASCIIarray[x][y];
		}
	}
}


var mainTextBody = document.createElement("div");
mainTextBody.style.display = "inline-block";
mainTextBody.style.width = "1000px";
mainTextBody.style.height = "900px";
mainTextBody.style.margin = "auto";


function mainloop(){
	
	clearForeground(); // this is the function we made previously

	var finalTxt = "";
	var r;
	var g;
	var b;
	var c;
	for (var y = 0; y < HEIGHT; y++){
		for (var x = 0; x < WIDTH; x++){
			c = finalArray[x][y].char;
			r = finalArray[x][y].r;
			g = finalArray[x][y].g;
			b = finalArray[x][y].b;
		
			finalTxt += "<text style='color: rgb("+r+", "+g+", "+b+");'>"+c+"</text>";
		}
		finalTxt += "<br>";
	}
	mainTextBody.innerHTML = finalTxt;

	requestAnimationFrame(mainloop);

}