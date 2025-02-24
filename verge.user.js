// ==UserScript==
// @name         The Verge
// @namespace    https://aldaviva.com/userscripts/verge
// @version      0.0.0
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
        document.cookie = cookie.name + "=a;path=/;domain=" + cookie.domain + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;secure";
    }

})();
