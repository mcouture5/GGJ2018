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
        //Initialize groups
        obstacles = game.add.group();
        obstacles.enableBody = true;

        this.stageData = game.cache.getJSON('stage_' + this.level);
        //start game text
        let text = this.stageData.name;
        let style = { font: "30px Arial", fill: "#fff", align: "center" };
        let t = game.add.text(game.width/2, game.height/2, text, style);
        t.anchor.set(0.5);
        if (this.level < 5) {
            t.inputEnabled = true;
            t.input.useHandCursor = true;
            t.events.onInputDown.add(function(){
                gameManager.nextStage();
            }, this);
        }

        // Run through the obsctacles and create/place them
        let obstacleData = this.stageData.obstacles;

        //  Here we'll create 12 of them evenly spaced apart
        for (let ob of obstacleData) {
            let obstacle = obstacles.create(ob.x, ob.y, ob.sprite);
            obstacle.body.immovable = true;
        }

        var bee = this.game.world.add(new Bee(this.game));

        // start MorseInput
        MorseInput.start();
        EventBus.onMorseDirection.add(function(result) {
        	console.log(result);
		});
	},
	update: function(){
        //game.physics.arcade.collide(stars, obstacles);
	},
	render: function(){
	},
	shutdown: function(){
        // stop MorseInput
        MorseInput.start();
	}
}