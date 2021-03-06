/**
 * A global object which manages all audio (music and sounds).
 */
var AudioManager = {

    // public methods

    /**
     * Initializes the global object.
     */
    init: function() {
        // keep track of the songs
        this.ladidaSong = null;
        this.transmissionSong = null;
        this.songAboutBeesSong = null;
        this.buzzMelodySong = null;
        this.chordsSong = null;

        // keep track of the old song and the new song
        this.oldSong = null;
        this.currentSong = null;

        // keep track of the sound effects
        this.angry2Sound = null;
        this.angry3Sound = null;
        this.angryRageQuitSound = null;
        this.pollenCollectedSound = null;
        this.confirmSound = null;
        this.invalidSound = null;
    },

    /**
     * Starts a new song, stopping the currently playing song. If it already the currently playing song, does nothing.
     */
    startSong: function(songKey, oldSongFadeDuration, newSongFadeDuration) {
        // get the song and volume
        var song = this.getSongByKey(songKey);
        var volume = this.getVolumeBySongKey(songKey);

        // update old and current song
        this.oldSong = this.currentSong;
        this.currentSong = song;

        // if the old and current song are the same, return early
        if (this.oldSong === this.currentSong) {
            return;
        }

        // if needed, fade out the old song and then fade in the new song
        if (this.oldSong) {
            this.oldSong.fadeTo(oldSongFadeDuration, 0);
            this.oldSong.onFadeComplete.addOnce(function() {
                this.fadeInNewSong(newSongFadeDuration, volume)
            }, this);
        }

        // else, just fade in the new song
        else {
            this.fadeInNewSong(newSongFadeDuration, volume);
        }
    },

    /**
     * Plays a sound.
     */
    playSound: function(soundKey) {
        // get the sound and the volume
        var sound = this.getSoundByKey(soundKey);
        var volume = this.getVolumeBySoundKey(soundKey);

        // play the sound
        sound.play('', 0, volume);
    },

    // implementation details

    /**
     * Gets a song by key
     */
    getSongByKey: function(songKey) {
        switch (songKey) {
            case 'ladida':
                if (!this.ladidaSong) {
                    this.ladidaSong = game.add.audio('ladida-loop', 0, true);
                }
                return this.ladidaSong;
            case 'transmission':
                if (!this.transmissionSong) {
                    this.transmissionSong = game.add.audio('transmission-loop', 0, true);
                }
                return this.transmissionSong;
            case 'song-about-bees':
                if (!this.songAboutBeesSong) {
                    this.songAboutBeesSong = game.add.audio('song-about-bees-loop', 0, true);
                }
                return this.songAboutBeesSong;
            case 'buzz-melody':
                if (!this.buzzMelodySong) {
                    this.buzzMelodySong = game.add.audio('buzz-melody-loop', 0, true);
                }
                return this.buzzMelodySong;
            case 'chords':
                if (!this.chordsSong) {
                    this.chordsSong = game.add.audio('chords-loop', 0, true);
                }
                return this.chordsSong;
            default:
                throw new Error('unexpected songKey=' + songKey);
        }
    },

    /**
     * Gets a volume by song key.
     */
    getVolumeBySongKey: function(songKey) {
        switch (songKey) {
            case 'ladida':
                return 0.2;
            case 'transmission':
                return 0.2;
            case 'song-about-bees':
                return 0.2;
            case 'buzz-melody':
                return 0.2;
            case 'chords':
                return 0.2;
            default:
                throw new Error('unexpected songKey=' + songKey);
        }
    },

    /**
     * Gets a sound by key
     */
    getSoundByKey: function(soundKey) {
        switch (soundKey) {
            case 'angry-2':
                if (!this.angry2Sound) {
                    this.angry2Sound = game.add.audio('angry-2');
                }
                return this.angry2Sound;
            case 'angry-3':
                if (!this.angry3Sound) {
                    this.angry3Sound = game.add.audio('angry-3');
                }
                return this.angry3Sound;
            case 'angry-rage-quit':
                if (!this.angryRageQuitSound) {
                    this.angryRageQuitSound = game.add.audio('angry-rage-quit');
                }
                return this.angryRageQuitSound;
            case 'pollen-collected':
                if (!this.pollenCollectedSound) {
                    this.pollenCollectedSound = game.add.audio('pollen-collected');
                }
                return this.pollenCollectedSound;
            case 'confirm':
                if (!this.confirmSound) {
                    this.confirmSound = game.add.audio('confirm');
                }
                return this.confirmSound;
            case 'invalid':
                if (!this.invalidSound) {
                    this.invalidSound = game.add.audio('invalid');
                }
                return this.invalidSound;
            default:
                throw new Error('unexpected soundKey=' + soundKey);
        }
    },

    /**
     * Gets a volume by sound key.
     */
    getVolumeBySoundKey: function(soundKey) {
        switch (soundKey) {
            case 'angry-2':
                return 0.25;
            case 'angry-3':
                return 0.25;
            case 'angry-rage-quit':
                return 0.25;
            case 'pollen-collected':
                return 1;
            case 'confirm':
                return 0.5;
            case 'invalid':
                return 0.25;
            default:
                throw new Error('unexpected soundKey=' + soundKey);
        }
    },

    /**
     * Fades in the new song after the old song has been faded out.
     */
    fadeInNewSong: function(newSongFadeDuration, newSongVolume) {
        // stop, play, and fade in the new song
        this.currentSong.stop();
        this.currentSong.play();
        this.currentSong.fadeTo(newSongFadeDuration, newSongVolume);
    }
};
