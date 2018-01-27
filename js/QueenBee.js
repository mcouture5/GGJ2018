/**
 * The queen bee (and her hive). Directs her bees via Morse Code.
 */
var QueenBee = function() {
    Phaser.Sprite.call(this, game, 830, 0, 'queen-bee');

    // enable arcade physics
    game.physics.arcade.enable(this);

    // listen for morse directions
    EventBus.onMorseDirection.add(this.morseHandler, this);

    // how long to keep commands displayed
    this.commandDuration = 2000;

    // the command timer
    this.commandTimer = null;

    // the current command text object
    this.commandTextObj = null;
};

QueenBee.prototype = Object.create(Phaser.Sprite.prototype);
QueenBee.prototype.constructor = QueenBee;

QueenBee.prototype.update = function() {
    Phaser.Sprite.prototype.update.call(this);
};

QueenBee.prototype.morseHandler = function(result) {
    var direction = result.direction;
    var dotsAndDashes = result.dotsAndDashes;
    switch (direction) {
        case 'N':
            this.north();
            break;
        case 'S':
            this.south();
            break;
        case 'W':
            this.west();
            break;
        case 'E':
            this.east();
            break;
        case 'INVALID':
            this.confused(dotsAndDashes);
            break;
        default:
            throw new Error('unexpected direction=' + direction);
    }
};

/**
 * The queen makes a pronouncement!
 */
QueenBee.prototype.command = function(command) {
    // if there's an existing command text object, destroy it and clear the command timer
    if (this.commandTextObj) {
        this.commandTextObj.destroy();
        this.commandTextObj = null;
        clearTimeout(this.commandTimer);
    }

    // create the new command text object
    var style = {
        font: "32px Arial",
        fill: "#000000",
        backgroundColor: "#ffffff"
    };
    this.commandTextObj = game.add.text(this.x + 20, this.y + 5, command, style);

    // set up the command timer which will destroy the command text object after the command duration as elapsed
    var me = this;
    this.commandTimer = setTimeout(function() { me.commandTextObj.destroy() }, this.commandDuration);
};

/**
 * The queen commands NORTH!
 */
QueenBee.prototype.north = function() {
    this.command('N -.');
};

/**
 * The queen commands SOUTH!
 */
QueenBee.prototype.south = function() {
    this.command('S ...');
};

/**
 * The queen commands WEST!
 */
QueenBee.prototype.west = function() {
    this.command('W .--');
};

/**
 * The queen commands EAST!
 */
QueenBee.prototype.east = function() {
    this.command('E .');
};

/**
 * The queen is confused. She doesn't know what the user wants.
 */
QueenBee.prototype.confused = function(dotsAndDashes) {
    this.command('? ' + dotsAndDashes);
};

QueenBee.prototype.destroy = function() {
    // stop listening for morse directions
    EventBus.onMorseDirection.remove(this.morseHandler, this);

    // destroy any lingering command text objects and command timers
    if (this.commandTextObj) {
        this.commandTextObj.destroy();
    }
    clearTimeout(this.commandTimer);
};
