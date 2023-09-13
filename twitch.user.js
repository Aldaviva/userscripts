// ==UserScript==
// @name         Twitch
// @namespace    https://aldaviva.com/userscripts/twitch
// @version      0.1.1
// @description  Automatically claim channel points and suppress ads.
// @author       Ben Hutchison
// @match        https://www.twitch.tv/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function claimChannelPoints(){
        var channelPointsButton = document.querySelector("button[aria-label='Claim Bonus']");
        if(channelPointsButton){
            console.info("Claiming channel points");
            channelPointsButton.click();
        }
    }, 2000);

    let isAdPlaying = false;
    let nonAdMuteState = false;

    waitUntilElementsBySelector(['.video-player video', 'div[data-a-target="ax-overlay"]'], 200, null, function(err, els){
        if(!err){
            isAdPlaying = containsAdCountdownElement(document.body);
            onAdPlayingChanged();

            const mutationParent = els[1][0].parentElement;
            const mutationObserver = new MutationObserver(changes => {
                for(const change of changes){
                    if(!isAdPlaying && Array.prototype.find.call(change.addedNodes, containsAdCountdownElement) !== undefined){
                        isAdPlaying = true;
                        onAdPlayingChanged();
                        break;
                    } else if(isAdPlaying && Array.prototype.find.call(change.removedNodes, containsAdCountdownElement) !== undefined){
                        isAdPlaying = false;
                        onAdPlayingChanged();
                        break;
                    }
                }
            });

            mutationObserver.observe(mutationParent, {
                subtree: true,
                childList: true
            });

            console.debug("Waiting for ads.");
        } else {
            console.warn(err.message);
        }
    });

    function containsAdCountdownElement(parent){
        return parent.querySelector('[data-a-target="video-ad-countdown"]') !== null;
    }

    function onAdPlayingChanged(){
        console.info(isAdPlaying ? "Ad started" : "Ad finished");
        const videoEl = document.querySelector(".video-player video");

        if(videoEl){
            if(isAdPlaying){
                nonAdMuteState = videoEl.muted;
                videoEl.muted = true;
            } else {
                videoEl.muted = nonAdMuteState;
            }

            videoEl.style.visibility = isAdPlaying ? "hidden" : "visible";
        }
    }

    function waitUntilElementsBySelector(selectors, retryInterval, deadline, callback){
        if(typeof selectors.map !== "function"){
            selectors = [selectors];
        }

        const elements = selectors.map(selector => document.querySelectorAll(selector));

        if(elements.every(nodeList => nodeList.length > 0)){
            callback(null, elements);
        } else if(new Date() <= deadline || !(deadline > 0)) {
            setTimeout(waitUntilElementsBySelector.bind(null, selectors, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error(`deadline passed and one or more ${selectors} elements were not found`));
        }
    }

})();
