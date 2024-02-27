// ==UserScript==
// @name         Newegg
// @namespace    https://aldaviva.com/userscripts/newegg
// @version      0.0.0
// @description  Allow you to load order history for any year, not just the last 10 years
// @author       Ben Hutchison
// @match        https://secure.newegg.com/orders/list*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const MIN_YEAR = 2001;

    let nextChunkId = 999999;
    let nextModuleId = 888888;

    inject(window.webpackChunkb2c_site_ssl, function(require) {
        const httpClient = require(".prototype.processResponse=function(");

        const httpClientPrototype = Object.getPrototypeOf(httpClient[Object.getOwnPropertyNames(httpClient)[0]]);
        const originalProcessResponse = httpClientPrototype.processResponse;
        httpClientPrototype.processResponse = function(httpContext) {
            originalProcessResponse.apply(this, arguments);

            const requestUrl = new URL(httpContext.request.responseURL);
            if (requestUrl.pathname === "/orders/api/OrderDistribution") {
                const years = httpContext.data.Years;
                for (let year = parseInt(years.at(-1).Value,10) - 1; year >= MIN_YEAR; year--) {
                    years.push({ Name: `Year ${year}`, Value: '' + year });
                    console.log(`Added order history year option ${year}`);
                }
            }
        };
    });

    function inject(webpackRoot, moduleFunction){
        const chunkId = nextChunkId++;
        const moduleId = nextModuleId++;

        let chunk = {};
        chunk[moduleId] = function(e, t, getDependencyById){
            moduleFunction(require);

            function require(dependencySourcePredicate) {
                if(typeof dependencySourcePredicate === "string"){
                    const needle = dependencySourcePredicate;
                    dependencySourcePredicate = (funcSource) => funcSource.indexOf(needle) !== -1;
                }

                return getDependencyById(findModuleId(webpackRoot, dependencySourcePredicate));
            }
        };

        webpackRoot.push([[chunkId], chunk, function(e) {
            const func = e[Object.getOwnPropertyNames(e).find(key => e[key] instanceof Function && e[key].length === 4)];
            func(0, [], function() {
                return e(moduleId);
            });
        }]);
    }

    function findModuleId(webpackRoot, moduleFunctionPredicate) {
        for (const chunk of webpackRoot) {
            for (const moduleId in chunk[1]) {
                const module = chunk[1][moduleId];
                if (moduleFunctionPredicate(module.toString())) {
                    return moduleId;
                }
            }
        }
        return null;
    }

})();
