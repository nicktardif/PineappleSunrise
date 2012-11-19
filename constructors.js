//Component Constructors
Crafty.c("platformType", { //platform that you can't jump up through
	init: function() {
		this.requires("2D, DOM, platform, solid");
	},
	setPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});
Crafty.c("thinPlatformType", { //platform that you can jump through
	init: function() {
		this.requires("2D, DOM, platform");
	},
	setPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});
Crafty.c("movingPlatformType", { //platform that you can't jump up through
	init: function() {
		this.requires("2D, DOM, platform, solid, movingPlatform");
	},
	setMovingPlatform: function(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			minXBound: minX,
			maxXBound: maxX,
			minYBound: minY,
			maxYBound: maxY,
			xSpeed: xvel,
			ySpeed: yvel,
			yForward: 1,
			xForward: 1
		});
		this.bind("EnterFrame", function() {
			if(this.yForward === 1) {
				this._y -= this.ySpeed;
				this.y -= this.ySpeed;
				if(this.y <= this.maxYBound) this.yForward = 0;	
			}
			else {
				this._y += this.ySpeed;
				this.y += this.ySpeed;
				if(this.y >= this.minYBound) this.yForward = 1;	
			} 
			if(this.xForward === 1) {
				this._x += this.xSpeed;
				this.x += this.xSpeed;
				if(this.x >= this.maxXBound) this.xForward = 0;	
			}
			else {
				this._x -= this.xSpeed;
				this.x -= this.xSpeed;
				if(this.x <= this.minXBound) this.xForward = 1;	
			} 
		});
	}
});
Crafty.c("springType", { //sends you high in the air
	init: function() {
		this.requires("2D, DOM, spring, Color");
	},
	setSpring: function(inputX, inputY, inputW, inputH, color) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		})
		this.color(color);
	}
});
Crafty.c("groundType", {  //platform that has a solid color (for now)
	init: function() {
		this.requires("2D, DOM, solid, platform, Color");
	},
	setGround: function(color, inputX, GROUNDLEVEL, inputW, inputH) {
		this.attr({
			x: inputX,
			y: GROUNDLEVEL,
			w: inputW,
			h: inputH
		});
		this.color(color);
	}
});

Crafty.c("pitType", { //hit this and the level restarts, also has a fallCounter sign
	init: function() {
		this.requires("2D, DOM, pit, Color, Sprite");	
	},
	setPit: function(startX, GROUNDLEVEL, width, color, pitNumber, fallNumber) {
		this.attr({ 
			x: startX - (width/2),
			y: GROUNDLEVEL + 20,
			w: width * 2,
			h: 1
		});
		this.pitNumber = pitNumber;
		var pitString = fallNumber.toString();
		var signString = "sign";
		var imageString = signString.concat(pitString);
		Crafty.e("2D", "DOM", imageString)
			.attr({ x: startX - 16,
					y: GROUNDLEVEL - 16,
					w: 16,
					h: 16
			});	
		this.color(color);
	}
});
Crafty.c("waterType", { //water, float in it, drown if you stay in too long
	init: function() {
		this.requires("2D, DOM, water, SpriteAnimation");
		this.animate('waterMoving', 0, 11, 3); // works for widths up to 80 pixels (5 blocks)
		this.animate('waterMoving', 100, -1);
	},
	setWater: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});

	}
});
Crafty.c("playerType", {
	init: function() {
		this.requires("2D, DOM, player, Gravity, Controls, Twoway, Collision");
		this.gravity('platform');
		this.gravityConst(.3);
		this.collision();
		
	},
	setPlayer: function(inputX, inputY, bsize, mspeed, jspeed, fallAmounts) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: bsize,
			h: bsize
		});
		this.twoway(mspeed, jspeed); 
		this.onHit("solid", function (hit) {
			if(this._up) {
				this.y += hit[0].obj.h / 2;
				this._falling = true;
				this._up = false;
			}
		});
		this.onHit("pit", function(hit) {
			fallAmounts[hit[0].obj.pitNumber] = fallAmounts[hit[0].obj.pitNumber] + 1;
			Crafty.viewport.x = 0;
			Crafty.scene("game");		//starts over
		});
		this.onHit("enemy", function(hit) {
			Crafty.viewport.x = 0;
			Crafty.scene("game");		//starts over
		});
		this.onHit("spring", function(hit) {
			if(this._falling) {
				if(!this._up) { 		//coming from the top
					this.y -= 2 * (hit[0].obj.h);
					this._falling = false;
					this._up = true;
				}
				else {					//coming from the bottom
					this.y += hit[0].obj.h / 2;
					this._falling = true;
					this._up = false;
				}
			}
		}); 
		this.onHit("movingPlatform", function(hit) {
			if(hit[0].obj.yForward === 1) {		//platform is moving up
				this.y -= hit[0].obj.ySpeed;
				this._y -= hit[0].obj.ySpeed;
			}
			else {								//platform is moving down
				this.y += hit[0].obj.ySpeed;
				this._y += hit[0].obj.ySpeed;
			}
			if(hit[0].obj.xForward === 1) { 	//platform is moving right
				this.x += hit[0].obj.xSpeed;
				this._x += hit[0].obj.xSpeed;
			}
			else {								//platform is moving left
				this.x -= hit[0].obj.xSpeed;
				this._x -= hit[0].obj.xSpeed;
			}

		});
		this.bind("EnterFrame", function() {
			//position of the viewport
			var vpx = this._x - 350;
			if(vpx > 0 && vpx < 1000) {
				Crafty.viewport.x = -vpx;
			}
		});
	}
});
Crafty.c("fatsoType", { 
	init: function() {
		this.requires("2D, DOM, enemy, Color");
		var leftBound;
		var rightBound;
	},
	setFatso: function(inputX, inputY, bSize, color, lb, rb, speed) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: 2 * bSize,
			h: 2 * bSize,
			movingLeft : 1,
			leftBound: lb,
			rightBound: rb
		});
		this.color(color);
		this.bind("EnterFrame", function() {
			if(this.movingLeft === 1) {
				this._x -= speed; 
				this.x -= speed;
				if(this.x === this.leftBound) this.movingLeft = 0;
			}
			else { 
				this._x += speed;
				this.x += speed;
				if(this.x === this.rightBound) this.movingLeft = 1;
			}
		});
	}
});

//make lava (special type of pit, insta death)
//make water (special type of pit, limited jumping, breath counter timer)
//make a basic enemy (have to avoid it, not able to kill yet)