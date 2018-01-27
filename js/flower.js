var Flower = function(game){
    var bmd = game.add.bitmapData(30, 30);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 30, 30);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    Phaser.Sprite.call(this, game, 200, 200, bmd);
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;

Flower.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
};
