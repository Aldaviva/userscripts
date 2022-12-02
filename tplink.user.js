// ==UserScript==
// @name         Block TP-Link redirections
// @namespace    https://aldaviva.com/userscripts/tplinkwifiredirect
// @version      0.0.0
// @description  TP-Link AX20 v1.20: Don't redirect to tplinkwifi.net every time I try to log in to my router, because the IP address of that domain in DNS is wrong
// @author       Ben Hutchison
// @match        http://192.168.1.1/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const start = new Date();
    let attempts = 0;

    let interval = setInterval(() => {
        attempts++;

        let main = window.$.su.moduleManager.query("main");
        if (main) {
            clearInterval(interval);

            main.onLoginTimeout = () => {};

            console.info(`Disabled onLoginTimeout so this page stops redirecting to tplinkwifi.net after ${attempts} attempts and ${new Date() - start} ms.`);
        }
    }, 20);
})();