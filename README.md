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
|-|-|
|[Bluesky](https://github.com/Aldaviva/userscripts/raw/master/bluesky.user.js)|Hide self-reposts.|
|[Daxab downloads](https://github.com/Aldaviva/userscripts/raw/master/daxab-downloads.user.js)|Add download button to playback toolbar for videos on Daxab-based sites. Left-click to open the video in a new tab, or right-click it and use Save As or a third-party download manager to save the video.|
|[Daxab pagination](https://github.com/Aldaviva/userscripts/raw/master/daxab-pagination.user.js)|When searching for videos on Daxab-based sites, pagination will intermittently encounter a spurious error, which returns no results and removes the button to load more results. This is due to horrendous error handling on the server. Detect this case, and restore the page to approximately the state it was in before the error, so the user can try again and not lose all their paginated data by reloading.|
|[Google Images](https://github.com/Aldaviva/userscripts/raw/master/google-images.user.js)|Always search for Large sizes in Google Images, instead of having to always click Tools › Size › Large every time you change the query.|
|[Inoreader toolbar buttons](https://github.com/Aldaviva/userscripts/raw/master/inoreader-toolbar-buttons.user.js)|Add two buttons to the top-left toolbar to add and manage subscriptions. Designed to work with the [Inoreader user style](https://raw.githubusercontent.com/Aldaviva/userstyles/master/styles/inoreader.user.css).|
|[Inoreader video controls](https://github.com/Aldaviva/userscripts/raw/master/inoreader-video-controls.user.js)|When showing an article with a video, make the video muted, loop, and autoplay, since Inoreader capriciously removes these attributes.|
|[Newegg](https://github.com/Aldaviva/userscripts/raw/master/newegg.user.js)|Allow you to load order history for any year, not just the last 10 years.|
|[Nixplay](https://github.com/Aldaviva/userscripts/raw/master/nixplay.user.js)|Increase the maximum concurrent file upload limit from 3 to 24, because it spends most of its time idle while waiting for S3 instead of saturating my uplink.|
|[Pandora](https://github.com/Aldaviva/userscripts/raw/master/pandora-now-playing.user.js)|Show the currently playing artist and song title in the Pandora document title.|
|[Splitwise](https://github.com/Aldaviva/userscripts/raw/master/splitwise.user.js)|If you're entering a long list of items in an itemized expense and accidentally hit `Esc` at any time, Splitwise will lose all of the data you have entered without prompting you or saving a backup. This fixes that defect, so hitting `Esc` will do nothing. Also prevent you from accidentally entering a comma in an itemized amount textbox when you intended to enter a period, leading to confusing and hard-to-spot miscalculations.|
|[TP-Link AX20](https://github.com/Aldaviva/userscripts/raw/master/tplink.user.js)|Block broken redirections to the wrong IP address every time the router login page loads.|
|[Twitch](https://github.com/Aldaviva/userscripts/raw/master/twitch.user.js)|Automatically claim channel points.|
|[Twitter chronological timeline](https://github.com/Aldaviva/userscripts/raw/master/twitter-chronological.user.js)|Show tweets on the home timeline in the order they were posted, not For You.|
|[Twitter disable auto-reloading](https://github.com/Aldaviva/userscripts/raw/master/twitter-disable-auto-reloading.user.js)|Stop the web interface from showing new tweets and reloading all the time. Click the Home button to manually load new tweets.|
|[Twitter demusking](https://github.com/Aldaviva/userscripts/raw/master/twitter-font-2022.user.js)|Revert the [font changes that were made on 2023-01-26](https://www.theverge.com/2023/1/26/23572746/twitter-changed-font-impersonators) (Chirp got a higher x-height, terminal on `l`, serifs on `I`, and slash on `0`).<br>Revert the [logo and title changes that were made on or around 2023-07-24](https://www.theverge.com/2023/7/24/23805415/twitter-x-logo-rebrand-bird-farewell-to-birds).|
|[Twitter ignore notifications](https://github.com/Aldaviva/userscripts/raw/master/twitter-ignore-notifications.user.js)|Hide unread count for all notifications except DMs in the navigation bar, favicon, and page title.|
|[Wired](https://github.com/Aldaviva/userscripts/raw/master/wired.user.js)|Block the free article limit error.|
|[YouTube](https://github.com/Aldaviva/userscripts/raw/master/force-youtube-theater-mode.user.js)|When watching a YouTube video, force the page into Theater Mode, where the video's width expands to also include the Related Videos column on the right. YouTube does a terrible job of remembering the most-recently-used Theater mode state.|
