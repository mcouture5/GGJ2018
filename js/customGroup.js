CustomGroup = function(game){
	Phaser.Group.call(this, game);
	// Create a new Phaser.Sprite using...
	//this.create(x, y, 'key', frame);

	// Or a new custom sprite using...
	//this.add(new CustomSprite(game, x, y, 'key', frame));
}

CustomGroup.prototype = Object.create(Phaser.Group.prototype);
CustomGroup.prototype.constructor = CustomGroup;

CustomGroup.prototype.update = function(){
	Phaser.Group.prototype.update.call(this);
};