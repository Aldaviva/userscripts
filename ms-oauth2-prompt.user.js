// ==UserScript==
// @name         Microsoft OAuth2 Authentication Prompt
// @namespace    https://aldaviva.com/userscripts/ms-oauth
// @version      0.0.0
// @description  Save time and clicks if you're already signed in by skipping the prompt that forces you to click your existing account. Instead, just immediately, automatically proceed with your signed-in account.
// @author       Ben Hutchison
// @match        https://login.microsoftonline.com/common/oauth2/v2.0/authorize?*prompt=select_account*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if (getQueryParam("prompt") === "select_account") {
        window.location.search = window.location.search.replace(/(?<=[?&])prompt=select_account(?:&|$)/i, "");
    }

    /**
     * Inspired by Grant J. Butler's very fast Query String Parsing (variant.js)
     * Ben added URI decoding and multi-value support because he doesn't care about 140 character limits.
     * He also fixed it to support multiple consecutive ampersands, which Google Images sometimes uses, and seem to be valid in URLs.
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
    function getQueryParam(key, locationSearch) {
        /* eslint-disable */
        return (function e(k,s,b,c){if(e.a==[]._)for(b=/\??([^=\[\]]+)(?:\[\])?=([^&]+)&?/g,e.a={};c=b.exec(s);e.a[c[1]]=(e.a[c[1]]||[]).concat(window.decodeURIComponent(c[2])));c=e.a[k];c=c instanceof Array&&c.length<2?c[0]:c;return c;})(key, locationSearch || window.location.search);
    }
})();
