var BeeShadow = function(game, bee){
    Phaser.Sprite.call(this, game, bee.x, bee.y, 'bee-shadow');
    this.anchor.setTo(0.6, 0.5);
    this.alpha = 0.3;
    this.bee = bee;
};

BeeShadow.prototype = Object.create(Phaser.Sprite.prototype);
BeeShadow.prototype.constructor = BeeShadow;

BeeShadow.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
    // Follow the bee
    this.x = this.bee.x;
    this.y = this.bee.y + this.bee.height / 2 + 10;
    this.scale.setTo(this.bee.scale.x, this.bee.scale.y);
};

BeeShadow.prototype.destroy = function(){
    Phaser.Sprite.prototype.destroy.call(this);
    this.bee = null;
};
