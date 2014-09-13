var blocksize = 0;

window.onload = function() {
    var availableXPixels = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var availableYPixels = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

	var gWidth = 40; // width in game units
	var gHeight = 20; // height in game units
	var PIXELS_PER_GAME_UNIT = 16;

	// How much screen can fit in the y direction?
	var scale = Math.floor(availableYPixels / (gHeight * PIXELS_PER_GAME_UNIT));

	// Scale down until the screen fits in the x direction too
	while(gWidth * scale * PIXELS_PER_GAME_UNIT > availableXPixels) {
		scale--;
	}

	// Dimensions of each 1x1 game unit in pixels
	blockSize = scale * PIXELS_PER_GAME_UNIT;

	var spritesLocation = 'sprites/scale' + blockSize + '/';

	var pWidth = gWidth * blockSize;
	var pHeight = gHeight * blockSize;
	Crafty.init(pWidth, pHeight);

	var fallAmounts = [0, 0, 0, 0];
	var levelNumber = 0;


	////////////////////////////
	//		Game scene	
	//		defintion	

	Crafty.scene("game", function () {
		// Draw background
			Crafty.e("2D, DOM, Image")
				.attr({w: 2100, h: Crafty.viewport.height})
				//.attr({w: Crafty.viewport.width*2, h: Crafty.viewport.height})
				.image(spritesLocation + "cloudswithskyandhorizon.png", "repeat");
		
		//set the images for the sprites
		Crafty.sprite(blockSize, spritesLocation + "sprites.png", {
			playerSprite: [0,18],
			normalPlatformSprite: [0,16], thinPlatformSprite: [0,17], movingPlatformSprite: [0,15], disappearingSprite: [0,14], groundSprite: [0,13],
			waterSprite: [0,11], 
			sign0: [0,0], sign1: [1,0], sign2: [2,0], sign3: [3,0], sign4: [4,0],
			sign5: [5,0], sign6: [6,0], sign7: [7,0], sign8: [8,0], sign9: [9,0],
			sign10: [0,1], sign11: [1,1], sign12: [2,1], sign13: [3,1], sign14: [4,1],
			sign15: [5,1], sign16: [6,1], sign17: [7,1], sign18: [8,1], sign19: [9,1],
			sign20: [0,2], sign21: [1,2], sign22: [2,2], sign23: [3,2], sign24: [4,2],
			sign25: [5,2], sign26: [6,2], sign27: [7,2], sign28: [8,2], sign29: [9,2],
			sign30: [0,3], sign31: [1,3], sign32: [2,3], sign33: [3,3], sign34: [4,3],
			sign35: [5,3], sign36: [6,3], sign37: [7,3], sign38: [8,3], sign39: [9,3],
			sign40: [0,4], sign41: [1,4], sign42: [2,4], sign43: [3,4], sign44: [4,4],
			sign45: [5,4], sign46: [6,4], sign47: [7,4], sign48: [8,4], sign49: [9,4],
			sign50: [0,5], sign51: [1,5], sign52: [2,5], sign53: [3,5], sign54: [4,5],
			sign55: [5,5], sign56: [6,5], sign57: [7,5], sign58: [8,5], sign59: [9,5],
			sign60: [0,6], sign61: [1,6], sign62: [2,6], sign63: [3,6], sign64: [4,6],
			sign65: [5,6], sign66: [6,6], sign67: [7,6], sign68: [8,6], sign69: [9,6],
			sign70: [0,7], sign71: [1,7], sign72: [2,7], sign73: [3,7], sign74: [4,7],
			sign75: [5,7], sign76: [6,7], sign77: [7,7], sign78: [8,7], sign79: [9,7],
			sign80: [0,8], sign81: [1,8], sign82: [2,8], sign83: [3,8], sign84: [4,8],
			sign85: [5,8], sign86: [6,8], sign87: [7,8], sign88: [8,8], sign89: [9,8],
			sign90: [0,9], sign91: [1,9], sign92: [2,9], sign93: [3,9], sign94: [4,9],
			sign95: [5,9], sign96: [6,9], sign97: [7,9], sign98: [8,9], sign99: [9,9],
			springSprite: [2,10], hammerSprite: [0, 12], pineappleSprite: [1,10]
		});

		// Load the large sprites (size is twice that of the other sprites
		Crafty.sprite(blockSize * 2, spritesLocation + "largesprites.png", {
			fatsoSprite: [0,0], endSprite: [0,2]
		});

		// Have a blank function for level 0
		var level_load_functions = [function() {}, level_1, level_2];
		
		level_load_functions[levelNumber]();

		Crafty.pause();	// pauses the game while the info box is open
	});

	////////////////////////////
	//		Other scene	
	//		defintions	
	//		(loading, title)	
 
	Crafty.scene("loading", function() {
		//load the level sprites before the level starts
		Crafty.load([spritesLocation + "sprites.png", spritesLocation + "largesprites.png", spritesLocation + "cloudswithskyandhorizon.png"], function() {
				fallAmounts = [0, 0, 0, 0];
				Crafty.audio.play("backgroundMusic", -1, .75); //turned off during development 
				Crafty.scene("game");
		});
		Crafty.audio.add({ 
			backgroundMusic: ["audio/bgmusic.ogg"],
			jumpSound: ["audio/jump.ogg"],
			platformBreak: ["audio/break.ogg"],
			fatsoYell: ["audio/fatsoYell.ogg"],
			splat: ["audio/splat.ogg"],
			vwoom: ["audio/vwoom.ogg"],
			falling: ["audio/fallingScream.ogg"]
		});
	});
	
	Crafty.scene("titleScreen", function() {
		Crafty.background("#ffcd75");

		MyImage(0, 0, 19, 9, spritesLocation + 'psunrisebanner.png');

		MyImage(3, 8, 10, 6, spritesLocation + 'level1.png');
		Text(3, 8, 1, 3, "Level 1", "#000", '18pt Palatino');

		MyImage(14, 8, 10, 6, spritesLocation + 'level2.png');
		Text(14, 8, 1, 3, "Level 2", "#000", '18pt Palatino');

		Text(21, 8, 20, 14, "Press the number of the level you wish to play", "#000", '20pt Palatino');
		Text(21, 9, 20, 14, "Game created by Nick Tardif", "#000", '20pt Palatino');
		/*
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 132, w: 60, h: 60}) .text("Level 3").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 540, y: 132, w: 60, h: 60}) .text("Level 4").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 30, y: 202, w: 60, h: 60}) .text("Level 5").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 200, y: 202, w: 60, h: 60}) .text("Level 6").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 202, w: 60, h: 60}) .text("Level 7").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 540, y: 202, w: 60, h: 60}) .text("Level 8").css({ "color": "#000000"});
		*/

		
		this.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys['1']) {
				levelNumber = 1;
				Crafty.scene("loading");
			}
			if (e.key == Crafty.keys['2']) {
				levelNumber = 2;
				Crafty.scene("loading");
			}
			if (e.key == Crafty.keys['3']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
			if (e.key == Crafty.keys['4']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
			if (e.key == Crafty.keys['5']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
			if (e.key == Crafty.keys['6']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
			if (e.key == Crafty.keys['7']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
			if (e.key == Crafty.keys['8']) {
				Crafty.scene("loading");
				levelNumber = 1;
			}
		});

	});

	function level_1() {
		console.log('blocksize is ' + blockSize);
		var MOVESPEED = 2.5;
		var JUMPSPEED = 6;
		var GROUNDLEVEL = gHeight - 1;

		//leftwall
		Wall(-0.5, 0, 0.5, gHeight, 1, "black", blockSize);

		//ground
		Ground(0, GROUNDLEVEL, 8, 1); 
		Ground(25, GROUNDLEVEL, 10, 1, blockSize);
		Ground(35, GROUNDLEVEL, 8, 1, blockSize);
		Ground(53, GROUNDLEVEL, 10, 1, blockSize);

		Ground(106, 7, 0.5, blockSize);

		//platforms
		Platform(45, GROUNDLEVEL - 4, 6, 0.5, blockSize);
		Platform(44, GROUNDLEVEL - 8, 1, 0.5, blockSize);
		Platform(42, GROUNDLEVEL - 12, 1, 0.5, blockSize);
		Platform(46, GROUNDLEVEL - 15, 1, 0.5, blockSize);
		Platform(51, GROUNDLEVEL - 8, 1, 0.5, blockSize);

		Platform(77, GROUNDLEVEL - 5, 6, 0.5, blockSize);
		Platform(106, GROUNDLEVEL - 1, 6, 0.5, blockSize);

		//thin platforms
		ThinPlatform(65, GROUNDLEVEL - 5, 6, 0.5, blockSize);
		ThinPlatform(65, GROUNDLEVEL - 2, 6, 0.5, blockSize);

		//stairs
		Platform(5, GROUNDLEVEL - 1, 3, 1, blockSize);
		Platform(6, GROUNDLEVEL - 2, 2, 1, blockSize);
		Platform(7, GROUNDLEVEL - 3, 1, 1, blockSize);

		Platform(40, GROUNDLEVEL - 1, 3, 1, blockSize);
		Platform(41, GROUNDLEVEL - 2, 2, 1, blockSize);
		Platform(42, GROUNDLEVEL - 3, 1, 1, blockSize);

		Platform(53, GROUNDLEVEL - 3, 1, 1, blockSize);
		Platform(53, GROUNDLEVEL - 2, 2, 1, blockSize);
		Platform(53, GROUNDLEVEL - 1, 3, 1, blockSize);

		//moving platforms
		MovingPlatform(10, GROUNDLEVEL - 3, 3, 0.25, 10, 10, GROUNDLEVEL - 3, GROUNDLEVEL - 7, 0, 0.3, blockSize);
		MovingPlatform(20, GROUNDLEVEL - 3, 3, 0.25, 20, 20, GROUNDLEVEL - 3, GROUNDLEVEL - 7, 0, 0.3, blockSize);

		MovingPlatform(93, GROUNDLEVEL - 2, 3, 0.25, 93, 103, GROUNDLEVEL - 2, GROUNDLEVEL - 6, 0.5, 0.000000001, blockSize);

		//spring
		Spring(16, GROUNDLEVEL - 4, 1, 0.5, blockSize);
		Platform(16, GROUNDLEVEL - 3.75, 1, 0.5, blockSize);

		//pits
		Pit(-8, GROUNDLEVEL, 8, 0, fallAmounts[0], blockSize);
		Pit(8, GROUNDLEVEL, 17, 0, fallAmounts[0], blockSize);
		Pit(43, GROUNDLEVEL, 9, 1, fallAmounts[1], blockSize);
		Pit(63, GROUNDLEVEL, 43, 2, fallAmounts[2], blockSize);

		//disappearing
		DisappearingBlock(45, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);
		DisappearingBlock(46, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);
		DisappearingBlock(47, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);
		DisappearingBlock(48, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);
		DisappearingBlock(49, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);
		DisappearingBlock(50, GROUNDLEVEL - 8, 1, 0.5, 300, blockSize);

		DisappearingBlock(87, GROUNDLEVEL - 5, 1, 1, 200, blockSize);
		DisappearingBlock(88, GROUNDLEVEL - 5, 1, 1, 200, blockSize);
		DisappearingBlock(89, GROUNDLEVEL - 5, 1, 1, 200, blockSize);
		DisappearingBlock(90, GROUNDLEVEL - 5, 1, 1, 200, blockSize);
		DisappearingBlock(91, GROUNDLEVEL - 5, 1, 1, 200, blockSize);
		DisappearingBlock(87, GROUNDLEVEL - 4, 1, 1, 200, blockSize);
		DisappearingBlock(88, GROUNDLEVEL - 4, 1, 1, 200, blockSize);
		DisappearingBlock(89, GROUNDLEVEL - 4, 1, 1, 200, blockSize);
		DisappearingBlock(90, GROUNDLEVEL - 4, 1, 1, 200, blockSize);
		DisappearingBlock(91, GROUNDLEVEL - 4, 1, 1, 200, blockSize);
		DisappearingBlock(87, GROUNDLEVEL - 3, 1, 1, 200, blockSize);
		DisappearingBlock(88, GROUNDLEVEL - 3, 1, 1, 200, blockSize);
		DisappearingBlock(89, GROUNDLEVEL - 3, 1, 1, 200, blockSize);
		DisappearingBlock(90, GROUNDLEVEL - 3, 1, 1, 200, blockSize);
		DisappearingBlock(91, GROUNDLEVEL - 3, 1, 1, 200, blockSize);
		DisappearingBlock(87, GROUNDLEVEL - 2, 1, 1, 200, blockSize);
		DisappearingBlock(88, GROUNDLEVEL - 2, 1, 1, 200, blockSize);
		DisappearingBlock(89, GROUNDLEVEL - 2, 1, 1, 200, blockSize);
		DisappearingBlock(90, GROUNDLEVEL - 2, 1, 1, 200, blockSize);
		DisappearingBlock(91, GROUNDLEVEL - 2, 1, 1, 200, blockSize);
		DisappearingBlock(87, GROUNDLEVEL - 1, 1, 1, 200, blockSize);
		DisappearingBlock(88, GROUNDLEVEL - 1, 1, 1, 200, blockSize);
		DisappearingBlock(89, GROUNDLEVEL - 1, 1, 1, 200, blockSize);
		DisappearingBlock(90, GROUNDLEVEL - 1, 1, 1, 200, blockSize);
		DisappearingBlock(91, GROUNDLEVEL - 1, 1, 1, 200, blockSize);
		
		// end
		End(109, GROUNDLEVEL - 3, 2, 2, blockSize);

		//text
		Text(3, 0.5, 6, 3, "Level 1", "#ffffff", "12pt Palatino", blockSize);

		//dialogue
		Dialogue(100, 50, 300, 100, [5, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Controls:", "WASD- Movement &nbsp &nbsp &nbsp 'F'-Pickup Items", "'P'-Pause Game &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 'B'- Mute Background Music", "", "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino");

		//pineapple
		Pineapple(21, GROUNDLEVEL - 9, 1, 1, blockSize);
		Pineapple(46, GROUNDLEVEL - 16, 1, 1, blockSize);
		Pineapple(48, GROUNDLEVEL - 5, 1, 1, blockSize);
		Pineapple(69, GROUNDLEVEL - 6, 1, 1, blockSize);
		Pineapple(89, GROUNDLEVEL - 3, 1, 1, blockSize);

		//fatso
		Fatso(38, GROUNDLEVEL - 2, 27, 38, 0.5, blockSize);
		Fatso(45, GROUNDLEVEL - 6, 45, 49, 0.2, blockSize);
		Fatso(65, GROUNDLEVEL - 7, 65, 70, 0.3, blockSize);

		//player
		Player(0, GROUNDLEVEL- 1, MOVESPEED, JUMPSPEED, fallAmounts, blockSize);
	}

	function level_2(blockSize) {
		var MOVESPEED = 2.5;
		var JUMPSPEED = 6;
		var GROUNDLEVEL = gHeight - 1;
		var BLOCKSIZE = blockSize;

		//ground
		Ground(0, GROUNDLEVEL, 10, 0.5);
		Ground(0, GROUNDLEVEL + 8, 10, 0.5);
		Ground(71, GROUNDLEVEL, 8, 0.5);
		Ground(71, GROUNDLEVEL + 8, 8, 0.5);

		//platforms
		Platform(12, GROUNDLEVEL - 2, 4, 0.5);
		Platform(19, GROUNDLEVEL - 3.9375, 4, 0.5);
		Platform(23, GROUNDLEVEL - 3.9375, 8, 0.5);
		Platform(34, GROUNDLEVEL - 2 , 3, 0.5);
		Platform(33, GROUNDLEVEL - 7.4375, 1, 0.5);
		Platform(27, GROUNDLEVEL - 10, 2, 0.5);
		Platform(32, GROUNDLEVEL - 13, 0.5, 0.5);
		Platform(51, GROUNDLEVEL - 11, 2, 0.5);
		Platform(75, GROUNDLEVEL - 1, 4, 1);
		Platform(76, GROUNDLEVEL - 2, 3, 1);
		Platform(77, GROUNDLEVEL - 3, 2, 1);
		Platform(92, GROUNDLEVEL - 4, 2, 0.5);
		Platform(79, GROUNDLEVEL - 10, 1, 0.5);
		Platform(80, GROUNDLEVEL - 11, 1, 0.5);
		Platform(81, GROUNDLEVEL - 12, 10, 0.5);
		Platform(91, GROUNDLEVEL - 12, 4, 0.5);
		Platform(100, GROUNDLEVEL - 12, 4, 0.5);
		Platform(101, GROUNDLEVEL - 15, 2, 0.5);
		Platform(106, GROUNDLEVEL - 12, 2, 0.5);


		//moving platforms
		//horizontal
		MovingPlatform(40, GROUNDLEVEL - 5, 3, 0.25, 40, 50, GROUNDLEVEL - 2, GROUNDLEVEL - 6, 0.5, 0.000000001);
		MovingPlatform(81, GROUNDLEVEL - 2, 2, 0.25, 81, 89, GROUNDLEVEL - 2, GROUNDLEVEL - 6, 0.5, 0.000000001);

		//diagonal
		MovingPlatform(58, GROUNDLEVEL - 5, 3, 0.25, 58, 67, GROUNDLEVEL - 1, GROUNDLEVEL - 5, 0.5, 0.2028);


		//vertical
		MovingPlatform(54, GROUNDLEVEL - 5, 3, 0.25, 54, 54, GROUNDLEVEL - 1, GROUNDLEVEL - 5, 0, 0.3);
		MovingPlatform(54, GROUNDLEVEL - 6, 3, 0.25, 54, 54, GROUNDLEVEL - 6, GROUNDLEVEL - 11, 0, 0.3);

		//wall
		Wall(33, GROUNDLEVEL- 7, 0.5, 5, 0, "black");
		Wall(33, GROUNDLEVEL- 7, 0.5, 5, 1, "black");


		//spring
		Spring(34, GROUNDLEVEL - 2.5, 1, 0.5);
		Spring(77, GROUNDLEVEL - 3.5, 1, 0.5);

		//pit
		Pit(10, 62, 0);
		Pit(79, 125, 1);

		//disappearing
		DisappearingBlock(81, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(82, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(83, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(84, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(85, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(86, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(87, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(88, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(89, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(90, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);
		DisappearingBlock(91, GROUNDLEVEL -  4 - (1 / 16), 1, 0.5, 300);

		//end
		End(106, GROUNDLEVEL - 14, 2, 2);

		//pineapple
		Pineapple(36, GROUNDLEVEL - 3, 1, 1);
		Pineapple(51, GROUNDLEVEL - 12, 1, 1);
		Pineapple(87, GROUNDLEVEL - 13, 1, 1);
		Pineapple(92, GROUNDLEVEL - 5, 1, 1);
		Pineapple(101, GROUNDLEVEL - 16, 1, 1);

		//dialogue
		Dialogue(100, 50, 300, 100, [5, "Press 'P' to pause the game", "Press 'M' to mute all sounds", "Press 'B' to mute the background music", "", "Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino");

		//fatso
		Fatso(32, GROUNDLEVEL - 15, 32, 38, 0.2);
		Fatso(81, GROUNDLEVEL - 14, 81, 93, 0.5);
		Fatso(93, GROUNDLEVEL - 14, 81, 93, 0.5);
		Fatso(100, GROUNDLEVEL - 14, 100, 102, 0.2);

		//player
		Player(0, GROUNDLEVEL - 1, MOVESPEED, JUMPSPEED, fallAmounts);

		//hammer weapon
		Hammer(3, GROUNDLEVEL - 1);
	}
		
	////////////////////////////
	//		Code to run			

		//load the titleScreen sprites before the titlescreen starts
		Crafty.load([spritesLocation + 'psunrisebanner.png', spritesLocation + 'level1.png', spritesLocation + 'level2.png'], function() {
			Crafty.scene("titleScreen");
		});
};
