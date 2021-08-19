// ==UserScript==
// @name         Wired
// @namespace    https://aldaviva.com/userscripts/wired
// @version      0.0.1
// @description  Block the free article limit error
// @author       Ben Hutchison
// @match        https://www.wired.com/*
// @icon         https://www.google.com/s2/favicons?domain=wired.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const cookiesToDelete = ["verso_bucket", "pay_ent_smp"];

    cookiesToDelete.forEach(deleteCookie);

    function deleteCookie(cookieName){
        document.cookie = cookieName + "=a;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;secure";
        console.log("Wired Userscript: Deleted cookie "+cookieName);
    }

})();
