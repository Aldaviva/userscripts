// ==UserScript==
// @name         Inoreader video controls
// @namespace    https://aldaviva.com/userscripts/inoreader-video-controls
// @version      0.0.1
// @description  Enable video controls on Inoreader
// @author       Ben Hutchison
// @match        https://www.inoreader.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    var parent = document.getElementById("splitter");
    var observer = new MutationObserver(onMutation);
    var options = {
        subtree: true,
        childList: true
    };

    observer.observe(parent, options);

    function onMutation(mutations, observer){
        mutations.forEach(function(mutation){
            mutation.addedNodes.forEach(function(addedNode){
                if(addedNode.nodeType === Node.ELEMENT_NODE){
                    var videoElements = addedNode.getElementsByTagName("video");
                    Array.prototype.forEach.call(videoElements, function(videoElement){
                        videoElement.muted = true;
                        videoElement.setAttribute("controls", "");
                        videoElement.setAttribute("autoplay", "");
                        console.info("Added mute, controls, and autoplay to video element.");
                    });
                }
            });
        });
    }
})();
