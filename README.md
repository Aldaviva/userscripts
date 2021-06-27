# userscripts
User scripts that make my web browsing better.

Good user interfaces should
- do what I want by default,
- or if not by default, at least let me choose what I want,
- and when I tell it what I want, the UI should remember that and not make me perform the same annoying actions every single time I use it.

Bad user interfaces
- don't handle exceptional situations,
- forget my choices,
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
|[Daxab](https://github.com/Aldaviva/userscripts/raw/master/daxab-pagination.user.js)|When searching for videos on Daxab-based sites, pagination will intermittently encounter a spurious error, which returns no results and removes the button to load more results. This is due to horrendous error handling on the server. Detect this case, and restore the page to approximately the state it was in before the error, so the user can try again and not lose all their paginated data by reloading.|
|[Inoreader toolbar buttons](https://github.com/Aldaviva/userscripts/raw/master/inoreader-toolbar-buttons.user.js)|Add two buttons to the top-left toolbar to add and manage subscriptions. Designed to work with the [Inoreader user style](https://raw.githubusercontent.com/Aldaviva/userstyles/master/styles/inoreader.user.css).|
|[Inoreader video controls](https://github.com/Aldaviva/userscripts/raw/master/inoreader-video-controls.user.js)|When showing an article with a video, make the video muted, loop, and autoplay, since Inoreader capriciously removes these attributes.|
|[Pandora](https://github.com/Aldaviva/userscripts/raw/master/pandora-now-playing.user.js)|Show the currently playing artist and song title in the Pandora document title.|
|[Rooster Teeth](https://github.com/Aldaviva/userscripts/raw/master/rooster-teeth-volume-persistence.user.js)|When watching a Rooster Teeth video, remember the most recently used audio volume, instead of always resetting the volume to 100% when you load a new page. Always set the resolution to the largest frame size (typically 1080p) when starting a video, instead of defaulting to a lower automatic resolution.|
|[Splitwise](https://github.com/Aldaviva/userscripts/raw/master/splitwise.user.js)|If you're entering a long list of items in an itemized expense and accidentally hit `Esc` at any time, Splitwise will lose all of the data you have entered without prompting you or saving a backup. This fixes that defect, so hitting `Esc` will do nothing.|
|[Twitch](https://github.com/Aldaviva/userscripts/raw/master/twitch.user.js)|Automatically claim channel points.|
|[Twitter chronological timeline](https://github.com/Aldaviva/userscripts/raw/master/twitter-chronological.user.js)|Show tweets on the home timeline in the order they were posted, not Top Tweets First.|
|[Twitter disable auto-reload](https://github.com/Aldaviva/userscripts/raw/master/twitter-disable-auto-reload.user.js)|Stop the web interface from showing new tweets and reloading all the time. Click the Home button to manually load new tweets.|
|[Twitter ignore notifications](https://github.com/Aldaviva/userscripts/raw/master/twitter-ignore-notifications.user.js)|Hide unread count for all notifications except DMs in the navigation bar, favicon, and page title.|
|[YouTube](https://github.com/Aldaviva/userscripts/raw/master/force-youtube-theater-mode.user.js)|When watching a YouTube video, force the page into Theater Mode, where the video's width expands to also include the Related Videos column on the right. YouTube does a terrible job of remembering the most-recently-used Theater mode state.|
