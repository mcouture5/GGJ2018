Bee = function(game){
	Phaser.Sprite.call(this, game, 200, 200, 'bee');
    this.startX = 200;
    this.anchor.setTo(0.5, 1);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.scale.setTo(0.5, 0.5);
    this.animations.add('idle', [0,1,2,3,4,5,6,7,8], this.speed, true);
    this.animations.play('idle');
};

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
Bee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
    this.animations.play('idle');
};