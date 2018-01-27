/**
 * The global event bus for the entire game! Register all the events you want! Go wild!
 */
var EventBus = {

    // triggered by MorseInput when the input is complete.
    // Returns {direction: "N" | "S" | "E" | "W" | "INVALID", dotsAndDashes: string}.
    onMorseComplete: new Phaser.Signal(),

    // triggered by MorseInput when the input is partially complete (i.e. a new dot or dash).
    // Returns the dots and dashes.
    onMorsePartial: new Phaser.Signal(),

    onBeeRageQuit: new Phaser.Signal()
    // onFoo: new Phaser.Signal();
};
