/**
 * Converts Morse Code space bar presses into N(orth), S(outh), E(ast), W(est), or INVALID.
 */
var MorseInput = function(){
    // get the space key
    this.spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
};

MorseInput.prototype = {

    /**
     * Starts listening.
     */
    start: function() {
        this.spaceKey.onDown.add(this.onSpaceKeyDown, this);
        this.spaceKey.onUp.add(this.onSpaceKeyUp, this);
    },

    /**
     * Stops listening.
     */
    stop: function() {
        this.spaceKey.onDown.remove(this.onSpaceKeyDown, this);
        this.spaceKey.onUp.remove(this.onSpaceKeyUp, this);
    },

    /**
     * Takes N/S/E/W/INVALID and sends that out to the global event bus.
     */
    trigger: function(direction) {
        // stub
    }

};
