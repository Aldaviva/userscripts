// ==UserScript==
// @name         Twitter Modal Tweets
// @namespace    https://aldaviva.com/userscripts/twitter
// @version      0.0.3
// @description  Open embedded tweets in a modal on your timeline, instead of on the author's homepage
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var cookiePattern = /\brweb_optin=(\w+)\b/;

    var originalCookieProperty = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
    var originalGetCookie = originalCookieProperty.get.bind(document);
    var originalSetCookie = originalCookieProperty.set.bind(document);

    function setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage() {
        var expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        // Source: https://twitter.com/jseakle/status/1173338256676724736
        originalSetCookie("rweb_optin=false;domain=.twitter.com;path=/;expires=" + expirationDate.toUTCString());
    }

    setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage();

    Object.defineProperty(document, "cookie", {
        configurable: false,
        get: function() {
            var allCookies = originalGetCookie();
            if (isUnwantedCookie(allCookies)) {
                setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage();
                allCookies = originalGetCookie();
            }
            return allCookies;
        },
        set: function(newCookie) {
            if (isUnwantedCookie(newCookie)) {
                setOpenTweetsInModelOnYourTimelineInsteadOfAuthorsHomepage();
                return "rweb_optin=false";
            } else {
                originalSetCookie(newCookie); //when proxying, doesn't return anything for some reason
                return newCookie.split(";", 1);
            }
        }
    });

    function isUnwantedCookie(oneOrMoreCookies) {
        var matches = oneOrMoreCookies.match(cookiePattern);
        return matches !== null && matches[1] !== "false";
    }

    console.info("Twitter Modal Tweets: intercepting cookie calls to open embedded tweets on the timeline");

})();
