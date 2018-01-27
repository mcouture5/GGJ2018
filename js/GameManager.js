GameManager = function(stages){
	this.currentStage = 1;
	this.rageQuittingBee = null;
};

GameManager.prototype.constructor = GameManager;

GameManager.prototype = {
	loadStage: function() {
		game.state.start("GameStage", true, false, this.currentStage);
	},
	reset: function(){
		// Reset the game after a win/lose
		game.state.start("MainMenu", true, false);
    },
	beginStage: function () {
        // Start listening to input
        MorseInput.start();
		EventBus.onMorseComplete.add(this.testMorseInput, this);
	},
	stageCleared: function () {
        // Stop listening to input
        MorseInput.stop();
	},
	stageFailed: function (bee) {
        // Stop listening to input
        MorseInput.stop();
		// Multiple bees cane rage quite, lets just deal with one
		if (!this.rageQuittingBee) {
			this.rageQuittingBee = bee;
		}
		return this.rageQuittingBee == bee;
	},
	restartStage: function () {
		this.rageQuittingBee = null;
		EventBus.onMorseComplete.remove(this.testMorseInput, this);
        game.state.restart(true, false, this.currentStage);
	},
	nextStage: function () {
		EventBus.onMorseComplete.remove(this.testMorseInput, this);
		this.currentStage++;
		this.loadStage();
	},
	testMorseInput: function (result) {
		console.log(result);
	}
};
