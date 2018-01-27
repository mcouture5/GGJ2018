var Flower = function(game){
    var bmd = game.add.bitmapData(30, 30);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 30, 30);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    Phaser.Sprite.call(this, game, 200, 200, bmd);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);

    this.claimed = false;
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;

Flower.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
};

Flower.prototype.claim = function(){
    this.claimed = true;
    this.tint = 0x000000;
};

Flower.prototype.isClaimed = function(){
    return this.claimed;
};
