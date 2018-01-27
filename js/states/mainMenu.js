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

		var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		key.onDown.add(this.start, this);

		var w = this.scale.width, h = this.scale.height;

		var titleText = this.game.add.text(w / 2, h / 2, 'oh no not the BEES! not the BEEEESS!', {
			fill: '#fff',
		});
		titleText.anchor.set(0.5, 0.5);

		var startText = this.game.add.text(w / 2, h * 3 / 4, 'START (space)', {
			fill: '#fff',
		});
		startText.anchor.set(0.5, 0.5);
		startText.inputEnabled = true;
		startText.input.useHandCursor = true;
		startText.events.onInputDown.add(this.start, this);

		var aboutText = this.game.add.text(w / 2, h * 3 / 4 + 50, 'about', {
			fill: '#fff',
		})
		aboutText.anchor.set(0.5, 0.5);
		aboutText.inputEnabled = true;
		aboutText.input.useHandCursor = true;
		aboutText.events.onInputDown.add(function(){
			this.game.state.start('About');
		}, this);
	},
	start: function(){
		this.game.state.start('GameStage', true, false, 1);
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

		var w = this.scale.width, h = this.scale.height;

		var backText = this.game.add.text(w / 2, h * 3 / 4 + 50, '<< back', {
			fill: '#fff',
		})
		backText.anchor.set(0.5, 0.5);
		backText.inputEnabled = true;
		backText.input.useHandCursor = true;
		backText.events.onInputDown.add(function(){
			this.game.state.start('MainMenu');
		}, this);
	},
}
