// ==UserScript==
// @name         Twitter Disable Auto-Reloading
// @namespace    https://aldaviva.com/userscripts/twitter/disable-auto-reloading
// @version      1.2.3
// @description  Don't automatically reload all the time.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

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
    const stackContainsMethod = getStackMatcherForCurrentJavascriptEngine();

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
        for(let bucket of window.webpackChunk_twitter_responsive_web){
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

        const isMatchingStack = methodNamesToFind.some(methodName => stackContainsMethod(stack, methodName));

        /*if(isMatchingStack){
            console.debug("Found matching invocation:", stack);
        } else {
            console.debug(`Other call to Date.now() at ${performance.timeOrigin + performance.now()}:`, stack);
        }*/
        return isMatchingStack;
    }

    function getStackMatcherForCurrentJavascriptEngine(){
        if(navigator.userAgent.indexOf(" Chrome/") !== -1){
            return (stack, methodName) => stack.indexOf(`\n    at ${methodName} (`) !== -1;
        } else if(navigator.userAgent.indexOf(" Firefox/") !== -1){
            return (stack, methodName) => stack.indexOf(`\n${methodName}@`) !== -1;
        } else {
            return () => false;
        }
    }

})();