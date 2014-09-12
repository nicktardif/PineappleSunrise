////////////////////////////
//		Constructors
//			for
//		Level Structure	objects

function Platform(inputX, inputY, inputW, inputH) {
	Crafty.e("platform").platform(inputX, inputY, inputW, inputH);
}

Crafty.c("platform", { //platform that you can't jump up through
	init: function() {
		this.requires("2D, DOM, platform, ground, normalPlatformSprite, solid");
	},
	platform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});

function ThinPlatform(inputX, inputY, inputW, inputH) {
	Crafty.e("thinPlatform").thinPlatform(inputX, inputY, inputW, inputH);
}

Crafty.c("thinPlatform", { //platform that you can jump through
	init: function() {
		this.requires("2D, DOM, platform, thinPlatform, thinPlatformSprite");
	},
	thinPlatform: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});

function MovingPlatform(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel) {
	Crafty.e("movingPlatform").movingPlatform(inputX, inputY, inputW, inputH, minX, maxX, minY, maxY, xvel, yvel);
}

Crafty.c("movingPlatform", { //solid platform that can move in the x and y directions
	init: function() {
		this.requires("2D, DOM, movingPlatform, solid, movingPlatformSprite");
		var hiddenPlatform;
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
			xForward: 1,
			hiddenPlatform: Crafty.e("2D, DOM, platform").attr({ x: inputX, y: inputY + 1, h: 1, w: inputW})
		});
		this.bind("EnterFrame", function() {
			if(this.yForward === 1) {
				this._y -= this.ySpeed;
				this.y -= this.ySpeed;
				this.hiddenPlatform.y = this.y + 1;
				if(this.y <= this.maxYBound) this.yForward = 0;	
			}
			else {
				this._y += this.ySpeed;
				this.y += this.ySpeed;
				this.hiddenPlatform.y = this.y + 1;
				if(this.y >= this.minYBound) this.yForward = 1;	
			} 
			if(this.xForward === 1) {
				this._x += this.xSpeed;
				this.x += this.xSpeed;
				this.hiddenPlatform.x = this.x;
				if(this.x >= this.maxXBound) this.xForward = 0;	
			}
			else {
				this._x -= this.xSpeed;
				this.x -= this.xSpeed;
				this.hiddenPlatform.x = this.x;
				if(this.x <= this.minXBound) this.xForward = 1;	
			} 
		});
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

// Constructor for ground objects
function Ground(inputX, inputY, inputW, inputH) {
	Crafty.e("ground").ground(inputX, inputY, inputW, inputH);
}

Crafty.c("ground", {  //platform that has a solid color (for now)
	init: function(inputX, inputY, inputW, inputH) {
		this.requires("2D, DOM, solid, platform, groundSprite");
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	},
	ground: function(inputX, inputY, inputW, inputH) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		});
	}
});

// Constructor for wall objects
function Wall(inputX, inputY, inputW, inputH, wallType, color) {
	Crafty.e("wall").wall(inputX, inputY, inputW, inputH, wallType, color);
}

