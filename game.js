window.onload = function() {
	//document.body.innerHTML += "<div id='debug'></div><div id='instructions'>Press <strong>P</strong> to pause, <strong>B</strong> to toggle background music, <strong>M</strong> to mute all sounds</div>";
	var width = 700;
	var height = 320;
	Crafty.init(width, height);
	var fallAmounts = [0, 0, 0, 0];
	var levelNumber = 0;


	////////////////////////////
	//		Game scene	
	//		defintion	

	Crafty.scene("game", function () {
		var BLOCKSIZE = 16;
		var LARGEBLOCKSIZE = 2 * BLOCKSIZE;

		// Draw background
			Crafty.e("2D, DOM, Image")
				.attr({w: 2100, h: Crafty.viewport.height})
				//.attr({w: Crafty.viewport.width*2, h: Crafty.viewport.height})
				.image("sprites/cloudswithskyandhorizon.png", "repeat");
		
		//set the images for the sprites
		Crafty.sprite(BLOCKSIZE, "sprites/sprites.png", {
			playerSprite: [0,18],
			normalPlatformSprite: [0,16], thinPlatformSprite: [0,17], movingPlatformSprite: [0,15], disappearingSprite: [0,14], groundSprite: [0,13],
			waterSprite: [0,11], endSprite: [9,10],
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
		Crafty.sprite(LARGEBLOCKSIZE, "sprites/largesprites.png", {
			fatsoSprite: [0,0], endSprite: [0,2]
		});

		var level_load_functions = [level_1, level_2];
		
		if (levelNumber !== 0) // Prevent indexOutOfBounds
			levelNumber--;

		level_load_functions[levelNumber]();

		Crafty.pause();	// pauses the game while the info box is open
			
	});


	////////////////////////////
	//		Other scene	
	//		defintions	
	//		(loading, title)	
 
	Crafty.scene("loading", function() {
		//load the level sprites before the level starts
		Crafty.load(["sprites/sprites.png", "sprites/largesprites.png", "sprites/cloudswithskyandhorizon.png"], function() {
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
		Crafty.e("2D, DOM, Image") .attr({x: 0, y: 0, w: 700, h: 130}) .image("sprites/psunrisebanner.png");
		Crafty.e("2D, DOM, Image") .attr({x: 30, y: 132, w: 150, h: 100}) .image("sprites/level1.png");
		Crafty.e("2D, DOM, Image") .attr({x: 200, y: 132, w: 150, h: 100}) .image("sprites/level2.png");
		Crafty.e("2D, DOM, Text") .attr({x: 30, y: 132, w: 60, h: 60}) .text("Level 1") .css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 200, y: 132, w: 60, h: 60}) .text("Level 2").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 132, w: 300, h: 200}) .text("Press the number of the level you wish to play").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 250, w: 300, h: 200}) .text("Game created by Nick Tardif").css({ "color": "#000000"});
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
		var MOVESPEED = 2.5;
		var JUMPSPEED = 6;
		var GROUNDLEVEL = height-16;
		var BLOCKSIZE = 16;

		//leftwall
		Wall(-8, 0, 8, height, 1, "black");

		//ground
		Ground(0, GROUNDLEVEL, 128, 16); 
		Ground(400, GROUNDLEVEL, 160, 16);
		Ground(560, GROUNDLEVEL, 128, 16);
		Ground(848, GROUNDLEVEL, 160, 16);

		Ground(1696, 120, 8);

		//platforms
		Platform(720, GROUNDLEVEL - 4 * 16, 96, 8);
		Platform(704, GROUNDLEVEL - 8 * 16, 16, 8);
		Platform(672, GROUNDLEVEL - 12 * 16, 16, 8);
		Platform(736, GROUNDLEVEL - 15 * 16, 16, 8);
		Platform(816, GROUNDLEVEL - 8 * 16, 16, 8);

		Platform(1232, GROUNDLEVEL - 5 * 16, 96, 8);
		Platform(1696, GROUNDLEVEL - 1 * 16, 96, 8);

		//thin platforms
		ThinPlatform(1040, GROUNDLEVEL - 5 * 16, 108, 8);
		ThinPlatform(1040, GROUNDLEVEL - 2 * 16, 108, 8);

		//stairs
		Platform(80, GROUNDLEVEL - 1 * 16, 48, 16);
		Platform(96, GROUNDLEVEL - 2 * 16, 32, 16);
		Platform(112, GROUNDLEVEL - 3 * 16, 16, 16);

		Platform(640, GROUNDLEVEL - 1 * 16, 48, 16);
		Platform(656, GROUNDLEVEL - 2 * 16, 32, 16);
		Platform(672, GROUNDLEVEL - 3 * 16, 16, 16);

		Platform(848, GROUNDLEVEL - 3 * 16, 16, 16);
		Platform(848, GROUNDLEVEL - 2 * 16, 32, 16);
		Platform(848, GROUNDLEVEL - 1 * 16, 48, 16);

		//moving platforms
		MovingPlatform(160, GROUNDLEVEL - 3 * 16, 48, 4, 160, 160, GROUNDLEVEL - 3 * 16, GROUNDLEVEL - (3 * 16) - 64, 0, 0.3);
		MovingPlatform(320, GROUNDLEVEL - 3 * 16, 48, 4, 320, 320, GROUNDLEVEL - 3 * 16, GROUNDLEVEL - (3 * 16) - 64, 0, 0.3);

		MovingPlatform(1488, GROUNDLEVEL - 2 * 16, 48, 4, 1488, 1648, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001);

		//spring
		Spring(256, GROUNDLEVEL - 4 * 16, 16, 8);
		Platform(256, GROUNDLEVEL - 4 * 16 + 8, 16, 8);

		//pits
		Pit(-128, GROUNDLEVEL, 128, 0, fallAmounts[0]);
		Pit(128, GROUNDLEVEL, 272, 0, fallAmounts[0]);
		Pit(688, GROUNDLEVEL, 144, 1, fallAmounts[1]);
		Pit(1008, GROUNDLEVEL, 700, 2, fallAmounts[2]);

		//disappearing
		DisappearingBlock(720, GROUNDLEVEL - 8 * 16, 16, 8, 300);
		DisappearingBlock(736, GROUNDLEVEL - 8 * 16, 16, 8, 300);
		DisappearingBlock(752, GROUNDLEVEL - 8 * 16, 16, 8, 300);
		DisappearingBlock(768, GROUNDLEVEL - 8 * 16, 16, 8, 300);
		DisappearingBlock(784, GROUNDLEVEL - 8 * 16, 16, 8, 300);
		DisappearingBlock(800, GROUNDLEVEL - 8 * 16, 16, 8, 300);

		DisappearingBlock(1392, GROUNDLEVEL - 5 * 16, 16, 16, 200);
		DisappearingBlock(1408, GROUNDLEVEL - 5 * 16, 16, 16, 200);
		DisappearingBlock(1424, GROUNDLEVEL - 5 * 16, 16, 16, 200);
		DisappearingBlock(1440, GROUNDLEVEL - 5 * 16, 16, 16, 200);
		DisappearingBlock(1456, GROUNDLEVEL - 5 * 16, 16, 16, 200);
		DisappearingBlock(1392, GROUNDLEVEL - 4 * 16, 16, 16, 200);
		DisappearingBlock(1408, GROUNDLEVEL - 4 * 16, 16, 16, 200);
		DisappearingBlock(1424, GROUNDLEVEL - 4 * 16, 16, 16, 200);
		DisappearingBlock(1440, GROUNDLEVEL - 4 * 16, 16, 16, 200);
		DisappearingBlock(1456, GROUNDLEVEL - 4 * 16, 16, 16, 200);
		DisappearingBlock(1392, GROUNDLEVEL - 3 * 16, 16, 16, 200);
		DisappearingBlock(1408, GROUNDLEVEL - 3 * 16, 16, 16, 200);
		DisappearingBlock(1424, GROUNDLEVEL - 3 * 16, 16, 16, 200);
		DisappearingBlock(1440, GROUNDLEVEL - 3 * 16, 16, 16, 200);
		DisappearingBlock(1456, GROUNDLEVEL - 3 * 16, 16, 16, 200);
		DisappearingBlock(1392, GROUNDLEVEL - 2 * 16, 16, 16, 200);
		DisappearingBlock(1408, GROUNDLEVEL - 2 * 16, 16, 16, 200);
		DisappearingBlock(1424, GROUNDLEVEL - 2 * 16, 16, 16, 200);
		DisappearingBlock(1440, GROUNDLEVEL - 2 * 16, 16, 16, 200);
		DisappearingBlock(1456, GROUNDLEVEL - 2 * 16, 16, 16, 200);
		DisappearingBlock(1392, GROUNDLEVEL - 1 * 16, 16, 16, 200);
		DisappearingBlock(1408, GROUNDLEVEL - 1 * 16, 16, 16, 200);
		DisappearingBlock(1424, GROUNDLEVEL - 1 * 16, 16, 16, 200);
		DisappearingBlock(1440, GROUNDLEVEL - 1 * 16, 16, 16, 200);
		DisappearingBlock(1456, GROUNDLEVEL - 1 * 16, 16, 16, 200);
		
		// end
		End(1744, GROUNDLEVEL - 3 * 16, 32, 32);

		//text
		Text(50, 10, 100, 50, "Level 1", "#ffffff", "12pt Palatino");

		//dialogue
		Dialogue(100, 50, 300, 100, [5, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Controls:", "WASD- Movement &nbsp &nbsp &nbsp 'F'-Pickup Items", "'P'-Pause Game &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 'B'- Mute Background Music", "", "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino");

		//pineapple
		Pineapple(336, GROUNDLEVEL - 9 * 16, 16, 16);
		Pineapple(736, GROUNDLEVEL - 16 * 16, 16, 16);
		Pineapple(768, GROUNDLEVEL - 5 * 16, 16, 16);
		Pineapple(1104, GROUNDLEVEL - 6 * 16, 16, 16);
		Pineapple(1424, GROUNDLEVEL - 3 * 16, 16, 16);

		//fatso
		Fatso(608, GROUNDLEVEL - 2 * 16, BLOCKSIZE, 440, 608, 0.5);
		Fatso(720, GROUNDLEVEL - 6 * 16, BLOCKSIZE, 720, 784, 0.2);
		Fatso(1040, GROUNDLEVEL - 7 * 16, BLOCKSIZE, 1040, 1120, 0.3);

		//player
		Player(0, GROUNDLEVEL-16, BLOCKSIZE, MOVESPEED, JUMPSPEED, fallAmounts);
	}

	function level_2() {
		var MOVESPEED = 2.5;
		var JUMPSPEED = 6;
		var GROUNDLEVEL = height-16;
		var BLOCKSIZE = 16;

		//ground
		Ground(0, GROUNDLEVEL, 160, 8);
		Ground(0, GROUNDLEVEL + 8, 160, 8);
		Ground(1136, GROUNDLEVEL, 128, 8);
		Ground(1136, GROUNDLEVEL + 8, 128, 8);

		//platforms
		Platform(192, GROUNDLEVEL - 32, 64, 8);
		Platform(304, GROUNDLEVEL - 4 * 16 + 1, 64, 8);
		Platform(368, GROUNDLEVEL - 4 * 16 + 1, 128, 8);
		Platform(544, GROUNDLEVEL - 2 * 16, 48, 8);
		Platform(528, GROUNDLEVEL - 8 * 16 + 9, 16, 8);
		Platform(432, GROUNDLEVEL - 10 * 16 , 32, 8);
		Platform(512, GROUNDLEVEL - 13 * 16 , 128, 8);
		Platform(816, GROUNDLEVEL - 11 * 16 , 32, 8);
		Platform(1200, GROUNDLEVEL - 1 * 16, 64, 16);
		Platform(1216, GROUNDLEVEL - 2 * 16, 48, 16);
		Platform(1232, GROUNDLEVEL - 3 * 16, 32, 16);
		Platform(1472, GROUNDLEVEL - 4 * 16, 32, 8);
		Platform(1264, GROUNDLEVEL - 10 * 16, 16, 8);
		Platform(1280, GROUNDLEVEL - 11 * 16, 16, 8);
		Platform(1296, GROUNDLEVEL - 12 * 16, 160, 8);
		Platform(1456, GROUNDLEVEL - 12 * 16, 64, 8);
		Platform(1600, GROUNDLEVEL - 12 * 16, 64, 8);
		Platform(1616, GROUNDLEVEL - 15 * 16, 32, 8);
		Platform(1696, GROUNDLEVEL - 12 * 16, 32, 8);


		//moving platforms
		//horizontal
		MovingPlatform(640, GROUNDLEVEL - 5 * 16, 48, 4, 640, 800, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001);
		MovingPlatform(1296, GROUNDLEVEL - 2 * 16, 32, 4, 1296, 1424, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001);

		//diagonal
		MovingPlatform(928, GROUNDLEVEL - 5 * 16, 48, 4, 928, 1087, GROUNDLEVEL - 1 * 16, GROUNDLEVEL - 5 * 16, 0.5, 0.2028);


		//vertical
		MovingPlatform(864, GROUNDLEVEL - 5 * 16, 48, 4, 864, 864, GROUNDLEVEL - 1 * 16, GROUNDLEVEL - 5 * 16, 0, 0.3);
		MovingPlatform(864, GROUNDLEVEL - 6 * 16, 48, 4, 864, 864, GROUNDLEVEL - 6 * 16, GROUNDLEVEL - 11 * 16, 0, 0.3);

		//wall
		Wall(528, GROUNDLEVEL- 7 * 16, 8, 88, 0, "black");
		Wall(536, GROUNDLEVEL- 7 * 16, 8, 88, 1, "black");


		//spring
		Spring(544, GROUNDLEVEL - 3 * 16 + 8, 16, 8);
		Spring(1232, GROUNDLEVEL - 4 * 16 + 8, 16, 8);

		//pit
		Pit(160, 1000, 0);
		Pit(1264, 2000, 1);

		//disappearing
		DisappearingBlock(1296, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1312, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1328, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1344, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1360, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1376, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1392, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1408, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1424, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1440, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);
		DisappearingBlock(1456, GROUNDLEVEL -  4 * 16 - 1, 16, 8, 300);

		//end
		End(1696, GROUNDLEVEL - 14 * 16, 32, 32);

		//pineapple
		Pineapple(576, GROUNDLEVEL - 3 * 16, 16, 16);
		Pineapple(816, GROUNDLEVEL - 12 * 16 , 16, 16);
		Pineapple(1392, GROUNDLEVEL - 13 * 16 , 16, 16);
		Pineapple(1472, GROUNDLEVEL - 5 * 16, 16, 16);
		Pineapple(1616, GROUNDLEVEL - 16 * 16, 16, 16);

		//dialogue
		Dialogue(100, 50, 300, 100, [5, "Press 'P' to pause the game", "Press 'M' to mute all sounds", "Press 'B' to mute the background music", "", "Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino");

		//fatso
		Fatso(512, GROUNDLEVEL - 15 * 16, BLOCKSIZE, 512, 608, 0.2);
		Fatso(1296, GROUNDLEVEL - 14 * 16, BLOCKSIZE, 1296, 1488, 0.5);
		Fatso(1488, GROUNDLEVEL - 14 * 16, BLOCKSIZE, 1296, 1488, 0.5);
		Fatso(1600, GROUNDLEVEL - 14 * 16, BLOCKSIZE, 1600, 1632, 0.2);

		//player
		Player(0, GROUNDLEVEL-16, BLOCKSIZE, MOVESPEED, JUMPSPEED, fallAmounts);

		//hammer weapon
		Hammer(48, GROUNDLEVEL - 1 * 16, BLOCKSIZE);
	}
		
	////////////////////////////
	//		Code to run			

		//load the titleScreen sprites before the titlescreen starts
		Crafty.load(["sprites/psunrisebanner.png", "sprites/level1.png", "sprites/level2.png"], function() {
			Crafty.scene("titleScreen");
		});
};
