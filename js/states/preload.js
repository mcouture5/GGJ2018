var Preload = function(game){
};
 
Preload.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
		game.load.onLoadStart.add(this.loadStart, this);
		game.load.onFileComplete.add(this.fileComplete, this);
		game.load.onLoadComplete.add(this.loadComplete, this);

		//	Progress report
		text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });

		////////////////////////
		// Begin loading assets
		////////////////////////

		// load queen bee
		game.load.image('queen-bee', 'assets/images/Queen.png');

		// Load obstacles
		game.load.image('test1', 'assets/images/test1.jpg');
		game.load.image('test2', 'assets/images/test2.jpg');
		game.load.image('test3', 'assets/images/test3.jpg');
		game.load.image('collision', 'assets/images/collision.png');

		// Directions
		game.load.image('directions', 'assets/images/Directions.png');

		//Backgrounds
		game.load.image('background-stage-1', 'assets/images/Background.png');
		game.load.image('stage-mask', 'assets/images/stage-mask.jpg');
		game.load.image('result-mask', 'assets/images/result-mask.jpg');
		game.load.image('stage-begin-mask', 'assets/images/stage-begin-mask.jpg');

		// Load the stage metadata before the stages are created
		game.load.json('stage_1', 'assets/data/stage_1.json');
		game.load.json('stage_2', 'assets/data/stage_2.json');
		game.load.json('stage_3', 'assets/data/stage_3.json');
		game.load.json('stage_4', 'assets/data/stage_4.json');
		game.load.json('stage_5', 'assets/data/stage_5.json');
        
		// Spritesheets
        game.load.spritesheet('bee', 'assets/images/bee.png', 120, 120);

		// Force loading assets
    	game.load.start();

		//////////////////////
		// End loading assets
		//////////////////////

		// Physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Managers
	    audioManager = new AudioManager();
		gameManager = new GameManager();

        // prevent the space key from bubbling up to the web browser
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);

        // initialize MorseInput
        MorseInput.init();
	},
	create: function(){
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	},
	loadStart: function() {
		text.setText("Loading ...");
	},
	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
	},
	loadComplete: function() {
		text.setText("Load Complete");
		// gameManager.reset();

		// TODO remove the following code for skipping straight to stage 1
		game.state.start('GameStage', true, false, 1);
	}
}
