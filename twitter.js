// ==UserScript==
// @name         Twitter Modal Tweets
// @namespace    https://aldaviva.com/userscripts/twitter
// @version      0.0.1
// @description  Open embedded tweets in a modal on your timeline, instead of on the author's homepage
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage(){
        // https://twitter.com/jseakle/status/1173338256676724736
        var expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        document.cookie = "rweb_optin=false;domain=.twitter.com;path=/;expires=" + expirationDate.toUTCString();
    }

    setInterval(setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage, 10 * 60 * 1000);
    setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage();

})();
