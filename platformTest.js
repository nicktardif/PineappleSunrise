window.onload = function() {
		var width = 700;
		var height = 256;
        Crafty.init(width, height);
		var fallAmounts = [0, 0, 0];
        Crafty.scene("game", function () {
            var MOVESPEED = 3;
            var JUMPSPEED = 6;
            var BLOCKSIZE = 16;
			var LARGEBLOCKSIZE = 2 * BLOCKSIZE;
			var GROUNDLEVEL = height-8;
 
			//Crafty.background('pink');

			// Draw background
				Crafty.e("2D, DOM, Image")
			.attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
			.image("sprites/cloudswithskyandhorizon.png", "repeat");
			
			//set the images for the sprites
			Crafty.sprite(BLOCKSIZE, "sprites/sprites.png", {
				player: [4,10],
				normalPlatform: [0,16], thinPlatform: [0,17], movingPlatform: [0,15], disappearing: [0,14],
				water: [0,11],
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
				springSprite: [2,12]
			});
			Crafty.sprite(LARGEBLOCKSIZE, "sprites/largesprites.png", {
				fatsoSprite: [0,0]
			});
			//Entity Creation
			var levelArray =[
				[1, 0, 208, 8], 
				[1, 304, 144, 8],
				[1, 544, 144, 8],
				[5, -8, 0, 8, height, 1, "black"],
				[2, 112, GROUNDLEVEL - 2 * 16, 48, 8],
				[2, 160, GROUNDLEVEL - 5 * 16, 48, 8],
				[3, 304, GROUNDLEVEL - 3 * 16, 48, 4],
				[4, 352, GROUNDLEVEL - 3 * 16, 48, 4, 352, 352 + 16 * 4, GROUNDLEVEL - 3 * 16, GROUNDLEVEL - (3 * 16) - 64, 0.3, 0.3],
				[4, 208, GROUNDLEVEL - 6 * 16, 48, 4, 208, 208 + 16 * 5, GROUNDLEVEL - 6 * 16, GROUNDLEVEL - (6 * 16) - 1, 0.3, 0.00000001],
				[6, 544, GROUNDLEVEL - 4 * 16, 16, 8],
				[7, 288, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[7, 288 + 16, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[7, 288 + 32, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[7, 288 + 48, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[7, 288 + 64, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[7, 288 + 80, GROUNDLEVEL - 9 * 16, 16, 8, 300],				
				[9, 208, 96, 0],
				[9, 448, 96, 1],
				[21, 640, GROUNDLEVEL - 2 * 16, 544, 656, 0.5],

				[20, 0, 240]
								];
					
			for(var i = 0; i < levelArray.length; i++) {
				switch (levelArray[i][0]) {
					case 1: //ground
						Crafty.e("groundType")
						.setGround(levelArray[i][1], GROUNDLEVEL, levelArray[i][2], levelArray[i][3]);
						break;
					case 2: //platform
						Crafty.e("platformType")
						.setPlatform(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4]);
						break;
					case 3: //thinPlatform
						Crafty.e("thinPlatformType")
						.setPlatform(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4]);
						break;
					case 4: //movingPlatform
						Crafty.e("movingPlatformType")
						.setMovingPlatform(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4], levelArray[i][5], levelArray[i][6], levelArray[i][7], levelArray[i][8], levelArray[i][9], levelArray[i][10]);
						break;
					case 5: //wall
						Crafty.e("wallType")
						.setWall(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4], levelArray[i][5], levelArray[i][6]);
						break;
					case 6: //spring
						Crafty.e("springType")
						.setSpring(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4]);
						break;
					case 7: //disappearing
						Crafty.e("disappearingType")
						.setDisappearing(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4], levelArray[i][5]);
						break;
					case 8: //water
						Crafty.e("waterType")
						.setWater(levelArray[i][1], levelArray[i][2], levelArray[i][3], levelArray[i][4]);
						break;
					case 9: //pit
						Crafty.e("pitType")
						.setPit(levelArray[i][1], GROUNDLEVEL, levelArray[i][2], levelArray[i][3], fallAmounts[levelArray[i][3]]);
						break;
					case 20: //player
						Crafty.e("playerType")
						.setPlayer(levelArray[i][1], levelArray[i][2], BLOCKSIZE, MOVESPEED, JUMPSPEED, fallAmounts);
						break;
					case 21: //fatso
						Crafty.e("fatsoType")
						.setFatso(levelArray[i][1], levelArray[i][2], BLOCKSIZE, levelArray[i][3], levelArray[i][4], levelArray[i][5]);
						break;
					default:
						break;
				}
			}

			// Place water all across the bottom of the screen
			for (xWaterLocation = 0; xWaterLocation < width*2; xWaterLocation+= 64) {
				Crafty.e("waterType")
					.setWater(xWaterLocation, GROUNDLEVEL+16, 64, 16)
			}
			
        });
 
        Crafty.scene("loading", function() {
			Crafty.load(["sprites/sprites.png", "sprites/largesprites.png", "sprites/cloudswithskyandhorizon.png"], function() {
					Crafty.scene("game");
			});
			//Crafty.background("black");
			Crafty.e("2D, DOM, Text") .text("Loading") .css({
					"text-align": "center",
					"color": "white"
			});
        });
        Crafty.scene("loading");
};
