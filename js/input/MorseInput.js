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

        // keep a timer for the resolution of Morse directions
        this.resolveTimer = null;

        // keep track of the current dots and dashes
        this.dotsAndDashes = "";
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
     * Resolves the morse direction early. Returns {direction: "N" | "S" | "E" | "W" | "INVALID", dotsAndDashes: string}.
     * Does not trigger the global onMorseDirection event.
     */
    resolveEarly: function() {
        // resolve without triggering the event and return the result
        var triggerEvent = false;
        return this.resolve(triggerEvent);
    },

    // implementation details

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

        // start the resolution timer. If the pause duration elapses, resolve the Morse direction, triggering the global
        // onMorseDirection event.
        var me = this;
        var triggerEvent = true;
        this.resolveTimer = setTimeout(function() { me.resolve(triggerEvent); }, this.pauseDuration);
    },

    /**
     * Resolves the Morse direction. Returns {direction: "N" | "S" | "E" | "W" | "INVALID", dotsAndDashes: string}. If
     * triggerEvent is true, also triggers the global onMorseDirection event.
     */
    resolve: function(triggerEvent) {
        // get the direction and the dots and dashes
        var direction = this.getDirection();
        var dotsAndDashes = this.dotsAndDashes;

        // clear the dots and dashes
        this.dotsAndDashes = '';

        // create the result object
        var result = {direction: direction, dotsAndDashes: dotsAndDashes};

        // if needed, trigger the global onMorseDirection event
        if (triggerEvent) {
            EventBus.onMorseDirection.dispatch(result);
        }

        // return the result
        return result;
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
