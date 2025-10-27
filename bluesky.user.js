// ==UserScript==
// @name         Bluesky
// @namespace    https://aldaviva.com/userscripts/bluesky
// @version      0.0.9
// @description  Hide self-reposts
// @author       Ben Hutchison
// @match        https://bsky.app/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const maxWaitSec = 10;
    waitUntilElementsBySelector(["#root div:has(> div > div[data-testid='followingFeedPage'])"], 200, new Date() + maxWaitSec * 1000, (err, els) => {
        if(err){
            console.warn(`Could not find timeline parent after ${maxWaitSec} seconds`);
        } else {
            const timelinesParentEl = els[0][0];
            console.log("Found timeline parent", timelinesParentEl);

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
        for(const feedItem of feedItems){
            const repostedByUsername = feedItem.querySelector(":scope > div > div:nth-child(2) div a[aria-label ^= 'Reposted by']")?.pathname.split('/', 3)[2];
            const postedByUsername = feedItem.querySelector(":scope > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) a[href^='/profile/']")?.pathname.split('/', 3)[2];

            if(repostedByUsername === postedByUsername && repostedByUsername !== undefined){
                feedItem.classList.add("repost");
                console.log(`Hid repost from ${repostedByUsername}`);
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
