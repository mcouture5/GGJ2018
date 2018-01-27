/**
 * A global object which converts Morse Code space bar presses into a Morse direction:
 * - "-." = "N"
 * - "..." = "S"
 * - "." = "E"
 * - ".--" = "W"
 * - anything else = "INVALID"
 */
var MorseInput = {

    // public methods

    /**
     * Initializes the global object. Call this as soon as the game keyboard is available.
     */
    init: function() {
        // get the space key
        this.spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        // dot duration is 250 milliseconds
        // pause duration is 2x dot duration
        this.dotDuration = 250;
        this.pauseDuration = this.dotDuration * 2;

        // keep track of the last space key down date
        this.spaceKeyDownDate = null;

        // keep a timer for the resolution of Morse input
        this.resolveTimer = null;

        // keep track of the current dots and dashes
        this.dotsAndDashes = "";

        // mute input duration is 3x dot duration
        // keep track of whether we are muting input
        this.muteInputDuration = this.dotDuration * 3;
        this.muteInput = false;
    },

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
     * Resolves the Morse input early, triggering the global onMorseComplete event. Mutes the input for a bit.
     */
    resolveEarly: function() {
        var early = true;
        this.resolveImpl(early);
    },

    // implementation details

    /**
     * Handles space key down.
     */
    handleSpaceKeyDown: function() {
        // if muting input, return early
        if (this.muteInput) {
            return;
        }

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
        // if muting input, return early
        if (this.muteInput) {
            return;
        }

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

        // declare a shared variable
        var early;

        // if the current dots and dashes is 4 or more characters, it's clearly invalid, so resolve early and return early
        if (this.dotsAndDashes.length >= 4) {
            early = true;
            this.resolveImpl(early);
            return;
        }

        // start the resolution timer. If the pause duration elapses, resolve
        var me = this;
        early = false;
        this.resolveTimer = setTimeout(function() { me.resolveImpl(early); }, this.pauseDuration);
    },

    /**
     * The shared implementation for resolving the Morse input, triggering the global onMorseComplete event. If we're
     * resolving early, mute the input for a bit.
     */
    resolveImpl: function(early) {
        // clear the resolution timer
        clearTimeout(this.resolveTimer);

        // get the direction and the dots and dashes
        var direction = this.getDirection();
        var dotsAndDashes = this.dotsAndDashes;

        // clear the dots and dashes
        this.dotsAndDashes = '';

        // create the result object
        var result = {direction: direction, dotsAndDashes: dotsAndDashes};

        // trigger the global onMorseComplete event
        EventBus.onMorseDirection.dispatch(result);

        // if resolving early, mute the input for a bit
        if (early) {
            this.muteInput = true;
            var me = this;
            setTimeout(function() { me.muteInput = false; }, this.muteInputDuration);
        }
    },

    /**
     * Returns the direction for the current dots and dashes. If invalid, returns 'INVALID'.
     */
    getDirection: function() {
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
