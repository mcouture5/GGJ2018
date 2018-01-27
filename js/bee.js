Bee = function(game){
	Phaser.Sprite.call(this, game, 900, 100, 'bee');
    this.startX = 200;
    this.anchor.setTo(0.5, 1);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.scale.setTo(0.5, 0.5);
    this.animations.add('idle', [0,1,2,3,4,5,6,7,8], this.speed, true);
    this.animations.play('idle');
    
    this.state = "START";
    this.moveConst = 50;
    this.stubbornness = 0;
    game.physics.arcade.enable(this);
    
    this.startDir = this.game.rnd.realInRange(0.5 * Math.PI, 1 * Math.PI);
    this.body.velocity.y = Math.sin(this.startDir) * this.moveConst;
    this.body.velocity.x = Math.cos(this.startDir) * this.moveConst;
    
    //temporary movement controls
    game.input.keyboard.addKey(Phaser.KeyCode.LEFT).onDown.add(this.moveWest, this);
    game.input.keyboard.addKey(Phaser.KeyCode.RIGHT).onDown.add(this.moveEast, this);
    game.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(this.moveNorth, this);
    game.input.keyboard.addKey(Phaser.KeyCode.DOWN).onDown.add(this.moveSouth, this);
    game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(this.stopMoving, this);

    this.health = 100;
    this.maxHealth = 100;
    this.healthMeterBar = this.game.add.plugin(Phaser.Plugin.HealthMeter);
    this.healthMeterBar.bar(this, {
        y: - this.height, x: 0,
        width: 70, height: 5,
        foreground: '#ff0000',
        background: '#aa0000',
        alpha: 0.6,
    });
};

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
Bee.prototype.moveWest = function(){
    this.state = "W";
    this.body.velocity.x = -this.moveConst;
    this.body.velocity.y = 0;
};
Bee.prototype.moveEast = function(){
    this.state = "E";
    this.body.velocity.x = this.moveConst;
    this.body.velocity.y = 0;
};
Bee.prototype.moveNorth = function(){
    this.state = "N";
    this.body.velocity.x = 0;
    this.body.velocity.y = -this.moveConst;
};
Bee.prototype.moveSouth = function(){
    this.state = "S";
    this.body.velocity.x = 0;
    this.body.velocity.y = this.moveConst;
};
Bee.prototype.stopMoving = function(){
    this.state = "STOP";
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
};
Bee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
	switch(this.state) {
        case "W":
            break;
        case "E":
            break;
        case "N":
            break;
        case "S":
            break;
        case "START":
            break;
        case "STOP":
            this.stubbornness += 1;
            if (this.stubbornness % 10 === 0) {
                console.log(this.stubbornness);
            }
            break;
    }
};