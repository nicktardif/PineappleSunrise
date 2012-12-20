////////////////////////////
//		Constructors
//			for
//		Level Structure	objects

Crafty.c("platformType", { //platform that you can't jump up through
	init: function() {
		this.requires("2D, DOM, platform, solid, normalPlatform, noHorizontal");
	},
	setPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		//this.color("dodgerblue");
	}
});
Crafty.c("thinPlatformType", { //platform that you can jump through
	init: function() {
		this.requires("2D, DOM, platform, thinPlatform");
	},
	setPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		//this.color("mediumpurple");
	}
});
Crafty.c("movingPlatformType", { //solid platform that can move in the x and y directions
	init: function() {
		this.requires("2D, DOM, platform, solid, movingPlatform, noHorizontal");
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
		//this.color("tomato");
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
Crafty.c("groundType", {  //platform that has a solid color (for now)
	init: function() {
		this.requires("2D, DOM, solid, platform, ground, noHorizontal");
	},
	setGround: function(inputX, GROUNDLEVEL, inputW, inputH) {
		this.attr({
			x: inputX,
			y: GROUNDLEVEL,
			w: inputW,
			h: inputH
		});
		//this.color("black");
	}
});
Crafty.c("wallType", { //barrier to going horizontally, is either leftWall or
					   //rightWall
	init: function() {
		this.requires("2D, DOM, wall, Color");
	},
	setWall: function(inputX, inputY, inputW, inputH, wallType, color) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			isLeft: wallType
		});
		this.color(color);
	}
});
Crafty.c("disappearingType", { 	//block dissappears after a set amount of time
	init: function() {
		this.requires("2D, DOM, disappearing, Collision");
	},
	setDisappearing: function(inputX, inputY, inputW, inputH, deleteTime) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			disappearTime: deleteTime
		});
		this.collision();
		//this.color("seagreen");
		var cd = Crafty.e("2D, DOM, platform, solid, disappearing") 
			.attr({ x: inputX + 1, y: inputY + 1, h: 1, w: inputW - 2, visible: false });
		this.onHit("playerType", function() {
			this.timeout(function() {
				cd.destroy();
				this.destroy();
				Crafty.audio.play('platformBreak', 1, .5);
			}, this.disappearTime);
		});
	}
});

Crafty.c("textType", {
	init: function() {
		this.requires("2D, DOM, Text");
	},
	setText: function(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize) {
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.text(text);
		this.css({"color": fontColor, "font": fontAndSize});
	}

	/*setText: function(inputX, inputY, inputW, inputH, text, font, fontColor, fontSize) {
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.text(text);
		this.textColor(fontColor);
		this.textFont({ size: fontSize, family: font});
	}, */


});

Crafty.c("dialogueType", {
	init: function() {
		//going to eventually have different size sprites according to which size is needed
		this.requires("2D, DOM, Color");
	},
	setDialogue: function(inputX, inputY, inputW, inputH, color, text, fontColor, fontAndSize) {
	//text array[0] is a number of how many "blurbs" are in the dialogue box
	//iterate through each of those, making a new text type in the box
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		var dialogueImage = Crafty.e("2D, DOM, Image") .attr({x: inputX, y: inputY, w: inputW, h: inputH}) .image("sprites/dialogue300100background.png");
		var dialogueText = Crafty.e("2D, DOM, Text") .attr({ x: inputX, y: inputY, w: inputW, h: inputH }) .text(text) .css({"color": fontColor, "font": fontAndSize, "text-align": "left"});

		this.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys['SPACE']) {
				dialogueImage.destroy();
				dialogueText.destroy();
				this.destroy();
				Crafty.pause();
			}
		});
	}
});

////////////////////////////
//		Constructors
//			for
//		Obstacles

