// ==UserScript==
// @name         Create Passkeys Anywhere
// @namespace    https://aldaviva.com/userscripts/create-passkeys-anywhere
// @version      0.0.0
// @description  Always allow you to choose whether newly created passkeys should be stored on either USB security keys (roaming authenticator) or the TPM (platform)
// @author       Ben Hutchison
// @match        https://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const navigatorCredentials = navigator.credentials;
    const originalCreate = navigatorCredentials.create;

    navigatorCredentials.create = function(options){
        const authenticatorSelection = options?.publicKey?.authenticatorSelection;
        if(authenticatorSelection?.authenticatorAttachment){
            delete authenticatorSelection.authenticatorAttachment;
        }
        return originalCreate.call(navigatorCredentials, options);
    };

})();
