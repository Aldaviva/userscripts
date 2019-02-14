// ==UserScript==
// @name         Force YouTube Theater Mode
// @namespace    https://aldaviva.com/userscripts/youtube-theater-mode
// @version      0.0.1
// @description  Automatically enter theater mode when entering a YouTube video page
// @author       Ben Hutchison
// @match        https://www.youtube.com/watch*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.info("Force YouTube Theater Mode user script running");

    var theaterButtonQuery = ".ytp-size-button";
    var theaterButton = document.querySelector(theaterButtonQuery);

    if(theaterButton){
        var isTheaterMode = theaterButton.title !== "Theater mode (t)";
        console.info("YouTube " + (isTheaterMode ? "is already in" : "is not in") + " Theater mode.");

        if(!isTheaterMode){
            console.info("Entering Theater mode.");
            theaterButton.click();
        } else {
            console.info("Done, no need to force Theater mode.");
        }
    } else {
        console.warn("No Theater button found ("+theaterButtonQuery+").");
    }
})();
