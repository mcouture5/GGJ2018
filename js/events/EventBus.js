/**
 * The global event bus for the entire game! Register all the events you want! Go wild!
 */
var EventBus = {

    // triggered by MorseInput. Returns a Morse direction ("N", "S", "W", "E", or "INVALID")
    onMorseDirection: new Phaser.Signal()

    // onFoo: new Phaser.Signal();
};
