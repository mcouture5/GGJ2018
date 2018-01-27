/**
 * The global event bus for the entire game! Register all the events you want! Go wild!
 */
var EventBus = {

    // triggered by MorseInput. Returns {direction: "N" | "S" | "E" | "W" | "INVALID", dotsAndDashes: string}.
    onMorseDirection: new Phaser.Signal(),

    onBeeRageQuit: new Phaser.Signal()
    // onFoo: new Phaser.Signal();
};
