var GameEnd = function(game){
};
 
GameEnd.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
	},
	create: function(){
        // start playing the chords music
        AudioManager.startSong('chords', 1000, 1000);

		// Queen BG
        game.add.image(0, 0, 'win-screen');

		// Get scores from manager
		var scores = gameManager.scores;

        // Congrats text
		var congrats = game.add.text(550, 120, 'Well done \n my dear!', globalStyle);
        congrats.anchor.set(0.5);

		// Helpers for placing scores
		var scoreStartX = 320;
		var scoreStartY = 230;
		var ySpacing = 50;
		// Show all the scores per stage
		var stage1Score = game.add.text(scoreStartX, scoreStartY, 'Stage 1: ' + scores[1], globalStyle);
        stage1Score.anchor.set(0.5);

		var stage2Score = game.add.text(scoreStartX, scoreStartY + (ySpacing), 'Stage 2: ' + scores[2], globalStyle);
        stage2Score.anchor.set(0.5);

		var stage3Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 2), 'Stage 3: ' + scores[3], globalStyle);
        stage3Score.anchor.set(0.5);

		var stage4Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 3), 'Stage 4: ' + scores[4], globalStyle);
        stage4Score.anchor.set(0.5);

		var stage5Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 4), 'Stage 5: ' + scores[5], globalStyle);
        stage5Score.anchor.set(0.5);

		var stage6Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 5), 'Stage 6: ' + scores[6], globalStyle);
        stage6Score.anchor.set(0.5);

		var stage7Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 6), 'Stage 7: ' + scores[7], globalStyle);
        stage7Score.anchor.set(0.5);

        // Load up a bunch of happy bees!
		this.beeGroup = game.add.group();
		this.beeGroup.enableBody = true;
		for (var i = 0; i < 20; i++) {
			var bee = new WanderingBee(game, this.game.rnd.integerInRange(1,3));
            this.beeGroup.add(bee);
		}
		this.beeGroup.setAll('body.collideWorldBounds', true);
		this.beeGroup.setAll('body.bounce.x', 1);
		this.beeGroup.setAll('body.bounce.y', 1);
	},
	update: function(){
    	game.physics.arcade.collide(this.beeGroup);
	},
	render: function(){
	},
	shutdown: function(){
	}
};

WanderingBee = function(game){
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(-2000, 2000), game.rnd.integerInRange(-2000, 2000), 'bee');
    this.anchor.setTo(0.5, 0.5);
	var randScale = game.rnd.integerInRange(5, 10) / 10;
	this.scale.setTo(randScale,randScale);
    this.speed = this.game.rnd.integerInRange(8,12);
    this.animations.add('bee-happy', [12,13,14,15], this.speed, true);
    this.animations.play('bee-happy');

    game.physics.arcade.enable(this);
    //this.body.setSize(55, 35, 10, 35);
    this.body.collideWorldBounds = true;
    this.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
};

WanderingBee.prototype = Object.create(Phaser.Sprite.prototype);
WanderingBee.prototype.constructor = WanderingBee;

WanderingBee.prototype.update = function(){
	Phaser.Sprite.prototype.update.call(this);
	if (this.body.velocity.x < 0) {
    	this.scale.x = Math.abs(this.scale.x);
	} else {
    	this.scale.x = -Math.abs(this.scale.x);
	}
};
