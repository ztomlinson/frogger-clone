// Draws objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player position
Object.prototype.reset = function() {
    // Randomize starting x coordinates
    player.x = Math.floor((Math.random() * 200) + 100);
    player.y = 400;
};

/*
    Enemy Objects
*/

// Enemies 
var Enemy = function(x,y) {

    // The image for the enemy:
    this.sprite = 'images/enemy-bug.png';

    // Set x and y coordinates
    this.x = x;
    this.y = y;

    // Set speed of movement via random
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// update() function for Enemy position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Enemy position is reset when entity leaves screen
    if(this.x <= 600) {
        // Multiply by time delta parameter
        this.x += this.speed * dt
    }else{
        this.x = -2;
    }

    // Reset Player position upon contact with Enemy.
    if(player.x >= this.x - 30 && player.x <= this.x + 30) {
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
}

/*
    Player Objects 
*/

// Player class
// Requirements: update(), render(), handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // Set x and y coordinates.
    this.x = 200;
    this.y = 400;
}

// update() function updates player position
Player.prototype.update = function() {
    if(this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 50;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50;
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;
    // reset position at ground limit
    if(this.y < 25){
        this.reset();
    }
}

// input() function
Player.prototype.handleInput = function(e) {
    this.ctlKey = e;

    if (key !== 'c') {
        this.setCurrentCenterX();  //if player moved, update his center value
        //do this here instead of in update to save on unnecessary calls (since this changes less frequently)
    }
}

// Instantiate objects
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2, 150));
    allEnemies.push(new Enemy(-2, 220));
}());

// Set player object to variable
var player = new Player();

// sends input to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
