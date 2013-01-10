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
		var MOVESPEED = 2.5;
		var JUMPSPEED = 6;
		var BLOCKSIZE = 16;
		var LARGEBLOCKSIZE = 2 * BLOCKSIZE;
		var GROUNDLEVEL = height-16;

		//Crafty.background('pink');

		// Draw background
			Crafty.e("2D, DOM, Image")
				.attr({w: 2100, h: Crafty.viewport.height})
				//.attr({w: Crafty.viewport.width*2, h: Crafty.viewport.height})
				.image("sprites/cloudswithskyandhorizon.png", "repeat");
		
		//set the images for the sprites
		Crafty.sprite(BLOCKSIZE, "sprites/sprites.png", {
			player: [0,18],
			normalPlatform: [0,16], thinPlatform: [0,17], movingPlatform: [0,15], disappearing: [0,14], ground: [0,13],
			water: [0,11], endSprite: [9,10],
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

		////////////////////////////
		//		Level	
		//		defintions	

		var levelArray =[
			[ 	// --- level 0
			], 


			[   // - - - - - - - - - - - - - - - - - - - - - - - - -
				//                     Level 1
				// - - - - - - - - - - - - - - - - - - - - - - - - -

				//leftwall
				[5, -8, 0, 8, height, 1, "black"],

				//ground
				[1, 0, GROUNDLEVEL, 128, 8], 
				[1, 400, GROUNDLEVEL, 160, 8],
				[1, 560, GROUNDLEVEL, 128, 8],
				[1, 848, GROUNDLEVEL, 160, 8],

				[1, 1696, 120, 8],

				//platforms
				[2, 720, GROUNDLEVEL - 4 * 16, 96, 8],
				[2, 704, GROUNDLEVEL - 7.5 * 16, 16, 8],
				[2, 816, GROUNDLEVEL - 7.5 * 16, 16, 8],

				[2, 1040, GROUNDLEVEL - 2 * 16, 16, 8],
				[2, 1104, GROUNDLEVEL - 2 * 16, 16, 8],
				[2, 1072, GROUNDLEVEL - 5 * 16, 16, 8],
				[2, 1136, GROUNDLEVEL - 5 * 16, 16, 8],

				[2, 1264, GROUNDLEVEL - 5 * 16, 64, 8],


				//thin platforms
				[3, 1040, GROUNDLEVEL - 5 * 16, 32, 8],
				[3, 1088, GROUNDLEVEL - 5 * 16, 48, 8],
				[3, 1056, GROUNDLEVEL - 2 * 16, 48, 8],
				[3, 1120, GROUNDLEVEL - 2 * 16, 32, 8],


				//stairs
				[2, 80, GROUNDLEVEL - 1 * 16, 48, 16],
				[2, 96, GROUNDLEVEL - 2 * 16, 32, 16],
				[2, 112, GROUNDLEVEL - 3 * 16, 16, 16],

				[2, 640, GROUNDLEVEL - 1 * 16, 48, 16],
				[2, 656, GROUNDLEVEL - 2 * 16, 32, 16],
				[2, 672, GROUNDLEVEL - 3 * 16, 16, 16],

				[2, 848, GROUNDLEVEL - 3 * 16, 16, 16],
				[2, 848, GROUNDLEVEL - 2 * 16, 32, 16],
				[2, 848, GROUNDLEVEL - 1 * 16, 48, 16],

				//moving platforms
				[4, 160, GROUNDLEVEL - 3 * 16, 48, 4, 160, 160, GROUNDLEVEL - 3 * 16, GROUNDLEVEL - (3 * 16) - 64, 0, 0.3],
				[4, 320, GROUNDLEVEL - 3 * 16, 48, 4, 320, 320, GROUNDLEVEL - 3 * 16, GROUNDLEVEL - (3 * 16) - 64, 0, 0.3],
				
				[4, 1488, GROUNDLEVEL - 2 * 16, 48, 4, 1488, 1648, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001],

				//spring
				[6, 256, GROUNDLEVEL - 4 * 16, 16, 8],
				[2, 256, GROUNDLEVEL - 4 * 16 + 8, 16, 8],

				//pits
				[9, -128, 128, 0],
				[9, 128, 272, 0],
				[9, 688, 144, 1],
				[9, 1008, 700, 2],

				//disappearing
				[7, 720, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],
				[7, 736, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],
				[7, 752, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],
				[7, 768, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],
				[7, 784, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],
				[7, 800, GROUNDLEVEL - 7.5 * 16, 16, 8, 300],

				[7, 1392, GROUNDLEVEL - 5 * 16, 16, 16, 200],
				[7, 1408, GROUNDLEVEL - 5 * 16, 16, 16, 200],
				[7, 1424, GROUNDLEVEL - 5 * 16, 16, 16, 200],
				[7, 1440, GROUNDLEVEL - 5 * 16, 16, 16, 200],
				[7, 1456, GROUNDLEVEL - 5 * 16, 16, 16, 200],
				[7, 1392, GROUNDLEVEL - 4 * 16, 16, 16, 200],
				[7, 1408, GROUNDLEVEL - 4 * 16, 16, 16, 200],
				[7, 1424, GROUNDLEVEL - 4 * 16, 16, 16, 200],
				[7, 1440, GROUNDLEVEL - 4 * 16, 16, 16, 200],
				[7, 1456, GROUNDLEVEL - 4 * 16, 16, 16, 200],
				[7, 1392, GROUNDLEVEL - 3 * 16, 16, 16, 200],
				[7, 1408, GROUNDLEVEL - 3 * 16, 16, 16, 200],
				[7, 1424, GROUNDLEVEL - 3 * 16, 16, 16, 200],
				[7, 1440, GROUNDLEVEL - 3 * 16, 16, 16, 200],
				[7, 1456, GROUNDLEVEL - 3 * 16, 16, 16, 200],
				[7, 1392, GROUNDLEVEL - 2 * 16, 16, 16, 200],
				[7, 1408, GROUNDLEVEL - 2 * 16, 16, 16, 200],
				[7, 1424, GROUNDLEVEL - 2 * 16, 16, 16, 200],
				[7, 1440, GROUNDLEVEL - 2 * 16, 16, 16, 200],
				[7, 1456, GROUNDLEVEL - 2 * 16, 16, 16, 200],
				[7, 1392, GROUNDLEVEL - 1 * 16, 16, 16, 200],
				[7, 1408, GROUNDLEVEL - 1 * 16, 16, 16, 200],
				[7, 1424, GROUNDLEVEL - 1 * 16, 16, 16, 200],
				[7, 1440, GROUNDLEVEL - 1 * 16, 16, 16, 200],
				[7, 1456, GROUNDLEVEL - 1 * 16, 16, 16, 200],
				
				//water
				[8, 0, GROUNDLEVEL + 8, 64, 16],
				[8, 64, GROUNDLEVEL + 8, 64, 16],
				[8, 128, GROUNDLEVEL + 8, 64, 16],
				[8, 192, GROUNDLEVEL + 8, 64, 16],
				[8, 256, GROUNDLEVEL + 8, 64, 16],
				[8, 320, GROUNDLEVEL + 8, 64, 16],
				[8, 384, GROUNDLEVEL + 8, 64, 16],
				[8, 448, GROUNDLEVEL + 8, 64, 16],
				[8, 512, GROUNDLEVEL + 8, 64, 16],
				[8, 576, GROUNDLEVEL + 8, 64, 16],
				[8, 640, GROUNDLEVEL + 8, 64, 16],
				[8, 704, GROUNDLEVEL + 8, 64, 16],
				[8, 768, GROUNDLEVEL + 8, 64, 16],
				[8, 832, GROUNDLEVEL + 8, 64, 16],
				[8, 896, GROUNDLEVEL + 8, 64, 16],
				[8, 960, GROUNDLEVEL + 8, 64, 16],
				[8, 1024, GROUNDLEVEL + 8, 64, 16],
				[8, 1088, GROUNDLEVEL + 8, 64, 16],
				[8, 1152, GROUNDLEVEL + 8, 64, 16],
				[8, 1216, GROUNDLEVEL + 8, 64, 16],
				[8, 1280, GROUNDLEVEL + 8, 64, 16],
				[8, 1344, GROUNDLEVEL + 8, 64, 16],
				[8, 1408, GROUNDLEVEL + 8, 64, 16],
				[8, 1472, GROUNDLEVEL + 8, 64, 16],
				[8, 1536, GROUNDLEVEL + 8, 64, 16],
				[8, 1600, GROUNDLEVEL + 8, 64, 16],
				[8, 1664, GROUNDLEVEL + 8, 64, 16],
				[8, 1728, GROUNDLEVEL + 8, 64, 16],
				[8, 1792, GROUNDLEVEL + 8, 64, 16],
				[8, 1856, GROUNDLEVEL + 8, 64, 16],
				[8, 1920, GROUNDLEVEL + 8, 64, 16],
				[8, 1984, GROUNDLEVEL + 8, 64, 16],
				[8, 2048, GROUNDLEVEL + 8, 64, 16],
				[8, 2112, GROUNDLEVEL + 8, 64, 16],
				[8, 2176, GROUNDLEVEL + 8, 64, 16],
								
				// end
				[10, 1744, GROUNDLEVEL - 2 * 16, 32, 32],

				//text
				[11, 50, 10, 100, 50, "Level 1", "#ffffff", "12pt Palatino"],

				//dialogue
				[12, 100, 50, 300, 100, [5, "Press 'P' to pause the game", "Press 'M' to mute all sounds", "Press 'B' to mute the background music", "", "Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino"],

				//fatso
				[21, 608, GROUNDLEVEL - 2 * 16, 440, 608, 0.5],
				[21, 720, GROUNDLEVEL - 6 * 16, 720, 784, 0.2],
				[21, 1040, GROUNDLEVEL - 7 * 16, 1040, 1120, 0.3],

				//player
				[20, 0, GROUNDLEVEL-16],

				//hammer weapon
				[40, 48, GROUNDLEVEL - 1 * 16, BLOCKSIZE]
			], 

			[   // - - - - - - - - - - - - - - - - - - - - - - - - -
				//                     Level 2 
				// - - - - - - - - - - - - - - - - - - - - - - - - -

				//ground
				[1, 0, GROUNDLEVEL, 160, 8],
				[1, 0, GROUNDLEVEL + 8, 160, 8],
				[1, 1136, GROUNDLEVEL, 128, 8],
				[1, 1136, GROUNDLEVEL + 8, 128, 8],

				//platforms
				[2, 192, GROUNDLEVEL - 3 * 16, 64, 8],
				[2, 304, GROUNDLEVEL - 4 * 16, 64, 8],
				[2, 368, GROUNDLEVEL - 4 * 16, 128, 8],	
				[2, 544, GROUNDLEVEL - 2 * 16, 48, 16],
				[2, 528, GROUNDLEVEL - 8 * 16 + 8, 16, 8],
				[2, 432, GROUNDLEVEL - 10 * 16 , 32, 8],
				[2, 512, GROUNDLEVEL - 13 * 16 , 128, 8],
				[2, 816, GROUNDLEVEL - 11 * 16 , 32, 8],
				[2, 1200, GROUNDLEVEL - 1 * 16, 64, 16],
				[2, 1216, GROUNDLEVEL - 2 * 16, 48, 16],
				[2, 1232, GROUNDLEVEL - 3 * 16, 32, 16],
				[2, 1472, GROUNDLEVEL - 4 * 16, 32, 8],
				[2, 1264, GROUNDLEVEL - 10 * 16, 16, 16],
				[2, 1280, GROUNDLEVEL - 11 * 16, 16, 16],
				[2, 1296, GROUNDLEVEL - 12 * 16, 160, 16],
				[2, 1344, GROUNDLEVEL - 15 * 16, 32, 8],
				[2, 1456, GROUNDLEVEL - 12 * 16, 64, 16],
				[2, 1600, GROUNDLEVEL - 12 * 16, 64, 8],
				[2, 1616, GROUNDLEVEL - 15 * 16, 32, 8],
				[2, 1696, GROUNDLEVEL - 12 * 16, 32, 8],


				//moving platforms
					//horizontal
					[4, 640, GROUNDLEVEL - 5 * 16, 48, 4, 640, 800, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001],
					[4, 1296, GROUNDLEVEL - 2 * 16, 32, 4, 1296, 1424, GROUNDLEVEL - 2 * 16, GROUNDLEVEL - (2 * 16) - 64, 0.5, 0.000000001],

					//diagonal
					[4, 928, GROUNDLEVEL - 5 * 16, 48, 4, 928, 1087, GROUNDLEVEL - 1 * 16, GROUNDLEVEL - 5 * 16, 0.5, 0.2028],


					//vertical
					[4, 864, GROUNDLEVEL - 5 * 16, 48, 4, 864, 864, GROUNDLEVEL - 1 * 16, GROUNDLEVEL - 5 * 16, 0, 0.3],
					[4, 864, GROUNDLEVEL - 6 * 16, 48, 4, 864, 864, GROUNDLEVEL - 6 * 16, GROUNDLEVEL - 11 * 16, 0, 0.3],

				//wall
				[5, 528, GROUNDLEVEL- 7 * 16, 8, 96, 0, "black"],
				[5, 536, GROUNDLEVEL- 7 * 16, 8, 96, 1, "black"],


				//spring
				[6, 544, GROUNDLEVEL - 3 * 16 + 8, 16, 8],
				[6, 1232, GROUNDLEVEL - 4 * 16 + 8, 16, 8],

				//pit
				[9, 160, 1000, 0], 
				[9, 1264, 2000, 1], 

				//disappearing
				[7, 1296, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1312, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1328, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1344, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1360, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1376, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1392, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1408, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1424, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1440, GROUNDLEVEL -  4 * 16, 16, 8, 300],
				[7, 1456, GROUNDLEVEL -  4 * 16, 16, 8, 300],

				//end
				[10, 1696, GROUNDLEVEL - 14 * 16, 32, 32],

				//pineapple
				[41, 576, GROUNDLEVEL - 3 * 16, 16, 16],
				[41, 816, GROUNDLEVEL - 12 * 16 , 16, 16],
				[41, 1392, GROUNDLEVEL - 13 * 16 , 16, 16],
				[41, 1472, GROUNDLEVEL - 5 * 16, 16, 16],
				[41, 1616, GROUNDLEVEL - 16 * 16, 16, 16],

				//dialogue
				[12, 100, 50, 300, 100, [5, "Press 'P' to pause the game", "Press 'M' to mute all sounds", "Press 'B' to mute the background music", "", "Press 'SPACEBAR' to start the game"], "#e2671f", "10pt Palatino"],

				//fatso
				[21, 1296, GROUNDLEVEL - 14 * 16, 1296, 1488, 0.5],
				[21, 1488, GROUNDLEVEL - 14 * 16, 1296, 1488, 0.5],
				[21, 512, GROUNDLEVEL - 15 * 16, 512, 608, 0.2],
				[21, 1600, GROUNDLEVEL - 14 * 16, 1600, 1632, 0.2],

				//player
				[20, 0, GROUNDLEVEL- 1 * 16],

				//hammer weapon
				[40, 1352, GROUNDLEVEL - 16 * 16, BLOCKSIZE]

			]



		];

		//Entity Creation
		var currentLevel = levelArray[levelNumber];	
		for(var i = 0; i < currentLevel.length; i++) {
			switch (currentLevel[i][0]) {
				case 1: //ground
					Crafty.e("groundType")
					.setGround(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 2: //platform
					Crafty.e("platformType")
					.setPlatform(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 3: //thinPlatform
					Crafty.e("thinPlatformType")
					.setPlatform(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 4: //movingPlatform
					Crafty.e("movingPlatformType")
					.setMovingPlatform(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4], currentLevel[i][5], currentLevel[i][6], currentLevel[i][7], currentLevel[i][8], currentLevel[i][9], currentLevel[i][10]);
					break;
				case 5: //wall
					Crafty.e("wallType")
					.setWall(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4], currentLevel[i][5], currentLevel[i][6]);
					break;
				case 6: //spring
					Crafty.e("springType")
					.setSpring(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 7: //disappearing
					Crafty.e("disappearingType")
					.setDisappearing(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4], currentLevel[i][5]);
					break;
				case 8: //water
					Crafty.e("waterType")
					.setWater(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 9: //pit
					Crafty.e("pitType")
					.setPit(currentLevel[i][1], GROUNDLEVEL, currentLevel[i][2], currentLevel[i][3], fallAmounts[currentLevel[i][3]]);
					break;
				case 10: //end
					Crafty.e("endType")
					.setEnd(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				case 11: //text
					Crafty.e("textType")
					.setText(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4], currentLevel[i][5], currentLevel[i][6], currentLevel[i][7]);
					break;
				case 12: //dialogue box
					Crafty.e("dialogueType")
					.setDialogue(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4], currentLevel[i][5], currentLevel[i][6], currentLevel[i][7]);
					break;
				case 20: //player
					Crafty.e("playerType")
					.setPlayer(currentLevel[i][1], currentLevel[i][2], BLOCKSIZE, MOVESPEED, JUMPSPEED, fallAmounts);
					break;
				case 21: //fatso
					Crafty.e("fatsoType")
					.setFatso(currentLevel[i][1], currentLevel[i][2], BLOCKSIZE, currentLevel[i][3], currentLevel[i][4], currentLevel[i][5]);
					break;
				case 40: //hammer weapon
					Crafty.e("hammerWeaponType")
					.setHammer(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3]);
					break;
				case 41: //pineapple
					Crafty.e("pineappleType")
					.setPineapple(currentLevel[i][1], currentLevel[i][2], currentLevel[i][3], currentLevel[i][4]);
					break;
				default:
					break;
			}
		}

		Crafty.pause();	// pauses the game while the info box is open
			
	});


	////////////////////////////
	//		Other scene	
	//		defintions	
	//		(loading, title)	
 
	Crafty.scene("loading", function() {
		Crafty.load(["sprites/sprites.png", "sprites/largesprites.png", "sprites/cloudswithskyandhorizon.png"], function() {
				Crafty.scene("game");
		});
		//Crafty.background("black");
		Crafty.e("2D, DOM, Text") .text("Loading") .css({
				"text-align": "center",
				"color": "white"
		});
		Crafty.audio.add({ 
			backgroundMusic: ["audio/bgmusic.ogg"],
			jumpSound: ["audio/jump.ogg"],
			platformBreak: ["audio/break.ogg"],
			winner: ["audio/winner.ogg"] 
		});
		//Crafty.audio.play("backgroundMusic", -1, .75); turned off during development 
	});
	
	Crafty.scene("titleScreen", function() {
		Crafty.background("#ffcd75");
		Crafty.e("2D, DOM, Image") .attr({x: 0, y: 0, w: 700, h: 130}) .image("sprites/psunrisebanner.png");
		//Crafty.e("2D, DOM, Text") .attr({x: 610, y: 5, w: 100, h: 20}) .text("Options") .css({"font": "10pt Arial"});
		Crafty.e("2D, DOM, Text") .attr({x: 30, y: 132, w: 60, h: 60}) .text("Level 1") .css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 200, y: 132, w: 60, h: 60}) .text("Level 2").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 132, w: 60, h: 60}) .text("Level 3").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 540, y: 132, w: 60, h: 60}) .text("Level 4").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 30, y: 202, w: 60, h: 60}) .text("Level 5").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 200, y: 202, w: 60, h: 60}) .text("Level 6").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 370, y: 202, w: 60, h: 60}) .text("Level 7").css({ "color": "#000000"});
		Crafty.e("2D, DOM, Text") .attr({x: 540, y: 202, w: 60, h: 60}) .text("Level 8").css({ "color": "#000000"});

		
		this.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys['1']) {
				levelNumber = 2;
				Crafty.scene("loading");
			}
			if (e.key == Crafty.keys['2']) {
				Crafty.scene("loading");
				levelNumber = 2;
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

		
	////////////////////////////
	//		Code to run			

	Crafty.scene("titleScreen");
		
};
