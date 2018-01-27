/**
 * The queen bee (and her hive). Directs her bees via Morse Code.
 */
var QueenBee = function() {
    Phaser.Sprite.call(this, game, 830, 0, 'queen-bee');

    this.animations.add('queen-idle', [0], 1, false);
    this.animations.add('queen-speech', [1], 1, false);
    this.animations.add('queen-speech-whoops', [2], 1, false);
    this.animations.play('queen-idle');

    // enable arcade physics
    game.physics.arcade.enable(this);
    this.body.setCircle(175, 25, -100);

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
    this.commandTimer = setTimeout(function() {
        me.commandTextObj.destroy();
        me.animations.play('queen-idle');
    }, this.commandDuration);
};

/**
 * The queen commands NORTH!
 */
QueenBee.prototype.north = function() {
    this.command('N -.');
    this.animations.play('queen-speech');
};

/**
 * The queen commands SOUTH!
 */
QueenBee.prototype.south = function() {
    this.command('S ...');
    this.animations.play('queen-speech');
};

/**
 * The queen commands WEST!
 */
QueenBee.prototype.west = function() {
    this.command('W .--');
    this.animations.play('queen-speech');
};

/**
 * The queen commands EAST!
 */
QueenBee.prototype.east = function() {
    this.command('E .');
    this.animations.play('queen-speech');
};

/**
 * The queen is confused. She doesn't know what the user wants.
 */
QueenBee.prototype.confused = function(dotsAndDashes) {
    this.command('? ' + dotsAndDashes);
    this.animations.play('queen-speech-whoops');
};

QueenBee.prototype.destroy = function() {
    // destroy any lingering command text objects and command timers
    if (this.commandTextObj) {
        this.commandTextObj.destroy();
    }
    clearTimeout(this.commandTimer);
};
