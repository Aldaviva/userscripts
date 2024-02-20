// ==UserScript==
// @name         Rooster Teeth
// @namespace    https://aldaviva.com/userscripts/roosterteeth-volume-persistence
// @version      0.0.9
// @description  Disable autoplaying next video (binge watching).
// @author       Ben Hutchison
// @match        https://roosterteeth.com/episode/*
// @match        https://roosterteeth.com/watch/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    disableAutoplayNextVideo();

    function disableAutoplayNextVideo(){
        waitUntilElementsBySelector(".persistent-player", 2000, new Date() + 30*1000, (err, els) => {
            if(err){
                console.error("Could not find .persistent-player after 30 seconds");
                return;
            }

            const videoContainerEl = els[0][0];
            const videoContainer = videoContainerEl[Object.getOwnPropertyNames(videoContainerEl).find(key => key.startsWith("__reactInternalInstance$"))];

            videoContainer.return.memoizedState.binge = false;
            console.info("Rooster Teeth userscript: disabled autoplaying next video (binge watching)");
        });
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
