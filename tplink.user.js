// ==UserScript==
// @name         Block TP-Link redirections
// @namespace    https://aldaviva.com/userscripts/tplinkwifiredirect
// @version      0.0.2
// @description  TP-Link AX20 v1.20: Don't redirect to tplinkwifi.net every time I try to log in to my router after the last session expired, because the IP address of that domain in DNS is wrong when DNS over HTTPS is enabled and the router can't intercept my DNS requests
// @author       Ben Hutchison
// @match        http://192.168.0.1/*
// @match        http://192.168.1.1/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let attempts = 0;
    const start = new Date();

    if(window.$ && window.$.su && window.$.su.modulManager){
        const interval = setInterval(() => {
            attempts++;

            const main = window.$.su.moduleManager.query("main");
            if (main) {
                clearInterval(interval);

                main.onLoginTimeout = () => console.info("Not redirecting to tplinkwifi.net. You're welcome!");

                console.info(`Disabled onLoginTimeout so this page stops redirecting to tplinkwifi.net after ${attempts} attempts and ${new Date() - start} ms.`);
            } else if(attempts >= 500) {
                // give up after 10 seconds
                clearInterval(interval);
                console.warn(`Giving up waiting for the main module to load after ${new Date() - start} ms so redirections to tplinkwifi.net can be blocked.`);
            }
        }, 20);
    } else {
        console.debug("Not an affected TP-Link AX20 router webpage, not fixing login page redirection bug");
    }
})();
