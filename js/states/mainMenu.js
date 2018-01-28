var MainMenu = function(game){
};
 
MainMenu.prototype = {
	/* State methods */
	init: function(params){
	},
	preload: function(){
	},
	create: function(){
		this.stage.backgroundColor = '#000000';

		gameManager = new GameManager();

		var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		key.onDown.add(this.start, this);

		var x = game.world.centerX, y = game.world.centerY;

		var titleText = this.game.add.text(x, y, 'oh no not the BEES! not the BEEEESS!', {
			fill: '#fff',
		});
		titleText.anchor.set(0.5, 0.5);

		var startBtn = game.add.button(x, y + 100, 'play-button', this.start, this, 1, 0, 1, 0);
		startBtn.anchor.set(0.5, 0.5);

		var aboutBtn = game.add.button(x, y + 200, 'controls-button', this.about, this, 1, 0, 1, 0);
		aboutBtn.anchor.set(0.5, 0.5);
	},
	start: function(){
		gameManager.loadStage();
	},
	about: function(){
		this.game.state.start('About');
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
	}
};

var About = function(game){
};

About.prototype = {
	create: function(){
		this.stage.backgroundColor = '#0000ff';

		var x = game.world.centerX, y = game.world.centerY;

		var backBtn = game.add.button(x, y + 200, 'play-button', this.menu, this, 1, 0, 1, 0);
		backBtn.anchor.set(0.5, 0.5);
	},
	menu: function(){
		this.game.state.start('MainMenu');
	},
}
