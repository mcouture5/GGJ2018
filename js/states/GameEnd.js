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

		var stage7Score = game.add.text(scoreStartX, scoreStartY + (ySpacing * 5), 'Stage 7: ' + scores[7], globalStyle);
        stage7Score.anchor.set(0.5);

        // Load up a bunch of happy bees!
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
};