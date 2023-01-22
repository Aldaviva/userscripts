// ==UserScript==
// @name         Chronological Twitter
// @namespace    https://aldaviva.com/userscripts/twitter/chronological
// @version      1.3.2
// @description  Always show Following on the home timeline, instead of For You.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    setInterval(ensureLatestTweetsFirst, 1 * 60 * 1000);
    ensureLatestTweetsFirst();
    window.addEventListener("popstate", ensureLatestTweetsFirst);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(){
        originalPushState.apply(window.history, arguments);
        ensureLatestTweetsFirst();
    };

    function ensureLatestTweetsFirst() {
        if(window.location.pathname === "/home"){
            waitUntilElementsBySelector("[data-testid='ScrollSnap-List'] :nth-child(2) a[href='/home']", 100, +new Date()+5000, (error, elements) => {
                if(!error) return;

                const followingTab = elements[0];
                if(!isTabActive(followingTab)){
                    activateTab(followingTab);
                }
            });
        }
    }

    function isTabActive(tabEl) {
        return tabEl.ariaSelected === 'true';
    }

    function activateTab(tabEl) {
        tabEl.click();
    }

    function waitUntilElementsBySelector(selector, retryInterval, deadline, callback){
        const elements = document.querySelectorAll(selector);
        if(elements.length){
            callback(null, elements);
        } else if(new Date() <= deadline) {
            setTimeout(waitUntilElementsBySelector.bind(null, selector, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error("deadline passed and no "+selector+" elements were found"));
        }
    }

})();
