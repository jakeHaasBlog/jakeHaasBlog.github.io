var mouseX = 0;
var mouseY = 0;

function mousePressed(){
	alert("Mouse Pressed  x: " + mouseX + "   y: " + mouseY);
}

document.addEventListener('mousedown', mouseDown);
