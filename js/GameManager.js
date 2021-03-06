GameManager = function(stages){
	this.currentStage = 1;
	this.rageQuittingBee = null;
	this.scores = {};
	this.totalLevels = 7;
};

GameManager.prototype.constructor = GameManager;

GameManager.prototype = {
	hasNextLevel: function () {
		return this.currentStage < this.totalLevels;
	},
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
	stageCleared: function (durationInStage, playBeesSong) {
		// Keep track of score
		this.scores[this.currentStage] = durationInStage;

        // start playing the interlude music, only if there are more levels
		if (this.hasNextLevel()) {
        	AudioManager.startSong('song-about-bees', 1000, 1000);
		}

        // Stop listening to input
		MorseInput.stop();
	},
	stageFailed: function (bee) {
        // start playing the interlude music
        AudioManager.startSong('song-about-bees', 1000, 1000);

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
	gameEnd: function () {
		MorseInput.stop();
		this.rageQuittingBee = null;
		EventBus.onMorseComplete.remove(this.testMorseInput, this);
		game.state.start("GameEnd", true, false);
	},
	testMorseInput: function (result) {
		console.log(result);
	}
};
