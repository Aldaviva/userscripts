// ==UserScript==
// @name         Nixplay
// @namespace    https://aldaviva.com/userscripts/
// @version      0.0.0
// @description  Raise max concurrent upload limit from 3 to 24
// @author       Ben Hutchison
// @match        https://app.nixplay.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const uploadService = window.angular.element('*[ng-app]').injector().get("nixUpload");
    const desiredLimit = 24;
    const oldLimit = uploadService.maxConcurrent;

    if(desiredLimit > oldLimit){
        uploadService.maxConcurrent = desiredLimit;
        console.info(`Nixplay userscript: Increased max concurrent upload limit from ${oldLimit} to ${desiredLimit}`);
    }
})();