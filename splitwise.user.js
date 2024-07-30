// ==UserScript==
// @name         Splitwise
// @namespace    https://aldaviva.com/userscripts/splitwise
// @version      0.2.0
// @description  Disable Splitwise keyboard shortcuts. Add more automatic categories. Make currency inputs numeric.
// @author       Ben Hutchison
// @match        https://secure.splitwise.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    'use strict';

    const $ = window.$;

    /**
     * Don't close the expense entry modal dialog when pressing Esc or clicking the underlay. This is needed because the dialog box doesn't confirm before losing unsaved changes.
     */
    $.fn.modal.defaults.keyboard = false;
    $(document.head).append($("<style>", { type: "text/css" }).text(".modal-backdrop { pointer-events: none; }"));

    /**
     * Guess more categories automatically.
     */
    const originalGuessCategory = window.guess_category;
    window.App.Models.Expense.prototype.guessCategoryFromDescription = window.guess_category = description => {
        if(/\blucky\b/i.test(description)){
            return getCategoryIdByName("Groceries");
        } else if(/\bPG&?E\b/i.test(description)){
            return getCategoryIdByName("Heat/gas");
        } else {
            return originalGuessCategory(description);
        }
    };

    function getCategoryIdByName(name){
        return window.App.categories.detect(category => category.get("name") === name).id;
    }

    /**
     * Make currency inputs of type numeric, not text, so they disallow commas and other invalid characters
     */
    const originalItemizedItemTemplate = window.JST["backbone/templates/modals/itemized-item"];
    window.JST["backbone/templates/modals/itemized-item"] = obj => {
        const originalTemplate = originalItemizedItemTemplate(obj);
        return originalTemplate.replace('<input type="text" name="amount" class="amount" ', '<input type="number" step="0.01" name="amount" class="amount" ');
    };
})();
