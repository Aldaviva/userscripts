// ==UserScript==
// @name         Rooster Teeth Volume Persistence
// @namespace    https://aldaviva.com/userscripts/roosterteeth-volume-persistence
// @version      0.0.8
// @description  Remember audio volume level on Rooster Teeth videos, set resolution to the highest frame size, and allow fullscreen video playback for anonymous users again.
// @author       Ben Hutchison
// @match        https://roosterteeth.com/episode/*
// @match        https://roosterteeth.com/watch/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {

    'use strict';

    const audioVolumePersistenceKey = "audio volume";
    const maxWait = 30 * 1000;
    const desiredVolumeLevel = parseFloat(localStorage.getItem(audioVolumePersistenceKey));

    waitUntilElementsBySelector("video", 50, new Date().getTime() + maxWait, (err, elements) => {
        if(err){
            console.error("Rooster Teeth Volume Persistence user script: could not find <video> element after "+maxWait+" milliseconds");
        } else {
            const videoEl = elements[0];

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

                        const newVolume = videoEl.volume;
                        localStorage.setItem(audioVolumePersistenceKey, newVolume);
                        console.info("Rooster Teeth Volume Persistence user script: saved audio volume "+newVolume);
                    });
                }, 0);
            }, 300);
        }
    });

    waitUntilElementsBySelector(".vjs-quality-menu-button + .vjs-menu .vjs-menu-item", 50, new Date().getTime() + maxWait, (err, elements) => {
        if(err){
            console.error("Rooster Teeth Volume Persistence user script: could not find resolution menu item element after "+maxWait+" milliseconds");
        } else {
            elements[0].click();
            document.querySelector("video").focus();
            console.info("Rooster Teeth Volume Persistence user script: forced video to highest resolution ("+elements[1].textContent+")");
        }
    });

    waitUntilElementsBySelector(".vjs-fullscreen-control.vjs-disabled", 50, new Date().getTime() + maxWait, (err, elements) => {
        if(err) return;
        const fullscreenButton = elements[0];
        fullscreenButton.disabled = false;
        fullscreenButton.classList.remove("vjs-disabled");
        fullscreenButton.ariaDisabled = "false";
        fullscreenButton.addEventListener("click", clickEvent => {
            document.querySelector("video").dispatchEvent(new KeyboardEvent("keydown", {
                key: "f",
                code: "KeyF",
                keyCode: 70,
                bubbles: true,
                cancelable: true
            }));
            console.info("Rooster Teeth Volume Persistence user script: toggled video fullscreen");
        });

        document.getElementById("video-fullscreen-hide-css").remove();
    });

    function waitUntilElementsBySelector(selector, retryInterval, deadline, callback){
        const elements = document.querySelectorAll(selector);
        if(elements.length){
            callback(null, elements);
        } else if(new Date() <= deadline) {
            setTimeout(waitUntilElementsBySelector.bind(null, selector, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error(`deadline passed and no ${selector} elements were found`));
        }
    }

})();
