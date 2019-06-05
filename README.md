# userscripts
User scripts that make my web browsing better.

Good user interfaces should
- do what I want by default,
- or if not by default, at least let me choose what I want,
- and when I tell it what I want, the UI should remember that and not make me perform the same annoying actions every single time I use it.

Bad user interfaces
- forget my choices
- or don't give me choices in the first place.

## Installation
1. Install a user script extension in your browser. Some available implementations to pick from:
    - [**Tampermonkey**](https://tampermonkey.net/) works in Chrome, Firefox, Edge (not IE), Safari, Opera, and Vivaldi.
    - [Violentmonkey](https://violentmonkey.github.io/get-it/) works in Chrome, Firefox, Opera, and Vivaldi.
    - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) works in Firefox.
1. Click the site name in the [table below](#targeted-websites).
    - Alternately, you can open the user script file from this repository that you want, then click the Raw button.
1. On the Tampermonkey page that appears, click the **Install** button.

*Instructions are written for Tampermonkey 4.6. Other extensions may need different steps.*

## Targeted websites

|Site|Changes|
|---|---|
|[Inoreader](https://github.com/Aldaviva/userscripts/raw/master/inoreader-video-controls.user.js)|When showing an article with a video, make the video muted, loop, and autoplay, since Inoreader capriciously removes these attributes.|
|[Rooster Teeth](https://github.com/Aldaviva/userscripts/raw/master/rooster-teeth-volume-persistence.user.js)|When watching a Rooster Teeth video, remember the most recently used audio volume, instead of always resetting the volume to 100% when you load a new page. Always set the resolution to the largest frame size (typically 1080p) when starting a video, instead of defaulting to a lower automatic resolution.|
|[YouTube](https://github.com/Aldaviva/userscripts/raw/master/force-youtube-theater-mode.user.js)|When watching a YouTube video, force the page into Theater Mode, where the video's width expands to also include the Related Videos column on the right. YouTube does a terrible job of remembering the most-recently-used Theater mode state.|
