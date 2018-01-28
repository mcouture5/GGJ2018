var GameStage = function(){
    this.level = 1;
    this.stageData = {};
    this.bees = [];
    this.selectedBee;
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

        //  Create our Timer
        this.timer = game.time.create(false);

        //Background
        game.add.image(0, 0, this.stageData.background);

        // Bee shadows are under everything except the background
        this.beeShadowGroup = game.add.group();

        // initialize the queen bee
        this.queenBee = new QueenBee();
        game.add.existing(this.queenBee);

        // Directions
        game.add.image(0, 0, 'directions');
        
        //Initialize groups
        this.obstacles = game.add.group();
        this.obstacles.enableBody = true;
        this.flowers = game.add.group();
        this.flowers.enableBody = true;
        this.beeGroup = game.add.group();
        this.beeGroup.enableBody = true;
        this.borders = game.add.group();
        this.borders.enableBody = true;
        
        // Flowers
        // Run through the flowers and create/place them
        var flowerData = this.stageData.flowers;
        flowerData.forEach(function (fl) {
            this.flowers.add(new Flower(game, fl.x, fl.y, fl.gatherTime, fl.flowerSprite, fl.petalSprite, fl.flowerCenter));
        }, this);

        // Stage borders
        var borderThick = 25;
        // Top
        var topBorder = this.borders.create(0, 0, 'collision');
        topBorder.scale.setTo(game.width, borderThick * 2);
        topBorder.body.immovable = true;

        // Right
        var rightBorder = this.borders.create(game.width - borderThick, 0, 'collision');
        rightBorder.scale.setTo(borderThick, game.height)
        rightBorder.body.immovable = true;

         // Bottom
        var bottomBorder = this.borders.create(0, game.height - borderThick, 'collision');
        bottomBorder.scale.setTo(game.width, borderThick);
        bottomBorder.body.immovable = true;
        
         // Left
        var leftBorder = this.borders.create(0, 0, 'collision');
        leftBorder.scale.setTo(borderThick, game.height);
        leftBorder.body.immovable = true;

        // Run through the obsctacles and create/place them
        var obstacleData = this.stageData.obstacles;

        //  Obstacles!
        obstacleData.forEach(function (ob) {
            var obstacle = this.obstacles.create(ob.x, ob.y, ob.sprite);
            obstacle.body.immovable = true;
            if (ob.collision) {
                obstacle.body.setSize(ob.collision.w, ob.collision.h, ob.collision.x, ob.collision.y);
            }
        }, this);

        // Timer text
        var timerBg = game.add.sprite(5, 5, 'level-end-info-box');
        timerBg.scale.setTo(0.27, 0.27);
        this.timerText = game.add.text(57, 38, 'Time\n00:00', globalStyle);
        this.timerText.anchor.set(0.5);
        this.timerText.fontSize = '16px';

        // Listen for bee events
        EventBus.onBeeRageQuit.add(this.onStageFailed, this);
        EventBus.onBeeReturned.add(this.onBeeReturned, this);
        EventBus.onFlowerEated.add(this.onFowerEated, this);

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
        // Game Won
        this.gameWonMask = game.add.sprite(0, 0, 'result-mask');
        this.gameWonMask.alpha = 0;

        // Create the mask tweens
        this.resultMaskTween = game.add.tween(this.resultMask).to( { alpha: 0.75 }, 500, Phaser.Easing.Linear.None, false);
        this.failedMaskTween = game.add.tween(this.failedMask).to( { alpha: 0.75 }, 500, Phaser.Easing.Linear.None, false);
        this.gameWonMaskTween = game.add.tween(this.gameWonMask).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, false);
        this.fadeInTween = game.add.tween(this.fadeMask).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, false);

        // After all has been created, reveal the stage!
        this.fadeIn().onComplete.add(function () {
            // Start timer!
            this.timer.start();
            // Add bees!
            this.bees = new Array(this.stageData.bees.length);
            for(var i = 0; i < this.stageData.bees.length; i++) {
                var self = this;
                (function(j) {
                    setTimeout(function(){
                        self.bees[j] = self.beeGroup.add(new Bee(game, self.stageData.bees[j].speedMultiplier));
                        self.beeShadowGroup.add(new BeeShadow(game, self.bees[j]));
                        (function(k) {
                            if (!self.selectedBee) {
                                self.selectedBee = self.bees[j];
                                self.selectedBee.selected = true;
                            }
                            self.bees[j].events.onInputDown.add(function() {
                                MorseInput.resolveEarly();
                                if (self.selectedBee) {
                                    self.selectedBee.selected = false;
                                }
                                self.selectedBee = self.bees[j];
                                self.bees[k].selected = true;
                            }, this);
                        })(j);
                    }, self.stageData.bees[j].startDelay * 1000);
                })(i)
            }
            var self = this;

            // set up the buzz loop sound
            this.buzzLoopSound = game.add.audio('buzz-loop', 0.5, true);

            // listen for morse complete and incomplete
            EventBus.onMorseComplete.add(this.handleMorseComplete, this);
            EventBus.onMorsePartial.add(this.handleMorsePartial, this);

            // listen for space key up and down
            spaceKey.onDown.add(this.handleSpaceKeyDown, this);
            spaceKey.onUp.add(this.handleSpaceKeyUp, this);

            // start playing the theme music
            var song = this.stageData.theme;
            AudioManager.startSong(song, 1000, 1000);

            // Tell the game manager the stage has begun
            gameManager.beginStage();
        }, this);
	},
	update: function(){
        // Update timer text
        if (this.timer.running) {
            this.updateTimeText();
        }
        game.physics.arcade.collide(this.beeGroup, this.obstacles);
        game.physics.arcade.collide(this.beeGroup, this.borders);
        game.physics.arcade.overlap(this.beeGroup, this.flowers, function(bee, flower) {
            bee.getPollen(flower);
        });
        game.physics.arcade.overlap(this.beeGroup, this.queenBee, function(queenBee, pollenBee) {
            if (pollenBee.hasPollen) {
                if (this.selectedBee == pollenBee) {
                    // Try to find the next available bee
                    var newBeeSelected = false;
                    this.beeGroup.forEachAlive(function (bee) {
                        if (!newBeeSelected && this.selectedBee != bee) {
                            this.selectedBee.selected = false;
                            this.selectedBee = bee;
                            bee.selected = true;
                            newBeeSelected = true;
                        }
                    }, this);
                }
                // If the be is already returning, dont tell it to keep returning dammit
                if (!pollenBee.isReturning()) {
                    pollenBee.returnToHive();
                }
            }
        }, null, this);
	},
	render: function(){
        //game.debug.text('Time until event: ' + this.timer.seconds.toFixed(0), 32, 32);
        //game.debug.body(this.queenBee, 'rgba(255,0,0,0.4)');
        //this.flowers.forEachAlive(this.renderGroup, this);
        //this.bees.forEach(this.renderGroup, this);
        //this.borders.forEachAlive(this.renderGroup, this);
        //this.obstacles.forEachAlive(this.renderGroup, this);
	},
    updateTimeText: function () {
        //Time elapsed in seconds
        var elapsed = this.timer.seconds.toFixed(0);
        this.timerText.text = "Time\n" + this.toReadableTime(elapsed);
    },
    toReadableTime: function (elapsed) {
        //Convert seconds into minutes and seconds
        var minutes = Math.floor(elapsed / 60);
        var seconds = Math.floor(elapsed) - (60 * minutes);
    
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes;
    
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        
        return result;
    },
    renderGroup: function(member)
    {
        game.debug.body(member, 'rgba(255,0,0,0.4)');
    },
	shutdown: function(){
        // Cleanup events
        EventBus.onBeeRageQuit.remove(this.onStageFailed, this);
        this.resultMaskTween.onComplete.removeAll();
        this.failedMaskTween.onComplete.removeAll();
        this.fadeInTween.onComplete.removeAll();

        // destroy the queen bee
        this.queenBee.destroy();
	},
    onFowerEated: function (flower) {
        flower.wilt();
    },
    onBeeReturned: function () {
        if (this.beeGroup.countLiving() == 0) {
            this.onStageCleared();
        }
    },
    onStageCleared: function () {
        // Get the final time
        var finalTime = this.timer.seconds.toFixed(0);

        // Stop time
        this.timer.stop();

        // Stage has been cleared
        gameManager.stageCleared(this.toReadableTime(finalTime));

        this.selectedBee = null;

        // stop listening to morse input
        EventBus.onMorseComplete.remove(this.handleMorseComplete, this);
        EventBus.onMorsePartial.remove(this.handleMorsePartial, this);

        // stop listening to space key up and down
        spaceKey.onDown.remove(this.handleSpaceKeyDown, this);
        spaceKey.onUp.remove(this.handleSpaceKeyUp, this);

        // Stop sounds
	    this.buzzLoopSound.stop();

        if (gameManager.hasNextLevel()) {
            // Fade in the result mask
            this.showResultMask().onComplete.add(function () {
                // Show results
                game.add.sprite(game.world.centerX - 192, 175, 'level-end-info-box');

                // Show time completed
                var t = game.add.text(game.world.centerX, 290, this.timerText.text, globalStyle);
                t.anchor.set(0.5);
                t.fontSize = '42px';

                // Add next button
                game.add.button(game.world.centerX - 101, 450, 'next-button', this.fadeAndGoToNextStage, this, 0, 0, 1, 0);
            }, this);
        } else {
            this.onGameWon();
        }
    },
    onStageFailed: function (rageQuitBee) {
        // Stop time
        this.timer.stop();
        this.selectedBee = null;

        // stop listening to morse input
        EventBus.onMorseComplete.remove(this.handleMorseComplete, this);
        EventBus.onMorsePartial.remove(this.handleMorsePartial, this);

        // stop listening to space key up and down
        spaceKey.onDown.remove(this.handleSpaceKeyDown, this);
        spaceKey.onUp.remove(this.handleSpaceKeyUp, this);

        // if needed, stop the buzz sound
        this.buzzLoopSound.stop();

        // Stage has been failed. The manager will tell the stage
        // if it can kill the raged be, or just ignore its rage request
        var allowRageQuit = gameManager.stageFailed(rageQuitBee);
        // If not allowed, this means another bee is already rage quitting.
        if (!allowRageQuit) {
            return;
        }
        // Stop all bees!
        this.bees.forEach(function (bee) {
            if (bee != rageQuitBee) {
                bee.gameEnd()
            }
        });
        // Bring the failed bee to the front
        game.add.existing(rageQuitBee);
        game.world.bringToTop(rageQuitBee);
        // Show the failed mask
        this.showFailedMask().onComplete.add(function () {
            // Shoot the bee into the hive for a spectacular finale
            rageQuitBee.suicide();

            // Wait for input
            var t = game.add.text(game.width/2, game.height/2 - game.height/4, 'Oh No! One of the workers has quit. \n Try again!', globalStyle);
            t.anchor.set(0.5);
            t.fill = '#fff';

            // Add try again
            var btn = game.add.button(game.world.centerX, game.world.centerY + 80, 'play-button', gameManager.restartStage, gameManager, 0, 0, 1, 0);
            btn.anchor.set(0.5);
        }, this);
    },
    // DO NOT CALL THIS FROM ANYWHERE BUT onStageFailed
    onGameWon: function () {
        this.showGameWonMask().onComplete.add(function () {
            gameManager.gameEnd();
        });
    },
    showResultMask: function () {
        this.resultMask.alpha = 0;
        return this.resultMaskTween.start();
    },
    showFailedMask: function () {
        this.failedMask.alpha = 0;
        return this.failedMaskTween.start();
    },
    showGameWonMask: function () {
        this.gameWonMask.alpha = 0;
        return this.gameWonMaskTween.start();
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
    },
    handleMorseComplete: function(result) {
        var direction = result.direction;
        var dotsAndDashes = result.dotsAndDashes;
        switch (direction) {
            case 'N':
                this.queenBee.north();
                this.selectedBee.moveNorth();
                break;
            case 'S':
                this.queenBee.south();
                this.selectedBee.moveSouth();
                break;
            case 'W':
                this.queenBee.west();
                this.selectedBee.moveWest();
                break;
            case 'E':
                this.queenBee.east();
                this.selectedBee.moveEast();
                break;
            case 'INVALID':
                this.queenBee.confused(dotsAndDashes);
                this.selectedBee.stopMoving();
                break;
            default:
                throw new Error('unexpected direction=' + direction);
        }
    },
    handleMorsePartial: function(dotsAndDashes) {
	    this.queenBee.command(dotsAndDashes);
    },
    handleSpaceKeyDown: function() {
	    // start buzzing
	    this.buzzLoopSound.play();
    },
    handleSpaceKeyUp: function() {
	    // stop buzzing
	    this.buzzLoopSound.stop();
    }
};
