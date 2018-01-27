var GameStage = function(){
    this.level = 1;
    this.stageData = {};
};
 
GameStage.prototype = {
	/* State methods */
	init: function(level){
        this.level = level;
	},
	preload: function(){
	},
	create: function(){
        // Get stage data from the cache
        this.stageData = game.cache.getJSON('stage_' + this.level);

        //Background
        game.add.image(0, 0, this.stageData.background);

        //Initialize groups
        obstacles = game.add.group();
        obstacles.enableBody = true;

        // Run through the obsctacles and create/place them
        let obstacleData = this.stageData.obstacles;

        //  Here we'll create 12 of them evenly spaced apart
        for (let ob of obstacleData) {
            let obstacle = obstacles.create(ob.x, ob.y, ob.sprite);
            obstacle.body.immovable = true;
        }

        ////////////////////////////
        // Masks must be added last
        ////////////////////////////

        // Fade mask
        fadeMask = game.add.sprite(0, 0, 'stage-mask');
        // Result mask
        resultMask = game.add.sprite(0, 0, 'result-mask');
        resultMask.alpha = 0;

        // After all has been created, reveal the stage!
        this.fadeIn().onComplete.add(function () {
            var bee = this.game.world.add(new Bee(this.game));

            //start game text
            this.stageText = game.add.text(game.width/2, game.height/2, this.stageData.name, globalStyle);
            this.stageText.anchor.set(0.5);
            this.stageText.inputEnabled = true;
            this.stageText.input.useHandCursor = true;
            this.stageText.events.onInputDown.add(function(){
                this.onStageCleared();
            }, this);

            // start MorseInput
            MorseInput.start();
            EventBus.onMorseDirection.add(function(result) {
                console.log(result);
            });
        }, this);
	},
	update: function(){
        //game.physics.arcade.collide(stars, obstacles);
	},
	render: function(){
	},
	shutdown: function(){
        // stop MorseInput
        MorseInput.start();
	},
    onStageCleared: function () {
        this.stageText.destroy();
        // Fade in the result mask
        this.showResultMask().onComplete.add(function () {
            // Wait for input
            let t = game.add.text(game.width/2, game.height/2 + game.height/4, 'You done got all that pollens!', globalStyle);
            t.anchor.set(0.5);
            if (this.level < 5) {
                t.inputEnabled = true;
                t.input.useHandCursor = true;
                t.events.onInputDown.add(function(){
                    t.destroy();
                    // Fade out the stage, going to the next level after.
                    this.fadeOut();
                }, this);
            }
        }, this);
    },
    onStageFailed: function () {

    },
    showResultMask: function () {
        resultMask.alpha = 0;
        return game.add.tween(resultMask).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true);
    },
    fadeIn: function () {
        fadeMask.alpha = 1;
        return game.add.tween(fadeMask).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
    },
    fadeOut: function () {
        return game.add.tween(fadeMask).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true)
            .onComplete.add(function () {
                gameManager.nextStage();
            }, this);
    }
}