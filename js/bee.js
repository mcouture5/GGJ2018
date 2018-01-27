Bee = function(game){
	Phaser.Sprite.call(this, game, 200, 200, 'bee');
    this.startX = 200;
    this.anchor.setTo(0.5, 1);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.scale.setTo(0.5, 0.5);
    this.animations.add('idle', [0,1,2,3,4,5,6,7,8], this.speed, true);
    this.animations.play('idle');
    
//    this.onSuccessfulChant = new Phaser.Signal();
//    this.onFailedChant = new Phaser.Signal();
//    
//    this.moveConst = this.speed / 10;
//    
//    var noises = [
//                    this.game.add.audio('scream'),
//                    this.game.add.audio('follower1'),
//                    this.game.add.audio('follower2'),
//                    this.game.add.audio('follower3'),
//                    this.game.add.audio('follower4'),
//                    this.game.add.audio('follower5'),
//                    this.game.add.audio('follower6'),
//                    this.game.add.audio('follower7'),
//                    this.game.add.audio('follower8'),
//                    this.game.add.audio('follower9'),
//                    this.game.add.audio('follower10'),
//                    this.game.add.audio('follower11'),
//                    this.game.add.audio('follower12'),
//                    this.game.add.audio('follower13'),
//                    this.game.add.audio('follower14')
//                  ];
//    this.noise = noises[this.game.rnd.integerInRange(0,14)];
//    this.blastDelay = this.game.time.create(false);
//    this.noiseTimer = this.game.time.create(false);
//    this.noiseTimer.loop(Phaser.Timer.SECOND * 1, this.enableNoise, this);
//    
//    this.state = "enter";
//    this.blast();
    /*
    LIST OF STATES
    enter: entering stage
    idle: standing in the crowd
    leave: leaving (lost follower)
    run: walking toward the volcano
    climb: walking up the volcano
    jump: jumping at the top of the volcano
    fall: falling into the volcano
    stop: off-stage, no animation
    readyToBlast: off-stage, no animation
    blast: shoot out of the volcano
    */
};

Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
//
//Bee.prototype.enableNoise = function(){
//    this.game.followerNoiseEnabled = true;
//    this.noiseTimer.stop();
//}
//
//Bee.prototype.blast = function(){
//    this.blastDelay.add(this.game.rnd.integerInRange(0,3000), this.actuallyBlast, this);
//    this.blastDelay.start();
//}
//
//Bee.prototype.actuallyBlast = function(){
//    if (this.state == "readyToBlast"){
//        this.x = 220;
//        this.y = 120;
//        this.angle = this.game.rnd.integerInRange(-16,16);
//        this.state = "blast"
//        this.animations.play('blast');
//    }
//}
//
//Bee.prototype.sacrifice = function(){
//    this.state = "run";
//    this.animations.play('sacrifice');
//}
//
//Bee.prototype.leave = function(){
//    this.state = "leave";
//    this.animations.play('leave');
//    this.scale.x *= -1;
//}
//
//Bee.prototype.stop = function(){
//    if (this.state != "readyToBlast" && this.state != "leave"){
//        this.state = "stop";
//        this.animations.stop();
//    }
//}
//
Bee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
    this.animations.play('idle');
//	switch(this.state) {
//        case "enter":
//            this.x -= 4 * this.moveConst;
//            if (this.x < this.startX){
//                this.state = "idle";
//                this.animations.play('idle');
//            }
//            break;
//        case "leave":
//            this.x += this.moveConst;
//            if (this.x - 24 > 800){
//                this.state = "idle";
//                this.stop();
//            }
//            break;
//        case "run":
//            this.x -= 2 * this.moveConst;
//            if (this.y > 97 * this.x / 36 - 478){ // arrived at vo
//                this.state = "climb";
//            }
//            break;
//        case "climb":
//            this.x -= 2 * this.moveConst * (36 / Math.sqrt(Math.pow(36, 2) + Math.pow(97, 2)));
//            this.y -= 2 * this.moveConst * (97 / Math.sqrt(Math.pow(36, 2) + Math.pow(97, 2)));
//            if (this.y < 117){
//                this.state = "jump";
//            }
//            break;
//        case "jump":
//            this.y -= 5 * this.moveConst;
//            if (this.y <= this.height){
//                this.state = "fall";
//                this.sendToBack();
//                this.game.world.sendToBack(this.game.clouds);
//                this.game.bg.sendToBack();
//                if (this.game.followerNoiseEnabled){
//                    this.noise.play("", 0, 0.25);
//                    this.game.followerNoiseEnabled = false;
//                    this.noiseTimer.start();
//                }
//            }
//            break;
//        case "fall":
//            this.y += 5 * this.moveConst;
//            if (this.y > 350){
//                this.state = "readyToBlast";
//            }
//            break;
//        case "blast":
//            this.y -= 2 * Math.cos(this.angle * Math.PI / 180);
//            this.x -= 2 * Math.sin(this.angle * Math.PI / 180);
//            if (this.y < -100){
//                this.state = "stop";
//            }
//            break;
//    }
};