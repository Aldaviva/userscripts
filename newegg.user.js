// ==UserScript==
// @name         NewEgg
// @namespace    https://aldaviva.com/userscripts/newegg
// @version      0.0.1
// @description  Add more years to recent orders filter dropdown
// @author       Ben Hutchison
// @match        https://secure.newegg.com/NewMyAccount/OrderHistory.aspx*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    var earliestDesiredYear = 2003;

    setInterval(function(){
        var selectEl = document.querySelector(".selectOrderTimeRegion");

        if(selectEl){
            var earliestExistingYear = Math.min.apply(null, Array.from(selectEl.children)
                                                      .map(function(option){ return option.value; })
                                                      .filter(function(value){ return value > 120; }));

            var currentOptionLabel = selectEl.nextElementSibling.innerText;

            for(var year = earliestExistingYear - 1; year >= earliestDesiredYear && earliestExistingYear !== Infinity; year--){
                var option = document.createElement("option");
                option.value = year;
                option.innerText = "within Year " + year;
                option.selected = (option.innerText === currentOptionLabel);
                selectEl.appendChild(option);
            }
        }
    }, 500);
})();
