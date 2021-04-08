// ==UserScript==
// @name         Twitter
// @namespace    https://aldaviva.com/userscripts/twitter
// @version      1.2.0
// @description  Always show Latest Tweets First on the home timeline, instead of Top Tweets First. Ignore unread notifications, but still show unread DMs. Don't automatically reload all the time.
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

        //setTimeout(ignoreNotifications, 500); //wait for title el to be created

        preventAutoReloading();
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
                const titlePrefix = directMessageCount > 0 ? `(${directMessageCount}) ` : "";
                const newTitleValue = titleEl.text.replace(titleNotificationCountPattern, titlePrefix);
                titleEl.text = newTitleValue;

                if(directMessageCount === 0){
                    faviconEl.setAttribute("href", normalFaviconValue);
                }
            }
        }

        hideUnreadNotifications();
    }

    function preventAutoReloading(){
        /* We're looking for a module containing
          , p = e=>{
            const t = Date.now();
            let n = t;
            const i = document.cookie
              , o = u(i);
            let d = !0;
            const p = e=>{
                d = e
            }
              , h = e=>{
                const r = Date.now();
                if ("active" === e) {
                    if (d) {
                        const e = r - t
                          , i = r - n
                          , o = e >= 576e5 && i >= 12e4 || e >= 864e5;
                        !s.a.isLocked() && o && window.location.reload(!0)
                    }
                    m()
                } else
                    n = r
            }
        */
        const reloaderMethodPattern = /=Date\.now\(\).*?\b(?<methodName>\w{1,3})=\w{1,3}=>{const \w{1,3}=Date\.now\(\).*?window\.location\.reload\(/gm;
        const originalDateNow = Date.now;
        const reloaderMethodName = findReloaderMethodName();

        Object.defineProperty(Date, "now", {
            value: function() {
                const shouldReturnFakeResult = isExecutingReloaderMethod();
                //if(shouldReturnFakeResult){
                //    console.debug("Returning Date.now() = 0");
                //}
                return shouldReturnFakeResult ? 0 : originalDateNow();
            },
            writable: false,
            configurable: false
        });

        function findReloaderMethodName(){
            for(let bucket of window.webpackJsonp){
                for(let moduleName in bucket[1]){
                    const module = bucket[1][moduleName];
                    const moduleSource = module.toString();
                    const match = reloaderMethodPattern.exec(moduleSource);
                    if(match !== null){
                        //console.debug("found reloader in module "+moduleName);
                        //console.debug(moduleSource);
                        return match.groups.methodName;
                    }
                }
            }
            console.warn("Could not find method that reloads the page");
            return null;
        }

        function isExecutingReloaderMethod(){
            const stack = new Error().stack;

            const methodNamesToFind = [
                reloaderMethodName, //page was focused, reload entire page
                "Object.fetchTop", //page was focused, update timeline
                "fetchInitialOrTop", //timeline was scrolled up to top
                //"ue._fetchInitialOrTop", //always appears with above method
                //"Object.fetchInitialOrTop" //appears on its own
            ].filter(x => x !== null);

            //V8-specific stacktrace format, SpiderMonkey has a different format
            const isMatchingStack = methodNamesToFind.some(methodName => stack.indexOf(`\n    at ${methodName} (`) !== -1);

            /*if(isMatchingStack){
                console.debug("Found matching invocation: "+stack);
            } else {
                console.debug(`Other call to Date.now() at ${performance.timeOrigin + performance.now()}:`, stack);
            }*/
            return isMatchingStack;
        }
    }

})();