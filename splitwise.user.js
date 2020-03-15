// ==UserScript==
// @name         Splitwise
// @namespace    https://aldaviva.com/userscripts/splitwise
// @version      0.0.1
// @description  Disable Splitwise keyboard shortcuts
// @author       Ben Hutchison
// @match        https://secure.splitwise.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    'use strict';

    window.$.fn.modal.defaults.keyboard = false;
})();