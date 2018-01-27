Bee = function(game){
	Phaser.Sprite.call(this, game, 200, 200, 'bee');
    this.startX = 200;
    this.anchor.setTo(0.5, 1);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.scale.setTo(0.5, 0.5);
    this.animations.add('idle', [0,1,2,3,4,5,6,7,8], this.speed, true);
    this.animations.play('idle');
    this.state = "";
    this.moveConst = 50;

    game.physics.arcade.enable(this);
    
    //temporary movement controls
    game.input.keyboard.addKey(Phaser.KeyCode.LEFT).onDown.add(this.moveWest, this);
    game.input.keyboard.addKey(Phaser.KeyCode.RIGHT).onDown.add(this.moveEast, this);
    game.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(this.moveNorth, this);
    game.input.keyboard.addKey(Phaser.KeyCode.DOWN).onDown.add(this.moveSouth, this);
    game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(this.stopMoving, this);
};

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
Bee.prototype.moveWest = function(){
    this.state = "W";
};
Bee.prototype.moveEast = function(){
    this.state = "E";
};
Bee.prototype.moveNorth = function(){
    this.state = "N";
};
Bee.prototype.moveSouth = function(){
    this.state = "S";
};
Bee.prototype.stopMoving = function(){
    this.state = "";
};
Bee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
	switch(this.state) {
        case "W":
            this.body.velocity.x = -this.moveConst;
            this.body.velocity.y = 0;
            break;
        case "E":
            this.body.velocity.x = this.moveConst;
            this.body.velocity.y = 0;
            break;
        case "N":
            this.body.velocity.x = 0;
            this.body.velocity.y = -this.moveConst;
            break;
        case "S":
            this.body.velocity.x = 0;
            this.body.velocity.y = this.moveConst;
            break;
    }
};