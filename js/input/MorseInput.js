/**
 * Converts Morse Code space bar presses into a Morse direction: N(orth), S(outh), E(ast), W(est), or INVALID.
 */
var MorseInput = function(){
    // get the space key
    this.spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // dot duration is 250 milliseconds
    // pause duration is 3x dot duration
    this.dotDuration = 250;
    this.pauseDuration = this.dotDuration * 3;

    // keep track of the last space key down date
    this.spaceKeyDownDate = null;

    // keep a timer for the resolution of Morse directions
    this.resolveTimer = null;

    // keep track of the current dots and dashes
    this.dotsAndDashes = "";
};

MorseInput.prototype = {

    /**
     * Starts listening.
     */
    start: function() {
        // listen for space key down and up
        this.spaceKey.onDown.add(this.handleSpaceKeyDown, this);
        this.spaceKey.onUp.add(this.handleSpaceKeyUp, this);
    },

    /**
     * Stops listening.
     */
    stop: function() {
        // stop listening for space key down and up
        this.spaceKey.onDown.remove(this.handleSpaceKeyDown, this);
        this.spaceKey.onUp.remove(this.handleSpaceKeyUp, this);
    },

    /**
     * Handles space key down.
     */
    handleSpaceKeyDown: function() {
        // if we already have a last key down date, return early
        if (this.spaceKeyDownDate){
            return;
        }

        // clear the resolution timer
        clearTimeout(this.resolveTimer);

        // update the last key down date
        this.spaceKeyDownDate = new Date();
    },

    /**
     * Handles space key up.
     */
    handleSpaceKeyUp: function() {
        // determine the key press duration
        var spaceKeyPressDuration = (new Date())- this.spaceKeyDownDate;

        // clear the last key down date
        this.spaceKeyDownDate = null;

        // if the duration is less than or equal to the dot duration, it's a dot. Else, it's a dash.
        if (spaceKeyPressDuration <= this.dotDuration){
            this.dotsAndDashes += '.';
        }
        else {
            this.dotsAndDashes += '-';
        }

        // start the resolution timer. If the pause duration elapses, resolve the Morse direction.
        var me = this;
        this.resolveTimer = setTimeout(function() { me.resolve(); }, this.pauseDuration);
    },

    /**
     * Resolves the Morse direction.
     */
    resolve: function() {
        // get the Morse direction
        var morseDirection = this.getMorseDirection();

        // clear the dots and dashes
        this.dotsAndDashes = '';

        // send the Morse direction to the global event bus
        EventBus.onMorseDirection.dispatch(morseDirection);
    },

    /**
     * Returns the Morse Code direction for the current dots and dashes. If invalid, returns 'INVALID'.
     */
    getMorseDirection: function() {
        switch (this.dotsAndDashes) {
            case '-.':
                return 'N';
            case '...':
                return 'S';
            case '.--':
                return 'W';
            case '.':
                return 'E';
            default:
                return 'INVALID';
        }
    }
};
