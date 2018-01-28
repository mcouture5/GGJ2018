/**
 * A global object which converts Morse Code space bar presses into a Morse direction:
 * - "-." = "N"
 * - "..." = "S"
 * - "." = "E"
 * - ".--" = "W"
 * - anything else = "INVALID"
 */
var MorseInput = {

    DOT: '•',
    DASH: '−',

    NORTH: '−•',
    SOUTH: '•••',
    WEST: '•−−',
    EAST: '•',

    // public methods

    /**
     * Initializes the global object. Call this as soon as the game keyboard is available.
     */
    init: function() {
        // dot duration is in milliseconds
        // pause duration is 2x dot duration
        this.dotDuration = 200;
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
        spaceKey.onDown.add(this.handleSpaceKeyDown, this);
        spaceKey.onUp.add(this.handleSpaceKeyUp, this);
    },

    /**
     * Stops listening.
     */
    stop: function() {
        // stop listening for space key down and up
        spaceKey.onDown.remove(this.handleSpaceKeyDown, this);
        spaceKey.onUp.remove(this.handleSpaceKeyUp, this);
    },

    /**
     * Resolves the Morse input early, triggering the global onMorseComplete event.
     */
    resolveEarly: function() {
        // if no dots and dashes, return early
        if (this.dotsAndDashes === '') {
            return;
        }

        // resolve. Do not mute input
        var muteInput = false;
        this.resolveImpl(muteInput);
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
            this.dotsAndDashes += this.DOT;
        }
        else {
            this.dotsAndDashes += this.DASH;
        }

        // trigger the global onMorsePartial event
        EventBus.onMorsePartial.dispatch(this.dotsAndDashes);

        // declare a shared variable
        var muteInput;

        // if the current dots and dashes is 4 or more characters, it's clearly invalid, so resolve and return early.
        // Make sure to mute the input to make things go smoother.
        if (this.dotsAndDashes.length >= 4) {
            muteInput = true;
            this.resolveImpl(muteInput);
            return;
        }

        // start the resolution timer. If the pause duration elapses, resolve
        var me = this;
        muteInput = false;
        this.resolveTimer = setTimeout(function() { me.resolveImpl(muteInput); }, this.pauseDuration);
    },

    /**
     * The shared implementation for resolving the Morse input, triggering the global onMorseComplete event. If needed,
     * mute the input for a bit.
     */
    resolveImpl: function(muteInput) {
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
        EventBus.onMorseComplete.dispatch(result);

        // if needed, mute the input for a bit
        if (muteInput) {
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
            case this.NORTH:
                return 'N';
            case this.SOUTH:
                return 'S';
            case this.WEST:
                return 'W';
            case this.EAST:
                return 'E';
            default:
                return 'INVALID';
        }
    }
};
