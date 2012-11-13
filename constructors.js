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
		this.requires("2D, DOM, platform, solid, moving");
		var forward = true;
		var initialX;
		var initialY;
		var xDisp;
		var yDisp;
		var frameTime;
	},
	setMovingPlatform: function(inputX, inputY, inputW, inputH, xd, yd, ft) {
		this.initialX = inputX;
		this.initialY = inputY;
		this.xDisp = inputX + xd;
		this.yDisp = inputY + yd;
		this.frameTime = ft;	
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.bind("EnterFrame", function() {
			if(this.x > initialX + xDisp) forward = false;
			else if(this.x < initialX) forward = true;
			if(forward) {
				this.x = this.x + (xDisp / frameTime);
			}
			else {
				this.x = this.x - (xDisp / frameTime);
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
		this.requires("2D, DOM, platform, solid, Color");
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
		this.onHit("spring", function(hit) {
			if(this._falling) {
				if(!this._up) {
					this.y -= 2 * (hit[0].obj.h);
					this._falling = false;
					this._up = true;
				}
				else {
					this.y += hit[0].obj.h / 2;
					this._falling = true;
					this._up = false;
				}
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

//make lava (special type of pit, insta death)
//make water (special type of pit, limited jumping, breath counter timer)
//make a basic enemy (have to avoid it, not able to kill yet)
