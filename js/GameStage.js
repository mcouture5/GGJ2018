var GameStage = function(){
    this.level = 1;
    this.stageData = {};
};
 
GameStage.prototype = {
	/* State methods */
	init: function(level){
        this.level = level;
	},
	preload: function(){
	},
	create: function(){
        this.stageData = game.cache.getJSON('stage_' + this.level);
        //start game text
        var text = this.stageData.name;
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = game.add.text(game.width/2, game.height/2, text, style);
        t.anchor.set(0.5);

        var bee = this.game.world.add(new Bee(this.game));

        // start MorseInput
        MorseInput.start();
        EventBus.onMorseDirection.add(function(result) {
        	console.log(result);
		});
	},
	update: function(){
	},
	render: function(){
	},
	shutdown: function(){
        // stop MorseInput
        MorseInput.start();
	}
}