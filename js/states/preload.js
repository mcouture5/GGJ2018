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

		// set space key global
        spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		////////////////////////
		// Begin loading assets
		////////////////////////

		// load queen bee
        game.load.spritesheet('queen-bee', 'assets/images/Queensprite.png', 195, 385);
		game.load.image('queen-bubble', 'assets/images/QueenBubble.png');

		// Load obstacles
		game.load.image('collision', 'assets/images/collision.png');
		game.load.image('LLog1', 'assets/images/llog1.png');
		game.load.image('LLog2', 'assets/images/llog2.png');
		game.load.image('log', 'assets/images/log.png');
		game.load.image('rocks', 'assets/images/rocks.png');
		game.load.image('waterlog', 'assets/images/waterlog.png');
		game.load.image('waterrocks', 'assets/images/waterrocks.png');
		game.load.image('desertrock', 'assets/images/Desertrock.png');
		game.load.image('desertrock2', 'assets/images/desertrock2.png');

		// Flowers
        game.load.spritesheet('Flower1', 'assets/images/Flower1.png', 130, 130);
		game.load.image('Petal1', 'assets/images/Petal1.png');
        game.load.spritesheet('Flower2', 'assets/images/Flower2.png', 130, 130);
		game.load.image('Petal2', 'assets/images/Petal2.png');
        game.load.spritesheet('Flower3', 'assets/images/Flower3.png', 130, 130);
		game.load.image('Petal3', 'assets/images/Petal3.png');
        game.load.spritesheet('Flower4', 'assets/images/Flower4.png', 130, 130);
//		game.load.image('Petal4', 'assets/images/Petal4.png');
        game.load.spritesheet('Flower5', 'assets/images/Flower5.png', 130, 130);
        game.load.spritesheet('Flower6', 'assets/images/Flower6.png', 130, 130);

		// Directions
		game.load.image('directions', 'assets/images/Directions.png');
		game.load.image('arrow', 'assets/images/arrow.png');

		//Backgrounds
		game.load.image('background-title', 'assets/images/TitleScreen.png');
		game.load.image('background-controls', 'assets/images/ControlsPage.png');
		game.load.image('background-credits', 'assets/images/Credits.png');
		game.load.image('background-stage-1', 'assets/images/Background.png');
		game.load.image('background-stage-2', 'assets/images/Backgroundwater.png');
		game.load.image('background-stage-3', 'assets/images/Background3.png');
		game.load.image('stage-mask', 'assets/images/stage-mask.jpg');
		game.load.image('result-mask', 'assets/images/result-mask.jpg');
		game.load.image('stage-begin-mask', 'assets/images/stage-begin-mask.jpg');
		game.load.image('level-end-info-box', 'assets/images/LevelEndInfoBox.png');
		game.load.image('win-screen', 'assets/images/WinScreen.png');
		game.load.spritesheet('spacebar', 'assets/images/Spacebar_sprite.png', 300, 88);

		// Buttons
		game.load.spritesheet('controls-button', 'assets/images/controls_button_ss.png', 201, 92);
		game.load.spritesheet('credits-button', 'assets/images/credits_button_ss.png', 201, 93);
		game.load.spritesheet('next-button', 'assets/images/nextbutton_ss.png', 202, 93);
		game.load.spritesheet('play-button', 'assets/images/play_button_ss.png', 202, 93);
		game.load.spritesheet('back-button', 'assets/images/backbutton_ss.png', 208, 95);

		// Load the stage metadata before the stages are created
		game.load.json('stage_1', 'assets/data/stage_1.json');
		game.load.json('stage_2', 'assets/data/stage_2.json');
		game.load.json('stage_3', 'assets/data/stage_3.json');
		game.load.json('stage_4', 'assets/data/stage_4.json');
		game.load.json('stage_5', 'assets/data/stage_5.json');
		game.load.json('stage_6', 'assets/data/stage_6.json');
		game.load.json('stage_7', 'assets/data/stage_7.json');
        
		// Bee spritesheets
        game.load.spritesheet('bee', 'assets/images/bee.png', 80, 80);
        game.load.spritesheet('bee-glow', 'assets/images/bee-glow.png', 80, 80);
        game.load.spritesheet('bee-shadow', 'assets/images/bee-shadow.png');
        game.load.image('status1', 'assets/images/StatusIcon1.png');
        game.load.image('status2', 'assets/images/StatusIcon2.png');
        game.load.image('status3', 'assets/images/StatusIcon3.png');
        game.load.image('glow', 'assets/images/glow.png');

        // SFX
        game.load.audio('angry-2', ['assets/sounds/angry-2.mp3']);
        game.load.audio('angry-3', ['assets/sounds/angry-3.mp3']);
        game.load.audio('angry-rage-quit', ['assets/sounds/angry-rage-quit.mp3']);
        game.load.audio('pollen-collected', ['assets/sounds/pollen-collected-2.mp3']);
        game.load.audio('confirm', ['assets/sounds/confirm.mp3']);
        game.load.audio('invalid', ['assets/sounds/invalid-2.mp3']);
        game.load.audio('buzz-loop', ['assets/sounds/buzz-loop.mp3']);
        game.load.audio('ladida-loop', ['assets/sounds/ladida-loop.mp3']);
        game.load.audio('transmission-loop', ['assets/sounds/transmission-loop.mp3']);
        game.load.audio('chords-loop', ['assets/sounds/chords-loop.mp3']);
        game.load.audio('song-about-bees-loop', ['assets/sounds/song-about-bees-loop-harmony.mp3']);
        game.load.audio('buzz-melody-loop', ['assets/sounds/buzz-melody-loop.mp3']);
        game.load.audio('chords-loop', ['assets/sounds/chords-loop.mp3']);

		// Force loading assets
    	game.load.start();

		//////////////////////
		// End loading assets
		//////////////////////

		// Physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Managers
		gameManager = new GameManager();

        // prevent the space key from bubbling up to the web browser
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);

        // initialize MorseInput
        MorseInput.init();

        // initialize the music manager
		AudioManager.init();
	},
	create: function(){
	    // detect when the sounds with large filesize are ready
	    game.sound.setDecodedCallback([
	    	game.add.audio('buzz-loop'),
            game.add.audio('ladida-loop'),
        	game.add.audio('transmission-loop'),
        	game.add.audio('chords-loop'),
        	game.add.audio('song-about-bees-loop'),
            game.add.audio('buzz-melody-loop'),
            game.add.audio('chords-loop')
		], this.onSoundsDecoded,this);
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
	},
    onSoundsDecoded: function() {
        gameManager.reset();
        // TODO remove the following code for skipping straight to stage 1
        // gameManager.loadStage();
    }
};
