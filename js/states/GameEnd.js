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

		this.stage.backgroundColor = '#000000';

		// Get scores from manager
		var scores = gameManager.scores;

        // Congrats text

		// Helpers for placing scores
		var midX = game.width/2;
		var midY = game.height/2;
		// Show all the scores per stage
		var stage1Score = game.add.text(midX - 120, midY - 60, 'Stage 1: ' + scores[1], globalStyle);
        stage1Score.anchor.set(0.5);

		var stage2Score = game.add.text(midX - 120, midY - 30, 'Stage 2: ' + scores[2], globalStyle);
        stage2Score.anchor.set(0.5);

		var stage3Score = game.add.text(midX - 120, midY, 'Stage 3: ' + scores[3], globalStyle);
        stage3Score.anchor.set(0.5);

		var stage4Score = game.add.text(midX + 120, midY - 60, 'Stage 4: ' + scores[4], globalStyle);
        stage4Score.anchor.set(0.5);

		var stage5Score = game.add.text(midX + 120, midY - 30, 'Stage 5: ' + scores[5], globalStyle);
        stage5Score.anchor.set(0.5);

		var stage6Score = game.add.text(midX + 120, midY, 'Stage 6: ' + scores[6], globalStyle);
        stage6Score.anchor.set(0.5);

        // Load up a bunch of happy bees!
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
};