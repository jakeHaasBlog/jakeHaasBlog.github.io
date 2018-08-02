
var WIDTH = 63;
var HEIGHT = 35;

var mainTextBody = document.getElementById("mainTextBody");

class ASCIIchar{
	constructor(){
		this.char = 'x';
		this.r = 0;
		this.g = 0;
		this.b = 0;
	}
}

var finalArray = new Array(WIDTH);
for (var x = 0; x < WIDTH; x++){
	finalArray[x] = new Array(HEIGHT);
}
for (var x = 0; x < WIDTH; x++){
	for (var y = 0; y < HEIGHT; y++){
		finalArray[x][y] = new ASCIIchar;
	}
}

class Key{
	constructor(){
		this.down = false;
	}
}
class CurrentKeyboard{
	constructor(){
		this.keys = new Array(222);
		for (var i = 0; i < 222; i++){
			this.keys[i] = new Key;
		}
	}
}

var keyboard = new CurrentKeyboard;

var capsLockPress = false;
function keyPressed(event){
	if (event.keyCode != 20){
		keyboard.keys[event.keyCode].down = true;
	}
	if (event.keyCode == 20){
		if (capsLockPress == false){
			capsLockPress = true;
			if (keyboard.keys[20].down == true){
				keyboard.keys[20].down = false;
			} else {
				keyboard.keys[20].down = true;
			}
		}
	}
}
function keyReleased(event){
	if (event.keyCode != 20){
		keyboard.keys[event.keyCode].down = false;
	}
	if (event.keyCode == 20){
		capsLockPress = false;
	}
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);


//mainTextBody.innerHTML = "mu <text style='color: rgb(100, 255, 0);'>hdh</text> <br> mkmkm";
