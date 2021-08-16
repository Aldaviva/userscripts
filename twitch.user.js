// ==UserScript==
// @name         Twitch
// @namespace    https://aldaviva.com/userscripts/twitch
// @version      0.0.1
// @description  Automatically claim channel points.
// @author       Ben Hutchison
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function claimChannelPoints(){
        var channelPointsButton = document.querySelector("button[aria-label='Claim Bonus']");
        if(channelPointsButton){
            console.info("Claiming channel points...");
            channelPointsButton.click();
        }
    }, 2000);

})();