Crafty.c("springType", { //sends you high in the air
	init: function() {
		this.requires("2D, DOM, spring, springSprite");
	},
	setSpring: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		})
	}
});
Crafty.c("pitType", { //hit this and the level restarts, also has a fallCounter sign
	init: function() {
		this.requires("2D, DOM, pit");	
	},
	setPit: function(startX, GROUNDLEVEL, width, pitNumber, fallNumber) {
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
Crafty.c("endType", { // run into this and you win
	init: function() {
		this.requires("2D, DOM, endSprite");
	},
	setEnd: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});



////////////////////////////
//		Constructors
//			for
//		Creatures

Crafty.c("playerType", {
	init: function() {
		this.requires("2D, DOM, player, Gravity, Controls, Twoway, Collision, SpriteAnimation");
		this.gravity('platform');
		this.gravityConst(.3);
		this.collision();
		this.animate("walk_right", 4, 18, 6);
		this.animate("walk_left", 1, 18, 3);
		this.animate("stopped", 0, 18, 0);
		
	},
	setPlayer: function(inputX, inputY, bsize, mspeed, jspeed, fallAmounts) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: bsize,
			h: bsize
		});
		this.twoway(mspeed, jspeed); 
		this.onHit("noHorizontal", function (hit) {
			if(this.y < hit[0].obj.y) {

			}
			else {
				if(this.x < hit[0].obj.x) {
					this.x = hit[0].obj.x - 16;
					this._x = hit[0].obj.x - 16;
				}
				if(this.x >= (hit[0].obj.x) ) {
					this.x = (hit[0].obj.x + hit[0].obj.w); 
					this._x = (hit[0].obj.x + hit[0].obj.w); 
				}
				if(this._up) {
					this.y += hit[0].obj.h / 2;
					this._falling = true;
					this._up = false;
				}
			}
		});
		this.onHit("solid", function (hit) {
		    if (this._up) {
				this.y += hit[0].obj.h / 2;
				this._falling = true;
				this._up = false;
			}
		});
		this.onHit("pit", function(hit) {
			this.death(this.x);
			fallAmounts[hit[0].obj.pitNumber] = fallAmounts[hit[0].obj.pitNumber] + 1;
		});
		this.onHit("enemy", function(hit) {
			this.death(this.x);
		});
		this.onHit("spring", 
			function (hit) {
				if(this._falling) {
					if(!this._up) { 		//coming from the top
						this.y = hit[0].obj.y - 16;
						this._falling = false;
						this._up = true;
						Crafty.audio.play("jumpSound", 1, .5);
					}
					else {					//coming from the bottom
						this.y += hit[0].obj.h / 2;
						this._falling = true;
						this._up = false;
					}
				}
			},
			function() {
				this.twoway(3.0, 3.0);
				this.timeout(function() {
					this.twoway(3.0, -3.0);	
				}, 500);
			}
		); 
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
		this.onHit("wallType", function (hit) {
			if(hit[0].obj.isLeft === 1) { 
				this.x += hit[0].obj.w / 4;
				this._x += hit[0].obj.w / 4;
			}
			else {
				this.x -= hit[0].obj.w / 4;
				this._x -= hit[0].obj.w / 4;
			}
		});
		this.onHit("endType", function(hit) {
			Crafty.audio.stop("backgroundMusic");
			Crafty.audio.play("winner");
			Crafty.viewport.x = 0;
			Crafty.scene("game");
		});
		this.bind("EnterFrame", function() {
			//position of the viewport
			var vpx = this._x - 350;
			if(vpx > 0 && vpx < 1500) {
				Crafty.viewport.x = -vpx;
			}
		});
		// animate walking
		this.bind("NewDirection",
			function (direction) {
			    if (direction.x < 0) {
			        if (!this.isPlaying("walk_left"))
			            this.stop().animate("walk_left", 5, -1);
			    }
			    if (direction.x > 0) {
			        if (!this.isPlaying("walk_right"))
			            this.stop().animate("walk_right", 5, -1);
			    }
			    if (!direction.x) {
			        this.stop().animate("stopped", 10, 1);
			    }
			});
		this.attr("triggers", 0); //set a trigger count
		this.bind("myevent", function() {
			this.triggers++; //whenever myevent is triggered, increment
			//document.getElementById("debug").innerHTML = this.triggers;
		});
		this.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys['M']) {
				Crafty.audio.toggleMute();
			}
			if (e.key == Crafty.keys['P']) {
				Crafty.pause();
				Crafty.audio.toggleMute('backgroundMusic');
			}
			if (e.key == Crafty.keys['B'] || e.key == Crafty.keys['P']) {
				Crafty.audio.togglePause('backgroundMusic');
			}
			Crafty.trigger("myevent");
		});
	},
	death: function(inputX) {
		this.y = 500;
		this._y = 500;
		this.disableControl();
		var deathText = Crafty.e("textType") .setText(inputX, 125, 100, 20, "You died", "000000", "14pt Arial");
		this.timeout( function() {
			Crafty.viewport.x = 0;
			Crafty.scene("game");
		}, 500);
	}
});
Crafty.c("fatsoType", { 	//large enemy that walks back and forth
	init: function() {
		this.requires("2D, DOM, fatsoSprite, enemy, SpriteAnimation");
		this.animate("faceLeft", 1, 0, -1);
		this.animate("faceRight", 0, 0, 1);
		var leftBound;
		var rightBound;
	},
	setFatso: function(inputX, inputY, bSize, lb, rb, speed) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: 2 * bSize,
			h: 2 * bSize,
			movingLeft : 1,
			leftBound: lb,
			rightBound: rb
		});
		this.bind("EnterFrame", function() {
			if(this.movingLeft === 1) {
				this._x -= speed; 
				this.x -= speed;
				if(this.x <= this.leftBound){
					this.movingLeft = 0;
					this.stop();
					this.animate("faceLeft", 100000, 0);
				}
			}
			else { 
				this._x += speed;
				this.x += speed;
				if(this.x >= this.rightBound){
					this.movingLeft = 1;
					this.stop();
					this.animate("faceRight", 100000, 0);
				}
			}
		});
	}
});

//make lava (special type of pit, insta death)
//make water (special type of pit, limited jumping, breath counter timer)
