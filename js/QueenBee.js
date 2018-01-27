/**
 * The queen bee (and her hive). Directs her bees via Morse Code.
 */
var QueenBee = function(){
    Phaser.Sprite.call(this, game, 830, 0, 'queen-bee');
};

QueenBee.prototype = Object.create(Phaser.Sprite.prototype);
QueenBee.prototype.constructor = QueenBee;

QueenBee.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
};