Crafty.c("wall", { //barrier to going horizontally, is either leftWall or
					   //rightWall
	init: function() {
		this.requires("2D, DOM, wall, Color");
	},
	wall: function(inputX, inputY, inputW, inputH, wallType, color) {
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

function DisappearingBlock(inputX, inputY, inputW, inputH, deleteTime) {
	Crafty.e("disappearingBlock").disappearing(inputX, inputY, inputW, inputH, deleteTime);
}

Crafty.c("disappearingBlock", { 	//block dissappears after a set amount of time
	init: function() {
		this.requires("2D, DOM, disappearing, disappearingSprite");
		var hiddenPlatform;
	},
	disappearing: function(inputX, inputY, inputW, inputH, deleteTime) {
		this.attr({
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH,
			disappearTime: deleteTime,
			hiddenPlatform: Crafty.e("2D, DOM, platform, solid").attr({ x: inputX + 2, y:inputY + 1, h: 1, w: inputW - 4, visible: false})
			
		});

		//hiddenPlatform is to keep the player "on top" of the disappearing block, so the disappearing
		//onHit can trigger and not just the platform onHit
	},
	disappear: function() {
		this.hiddenPlatform.destroy();
		this.destroy();
		Crafty.audio.play('platformBreak', 1, .5);
	}
});

function Text(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize) {
	Crafty.e("text").text(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize);
}

Crafty.c("text", {
	init: function() {
		this.requires("2D, DOM, Text");
	},
	text: function(inputX, inputY, inputW, inputH, text, fontColor, fontAndSize) {
		this.attr({
			x: inputX, 
			y: inputY,
			w: inputW,
			h: inputH
		});
		this.text(text);
		this.css({"color": fontColor, "font": fontAndSize});
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

////////////////////////////
//		Constructors
//			for
//		Obstacles

function Spring(inputX, inputY, inputW, inputH) {
	Crafty.e("spring").spring(inputX, inputY, inputW, inputH);
}

Crafty.c("spring", { //sends you high in the air
	init: function() {
		this.requires("2D, DOM, spring, springSprite");
	},
	spring: function(inputX, inputY, inputW, inputH) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: inputW,
			h: inputH
		})
	}
});

function Pit(startX, GROUNDLEVEL, width, pitNumber, fallNumber) {
	console.log('fallnumber = ' + fallNumber);
	Crafty.e("pit").pit(startX, GROUNDLEVEL, width, pitNumber, fallNumber);
}

Crafty.c("pit", { //hit this and the level restarts, also has a fallCounter sign
	init: function() {
		this.requires("2D, DOM, pit");	
	},
	pit: function(startX, GROUNDLEVEL, width, pitNumber, fallNumber) {
		this.attr({ 
			x: startX - 16,
			y: GROUNDLEVEL + 16,
			w: width + 32,
			h: 1
		});
		this.pitNumber = pitNumber;
		var pitString = fallNumber;
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

function Water(inputX, inputY, inputW, inputH) {
	Crafty.e("water").water(inputX, inputY, inputW, inputH);
}

Crafty.c("water", { //water, float in it, drown if you stay in too long
	init: function() {
		this.requires("2D, DOM, waterSprite, SpriteAnimation");
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

	}
});

function End(inputX, inputY, inputW, inputH) {
	Crafty.e("end").end(inputX, inputY, inputW, inputH);
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
	}
});



////////////////////////////
//		Constructors
//			for
//		Creatures

function Player(inputX, inputY, bsize, mspeed, jspeed, fallAmounts) {
	Crafty.e("player").player(inputX, inputY, bsize, mspeed, jspeed, fallAmounts);
}

Crafty.c("player", {
	init: function() {
		var animationDuration = 500;
		this.requires("2D, DOM, playerSprite, Gravity, Controls, Twoway, Collision, SpriteAnimation");
		this.gravity('platform');
		this.gravityConst(.3);
		this.collision();
		this.reel("walk_right", animationDuration, 4, 18, 3);
		this.reel("walk_left", animationDuration, 1, 18, 3);
		this.reel("stopped", animationDuration, 0, 18, 1);
		
	},
	player: function(inputX, inputY, bsize, mspeed, jspeed, fallAmounts) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: bsize,
			h: bsize
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
				hit[0].obj.hiddenPlatform.destroy();
				hit[0].obj.destroy();
			}, hit[0].obj.disappearTime);
		});
		this.onHit("solid", function (hit) {
			if(this.y < hit[0].obj.y) {		//if on top object all is cool
			}
			else if(this._up) { 			//if jumping up into it, bounce back down
				this.y = hit[0].obj.y + hit[0].obj.h;
				this._falling = true;
				this._up = false;
			}
			else { 							//cannot run through object
				if(this.x < hit[0].obj.x) {
					this.x = hit[0].obj.x - 16;
					this._x = hit[0].obj.x - 16;
				}
				if(this.x >= (hit[0].obj.x) ) {
					this.x = (hit[0].obj.x + hit[0].obj.w); 
					this._x = (hit[0].obj.x + hit[0].obj.w); 
				}
			}
		});
		this.onHit("pit", function(hit) {
			Crafty.audio.play('falling', 1, .5);
			this.death(this.x);
			fallAmounts[hit[0].obj.pitNumber] = fallAmounts[hit[0].obj.pitNumber] + 1;
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
		this.onHit("movingPlatform", function(hit) {
			if(hit[0].obj.yForward === 1) {		//platform is moving up
				this.y = hit[0].obj.y - 15;
				this._y = hit[0].obj.y - 15;
			}
			else {								//platform is moving down
				this.y = hit[0].obj.y - 15;
				this._y = hit[0].obj.y - 15;
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
		this.onHit("wall", function (hit) {
			if(hit[0].obj.isLeft === 1) { 
				this.x += hit[0].obj.w / 4;
				this._x += hit[0].obj.w / 4;
			}
			else {
				this.x -= hit[0].obj.w / 4;
				this._x -= hit[0].obj.w / 4;
			}
		});
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
	},
	death: function(inputX) {
		this.y = 500;
		this._y = 500;
		this.disableControl();
		var deathText = Crafty.e("text").text(inputX, 125, 100, 20, "You died", "000000", "14pt Arial");
		this.timeout( function() {
			Crafty.viewport.x = 0;
			Crafty.scene("game");
		}, 500);
	}
});

function Fatso(inputX, inputY, bSize, lb, rb, speed) {
	Crafty.e("fatso").fatso(inputX, inputY, bSize, lb, rb, speed);
}

Crafty.c("fatso", { 	//large enemy that walks back and forth
	init: function() {
		var animationDuration = 500;
		this.requires("2D, DOM, fatsoSprite, enemy, SpriteAnimation");
		this.reel("faceRight", animationDuration, 0, 1, 3);
		this.reel("faceLeft", animationDuration, 0, 0, 3);
		var leftBound;
		var rightBound;
	},
	fatso: function(inputX, inputY, bSize, lb, rb, speed) {
		this.attr({ 
			x: inputX,
			y: inputY,
			w: 2 * bSize,
			h: 2 * bSize,
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
	}
});

////////////////////////////
//		Constructors
//			for
//		Weapons

function Hammer(inputX, inputY, bsize) {
	Crafty.e("hammer").hammer(inputX, inputY, bsize);
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
	hammer: function(inputX, inputY, bsize) {
		this.attr({
			x: inputX,
			y: inputY,
			w: bsize,
			h: bsize
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
	Crafty.e("pineapple").pineapple(inputX, inputY, inputW, inputH);
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
	}
});

//make lava (special type of pit, insta death)
