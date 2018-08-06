
function updateTopGraphics(){

	player.draw();

}

function display(){

	// draws the map onto final array
	var playerMapX = player.mapx;
	var playerMapY = player.mapy;
	for (var x = 0; x < WIDTH; x++){
		for (var y = 0; y < HEIGHT; y++){
			finalArray[x][y].char = mapArray[playerMapX][playerMapY].array[x][y].char;
			finalArray[x][y].r = mapArray[playerMapX][playerMapY].array[x][y].r;
			finalArray[x][y].g = mapArray[playerMapX][playerMapY].array[x][y].g;
			finalArray[x][y].b = mapArray[playerMapX][playerMapY].array[x][y].b;
		}
	}

	// draws player and objects on final array
	updateTopGraphics();

	// draws the final array on the screen
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
}

function update(){
	player.update();
}

function mainloop(){
	update();
	display();
	requestAnimationFrame(mainloop);
}