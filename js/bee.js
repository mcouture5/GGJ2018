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
    this.colliding = false;

    game.physics.arcade.enable(this);

    this.body.onCollide = new Phaser.Signal();
    var self = this;
    function colliding (){
        // Perform colliding behavior.
        // This method gets called AS the bee is colliding.
        console.log("stopped");
        self.stopMoving();
    };
    this.body.onCollide.add(colliding);
    
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
    else {
        EventBus.onMorseDirection.add(this.morseHandler, this);
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


Bee.prototype.morseHandler = function(result){
    var direction = result.direction;
    var dotsAndDashes = result.dotsAndDashes;
    switch (direction) {
        case 'N':
            this.moveNorth();
            break;
        case 'S':
            this.moveSouth();
            break;
        case 'W':
            this.moveWest();
            break;
        case 'E':
            this.moveEast();
            break;
        case 'INVALID':
            this.stopMoving();
            break;
        default:
            throw new Error('unexpected direction=' + direction);
    }
};

Bee.prototype.moveWest = function(){
    if (this.state === 'W') {
        this.body.velocity.x -= this.moveConst;
    } else {
        this.body.velocity.x = -this.moveConst;
    }
    this.body.velocity.y = 0;
    this.state = 'W';
};
Bee.prototype.moveEast = function(){
    if (this.state === 'E') {
        this.body.velocity.x += this.moveConst;
    } else {
        this.body.velocity.x = this.moveConst;
    }
    this.body.velocity.y = 0;
    this.state = 'E';
};
Bee.prototype.moveNorth = function(){
    if (this.state === 'N') {
        this.body.velocity.y -= this.moveConst;
    } else {
        this.body.velocity.y = -this.moveConst;
    }
    this.body.velocity.x = 0;
    this.state = 'N';
};
Bee.prototype.moveSouth = function(){
    if (this.state === 'S') {
        this.body.velocity.y += this.moveConst;
    } else {
        this.body.velocity.y = this.moveConst;
    }
    this.body.velocity.x = 0;
    this.state = 'S';
};
Bee.prototype.stopMoving = function(){
    this.state = "STOP";
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
            this.body.velocity.x = 400;
            this.body.velocity.y = -400;
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
    // Unbind events
    EventBus.onMorseDirection.remove(this.morseHandler, this);
	Phaser.Sprite.prototype.destroy.call(this);
};
