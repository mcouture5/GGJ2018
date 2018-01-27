var GlowSprite = function(sprite, owner) {
    Phaser.Sprite.call(this, game, 0, 0, sprite);
    this.owner = owner;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(1.2, 1.2);
    this.animations.add('bee-happy', [12,13,14,15], this.speed, true);
    this.animations.add('bee-pollen', [0,1,2,3], this.speed, true);
    this.animations.add('bee-rage', [16,17,18,19], this.speed, true);
    this.animations.add('bee-collecting', [24,25], this.speed, true);
    this.animations.add('bee-frustrated', [4,5,6,7], this.speed, true);
    this.animations.add('bee-frustrated-pollen', [8,9,10,11], this.speed, true);
    this.animations.add('bee-rage-pollen', [20,21,22,23], this.speed, true);
    this.animations.play('bee-happy');
};

GlowSprite.prototype = Object.create(Phaser.Sprite.prototype);
GlowSprite.prototype.constructor = GlowSprite;

GlowSprite.prototype.update = function() {
    Phaser.Sprite.prototype.update.call(this);
    this.x = this.owner.x;
    this.y = this.owner.y;
};
