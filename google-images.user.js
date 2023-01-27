// ==UserScript==
// @name         Google Images
// @namespace    https://aldaviva.com/userscripts/google.search.images
// @version      0.0.0
// @description  Always search for Large sizes in Google Images
// @author       Ben Hutchison
// @match        https://www.google.com/search?*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const isImageSearchResultsPage = getQueryParam("tbm") === "isch";
    const isSizeFilterEnabled = getQueryParam("tbs") !== undefined;

    if (isImageSearchResultsPage && !isSizeFilterEnabled) {
        window.location.href += "&tbs=isz:l";
    }

    /**
     * Inspired by Grant J. Butler's very fast Query String Parsing (variant.js)
     * Ben added URI decoding and multi-value support because he doesn't care about 140 character limits
     *
     * original gist: https://gist.github.com/grantjbutler/987036#file-variant-js
     * tests: http://jsbin.com/giladi/1/edit?js,output
     * performance: http://jsperf.com/query-string/2
     *
     * does not support n-dimensions arrays where n > 1 such as ?foo[][]=bar
     * does not support query params that are not in key=value format such as ?foo
     *
     * If a single value is defined in location.search for the query param, a String will be returned with the value.
     * If multiple values are defined, an Array will be returned with all values in order.
     *
     * example location.search: "?a=A&b=B&b=BB&c[]=C&c[]=CC"
     * queryParam("a") => "A"
     * queryParam("b") => [ "B", "BB" ]
     * queryParam("c") => [ "C", "CC" ]
     * queryParam("d") => undefined
     *
     * @param key String the query param key you want to get
     * @param search String the query param portion of the URL you want to inspect, starting with "?", or null/undefined to use window.location.search
     * @return String|Array value(s) of the query param, or undefined if no query param exists. Result is URL-decoded.
     */
    function getQueryParam(key, locationSearch){
        /* eslint-disable */
        return (function e(k,s,b,c){if(e.a==[]._)for(b=/\??([^=\[\]]+)(?:\[\])?=([^&]+)&?/g,e.a={};c=b.exec(s);e.a[c[1]]=(e.a[c[1]]||[]).concat(window.decodeURIComponent(c[2])));c=e.a[k];c=c instanceof Array&&c.length<2?c[0]:c;return c;})(key, locationSearch || window.location.search);
    }
})();
