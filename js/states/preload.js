var Preload = function(game){
};
 
Preload.prototype = {
	/* State methods */
	init: function(params){
        // prevent the space key from bubbling up to the web browser
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
	},
	preload: function(){
		// Use the script loader to avoid bloating the index with includes
		//this.game.load.script('customGroup.js', 'js/customGroup.js');
		//this.game.load.script('customSprite.js', 'js/customSprite.js');
	},
	create: function(){
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
}