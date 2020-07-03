// ==UserScript==
// @name         Twitter
// @namespace    https://aldaviva.com/userscripts/twitter
// @version      1.1.0
// @description  Always show Latest Tweets First on the home timeline, instead of Top Tweets First. Ignore unread notifications, but still show unread DMs.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    main();

    function main(){
        setInterval(ensureLatestTweetsFirst, 1 * 60 * 1000);
        ensureLatestTweetsFirst();

        setTimeout(ignoreNotifications, 500); //wait for title el to be created
    }

    function ensureLatestTweetsFirst(){
        if(isShowingTopTweetsFirst()){
            toggleTopTweetsFirst();
        }
    }

    function isShowingTopTweetsFirst(){
        const headingEl = document.querySelector('div[data-testid="primaryColumn"] h2 span');
        return headingEl && headingEl.innerText === "Home";
    }

    function toggleTopTweetsFirst(){
        document.querySelector('div[aria-label ^= "Top Tweets"]').click();
        document.querySelector('div[role="menuitem"]').click();
    }

    function ignoreNotifications(){
        const normalFaviconValue = "https://abs.twimg.com/favicons/twitter.ico";
        const titleNotificationCountPattern = /^\(([\d,]+)\)\s+/;

        const faviconEl = document.querySelector("head link[rel='shortcut icon']");
        const titleEl = document.querySelector("head title");
        const directMessageNavLink = document.querySelector("nav a[data-testid = 'AppTabBar_DirectMessage_Link']");

        const observer = new MutationObserver(hideUnreadNotifications);
        observer.observe(faviconEl, { attributeFilter: ["href"], attributes: true });
        observer.observe(titleEl, { characterData: true, childList: true });

        function hideUnreadNotifications(){
            const oldFaviconValue = faviconEl.getAttribute("href");
            const oldTitleValue = titleEl.text;

            const titleMatches = titleNotificationCountPattern.exec(titleEl.text);
            const titleNotificationCount = titleMatches !== null ? parseInt(titleMatches[1]) : 0;

            const directMessageCountEl = directMessageNavLink.querySelector("div[aria-label $= 'unread items']");
            const directMessageCount = directMessageCountEl !== null ? parseInt(directMessageCountEl.innerText, 10) : 0;

            const hasUnreadNotifications = titleNotificationCount > directMessageCount;

            if(hasUnreadNotifications) {
                const titlePrefix = directMessageCount > 0 ? "("+directMessageCount+") " : "";
                const newTitleValue = titleEl.text.replace(titleNotificationCountPattern, titlePrefix);
                titleEl.text = newTitleValue;

                if(directMessageCount === 0){
                    faviconEl.setAttribute("href", normalFaviconValue);
                }
            }
        }

        hideUnreadNotifications();
    }

})();