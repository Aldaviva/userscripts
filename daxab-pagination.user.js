// ==UserScript==
// @name         Fix Daxab Pagination
// @namespace    https://aldaviva.com/userscripts/fix-daxab-pagination
// @version      0.0.1
// @description  Loading paginated results sometimes breaks, so add a manual retry mechanism
// @author       Ben Hutchison
// @match        https://biqle.ru/video/*
// @match        https://daftsex.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.$;

    console.info("Loaded Fix Daxab Pagination user script");

    $(document).ajaxComplete(function(event, jqXhr, settings){
        var responseBody = jqXhr.responseText;
        var isFailedResponse = responseBody.indexOf("more(this)") === -1 && responseBody.indexOf("runtime()") !== -1;

        if(isFailedResponse){
            window._page--;
            $(".videos").append('<div class="more" onclick="more(this);"><div id="progress_more" style="display: none;"></div><div>Show more</div></div>');
            console.info("Request failed, reverted page to "+window._page+" and recreated More button");
        }
    });
})();