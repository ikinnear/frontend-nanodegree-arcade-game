function overlay() {
	"use strict";
	var el = document.getElementById("overlay_outer");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

// Enemies our player must avoid
var Enemy = function(badguy) {
	"use strict";
	//Minimum and Maximum speed (int) of the bad guy
	this.min = 2;
	this.max = 7;
	this.modifier = 1;
	//Set the initial x position of the bug of the left of the grid
	this.x = -100;

	// starting y position and initial (random) speeds. Ensure an enemey appears on each road by providing three different starting points
	switch (badguy) {
		case "alpha":
			this.y = 60;
			this.speed = this.setSpeed(this.max);
			break;
		case "beta":
			this.y = 142.5;
			this.speed = this.setSpeed(this.max);
			break;
		case "charlie":
			this.y = 225;
			this.speed = this.setSpeed(this.max);
			break;
	}

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	"use strict";
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	//var time;
	this.x += 50 * dt * this.speed;

	//if the bug collides with the player, reset the player and reset the score
	if ((player.x > (this.x - 10)) && (player.x < (this.x + 10)) && (player.y > (this.y - 25)) && (player.y < (this.y + 25))) {
		player.update();
		//reset the score
		alert("You were squashed! Your Score: " + player.score + ". High Score: " + player.highscore);
		player.score = 0;
		//reset the enemy speed back down to 1
		var len = allEnemies.length;
		for (var i = 0; i < len; i++){
			allEnemies[i].modifier = 1;
		}

		document.getElementById("score").innerHTML = player.score;
		document.getElementById("high_score").innerHTML = player.highscore;
		document.getElementById("bug_speed").innerHTML = allEnemies[0].modifier;

		//send the player back to the start
		player.reset();
	}

	//if the bug makes it to the right of the screen, reset it over to the left and set a new speed
	if (this.x > 500) {
		this.x = -100;
		this.speed = this.setSpeed(this.max);
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	"use strict";
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Sets a random enemy speed within the preset min and max
Enemy.prototype.setSpeed = function() {
	"use strict";
	return Math.floor((Math.random() * (this.max - this.min)) + 1 + this.min) + this.modifier;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	"use strict";
	// Set the starting position of the player
	this.initialX = 202;
	this.initialY = 410;
	this.x = this.initialX;
	this.y = this.initialY;

	// Set the initial score and high score
	this.score = 0;
	this.highscore = 0;


	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/char-boy.png';

};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
	"use strict";
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.render();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
	"use strict";
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the player's movement on the game board
Player.prototype.handleInput = function(key) {
	"use strict";
	var tile_height = 83; //distance in pixels to move one square up or down
	var tile_width = 101; //distance in pixels to move one square left or right
	switch (key) {
		case "down":
			if (this.y === 410) { //bottom of the map
				break;
			}
			this.y = this.y + tile_height;
			this.update();
			break;
		case "up":
			if (this.y !== -5 && this.y > 0) {
				this.y = this.y - tile_height;
				this.update();
				//Add a time based function to avoid the player appearing simoultaneously in two places
				//return a function from an immediately-executing anonymous function that takes the current scope as a parameter
				setTimeout(function(scope){
					"use strict";
					return function(){
						"use strict";
						if (scope.y === -5) { //we won!!!!
							scope.score += 1;
							if (scope.score > scope.highscore)
								scope.highscore = scope.score;
							//increase the speed of the enemies!
							var len = allEnemies.length;
							for (var i = 0; i < len; i++){
								allEnemies[i].modifier += 1;
							}
							document.getElementById("score").innerHTML = scope.score;
							document.getElementById("high_score").innerHTML = scope.highscore;
							document.getElementById("bug_speed").innerHTML = allEnemies[0].modifier;
							alert("You made it! Your Score: " + scope.score + ". Read to try again?");
							scope.reset();
						}
					};
				}(this), 100);
			}
			break;
		case "right":
			if (this.x === 404) //right side of map
				break;
			this.x = this.x + tile_width;
			this.update();
			break;
		case "left":
			if (this.x === 0) //left side of map
				break;
			this.x = this.x - tile_width;
			this.update();
			break;
	}

};

//sets the sprite for the player, selected on the inital page launch overlay
Player.prototype.setAvatar = function(avatar) {
	"use strict";
	this.sprite = 'images/' + avatar;
	this.render();
	overlay();
};

//Sets the player back to the start, identifed by the initial player x and y positions
Player.prototype.reset = function() {
	"use strict";
	// Set the inital x and y position of the player
	this.x = this.initialX;
	this.y = this.initialY;
	this.update();
};

// Place all enemy objects in an array called allEnemies
var enemies = ['alpha', 'beta', 'charlie'];
var allEnemies = [];
for (var i = 0, len = enemies.length; i < len; i++) {
    // Your code goes here
    allEnemies.push(new Enemy(enemies[i]));
}
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	"use strict";
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});