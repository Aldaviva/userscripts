// ==UserScript==
// @name         Wired
// @namespace    https://aldaviva.com/userscripts/wired
// @version      0.0.2
// @description  Block the free article limit error
// @author       Ben Hutchison
// @match        https://www.wired.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const cookiesToDelete = [{
        name: "verso_bucket",
        domain: "www.wired.com"
    }, {
        name: "pay_ent_smp",
        domain: ".wired.com"
    }];

    cookiesToDelete.forEach(deleteCookie);

    function deleteCookie(cookie){
        document.cookie = cookie.name + "=a;path=/;domain=" + cookie.domain + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;secure";
        console.info("Wired Userscript: Deleted cookie " + cookie.name);
    }

})();
