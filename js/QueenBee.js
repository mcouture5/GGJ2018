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
    this.body.setCircle(500, -10, -560);

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
    if (!this.bubble) {
        this.bubble = this.addChild(game.make.sprite(60, 20, 'queen-bubble'));
        this.bubble.visible = false;
        this.bubble.anchor.set(1, 0);
    }

    // if there's an existing command text object, destroy it and clear the command timer
    if (this.commandTextObj) {
        this.commandTextObj.destroy();
        this.commandTextObj = null;
        this.commandTimer.destroy();
    }

    // create the new command text object
    this.bubble.visible = true;
    this.commandTextObj = this.addChild(game.make.text(10, 45, command, globalStyle));
    this.commandTextObj.anchor.set(1, 0);

    // set up the command timer which will destroy the command text object after the command duration as elapsed
    this.commandTimer = game.time.create();
    this.commandTimer.add(this.commandDuration, function() {
        this.commandTextObj.destroy();
        this.bubble.visible = false;
        this.animations.play('queen-idle');
    }, this);
    this.commandTimer.start();
};

/**
 * The queen commands NORTH!
 */
QueenBee.prototype.north = function() {
    this.command('N ' + MorseInput.NORTH);
    this.animations.play('queen-speech');
    AudioManager.playSound('confirm');
};

/**
 * The queen commands SOUTH!
 */
QueenBee.prototype.south = function() {
    this.command('S ' + MorseInput.SOUTH);
    this.animations.play('queen-speech');
    AudioManager.playSound('confirm');
};

/**
 * The queen commands WEST!
 */
QueenBee.prototype.west = function() {
    this.command('W ' + MorseInput.WEST);
    this.animations.play('queen-speech');
    AudioManager.playSound('confirm');
};

/**
 * The queen commands EAST!
 */
QueenBee.prototype.east = function() {
    this.command('E ' + MorseInput.EAST);
    this.animations.play('queen-speech');
    AudioManager.playSound('confirm');
};

/**
 * The queen is confused. She doesn't know what the user wants.
 */
QueenBee.prototype.confused = function(dotsAndDashes) {
    this.command('? ' + dotsAndDashes);
    this.animations.play('queen-speech-whoops');
    AudioManager.playSound('invalid');
};

QueenBee.prototype.destroy = function() {
    // destroy any lingering command text objects and command timers
    if (this.commandTextObj) {
        this.commandTextObj.destroy();
    }
    clearTimeout(this.commandTimer);
};
