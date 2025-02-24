// ==UserScript==
// @name         The Verge
// @namespace    https://aldaviva.com/userscripts/verge
// @version      0.0.1
// @description  Prevent the page from freezing and being unable to scroll
// @author       Ben Hutchison
// @match        https://www.theverge.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const cookiesToDelete = [{
        name: "blaize_tracking_id",
        domain: "www.theverge.com"
    }, {
        name: "blaize_session",
        domain: "www.theverge.com"
    }];

    cookiesToDelete.forEach(deleteCookie);

    function deleteCookie(cookie){
        // Requires https://github.com/Aldaviva/content-blocking-filters/blob/master/filters/ads.txt to be added to uBlock Origin to be able to block the cookies
        document.cookie = cookie.name + "=a;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT" + (window.location.hostname !== cookie.domain ? ";domain=" + cookie.domain : "");
        console.log("Deleted cookie "+cookie.name);
    }

})();
