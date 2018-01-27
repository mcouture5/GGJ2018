var GameStage = function(){
    this.level = 1;
    this.stageData = {};
    this.bees = [];
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
        this.obstacles = game.add.group();
        this.obstacles.enableBody = true;
        this.beeGroup = game.add.group();
        this.beeGroup.enableBody = true;

        // Run through the obsctacles and create/place them
        let obstacleData = this.stageData.obstacles;

        //  Here we'll create 12 of them evenly spaced apart
        for (let ob of obstacleData) {
            let obstacle = this.obstacles.create(ob.x, ob.y, ob.sprite);
            obstacle.body.immovable = true;
        }

        // Listen for bee events
        EventBus.onBeeRageQuit.add(this.onStageFailed, this);

        ////////////////////////////
        // Masks must be added last
        ////////////////////////////

        // Fade mask
        this.fadeMask = game.add.sprite(0, 0, 'stage-mask');
        // Result mask
        this.resultMask = game.add.sprite(0, 0, 'result-mask');
        this.resultMask.alpha = 0;
        // Failed
        this.failedMask = game.add.sprite(0, 0, 'result-mask');
        this.failedMask.alpha = 0;

        // Create the mask tweens
        this.resultMaskTween = game.add.tween(this.resultMask).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.None, false);
        this.failedMaskTween = game.add.tween(this.failedMask).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.None, false);
        this.fadeInTween = game.add.tween(this.fadeMask).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, false);


        // After all has been created, reveal the stage!
        this.fadeIn().onComplete.add(function () {
            // Add bees!
            this.bees = [
                this.beeGroup.add(new Bee(game)),
                this.beeGroup.add(new Bee(game)),
                this.beeGroup.add(new Bee(game))
            ];

            //start game text
            this.stageText = game.add.text(game.width/2, game.height/2, this.stageData.name, globalStyle);
            this.stageText.anchor.set(0.5);
            this.stageText.inputEnabled = true;
            this.stageText.input.useHandCursor = true;
            this.stageText.events.onInputDown.add(function(){
                //this.onStageCleared();
                EventBus.onBeeRageQuit.dispatch(bee);
            }, this);

            // Tell the game manager the stage has begun
            gameManager.beginStage();
        }, this);
	},
	update: function(){
        let beeColliding = game.physics.arcade.collide(this.beeGroup, this.obstacles);
	},
	render: function(){
	},
	shutdown: function(){
        // Cleanup events
        EventBus.onBeeRageQuit.remove(this.onStageFailed, this);
        this.resultMaskTween.onComplete.removeAll();
        this.failedMaskTween.onComplete.removeAll();
        this.fadeInTween.onComplete.removeAll();
	},
    onStageCleared: function () {
        // Stage has been cleared
        gameManager.stageCleared();

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
                    this.fadeAndGoToNextStage();
                }, this);
            }
        }, this);
    },
    onStageFailed: function (bee) {
        // Stage has been failed
        gameManager.stageFailed();
        // Stop all bees!
        this.bees.forEach((bee) => bee.stopMoving());
        // Bring the failed bee to the front
        game.world.bringToTop(bee);
        // Show the failed mask
        this.showFailedMask().onComplete.add(function () {
            // Wait for input
            let t = game.add.text(game.width/2, game.height/2 + game.height/4, 'TRY AGAIN STOOPID', globalStyle);
            t.anchor.set(0.5);
            if (this.level < 5) {
                t.inputEnabled = true;
                t.input.useHandCursor = true;
                t.events.onInputDown.add(function() {
                    // Restart the stage
                    gameManager.restartStage();
                }, this);
            }
        }, this);
    },
    showResultMask: function () {
        this.resultMask.alpha = 0;
        return this.resultMaskTween.start();
    },
    showFailedMask: function () {
        this.failedMask.alpha = 0;
        return this.failedMaskTween.start();
    },
    fadeIn: function () {
        this.fadeMask.alpha = 1;
        return this.fadeInTween.start();
    },
    fadeAndGoToNextStage: function () {
        return game.add.tween(this.fadeMask).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true)
            .onComplete.add(function () {
                gameManager.nextStage();
            }, this);
    }
}