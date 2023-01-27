// ==UserScript==
// @name         Twitter Font 2022
// @namespace    https://aldaviva.com/userscripts/twitter-font-2022
// @version      0.0.0
// @description  Revert the font changes that were made on 2023-01-26 (https://www.theverge.com/2023/1/26/23572746/twitter-changed-font-impersonators)
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    Array.prototype.slice.apply(document.querySelectorAll("head style"))
        .find(el => el.textContent.startsWith("@font-face"))
        .textContent = `@font-face {
  font-family: TwitterChirpExtendedHeavy;
  src: url(https://abs.twimg.com/fonts/v1/chirp-extended-heavy-web.woff2) format('woff2');
  src: url(https://abs.twimg.com/fonts/v1/chirp-extended-heavy-web.woff) format('woff');
  font-weight: 800;
  font-style: 'normal';
  font-display: 'swap';
}
@font-face {
  font-family: TwitterChirp;
  src: url(https://abs.twimg.com/fonts/v2/chirp-regular-web.woff2) format('woff2');
  src: url(https://abs.twimg.com/fonts/v2/chirp-regular-web.woff) format('woff');
  font-weight: 400;
  font-style: 'normal';
  font-display: 'swap';
}
@font-face {
  font-family: TwitterChirp;
  src: url(https://abs.twimg.com/fonts/v2/chirp-medium-web.woff2) format('woff2');
  src: url(https://abs.twimg.com/fonts/v2/chirp-medium-web.woff) format('woff');
  font-weight: 500;
  font-style: 'normal';
  font-display: 'swap';
}
@font-face {
  font-family: TwitterChirp;
  src: url(https://abs.twimg.com/fonts/v2/chirp-bold-web.woff2) format('woff2');
  src: url(https://abs.twimg.com/fonts/v2/chirp-bold-web.woff) format('woff');
  font-weight: 700;
  font-style: 'normal';
  font-display: 'swap';
}
@font-face {
  font-family: TwitterChirp;
  src: url(https://abs.twimg.com/fonts/v2/chirp-heavy-web.woff2) format('woff2');
  src: url(https://abs.twimg.com/fonts/v2/chirp-heavy-web.woff) format('woff');
  font-weight: 800;
  font-style: 'normal';
  font-display: 'swap';
}`;

})();