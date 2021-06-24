// ==UserScript==
// @name         Rooster Teeth Volume Persistence
// @namespace    https://aldaviva.com/userscripts/roosterteeth-volume-persistence
// @version      0.0.6
// @description  Remember audio volume level on Rooster Teeth videos, and set resolution to the highest frame size
// @author       Ben Hutchison
// @match        https://roosterteeth.com/episode/*
// @match        https://roosterteeth.com/watch/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {

    'use strict';

    var audioVolumePersistenceKey = "audio volume";
    var maxWait = 30*1000;

    var desiredVolumeLevel = parseFloat(localStorage.getItem(audioVolumePersistenceKey));

    waitUntilElementsBySelector("video", 50, new Date().getTime() + maxWait, function(err, elements){
        if(err){
            console.error("Rooster Teeth Volume Persistence user script: could not find <video> element after "+maxWait+" milliseconds");
        } else {
            var videoEl = elements[0];

            setTimeout(function(){
                if(!isNaN(desiredVolumeLevel)){
                    videoEl.muted = false;
                    videoEl.volume = desiredVolumeLevel;
                    console.info("Rooster Teeth Volume Persistence user script: restored audio volume to "+desiredVolumeLevel);
                }

                setTimeout(function(){
                    videoEl.addEventListener("volumechange", function(event){
                        if(videoEl.muted){
                            videoEl.muted = false;
                            console.info("Rooster Teeth Volume Persistence user script: unmuted video, volume is now "+videoEl.volume);
                        }

                        var newVolume = videoEl.volume;
                        localStorage.setItem(audioVolumePersistenceKey, newVolume);
                        console.info("Rooster Teeth Volume Persistence user script: saved audio volume "+newVolume);
                    });
                }, 0);
            }, 300);
        }
    });

    waitUntilElementsBySelector(".vjs-quality-menu-button + .vjs-menu .vjs-menu-item", 50, new Date().getTime() + maxWait, function(err, elements){
        if(err){
            console.error("Rooster Teeth Volume Persistence user script: could not find resolution menu item element after "+maxWait+" milliseconds");
        } else {
            elements[0].click();
            document.querySelector("video").focus();
            console.info("Rooster Teeth Volume Persistence user script: forced video to highest resolution ("+elements[1].textContent+")");
        }
    });

    function waitUntilElementsBySelector(selector, retryInterval, deadline, callback){
        var elements = document.querySelectorAll(selector);
        if(elements.length){
            callback(null, elements);
        } else if(new Date() <= deadline) {
            setTimeout(waitUntilElementsBySelector.bind(null, selector, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error("deadline passed and no "+selector+" elements were found"));
        }
    }

})();
