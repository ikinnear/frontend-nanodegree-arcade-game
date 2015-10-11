// Enemies our player must avoid
var Enemy = function(badguy) {
    // Variables applied to each of our instances go here
    //Maximum speed (int) of the bad guy
    this.max = 8;
    this.min = 3;
    this.x = -100;

    // starting locations and initial speeds
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

    if((player.x > (this.x-25)) && (player.x < (this.x+25)) && (player.y > (this.y-25)) && (player.y < (this.y+25))){
        player.x = 202.5;
        player.y = 405;
        player.update();
    }

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

// Sets a random enemy speed
Enemy.prototype.setSpeed = function() {
    return Math.floor((Math.random() * (this.max-this.min)) + 1 + this.min);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 202.5;
    this.y = 405;
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
            this.update();
            break;
        case "up":
            if(this.y===-7.5) //we won!!!!
                break;
            this.y = this.y - 82.5;
            this.update();
            break;
        case "right":
            if(this.x===402.5) //right side of map
                break;
            this.x = this.x + 100;
            this.update();
            break;
        case "left":
            if(this.x===2.5) //left side of map
                break;
            this.x = this.x - 100;
            this.update();
            break;
    }
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
