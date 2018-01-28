var GameEnd = function(game){
};
 
GameEnd.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
	},
	create: function(){
		this.stage.backgroundColor = '#000000';
        // Congrats text

        // Wait for input
        var t = game.add.text(game.width/2, game.height/2 + game.height/4, 'TRY AGAIN STOOPID', globalStyle);
        t.anchor.set(0.5);
        // Load up a bunch of happy bees!

        // start playing the chords music
        AudioManager.startSong('chords', 1000, 1000);
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
};