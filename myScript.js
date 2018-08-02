
// class

// function person(name, age){
// 	this.name = name;
// 	this.age = age;
// 	this.aRandomFunction = randomFunction;
// }

// function randomFunction(){
// 	alert(this.name + " is " + this.age);
// }

// var bucky = new person("bucky", 24);

// document.write("");


var calculatorDisplay = document.getElementById("calculatorDisplay");
var displayedString = "0";

var operatorArray = [];
var numArray = [];

function getScreenVal(){
	var x = parseFloat(displayedString);
	return x;
}

function displayCurrentNum(){
	calculatorDisplay.textContent = parseFloat(displayedString);
}

function cls(){
	displayedString = 0;
	calculatorDisplay.textContent = 0;
	numArray = [];
	operatorArray = [];
}

function cal0(){
	displayedString += "0";
	displayCurrentNum();
}

function cal1(){
	displayedString += "1";
	displayCurrentNum();
}

function cal2(){
	displayedString += "2";
	displayCurrentNum();
}

function cal3(){
	displayedString += "3";
	displayCurrentNum();
}

function cal4(){
	displayedString += "4";
	displayCurrentNum();
}

function cal5(){
	displayedString += "5";
	displayCurrentNum();
}

function cal6(){
	displayedString += "6";
	displayCurrentNum();
}

function cal7(){
	displayedString += "7";
	displayCurrentNum();
}

function cal8(){
	displayedString += "8";
	displayCurrentNum();
}

function cal9(){
	displayedString += "9";
	displayCurrentNum();
}

function calDec(){
	var hasDec = false;
	for (var i = 0; i < displayedString.length; i++){
		if (displayedString.charAt(i) == '.'){
			hasDec = true;
		}
	}
	if (hasDec == false){
		displayedString += ".";
	}
	displayCurrentNum();
}

function back(){
	if (displayedString.length > 1){
		var newDisplay = "";
		for (var i = 0; i < displayedString.length - 1; i++){
			newDisplay += displayedString.charAt(i);
		}
		displayedString = newDisplay;
		displayCurrentNum();
	}
	else {
		displayedString = "0";
		displayCurrentNum();
	}
}

function neg(){
	var answer = getScreenVal() * -1;
	displayedString = answer.toString();
	displayCurrentNum();
}


function plus(){
	operatorArray.push("+");
	numArray.push(getScreenVal());
	displayedString = "0";
}

function minus(){
	operatorArray.push("-");
	numArray.push(getScreenVal());
	displayedString = "0";
}

function multiply(){
	operatorArray.push("x");
	numArray.push(getScreenVal());
	displayedString = "0";
}

function divide(){
	operatorArray.push("/");
	numArray.push(getScreenVal());
	displayedString = "0";
}

function sin(){
	equals();
	operatorArray = [];
	numArray = [];
	var answer = Math.sin(getScreenVal());
	displayedString = answer.toString();
	displayCurrentNum();
}

function cos(){
	equals();
	operatorArray = [];
	numArray = [];
	var answer = Math.cos(getScreenVal());
	displayedString = answer.toString();
	displayCurrentNum();
}

function tan(){
	equals();
	operatorArray = [];
	numArray = [];
	var answer = Math.tan(getScreenVal());
	displayedString = answer.toString();
	displayCurrentNum();
}


function equals(){
	numArray.push(getScreenVal());
	var total = numArray[0];
	for (var i = 0; i < operatorArray.length; i++){
		if (operatorArray[i] == "+"){
			total = total + numArray[i + 1];
		}
		else if (operatorArray[i] == "-"){
			total = total - numArray[i + 1];
		}
		else if (operatorArray[i] == "x"){
			total = total * numArray[i + 1];
		}
		else if (operatorArray[i] == "/"){
			total = total / numArray[i + 1];
		}
	}
	displayedString = total.toString();
	displayCurrentNum();

	numArray = [];
	operatorArray = [];
}