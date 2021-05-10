// ==UserScript==
// @name         Splitwise
// @namespace    https://aldaviva.com/userscripts/splitwise
// @version      0.0.2
// @description  Disable Splitwise keyboard shortcuts. Add more automatic categories.
// @author       Ben Hutchison
// @match        https://secure.splitwise.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    'use strict';

    window.$.fn.modal.defaults.keyboard = false;

    const originalGuessCategory = window.guess_category;
    window.App.Models.Expense.prototype.guessCategoryFromDescription = window.guess_category = function(description){
        if(/\blucky\b/i.test(description)){
            return getCategoryIdByName("Groceries");
        } else {
            return originalGuessCategory(description);
        }
    };

    function getCategoryIdByName(name){
        return window.App.categories.detect(function(category){ return category.get("name") === name; }).id;
    }
})();