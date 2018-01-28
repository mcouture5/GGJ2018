var Flower = function(game, x, y, gatherTime){
    Phaser.Sprite.call(this, game, x, y, 'stage-1-flower');

    this.animations.add('flower', [0], 1, false);
    this.animations.add('wilted', [1], 1, false);
    this.animations.play('flower');

    game.physics.arcade.enable(this);
    this.body.setCircle(40, 30, 20);

    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.gatherTime = gatherTime;

    this.claimed = false;
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;

Flower.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
};

Flower.prototype.claim = function(){
    this.claimed = true;
};

Flower.prototype.isClaimed = function(){
    return this.claimed;
};

Flower.prototype.wilt = function () {
    this.animations.play('wilted');
};
