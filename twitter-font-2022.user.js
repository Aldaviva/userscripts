// ==UserScript==
// @name         Twitter demusking
// @namespace    https://aldaviva.com/userscripts/twitter-font-2022
// @version      0.3.0
// @description  Revert the font changes that were made on 2023-01-26: Chirp got a higher x-height, terminal on `l`, serifs on `I`, and slash on `0` (https://www.theverge.com/2023/1/26/23572746/twitter-changed-font-impersonators). Revert the logo and title changes that were made on or around 2023-07-24 (https://www.theverge.com/2023/7/24/23805415/twitter-x-logo-rebrand-bird-farewell-to-birds). Make the home nav button a birdhouse again.
// @author       Ben Hutchison
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector("head link[rel='shortcut icon']").href = "//abs.twimg.com/favicons/twitter.2.ico";

    const hideLogoStyle = document.createElement("style");
    hideLogoStyle.textContent = `:is(h1[role=heading] a, #placeholder) svg:not(.bird) {
    display: none;
}`;
    document.head.appendChild(hideLogoStyle);

    const fontInterval = setInterval(() => {
        const fontStyleEl = Array.prototype.slice.apply(document.querySelectorAll("head style"))
            .find(el => el.textContent.startsWith("@font-face"));

        if(fontStyleEl){
            clearInterval(fontInterval);
            fontStyleEl.textContent = `@font-face {
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
        }
    }, 100);

    /* Replace X logo with original bird logo */
    const birdLogoCoordinates = "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z";
    const logoInterval = setInterval(() => {
        const logoEl = document.querySelector(":is(h1[role=heading] a, #placeholder) svg:not(.bird)");
        if(logoEl){
            const birdLogoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            birdLogoPath.setAttribute("d", birdLogoCoordinates);
            logoEl.replaceChildren(birdLogoPath);
            logoEl.classList.add("bird");

            if(logoEl.closest("h1[role=heading]") !== null){
                clearInterval(logoInterval);
                document.head.removeChild(hideLogoStyle);
            }
        }
    }, 20);

    /* Replace the home nav button's house logo with the original birdhouse */
    const birdhouseCoordinates = "M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z";
    const birdhouseInterval = setInterval(() => {
        const logoEl = document.querySelector("nav a[aria-label = 'Home'] svg");
        if(logoEl){
            const birdhousePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            birdhousePath.setAttribute("d", birdhouseCoordinates);
            logoEl.replaceChildren(birdhousePath);
            clearInterval(birdhouseInterval);
        }
    }, 20);

    setTimeout(() => {
        clearInterval(fontInterval);
        clearInterval(logoInterval);
        clearInterval(birdhouseInterval);
    }, 30*1000);

    document.addEventListener("DOMContentLoaded", () => {
        const titleReplacements = [
            [/^X$/, "Twitter"],
            [/ \/ X$/, " / Twitter"],
            [/ on X: "/, " on Twitter: \""]
        ];

        function fixTitle(){
            const oldTitle = document.title;
            let newTitle = oldTitle;

            for(const titleReplacement of titleReplacements){
                const pattern = titleReplacement[0];
                const replacement = titleReplacement[1];
                newTitle = newTitle.replace(pattern, replacement);
            }

            if(newTitle !== oldTitle){
                document.title = newTitle;
                console.debug(`Changed title from '${oldTitle}' to '${newTitle}'`);
            }
        }

        const titleElExistInterval = setInterval(() => {
            const titleEl = document.querySelector("head title");
            if(titleEl !== null){
                clearInterval(titleElExistInterval);

                fixTitle();

                new MutationObserver(fixTitle).observe(titleEl, { childList: true });
            }
        }, 20);
    });

})();
