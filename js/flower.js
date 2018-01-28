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

    this.petalEmitter = game.add.emitter(this.x, this.y, 100);
    this.petalEmitter.makeParticles('stage-1-petal');
    this.petalEmitter.height = this.height - 40;
    this.petalEmitter.width = this.width - 40;
    this.petalEmitter.gravity = 10;
    this.petalEmitter.minRotation = 0;
    this.petalEmitter.maxRotation = 360;
    this.petalEmitter.minParticleScale = 0.3;
    this.petalEmitter.maxParticleScale = 0.5;
    this.petalEmitter.minParticleSpeed.setTo(-30, 30);
    this.petalEmitter.maxParticleSpeed.setTo(30, 30);

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
	this.petalEmitter.start(true, 2000, null, 100);
    this.petalEmitter.forEach(function(particle) {
        game.add.tween(particle).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    });
    this.animations.play('wilted');
};
