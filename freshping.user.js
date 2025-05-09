// ==UserScript==
// @name         Freshping
// @namespace    https://aldaviva.com/userscripts/freshping
// @version      0.0.0
// @description  Maximum default report duration
// @author       Ben Hutchison
// @match        https://*.freshping.io/reports*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /**
     * Element found using
     * (function findRecursively(needle, haystack, path, mark){ mark ||= "__visited"+Math.random()*1e17; try { if(haystack === null || haystack === undefined || haystack[mark]===true){ return null;} haystack[mark]=true; for(var childName in haystack) { if(haystack[childName] === needle) { return path+"."+childName; } } for(var childName in haystack) { if(haystack[childName] === haystack) { continue; } var successfulPath = findRecursively(needle, haystack[childName], path+"."+childName, mark); if(successfulPath !== null) { return successfulPath; }} return null; } catch(e){ return null; }})(window.myReport, $0, "$0")
     */
    waitUntilElementsBySelector([".App-main > div"], 200, new Date() + 5000, (err, els) => {
        const reportsEl = els[0][0];
        const reports = reportsEl[Object.keys(reportsEl).find(k => k.startsWith("__reactInternalInstance$"))].return.stateNode;

        const earliestReportDate = new Date();
        earliestReportDate.setDate(earliestReportDate.getDate() - 90);
        reports.setState({
            startDate: earliestReportDate.getDate() + " " +monthAbbreviations[earliestReportDate.getMonth()] + " " + earliestReportDate.getFullYear()
        });

        reports.handleChange();
        reports.handleTimeChange();
    });

    function waitUntilElementsBySelector(selectors, retryInterval, deadline, callback) {
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
