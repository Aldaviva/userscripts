// ==UserScript==
// @name         Inoreader toolbar buttons
// @namespace    https://aldaviva.com/userscripts/inoreader-toolbar-buttons
// @version      0.0.1
// @description  Add useful toolbar buttons to Inoreader
// @author       Ben Hutchison
// @match        https://www.inoreader.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    var parent = document.getElementById("sb_tp_buttons");

    parent.appendChild(createButton("Subscribe", function(event){
        window.show_add_options();
    }));

    parent.appendChild(createButton("Manage", function(event){
        window.show_dialog('preferences_dialog', { focus_tab: 2 });
    }));

    function createButton(label, onClick){
        var buttonEl = document.createElement("div");
        buttonEl.setAttribute("class", "inno_toolbar_button");
        buttonEl.addEventListener("click", onClick);

        var labelEl = document.createElement("span");
        labelEl.setAttribute("class", "inno_toolbar_button_caption");
        labelEl.appendChild(document.createTextNode(label));
        buttonEl.appendChild(labelEl);

        return buttonEl;
    }
})();
