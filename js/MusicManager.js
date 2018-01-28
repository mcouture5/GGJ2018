/**
 * A global object which manages all the playing of music.
 */
var MusicManager = {

    // public methods

    /**
     * Initializes the global object.
     */
    init: function() {
        // keep track of the songs
        this.ladidaSong = null;
        this.transmissionSong = null;
        this.songAboutBeesSong = null;

        // keep track of the old song and the new song
        this.oldSong = null;
        this.currentSong = null;

        // keep track of the sound effects
    },

    /**
     * Starts a new song, stopping the currently playing song.
     */
    startSong: function(songKey, oldSongFadeDuration, newSongFadeDuration) {
        // get the song and volume
        var song = this.getSongByKey(songKey);
        var volume = this.getVolumeBySongKey(songKey);

        // update old and current song
        this.oldSong = this.currentSong;
        this.currentSong = song;

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
            default:
                throw new Error('unexpected songKey=' + songKey);
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
