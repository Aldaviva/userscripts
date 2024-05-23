// ==UserScript==
// @name         Twitter: Chronological Timeline
// @namespace    https://aldaviva.com/userscripts/twitter/chronological
// @version      1.3.5
// @description  Always show Following on the home timeline, instead of For You.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @match        https://x.com/*
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
            waitUntilElementsBySelector("[data-testid='ScrollSnap-List'] a[href='/home']", 100, +new Date()+30000, (error, elements) => {
                if(error) return;

                const forYouTab = elements[0];
                const followingTab = elements[1];

                if(isTabActive(forYouTab)){
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
