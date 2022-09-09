// ==UserScript==
// @name         Fix Daxab Downloads
// @namespace    https://aldaviva.com/userscripts/fix-daxab-downloads
// @version      0.4.0
// @description  Daxab tries really hard to not show you the video URL to prevent you from downloading it. Lots of obfuscated code and DOM elements that can't be inspected.
// @author       Ben Hutchison
// @match        https://daxab.com/player/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function(){

    const $ = window.$;

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url){
        //console.debug("opening xhr:", method, url, this);

        const a = document.createElement("a");
        a.href = url;

        a.pathname = a.pathname.replace(/(\/index\.m3u8)?(\/)?$/, '');

        const suffixMatch = a.pathname.match(/(180|240|360|480|720|1080)(\.mp4)?$/);
        if(suffixMatch !== null){
            if(suffixMatch[1] !== ".mp4"){
                a.pathname += ".mp4";
            }

            //console.info("Adding download button for URL "+a.href);
            addDownloadButton(a.href);
        } else {
            //console.debug("URL does not refer to a video: "+a.href);
        }

        return originalOpen.apply(this, arguments);
    };

    const reloadChecker = setInterval(function(){
        if($("._text").text() === "Video deleted or private"){
            clearInterval(reloadChecker);
            console.info("Video not found, but trying again enough times often works. Reloading page.");
            window.location.reload();
        }
    }, 1000);

    new MutationObserver(onMutation).observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["src"]
    });

    function onMutation(mutations, observer){
        mutations.forEach(mutation => {
            const newAttributeValue = mutation.target[mutation.attributeName];
            if(mutation.target.tagName.toLowerCase() === "video" && mutation.attributeName === "src" && newAttributeValue !== "" && newAttributeValue.startsWith("http")){
                let videoUrl = newAttributeValue;

                addDownloadButton(videoUrl);
            }
        });
    }

    function addDownloadButton(videoUrl){
        console.info("Video URL is "+videoUrl);

        $('.videoplayer_controls')
            .append($("<div>")
                    .addClass("videoplayer_controls_item videoplayer_btn __right")
                    .append($("<a>")
                            .attr({
                                href: videoUrl,
                                title: "Download video",
                                target: "_blank"
                            })
                            .append($('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" focusable="false">' +
                                      '<path fill="#FFF" d="M8.34,17.66L0.28,8.31c-0.49-0.56-0.09-1.44,0.66-1.44h16.13c0.74,0,1.15,0.87,0.66,1.44l-8.07,9.35 C9.31,18.06,8.69,18.06,8.34,17.66z" />' +
                                      '<path fill="#FFF" d="M6.99,0.04h4.01c0.48,0,0.87,0.39,0.87,0.87v7.64c0,0.48-0.39,0.87-0.87,0.87H6.99 c-0.48,0-0.87-0.39-0.87-0.87V0.91C6.12,0.43,6.51,0.04,6.99,0.04z" />' +
                                      '</svg>')
                                    .height(18))));

        $(".videoplayer_quality_select").width(24);
    }

})();
