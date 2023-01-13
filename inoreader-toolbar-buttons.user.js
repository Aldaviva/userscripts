// ==UserScript==
// @name         Inoreader toolbar buttons
// @namespace    https://aldaviva.com/userscripts/inoreader-toolbar-buttons
// @version      0.3.0
// @description  Add useful toolbar buttons to Inoreader
// @author       Ben Hutchison
// @match        https://www.inoreader.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    addSubscribeAndManageButtons();

    showStarredFilterButton();

    makeFeedGearOpenSidebarPreferences();

    makeFeedEyeToggleHidingReadFeeds();

    function addSubscribeAndManageButtons(){
        var parent = document.getElementById("sb_tp_buttons");

        parent.appendChild(createButton("Subscribe", function(event){
            window.show_add_options();
        }));

        parent.appendChild(createButton("Manage", function(event){
            window.show_dialog("preferences_dialog", { focus_tab: 2 });
        }));
    }

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

    function showStarredFilterButton(){
        var originalToolbarSwitcher = window.inno_toolbar_switcher;

        window.inno_toolbar_switcher = function(id, buttons, switch_function){
            if(buttons.length < 3){
                buttons.push({
                    id: "favorites_cnt_top",
                    caption: window._js("Starred"),
                    value: 2,
                    active: false
                });
            }

            return originalToolbarSwitcher(id, buttons, switch_function);
        };
    }

    function makeFeedGearOpenSidebarPreferences(){
        document.querySelector(".sf_cog").onclick = function(event){
            event.preventDefault();
            console.log("showing sidebar prefs");
            window.location = "#preferences-interface-tree_pane";
        };
    }

    function makeFeedEyeToggleHidingReadFeeds(){
        var parent = document.querySelector(".sidebar_legend");
        var toggleButton = document.createElement("div");
        toggleButton.classList.add("toggle_hide_read_feeds", "icon16", "icon-eyeball", "pointer_icon");
        render();
        parent.insertBefore(toggleButton, document.getElementById("subscription_options_peek_wrapper"));

        toggleButton.addEventListener("click", function(event){
            event.preventDefault();
            var newValue = +!window.hide_read_feeds;
            window.hide_read_feeds = newValue;
            render();
            window.xajax_save_user_pref("hide_read_feeds", ""+newValue);
        });

        function render(){
            toggleButton.classList.toggle("hiding_read_feeds", !!window.hide_read_feeds);
            toggleButton.title = window.hide_read_feeds ? "Show all feeds" : "Show only feeds with unread articles";
        }
    }
})();
