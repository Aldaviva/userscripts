// ==UserScript==
// @name         Freshping
// @namespace    https://aldaviva.com/userscripts/freshping
// @version      0.1.1
// @description  Maximum default report duration
// @author       Ben Hutchison
// @match        https://*.freshping.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let oldUrlString = window.location.href;

    /**
     * Element found using
     * (function findRecursively(needle, haystack, path, mark){ mark ||= "__visited"+Math.random()*1e17; try { if(haystack === null || haystack === undefined || haystack[mark]===true){ return null;} haystack[mark]=true; for(var childName in haystack) { if(haystack[childName] === needle) { return path+"."+childName; } } for(var childName in haystack) { if(haystack[childName] === haystack) { continue; } var successfulPath = findRecursively(needle, haystack[childName], path+"."+childName, mark); if(successfulPath !== null) { return successfulPath; }} return null; } catch(e){ return null; }})(window.myReport, $0, "$0")
     */
    function setReportDurationToMax(){
        waitUntilElementsBySelector([".App-main > div:first-child:last-child"], 200, new Date() + 5000, (err, els) => {
            if (!err) {
                const reportsEl = els[0][0];
                const reports = reportsEl[Object.keys(reportsEl).find(k => k.startsWith("__reactInternalInstance$"))].return.stateNode;
                if (reports.handleChange) {
                    const earliestReportDate = new Date();
                    earliestReportDate.setDate(earliestReportDate.getDate() - 90);
                    const earliestReportDateString = earliestReportDate.getDate() + " " + monthAbbreviations[earliestReportDate.getMonth()] + " " + earliestReportDate.getFullYear();
                    if (reports.state.startDate !== earliestReportDateString) {
                        reports.setState({ startDate: earliestReportDateString });
                        reports.handleChange();
                    }
                }
            }
        });
    }

    window.addEventListener("pushstate", event => {
        const newUrl = new URL(event.url, window.location.href);
        const newUrlString = newUrl.toString();
        if (oldUrlString !== newUrlString) {
            if (newUrl.pathname == "/reports" && parseInt(newUrl.searchParams.get("check_id"), 10) > 0) {
                setReportDurationToMax();
            }
            oldUrlString = newUrlString;
        }
    });

    const originalPushState = window.history.pushState;
    window.history.pushState = function(state, _, url) {
        originalPushState.apply(window.history, arguments);
        window.dispatchEvent(new PushStateEvent(state, url));
    };

    setTimeout(setReportDurationToMax, 200);

    function waitUntilElementsBySelector(selectors, retryInterval, deadline, callback) {
        if(typeof selectors.map !== "function"){
            selectors = [selectors];
        }

        const elements = selectors.map(selector => document.querySelectorAll(selector));

        if (elements.every(nodeList => nodeList.length > 0)) {
            callback(null, elements);
        } else if (new Date() <= deadline || !(deadline > 0)) {
            setTimeout(waitUntilElementsBySelector.bind(null, selectors, retryInterval, deadline, callback), retryInterval);
        } else {
            callback(new Error(`deadline passed and one or more ${selectors} elements were not found`));
        }
    }

    class PushStateEvent extends Event {
        constructor(state, url) {
            super("pushstate");
            this.state = state;
            this.url = url;
        }
    }

})();
