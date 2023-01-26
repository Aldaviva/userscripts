// ==UserScript==
// @name         TreasuryDirect
// @namespace    https://aldaviva.com/userscripts/treasurydirect
// @version      0.0.0
// @description  Enable password entry without using the web-based on-screen keyboard, so I can use my password manager
// @author       Ben Hutchison
// @match        https://treasurydirect.gov/RS/PW-Display.do
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector(".pwordinput").readOnly = false;
})();