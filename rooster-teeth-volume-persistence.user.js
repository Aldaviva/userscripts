// ==UserScript==
// @name         Rooster Teeth Volume Persistence
// @namespace    https://aldaviva.com/userscripts/roosterteeth-volume-persistence
// @version      0.0.1
// @description  Remember audio volume level on Rooster Teeth videos
// @author       Ben Hutchison
// @match        https://roosterteeth.com/episode/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {

    'use strict';

    var audioVolumePersistenceKey = "audio volume";
    var maxWait = 3000;

    var desiredVolumeLevel = parseFloat(localStorage.getItem(audioVolumePersistenceKey));

    waitUntilElementsByTagName("video", 100, new Date().getTime() + maxWait, function(err, elements){
        if(err){
            console.error("Rooster Teeth Volume Persistence user script: could not find <video> element after "+maxWait+" milliseconds");
        } else {
            var videoEl = elements[0];

            setTimeout(function(){
                if(!isNaN(desiredVolumeLevel)){
                    videoEl.volume = desiredVolumeLevel;
                    console.info("Rooster Teeth Volume Persistence user script: restored audio volume to "+desiredVolumeLevel);
                }

                setTimeout(function(){
                    videoEl.addEventListener("volumechange", function(event){
                        var newVolume = videoEl.volume;
                        localStorage.setItem(audioVolumePersistenceKey, newVolume);
                        console.info("Rooster Teeth Volume Persistence user script: saved audio volume "+newVolume);
                    });
                }, 0);
            }, 200);
        }
    });

    function waitUntilElementsByTagName(tagName, retryInterval, deadline, callback){
        var elements = document.getElementsByTagName(tagName);
        if(elements.length){
            callback(null, elements);
        } else if(new Date() <= deadline) {
            setTimeout(waitUntilElementsByTagName.bind(null, tagName, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error("deadline passed and no "+tagName+" elements were found"));
        }
    }

})();
