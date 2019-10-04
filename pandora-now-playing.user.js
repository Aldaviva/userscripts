// ==UserScript==
// @name         Pandora Now Playing
// @namespace    https://aldaviva.com/userscripts/pandora-now-playing
// @version      0.0.2
// @description  Show now playing artist and song title in Pandora document title
// @author       Ben Hutchison
// @match        https://www.pandora.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var originalDocumentTitle = document.title;

    setInterval(function(){
        var songTitleEl = document.getElementsByClassName("Tuner__Audio__TrackDetail__title");
        var artistEl = document.getElementsByClassName("Tuner__Audio__TrackDetail__artist");
        //var originalDocumentTitle = document.querySelector("head meta[name='description'][data-react-helmet='true']").content;

        var newDocumentTitle;
        if(songTitleEl.length && artistEl.length){
            var nowPlayingPhrase = artistEl[0].textContent + " - " + songTitleEl[0].textContent;
            newDocumentTitle = nowPlayingPhrase + " - " + originalDocumentTitle;
        } else {
            newDocumentTitle = originalDocumentTitle;
        }

        document.title = newDocumentTitle;
    }, 1000);

    console.info("Pandora Now Playing user script initialized");
})();
