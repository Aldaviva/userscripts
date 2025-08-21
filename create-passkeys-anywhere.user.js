// ==UserScript==
// @name         Create Passkeys Anywhere
// @namespace    https://aldaviva.com/userscripts/create-passkeys-anywhere
// @version      0.0.1
// @description  Let you choose where to store a newly created passkey, on a security key or in the TPM
// @author       Ben Hutchison
// @match        https://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    /**
     * If options changes aren't taking effect, remember to reload the target webpage after saving this script.
     */
    const options = {

        /**
         * Control where newly created passkeys are allowed to be stored.
         * values: anywhere, securityKey, tpm
         */
        allowedPasskeyCreationStorage: "anywhere"

    };

    const navigatorCredentials = navigator.credentials;
    const originalCreate = navigatorCredentials.create;
    const authenticatorAttachments = { "anywhere": null, "securityKey": "cross-platform", "tpm": "platform" };

    navigatorCredentials.create = function(opts){
        const publicKey = opts?.publicKey;
        if(publicKey){
            const authenticatorAttachment = authenticatorAttachments[options.allowedPasskeyCreationStorage];
            if(authenticatorAttachment !== undefined){
                publicKey.authenticatorSelection ??= {};
                publicKey.authenticatorSelection.authenticatorAttachment = authenticatorAttachment;
            } else {
                console.warn("Create Passkeys Anywhere: Unknown allowedPasskeyCreationStorage value "+options.allowedPasskeyCreationStorage+", allowed values are anywhere, securityKey, and tpm");
            }
        }
        return originalCreate.call(navigatorCredentials, opts);
    };

})();
