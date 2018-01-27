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
	nextStage: function () {
		this.currentStage++;
		this.loadStage();
	}
};
