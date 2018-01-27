GameManager = function(stages){
	this.currentStage = 1;
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
		EventBus.onMorseDirection.add(this.testMorseInput, this);
	},
	stageCleared: function () {
        // Stop listening to input
        MorseInput.stop();
	},
	stageFailed: function () {
        // Stop listening to input
        MorseInput.stop();
	},
	restartStage: function () {
		EventBus.onMorseDirection.remove(this.testMorseInput, this);
        game.state.restart(true, false, this.currentStage);
	},
	nextStage: function () {
		EventBus.onMorseDirection.remove(this.testMorseInput, this);
		this.currentStage++;
		this.loadStage();
	},
	testMorseInput: function (result) {
		console.log(result);
	}
};
