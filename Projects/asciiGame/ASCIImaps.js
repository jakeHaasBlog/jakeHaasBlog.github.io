
class ASCIImap{
	constructor(){
		this.array = new Array(WIDTH);
		for (var x = 0; x < WIDTH; x++){
			this.array[x] = new Array(HEIGHT);
		}
		for (var x = 0; x < WIDTH; x++){
			for (var y = 0; y < HEIGHT; y++){
				this.array[x][y] = new ASCIIchar;
			}
		}
	}
}

var maps_in_x_direction = 1;
var maps_in_y_direction = 1;
var mapArray = new Array(maps_in_x_direction);
for (var x = 0; x < maps_in_x_direction; x++){
	mapArray[x] = new Array(maps_in_y_direction);
}
for (var x = 0; x < maps_in_x_direction; x++){
	for (var y = 0; y < maps_in_y_direction; y++){
		mapArray[x][y] = new ASCIImap;
	}
}

function drawRect(array, x, y, width, height, r, g, b, c){
	for (var rx = x; rx < x + width; rx++){
		for (var ry = y; ry < y + height; ry++){
			array[rx][ry].char = c;
			array[rx][ry].r = r;
			array[rx][ry].g = g;
			array[rx][ry].b = b;
		}
	}
}


function placeChar(x1, y1, char1, r1, g1, b1){
	mapArray[0][0].array[x1][y1].char = char1;
	mapArray[0][0].array[x1][y1].r = r1;
	mapArray[0][0].array[x1][y1].g = g1;
	mapArray[0][0].array[x1][y1].b = b1;
}


function saveMaze(){

	var text = "";
	var char;
	var r;
	var g;
	var b;

	for (var y = 0; y < HEIGHT; y++){
		for (var x = 0; x < WIDTH; x++){
			r = mapArray[0][0].array[x][y].r;
			g = mapArray[0][0].array[x][y].g;
			b = mapArray[0][0].array[x][y].b;
			char = mapArray[0][0].array[x][y].char;

			if (char == '#'){
				text+="placeChar("+x+", "+y+", \'"+char+"\', "+r+", "+g+", "+b+");";
			}

		}
	}

	var te = document.getElementById('mapprestext');
	te.innerHTML = text;

}