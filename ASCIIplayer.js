
class Player{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.char = '@';
		this.r = 0;
		this.g = 255;
		this.b = 0;
		this.mapx = 0;
		this.mapy = 0;
		this.speed = 1;
		this.walls = new Array('#','|');
		this.editing = false;
		this.rtime = 0;
		this.gtime = 0;
		this.btime = 0;
	}

	draw(){
		finalArray[Math.round(this.x)][Math.round(this.y)].char = this.char;
		finalArray[Math.round(this.x)][Math.round(this.y)].r = this.r;
		finalArray[Math.round(this.x)][Math.round(this.y)].g = this.g;
		finalArray[Math.round(this.x)][Math.round(this.y)].b = this.b;
	}

	update(){
		var prevx = this.x;
		var prevy = this.y;
		// w key down
		if (keyboard.keys[87].down == true){
			this.y -= this.speed;
			if (this.y < 0){
				this.y = 0;
			}
		}
		// a key down
		if (keyboard.keys[65].down == true){
			this.x -= this.speed;
			if (this.x < 0){
				this.x = 0;
			}
		}
		// s key down
		if (keyboard.keys[83].down == true){
			this.y += this.speed;
			if (this.y > HEIGHT - 1){
				this.y = HEIGHT - 1;
			}
		}
		// d key down
		if (keyboard.keys[68].down == true){
			this.x += this.speed;
			if (this.x > WIDTH - 1){
				this.x = WIDTH - 1;
			}
		}

		if (this.editing == false){
			for (var wall = 0; wall < this.walls.length; wall++){
				if (mapArray[this.mapx][this.mapy].array[this.x][this.y].char == this.walls[wall]){
					this.x = prevx;
					this.y = prevy;
				}
			}
		}


		if (this.editing == true){
			if (keyboard.keys[13].down == false){
				mapArray[0][0].array[this.x][this.y].char='#';
				mapArray[0][0].array[this.x][this.y].r=this.r;
				mapArray[0][0].array[this.x][this.y].g=this.g;
				mapArray[0][0].array[this.x][this.y].b=this.b;
			} 
			if (keyboard.keys[8].down == true){
				mapArray[0][0].array[this.x][this.y].char='X';
				mapArray[0][0].array[this.x][this.y].r='0';
				mapArray[0][0].array[this.x][this.y].g='0';
				mapArray[0][0].array[this.x][this.y].b='0';
			} 

			// r
			if (keyboard.keys[82].down == true){
				this.rtime+=0.1;
				this.r = Math.round(127.5*Math.sin(this.rtime)+127.5);
			}
			//g
			if (keyboard.keys[71].down == true){
				this.gtime+=0.1;
				this.g = Math.round(127.5*Math.sin(this.gtime)+127.5);
			}
			// b
			if (keyboard.keys[66].down == true){
				this.btime+=0.1;
				this.b = Math.round(127.5*Math.sin(this.btime)+127.5);
			}
			//n
			if (keyboard.keys[78].down == true){
				this.rtime=-1.6;
				this.r = Math.round(127.5*Math.sin(this.rtime)+127.5);
				this.gtime=-1.6;
				this.g = Math.round(127.5*Math.sin(this.gtime)+127.5);
				this.btime=-1.6;
				this.b = Math.round(127.5*Math.sin(this.btime)+127.5);
			}

		}


		// caps lock on
		if (keyboard.keys[20].down){
			this.editing = true;
		}
		else {
			this.editing = false;
		}

	}
}

var player = new Player;