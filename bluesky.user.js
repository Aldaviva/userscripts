// ==UserScript==
// @name         Bluesky
// @namespace    https://aldaviva.com/userscripts/bluesky
// @version      0.0.0
// @description  Hide self-reposts
// @author       Ben Hutchison
// @match        https://bsky.app/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const maxWaitSec = 10;
    waitUntilElementsBySelector(["#root > div > div > div > div > div > div"], 200, new Date() + maxWaitSec * 1000, (err, els) => {
        if(err){
            console.info(`Could not find timeline parent after ${maxWaitSec} seconds`);
        } else {
            const timelinesParentEl = els[0][0];
            new MutationObserver(mutations => {
                for (const mutation of mutations){
                    for (const addedNode of mutation.addedNodes){
                        const feedItems = addedNode.nodeType === Node.ELEMENT_NODE ? addedNode.querySelectorAll("div[role=link][data-testid ^= 'feedItem-by-']") : [];
                        for (const feedItem of feedItems){
                            let repostHeading, repostedByUsername, postedByUsername;

                            if((repostHeading = feedItem.querySelector(":scope > div > div > div > div"))
                                && (repostHeading.firstChild?.textContent === "Reposted by")
                                && (repostedByUsername = repostHeading.querySelector("a")?.pathname.split('/', 3)[2])
                                && (postedByUsername = feedItem.querySelector(":scope > div + div > div + div > div > div > a[href^='/profile/']")?.pathname.split('/', 3)[2])
                                && repostedByUsername === postedByUsername){

                                feedItem.classList.add("repost");
                                console.log(`Hid repost from ${repostedByUsername}`);
                            }
                        }
                    }
                }
            }).observe(timelinesParentEl, {
                subtree: true,
                childList: true
            });

            const styleEl = document.createElement("style");
            styleEl.textContent =
                `.repost {
                    display: none;
                }`;
            document.head.appendChild(styleEl);

            console.info("Listening for timeline updates");
        }
    });

    function waitUntilElementsBySelector(selectors, retryInterval, deadline, callback){
        if(typeof selectors.map !== "function"){
            selectors = [selectors];
        }

        const elements = selectors.map(selector => document.querySelectorAll(selector));

        if(elements.every(nodeList => nodeList.length > 0)){
            callback(null, elements);
        } else if(new Date() <= deadline || !(deadline > 0)) {
            setTimeout(waitUntilElementsBySelector.bind(null, selectors, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error(`deadline passed and one or more ${selectors} elements were not found`));
        }
    }
})();