function scale(craftyEntity, scaleFactor) {
	craftyEntity.x = craftyEntity.x * scaleFactor;
	craftyEntity.y = craftyEntity.y * scaleFactor;
	craftyEntity.w = craftyEntity.w * scaleFactor;
	craftyEntity.h = craftyEntity.h * scaleFactor;
	return craftyEntity;
}

////////////////////////////
//		Constructors
//			for
//		Level Structure	objects

// Component that the player cannot fall through
Crafty.c("solidTop", {
});

function Platform(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("platform").platform(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("creature", {
	init: function() {
		this.requires("2D, Collision"); 

		this.onHit("solidBottom", function (hit) {
			var col = hit[0].obj; // collision object
			if(this._up) { 			//if jumping up into it, bounce back down
				console.log('calculating the onhit for solidBottom');
				this.y = col.y + col.h;
				this._falling = true;
				this._up = false;
			}
		});
		this.onHit("solidLeft", function (hit) {
			var col = hit[0].obj; // collision object
			if(this.x < col.x && this.y > col.y - 0.75 * this.h) {
				console.log('calculating the onhit for solidLeft');
				this.x = col.x - this.w;
				this._x = col.x - this.w;
			}
		});
		this.onHit("solidRight", function (hit) {
			var col = hit[0].obj; // collision object
			if(this.x > (col.x + 0.75 * col.w) && this.y > col.y - 0.75 * this.h) {
				console.log('calculating the onhit for solidRight');
				this.x = (col.x + col.w); 
				this._x = (col.x + col.w); 
			}
		});
		this.onHit("movingPlatform", function(hit) {
			var col = hit[0].obj; // collision object
			if(col.yForward === 1) {		//platform is moving up
				this.y = col.y - this.h + 1;
				this._y = col.y - this.h + 1;
			}
			else {								//platform is moving down
				this.y = col.y - this.h + 1;
				this._y = col.y - this.h + 1;
			}
			if(col.xForward === 1) { 	//platform is moving right
				this.x += col.xSpeed;
				this._x += col.xSpeed;
			}
			else {								//platform is moving left
				this.x -= col.xSpeed;
				this._x -= col.xSpeed;
			}
		});
	}
});

Crafty.c("platform", {
	init: function() {
		this.requires("2D, DOM, solidTop, solidBottom, solidLeft, solidRight, normalPlatformSprite");
	},
	platform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

function ThinPlatform(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("thinPlatform").thinPlatform(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("thinPlatform", { //platform that you can jump through
	init: function() {
		this.requires("2D, DOM, solidTop, thinPlatformSprite");
	},
	thinPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

function MovingPlatform(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel) {
	scale(Crafty.e("movingPlatform").movingPlatform(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel), blockSize);
}

Crafty.c("movingPlatform", { //solid platform that can move in the x and y directions
	init: function() {
		this.requires("2D, DOM, solidBottom, solidTop, solidLeft, solidRight, movingPlatformSprite");
	},
	movingPlatform: function(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel) {
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
		return this;
	}
});

// -- Not implemented yet, need to fix friction on horizontal slider
/*
Crafty.c("horizontalMovingPlatform", { //solid platform that can move in the x and y directions
	init: function() {
		this.requires("2D, DOM, platform, solid, movingPlatform");
	},
	horizontalPlatform: function(inputX, inputY, inputW, inputH, minX, maxX, xvel) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			minXBound: minX,
			maxXBound: maxX,
			xSpeed: xvel,
			xForward: 1
		});
		this.bind("EnterFrame", function() {
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
Crafty.c("VerticalMovingPlatform", { //solid platform that can move in the x and y directions
	init: function() {
		this.requires("2D, DOM, platform, solid, movingPlatform");
	},
	setVerticalPlatform: function(inputX, inputY, inputW, inputH, minY, maxY, yvel) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			minYBound: minY,
			maxYBound: maxY,
			ySpeed: yvel,
			yForward: 1,
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
		});
	}
});

*/

function Ground(inputX, inputY, inputW, inputH) {
	// Construct the ground object and scale it to the screen
	scale(Crafty.e("ground").ground(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("ground", {  //platform that has a solid color (for now)
	init: function(inputX, inputY, inputW, inputH) {
		this.requires("2D, DOM, solidBottom, solidTop, solidLeft, solidRight, groundSprite");
	},
	ground: function(inputX, inputY, inputW, inputH) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

// Constructor for wall objects
function Wall(inputX, inputY, inputW, inputH, color) {
	scale(Crafty.e("wall").wall(inputX, inputY, inputW, inputH, color), blockSize);
}

Crafty.c("wall", { //barrier to going horizontally, is either leftWall or
					   //rightWall
	init: function() {
		this.requires("2D, DOM, Color, solidLeft, solidRight");
	},
	wall: function(inputX, inputY, inputW, inputH, color) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.color(color);
		return this;
	}
});

function DisappearingBlock(inputX, inputY, inputW, inputH, deleteTime) {
	scale(Crafty.e("disappearingBlock").disappearing(inputX, inputY, inputW, inputH, deleteTime), blockSize);
}

Crafty.c("disappearingBlock", { 	//block dissappears after a set amount of time
	init: function() {
		this.requires("2D, DOM, disappearing, disappearingSprite, solidBottom, solidTop");
		var hiddenPlatform;
	},
	disappearing: function(inputX, inputY, inputW, inputH, deleteTime) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			disappearTime: deleteTime
		});
		return this;

		//hiddenPlatform is to keep the player "on top" of the disappearing block, so the disappearing
		//onHit can trigger and not just the platform onHit
	},
	disappear: function() {
		this.destroy();
		Crafty.audio.play('platformBreak', 1, .5);
	}
});

function Text(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize) {
	scale(Crafty.e("text").makeText(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize), blockSize);
}

Crafty.c("text", {
	init: function() {
		this.requires("2D, DOM, Text");
	},
	makeText: function(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize) {
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.text(text);
		this.css({"color": fontColor, "font": fontAndSize});
		return this;
	}
});

function Dialogue(inputX, inputY, inputW, inputH, textArray, fontColor, fontAndSize) {
	Crafty.e("dialogue").dialogue(inputX, inputY, inputW, inputH, textArray, fontColor, fontAndSize);
}

Crafty.c("dialogue", {
	init: function() {
		//going to eventually have different size sprites according to which size is needed
		this.requires("2D, DOM, Color");
	},
	dialogue: function(inputX, inputY, inputW, inputH, textArray, fontColor, fontAndSize) {
	//text array[0] is a number of how many "blurbs" are in the dialogue box
	//iterate through each of those, making a new text entity in the box
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		var dialogueImage = Crafty.e("2D, DOM, Image") .attr({x: inputX, y: inputY, w: inputW, h: inputH}) .image("sprites/dialogue300100background.png");
		var dialogueText = new Array();
		for(var j = 0; j < textArray[0]; j++) {
			//the 8 and 16 pixel buffer is so the text does not touch the border
			dialogueText[j] = Crafty.e("2D, DOM, Text") .attr({ x: inputX + 8, y: inputY + 8 + (j * 16), w: inputW - 16, h: inputH - 16 }) .text(textArray[j + 1]) .css({"color": fontColor, "font": fontAndSize, "text-align": "left"});
		}

		//removes the entire dialogue box when spacebar is pushed and game resumes
		this.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys['SPACE']) {
				dialogueImage.destroy();
				for(var j = 0; j < textArray[0]; j++) {
					dialogueText[j].destroy();
				}
				this.destroy();
				Crafty.pause();
			}
		});
	}
});

function MyImage(inputX, inputY, inputW, inputH, imagePath) {
	scale(Crafty.e("image").makeImage(inputX, inputY, inputW, inputH, imagePath), blockSize);
}

Crafty.c("image", {
	init: function() {
		this.requires("2D, DOM, Image");
	},
	makeImage: function(inputX, inputY, inputW, inputH, imagePath) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.image(imagePath);
		return this;
	}
});

////////////////////////////
//		Constructors
//			for
//		Obstacles

function Spring(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("spring").spring(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("spring", { //sends you high in the air
	init: function() {
		this.requires("2D, DOM, springSprite, solidTop");
	},
	spring: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

function Pit(inputX, GROUNDLEVEL, width) {
	scale(Crafty.e("pit").pit(inputX, GROUNDLEVEL, width), blockSize);
}

Crafty.c("pit", { //hit this and the level restarts
	init: function() {
		this.requires("2D, DOM, Collision");	
	},
	pit: function(inputX, GROUNDLEVEL, width) {
		this.attr({ 
			x: inputX - 1,
			y: GROUNDLEVEL + 1,
			w: width + 2,
			h: 1
		});
		this.onHit("player", function(hit) {
			Crafty.audio.play('falling', 1, .5);
			hit[0].obj.death(this.x);
		});

		return this;
	},
});

function Water(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("water").water(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("water", { //water, float in it, drown if you stay in too long
	init: function() {
		this.requires("2D, DOM, SpriteAnimation, waterSprite");
		this.animate('waterMoving', 0, 11, 3); // works for widths up to 80 pixels (5 blocks)
		this.animate('waterMoving', 100, -1);
	},
	water: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

function End(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("end").end(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("end", { // run into this and you win
	init: function() {
		this.requires("2D, DOM, SpriteAnimation, endSprite");
		var currentState;
	},
	end: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.currentState = 0;
		this.bind("pineappleCollected", function() {
			if(this.currentState == 0) {
				this.sprite(1, 2, 32, 32);
			}
			else if(this.currentState == 1) {
				this.sprite(2, 2, 32, 32);
			}
			else if(this.currentState == 2) {
				this.sprite(3, 2, 32, 32);
			}
			else if(this.currentState == 3) {
				this.sprite(4, 2, 32, 32);
			}
			else if(this.currentState == 4) {
				this.sprite(5, 2, 32, 32);
			}
			this.currentState = this.currentState + 1;
		});
		return this;
	}
});



////////////////////////////
//		Constructors
//			for
//		Creatures

function Player(inputX, inputY, mspeed, jspeed) {
	scale(Crafty.e("player").player(inputX, inputY, mspeed, jspeed), blockSize);
}

Crafty.c("player", {
	init: function() {
		var animationDuration = 500;
		var gravityConstant = (.3 / 16) * blockSize;
		this.requires("2D, DOM, Gravity, Controls, Twoway, Collision, SpriteAnimation, creature, playerSprite");
		this.gravity('solidTop');
		this.gravityConst(gravityConstant);
		this.collision();
		this.reel("walk_right", animationDuration, 4, 18, 3);
		this.reel("walk_left", animationDuration, 1, 18, 3);
		this.reel("stopped", animationDuration, 0, 18, 1);
	},
	player: function(inputX, inputY, mspeed, jspeed) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: 1,
			h: 1
		});
		this.twoway(mspeed, jspeed); 
		var currentWeapon = 0;
		var orientation = 1; //initialize orientation to left
		var pineapplesCollected = 0;
		var onWeapon = 0;

		//
		//        ----  OnHit interactions ----
		//

		this.onHit("disappearing", function(hit) {
			if(this._up) {		 			//if jumping up into it, bounce back down
				this.y = hit[0].obj.y + hit[0].obj.h;
				this._falling = true;
				this._up = false;
			}
			this.timeout(function() {
				//hit[0].obj.hiddenPlatform.destroy();
				hit[0].obj.destroy();
			}, hit[0].obj.disappearTime);
		});
		this.onHit("enemy", function(hit) {
			Crafty.audio.play("splat", 1, .5);
			this.death(this.x);
		});
		this.onHit("spring", 

			//Nothing immediately happens upon touching it
			function (hit) {
			},

			//Upon leaving the spring you get a half second jump boost and a jump sound triggers if you do jump
			function() {
				if(this._falling && this._up) {
					this.twoway(mspeed, 3.0);
					Crafty.audio.play("jumpSound", 1, .5);
					this.timeout(function() {
						this.twoway(mspeed, -3.0);	
					}, 500);
				}
			}
		); 
		this.onHit("end", function(hit) {
			if(hit[0].obj.currentState == 5) {
				Crafty.audio.stop();
				Crafty.audio.play("vwoom");
				Crafty.viewport.x = 0;
				Crafty.scene("titleScreen");
			}
		});
		this.onHit("pineapple", function(hit) {
			hit[0].obj.destroy();
			Crafty.trigger("pineappleCollected");
		});

		//
		//        ----  Event definitions ----
		//
		
		this.bind("EnterFrame", function() {
			var vpx = this._x - 350; 		//positions the viewport horizontally
			if(this.x > 350 && vpx < 1850) {
				Crafty.viewport.x = 350 - this.x;
			}
			if(currentWeapon != 0) {		//if has weapon, moves it according to the player
				if(this.orientation == 0) {
					currentWeapon.x = this.x - 12;
				}
				else  {
					currentWeapon.x = this.x + 12; 
				}
				//gives the weapon a little "jiggle"
				if(this.isPlaying("walk_left") || this.isPlaying("walk_right") ) { 
					currentWeapon.y = Math.random() * 2 + 1 + this.y;
				}
				else currentWeapon.y = this.y;
			}
		});
		// animate walking
		this.bind("NewDirection", function (direction) {
			if (direction.x < 0) {
				this.orientation = 0;
				if (!this.isPlaying("walk_left")) {
					this.pauseAnimation().animate("walk_left", -1);
				}
				if (currentWeapon != 0) { 		//sets the weapon sprite to the correct orientation on newDirection
					currentWeapon.sprite(0, 19, 16, 16);
				}
			}
			if (direction.x > 0) {
				this.orientation = 1;
				if (!this.isPlaying("walk_right")) {
					this.pauseAnimation().animate("walk_right", -1);
				}
				if (currentWeapon != 0) { 		//sets it to the correct orientation again
					currentWeapon.sprite(0, 12, 16, 16);
				}
			}
			if (!direction.x) {
				this.pauseAnimation().animate("stopped", -1);
			}
		});

		this.bind("KeyDown", function(e) {
			//toggling controls
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

			//actions
			if(e.key == Crafty.keys['F']) {
				onWeapon = this.hit("weapon");
				if(this.onWeapon != "false") {
					//sets weapon to be currentWeapon, only if player is on a weapon
					currentWeapon = onWeapon[0].obj;
				}
			}

			//Weapon attacks
			if(e.key == Crafty.keys['SPACE'] && currentWeapon != 0 && this.orientation == 1) currentWeapon.leftAttack();
			else if(e.key == Crafty.keys['SPACE'] && currentWeapon != 0 && this.orientation == 0) currentWeapon.rightAttack();

		});
		return this;
	},
	death: function(inputX) {
		this.y = 30 * blockSize;
		this.disableControl();
		Text(this.x / blockSize, 10, 6, 3, "You died", "#000", "14pt Arial");
		this.timeout( function() {
			Crafty.viewport.x = 0;
			Crafty.scene("game");
		}, 500);
	}
});

function Fatso(inputX, inputY, lb, rb, speed) {
	scale(Crafty.e("fatso").fatso(inputX, inputY, lb, rb, speed), blockSize);
}

Crafty.c("fatso", { 	//large enemy that walks back and forth
	init: function() {
		var animationDuration = 500;
		this.requires("2D, DOM, SpriteAnimation, enemy, creature, fatsoSprite");
		this.reel("faceRight", animationDuration, 0, 1, 3);
		this.reel("faceLeft", animationDuration, 0, 0, 3);
		var leftBound;
		var rightBound;
	},
	fatso: function(inputX, inputY, lb, rb, speed) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: 2,
			h: 2,
			leftBound: lb,
			rightBound: rb
		});
		var movingLeft = 1;
		var animationSpeed = 10 / speed;
		this.animate("faceLeft", animationSpeed, -1); //set initial animation
		this.bind("EnterFrame", function() {
			if(this.movingLeft == 1) {
				this._x -= speed; 
				this.x -= speed;
				if(this.x <= this.leftBound){
					this.movingLeft = 0;
					this.pauseAnimation();
					this.animate("faceLeft", -1);
				}
			}
			else { 
				this._x += speed;
				this.x += speed;
				if(this.x >= this.rightBound){
					this.movingLeft = 1;
					this.pauseAnimation();
					this.animate("faceRight", animationSpeed, -1);
				}
			}
		});
		return this;
	}
});

////////////////////////////
//		Constructors
//			for
//		Weapons

function Hammer(inputX, inputY) {
	scale(Crafty.e("hammer").hammer(inputX, inputY), blockSize);
}

Crafty.c("hammer", {
	init: function() {
		var animationDuration = 500;
		this.requires("2D, DOM, weapon, hammerSprite, SpriteAnimation, Collision");	
		this.reel("attackLeft", 500, 0, 12, 6);
		this.reel("attackRight", 500, 0, 19, 6);
		this.reel("hammerFaceLeft", 500, 0, 12, 0);
		this.reel("hammerFaceRight", 500, 0, 19, 0);
	},
	hammer: function(inputX, inputY) {
		this.attr({
			x: inputX,
			y: inputY,
			w: 1,
			h: 1
		});
		this.name = "Hammer";
		this.owner = 0;
		this.active = 0;

		this.onHit("enemy", function (hit) {
			if(this.active == 1) {
				Crafty.audio.play('fatsoYell', 1, .5);
				hit[0].obj.destroy();
			}
		});
		return this;
	},
	leftAttack: function() {
		this.active = 1;
		this.animate("attackLeft", 0);
		this.timeout(function() {
			this.active = 0;	
		}, 20);

	},
	rightAttack: function() {
		this.active = 1;
		this.animate("attackRight", 0);
		this.timeout(function() {
			this.active = 0;	
		}, 20);
	}
});

////////////////////////////
//		Constructors
//		for
//		Items	

function Pineapple(inputX, inputY, inputW, inputH) {
	scale(Crafty.e("pineapple").pineapple(inputX, inputY, inputW, inputH), blockSize);
}

Crafty.c("pineapple", { //need to collect 5 of these to finish the level
	init: function() {
		this.requires("2D, DOM, pineappleSprite, pineapple");
		var pineappleText;
	},
	pineapple: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
		return this;
	}
});

//make lava (special type of pit, insta death)
