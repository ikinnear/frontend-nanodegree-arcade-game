// Enemies our player must avoid
var Enemy = function(badguy) {
    //Minimum and Maximum speed (int) of the bad guy
    this.min = 2;
    this.max = 7;
    this.modifier = 1;
    //Set the initial x position of the bug of the left of the grid
    this.x = -100;

    // starting y position and initial (random) speeds
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //var time;
    this.x += 50 * dt * this.speed;

    //if the bug collides with the player, reset the player and reset the score
    if((player.x > (this.x-25)) && (player.x < (this.x+25)) && (player.y > (this.y-25)) && (player.y < (this.y+25))){
        //reset the score
        alert("You were squashed. Resetting score. Your Score: " + player.score + ". High Score: " + player.highscore);
        player.score = 0;
        for(var theEnemy in allEnemies)
            allEnemies[theEnemy].modifier = 1;
        //send the player back to the start
        player.reset();
    }

    //if the bug makes it to the right of the screen, reset it over to the left and set a new speed
    if(this.x > 500){
        this.x = -100;
        this.speed = this.setSpeed(this.max);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Sets a random enemy speed within the preset min and max
Enemy.prototype.setSpeed = function() {
    return Math.floor((Math.random() * (this.max-this.min)) + 1 + this.min) + this.modifier;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set the starting position of the player
    this.initialX = 202.5;
    this.initialY = 405;
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the player's movement on the game board
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "down":
            if(this.y===405) //bottom of the map
                break;
            this.y = this.y + 82.5;
            break;
        case "up":
            if(this.y<75){ //we won!!!!
                this.score += 1;
                if(this.score > this.highscore)
                    this.highscore = this.score;
                
                this.reset();
                for(var theEnemy in allEnemies)
                    allEnemies[theEnemy].modifier += 1;
                
                alert("Score: " + this.score + ". High Score: " + this.highscore + ". Speed is now " + allEnemies[0].modifier);
                break;
            }
            this.y = this.y - 82.5;
            break;
        case "right":
            if(this.x===402.5) //right side of map
                break;
            this.x = this.x + 100;
            break;
        case "left":
            if(this.x===2.5) //left side of map
                break;
            this.x = this.x - 100;
            break;
    }
    this.update();
};

Player.prototype.reset = function() {
    // Set the inital x and y position of the player
    this.x = this.initialX;
    this.y = this.initialY;
    this.update();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy('alpha'),new Enemy('beta'),new Enemy('charlie')];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
