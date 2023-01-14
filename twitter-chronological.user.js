// ==UserScript==
// @name         Chronological Twitter
// @namespace    https://aldaviva.com/userscripts/twitter/chronological
// @version      1.3.0
// @description  Always show Following on the home timeline, instead of For You First.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    setInterval(ensureLatestTweetsFirst, 1 * 60 * 1000);
    setTimeout(ensureLatestTweetsFirst, 2 * 1000);

    function ensureLatestTweetsFirst() {
        const followingTab = document.querySelector("[data-testid=ScrollSnap-List] :nth-child(2) a");
        if (followingTab && !isTabActive(followingTab)) {
            activateTab(followingTab);
        }
    }

    function isTabActive(tabEl) {
        return tabEl.ariaSelected === 'true';
    }

    function activateTab(tabEl) {
        tabEl.click();
    }

})();