// ==UserScript==
// @name         Bluesky
// @namespace    https://aldaviva.com/userscripts/bluesky
// @version      0.0.1
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

            hideSelfReposts(document.body);

            new MutationObserver(mutations => {
                for (const mutation of mutations){
                    for (const addedNode of mutation.addedNodes){
                        if(addedNode.nodeType === Node.ELEMENT_NODE){
                            hideSelfReposts(addedNode);
                        }
                    }
                }
            }).observe(timelinesParentEl, {
                childList: true,
                subtree: true
            });

            const styleEl = document.createElement("style");
            styleEl.textContent =
                `.repost {
                    display: none;
                }`;
            document.head.appendChild(styleEl);
        }
    });

    function hideSelfReposts(parentEl){
        const feedItems = parentEl.querySelectorAll("div[role=link][data-testid ^= 'feedItem-by-']");
        for (const feedItem of feedItems){
            const repostHeading = feedItem.querySelector(":scope > div > div > div > div");
            if(repostHeading?.firstChild?.textContent === "Reposted by"){
                const repostedByDisplayName = repostHeading.querySelector("span").textContent;
                const postedByDisplayName = feedItem.querySelector(":scope > div + div > div + div > div > div > div").firstChild.textContent;

                if(repostedByDisplayName === postedByDisplayName){
                    feedItem.classList.add("repost");
                    console.log(`Hid repost from ${repostedByDisplayName}`);
                }
            }
        }
    }

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