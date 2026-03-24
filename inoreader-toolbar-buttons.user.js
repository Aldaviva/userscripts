// ==UserScript==
// @name         Inoreader
// @namespace    https://aldaviva.com/userscripts/inoreader-toolbar-buttons
// @version      1.0.0
// @description  Untag current article
// @author       Ben Hutchison
// @match        https://www.inoreader.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const $ = window.$;

    addUntagKeyboardShortcut();

    function addUntagKeyboardShortcut() {
        document.addEventListener("keydown", event => {
            if (event.key === 'T' && event.shiftKey) {
                const untagButton = findUntagButtons().first();
                if (untagButton.length) {
                    untagButton.click();
                    event.preventDefault();
                }
            }
        });

        window.addEventListener("pushstate", event => {
            findUntagButtons().each(function(index, el) {
                const tagName = el.previousSibling.textContent.trim();
                $(el).attr("title", `Remove "${tagName}" tag from article (Shift+T)`);
            });
        });

        function findUntagButtons() {
            return $(".article-tag-close");
        }
    }

    const originalPushState = window.history.pushState;
    window.history.pushState = function(state, _, url) {
        console.log("pushState: state="+state+", url="+url);
        originalPushState.apply(window.history, arguments);
        window.dispatchEvent(new PushStateEvent(state, url));
    };

    class PushStateEvent extends Event {
        constructor(state, url) {
            super("pushstate");
            this.state = state;
            this.url = url;
        }
    }
})();
