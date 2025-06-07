// ==UserScript==
// @name         Wikipedia
// @namespace    https://aldaviva.com/userscripts/
// @version      0.0.0
// @description  Don't forget display preferences every month
// @author       Ben Hutchison
// @match        https://*.wikipedia.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const cookiePattern = /(?<key>[^=]+?)\s*=\s*(?<value>[^;\s]+?)\s*(?:;\s*|$)/g;
    const cookieName = "enwikimwclientpreferences";

    const cookieValue = document.cookie.matchAll(cookiePattern).find(m => m.groups.key === cookieName)?.groups?.value;
    if (cookieValue) {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        document.cookie = `${cookieName}=${cookieValue};path=/;expires=${expirationDate.toUTCString()}`;
        console.info("Remembered display preferences for 1 year.");
    } else {
        console.info("No display preferences saved yet. Set them and then load a Wikipedia page in order to save them for 1 year.");
    }

})();