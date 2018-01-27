Bee = function(game){
	Phaser.Sprite.call(this, game, 900, 100, 'bee');
    this.inputEnabled = true;
    this.startX = 200;
    this.anchor.setTo(0.5, 0.5);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.animations.add('bee-happy', [12,13,14,15], this.speed, true);
    this.animations.add('bee-pollen', [0,1,2,3], this.speed, true);
    this.animations.add('bee-rage', [16,17,18,19], this.speed, true);
    this.animations.add('bee-collecting', [24,25], this.speed, true);
    this.animations.add('bee-frustrated', [4,5,6,7], this.speed, true);
    this.animations.add('bee-frustrated-pollen', [8,9,10,11], this.speed, true);
    this.animations.add('bee-rage-pollen', [20,21,22,23], this.speed, true);
    this.animations.play('bee-happy');
    this.state = "START";
    this.moveConst = 50;
    this.selected = false;
    this.hasPollen = false;

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.onCollide = new Phaser.Signal();
    this.body.onWorldBounds = new Phaser.Signal();
    var self = this;
    function colliding (){
        // Perform colliding behavior.
        // This method gets called AS the bee is colliding.
        console.log("stopped");
        self.stopMoving();
    };
    this.body.onCollide.add(colliding);
    this.body.onWorldBounds.add(colliding);

    this.startDir = this.game.rnd.realInRange(0.5 * Math.PI, 1 * Math.PI);
    this.body.velocity.y = Math.sin(this.startDir) * this.moveConst;
    this.body.velocity.x = Math.cos(this.startDir) * this.moveConst;
    
    // temporary movement controls
    var cheating = false;
    if (cheating) {
        game.input.keyboard.addKey(Phaser.KeyCode.LEFT).onDown.add(this.moveWest, this);
        game.input.keyboard.addKey(Phaser.KeyCode.RIGHT).onDown.add(this.moveEast, this);
        game.input.keyboard.addKey(Phaser.KeyCode.UP).onDown.add(this.moveNorth, this);
        game.input.keyboard.addKey(Phaser.KeyCode.DOWN).onDown.add(this.moveSouth, this);
        game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(this.stopMoving, this);
    }

    this.health = 1000;
    this.maxHealth = 1000;
    this.healthMeterBar = this.game.add.plugin(Phaser.Plugin.HealthMeter);
    this.healthMeterBar.bar(this, {
        y: - this.height, x: 0,
        width: 70, height: 5,
        foreground: '#fff',
        background: '#ff0000',
        alpha: 0.6,
    });
};

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;



Bee.prototype.moveWest = function(){
    if (this.state == 'POLLEN') {
        return;
    }
    this.scale.x = Math.abs(this.scale.x);
    this.animations.play('bee-happy');
    if (this.state === 'W') {
        this.body.velocity.x -= this.moveConst;
    } else {
        this.body.velocity.x = -this.moveConst;
    }
    this.body.velocity.y = 0;
    this.state = 'W';
};
Bee.prototype.moveEast = function(){
    if (this.state == 'POLLEN') {
        return;
    }
    this.scale.x = -Math.abs(this.scale.x);
    this.animations.play('bee-happy');
    if (this.state === 'E') {
        this.body.velocity.x += this.moveConst;
    } else {
        this.body.velocity.x = this.moveConst;
    }
    this.body.velocity.y = 0;
    this.state = 'E';
};
Bee.prototype.moveNorth = function(){
    if (this.state == 'POLLEN') {
        return;
    }
    this.animations.play('bee-happy');
    if (this.state === 'N') {
        this.body.velocity.y -= this.moveConst;
    } else {
        this.body.velocity.y = -this.moveConst;
    }
    this.body.velocity.x = 0;
    this.state = 'N';
};
Bee.prototype.moveSouth = function(){
    if (this.state == 'POLLEN') {
        return;
    }
    this.animations.play('bee-happy');
    if (this.state === 'S') {
        this.body.velocity.y += this.moveConst;
    } else {
        this.body.velocity.y = this.moveConst;
    }
    this.body.velocity.x = 0;
    this.state = 'S';
};
Bee.prototype.stopMoving = function(){
    if (this.state == 'POLLEN') {
        return;
    }
    this.state = "STOP";
    this.animations.play('bee-frustrated');
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
};
Bee.prototype.gameEnd = function(){
    this.state = "GAMEEND";
};

Bee.prototype.suicide = function () {
    // FLY ME TO THE HIVE
    this.state = "SUICIDE";
};
Bee.prototype.getPollen = function(){
    this.state = "POLLEN";
    this.hasPollen = true;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.inputEnabled = false;
};

Bee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
    if (this.selected) {
        this.tint = 0xFFFFFF;
    } else {
        this.tint = 0x999999;
    }
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
            this.animations.play('bee-frustrated');
            this.damage(1);
            if (this.health % 100 === 0 && this.health > 0) {
                console.log(this.health);
            }
            if (this.health <= 0) {
                this.state = "GAMEEND";
                EventBus.onBeeRageQuit.dispatch(this);
            }
            break;
        case "SUICIDE":
            this.animations.play('bee-rage');
            this.scale.x = -Math.abs(this.scale.x);
            this.body.collideWorldBounds = false;
            this.body.velocity.x = 220;
            this.body.velocity.y = -220;
            break;
        case "POLLEN":
            break;
        case "GAMEEND":
            // Do nothing
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            break;
    }
};

Bee.prototype.damage = function(amount){
    if (this.alive && this.health > 0) {
        this.health -= amount;
        // override damage to not kill the bee at health 0
    }
    return this;
};

Bee.prototype.destroy = function(){
    this.healthMeterBar.destroy();
    Phaser.Sprite.prototype.destroy.call(this);
};
