// ==UserScript==
// @name         Create Passkeys Anywhere
// @namespace    https://aldaviva.com/userscripts/create-passkeys-anywhere
// @version      0.0.3
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
        const authenticatorAttachment = authenticatorAttachments[options.allowedPasskeyCreationStorage];
        const publicKey = opts?.publicKey;
        if(authenticatorAttachment === undefined){
            console.warn("Create Passkeys Anywhere: Unknown allowedPasskeyCreationStorage value "+options.allowedPasskeyCreationStorage+", allowed values are anywhere, securityKey, and tpm");
        } else if(publicKey){
            publicKey.authenticatorSelection ??= {};
            delete publicKey.authenticatorSelection.userVerification;
            if(authenticatorAttachment){
                publicKey.authenticatorSelection.authenticatorAttachment = authenticatorAttachment;
            } else {
                delete publicKey.authenticatorSelection.authenticatorAttachment;
            }

            if(publicKey.rp?.id === "bitbucket.org"){
                // Fixes Bitbucket 400 error from new passkey upload on certain computers (Win11+fingerprint+STM TPM, but neither Win11+PIN+AMD TPM nor Android+fingerprint)
                // Thanks Erina: https://bsky.app/profile/satragno.bsky.social/post/3lxf5o5djls2u
                publicKey.attestation = "none";
            }
        }
        return originalCreate.call(navigatorCredentials, opts);
    };

})();
