// ==UserScript==
// @name         Chronological Twitter
// @namespace    https://aldaviva.com/userscripts/twitter/chronological
// @version      1.2.2
// @description  Always show Latest Tweets First on the home timeline, instead of Top Tweets First.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    setInterval(ensureLatestTweetsFirst, 1 * 60 * 1000);
    ensureLatestTweetsFirst();

    function ensureLatestTweetsFirst(){
        if(isShowingTopTweetsFirst()){
            toggleTopTweetsFirst();
        }
    }

    function isShowingTopTweetsFirst(){
        const headingEl = document.querySelector('div[data-testid="primaryColumn"] h2 span');
        return headingEl && headingEl.innerText === "Home";
    }

    function toggleTopTweetsFirst(){
        document.querySelector('div[aria-label ^= "Top Tweets"]').click();
        document.querySelector('div[role="menuitem"]').click();
    }

})();