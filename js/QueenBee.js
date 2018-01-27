/**
 * The queen bee (and her hive). Directs her bees via Morse Code.
 */
var QueenBee = function() {
    Phaser.Sprite.call(this, game, 830, 0, 'queen-bee');

    // enable arcade physics
    game.physics.arcade.enable(this);

    // listen for morse directions
    EventBus.onMorseDirection.add(this.morseHandler, this);

    // the queen's 
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
            this.confused();
            break;
        default:
            throw new Error('unexpected direction=' + direction);
    }
};

/**
 * The queen commands NORTH!
 */
QueenBee.prototype.north = function() {

};

/**
 * The queen commands SOUTH!
 */
QueenBee.prototype.south = function() {

};

/**
 * The queen commands WEST!
 */
QueenBee.prototype.west = function() {

};

/**
 * The queen commands EAST!
 */
QueenBee.prototype.east = function() {

};

/**
 * The queen is confused. She doesn't know what the user wants.
 */
QueenBee.prototype.confused = function(dotsAndDashes) {

};

QueenBee.prototype.destroy = function() {
    // stop listening for morse directions
    EventBus.onMorseDirection.remove(this.morseHandler, this);
};
