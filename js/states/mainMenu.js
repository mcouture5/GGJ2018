var MainMenu = function(game){
};
 
MainMenu.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
	},
	create: function(){
		game.add.image(0, 0, 'background-title');

		gameManager = new GameManager();

		var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		key.onDown.add(this.start, this);

		var startBtn = game.add.button(463, 344, 'play-button', this.start, this, 1, 0, 1, 0);
		var controlsBtn = game.add.button(710, 344, 'controls-button', this.controls, this, 1, 0, 1, 0);
		var creditsBtn = game.add.button(585, 484, 'credits-button', this.credits, this, 1, 0, 1, 0);
	},
	start: function(){
		gameManager.loadStage();
	},
	controls: function(){
		this.game.state.start('ControlsMenu');
	},
	credits: function(){
		this.game.state.start('CreditsMenu');
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
};

var ControlsMenu = function(game){
};

ControlsMenu.prototype = {
	create: function(){
		console.log("controls screen!");
		var x = game.world.centerX, y = game.world.centerY;

		var backBtn = game.add.button(x, y + 200, 'play-button', this.menu, this, 1, 0, 1, 0);
		backBtn.anchor.set(0.5, 0.5);
	},
	menu: function(){
		this.game.state.start('MainMenu');
	},
}

var CreditsMenu = function(game){
};

CreditsMenu.prototype = {
	create: function(){
		console.log("credits screen!");
		var x = game.world.centerX, y = game.world.centerY;

		var backBtn = game.add.button(x, y + 200, 'play-button', this.menu, this, 1, 0, 1, 0);
		backBtn.anchor.set(0.5, 0.5);
	},
	menu: function(){
		this.game.state.start('MainMenu');
	},
}
