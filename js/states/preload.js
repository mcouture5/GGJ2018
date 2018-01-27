var Preload = function(game){
};
 
Preload.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Load obstacles
		game.load.image('test1', 'assets/images/test1.jpg');
		game.load.image('test2', 'assets/images/test2.jpg');
		game.load.image('test3', 'assets/images/test3.jpg');

		// Load the stage metadata before the stages are created
		game.load.json('stage_1', 'assets/data/stage_1.json');
		game.load.json('stage_2', 'assets/data/stage_2.json');
		game.load.json('stage_3', 'assets/data/stage_3.json');
		game.load.json('stage_4', 'assets/data/stage_4.json');
		game.load.json('stage_5', 'assets/data/stage_5.json');
        
        this.game.load.spritesheet('bee', 'assets/images/bee.png', 120, 120);

		// Managers
	    audioManager = new AudioManager();
		gameManager = new GameManager();

        // prevent the space key from bubbling up to the web browser
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);

        // initialize MorseInput
        MorseInput.init();
	},
	create: function(){
		gameManager.reset();
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
}
