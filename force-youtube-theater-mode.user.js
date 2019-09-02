// ==UserScript==
// @name         Force YouTube Theater Mode
// @namespace    https://aldaviva.com/userscripts/youtube-theater-mode
// @version      0.0.2
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
        enterTheaterModeIfDefaultView();
    } else {
        console.warn("No Theater button found ("+theaterButtonQuery+").");
    }

    function enterTheaterModeIfDefaultView(){
        var isTheaterMode = theaterButton.title !== "Theater mode (t)";
        console.info("YouTube " + (isTheaterMode ? "is in" : "is not in") + " Theater mode.");

        if(!isTheaterMode){
            console.info("Entering Theater mode.");
            theaterButton.click();
            setTimeout(enterTheaterModeIfDefaultView, 100); // In Firefox, the first few clicks are ignored, so retry until it succeeds.
        } else {
            console.info("Done, no need to force Theater mode.");
        }
    }
})();
