CustomSprite = function(game, x, y, key, frame){
	Phaser.Sprite.call(this, game, x, y, key, frame);
}

CustomSprite.prototype = Object.create(Phaser.Sprite.prototype);
CustomSprite.prototype.constructor = CustomSprite;

CustomSprite.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
};