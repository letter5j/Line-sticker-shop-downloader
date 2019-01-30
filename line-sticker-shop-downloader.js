// ==UserScript==
// @name         Line sticker shop downloader
// @namespace    https://github.com/letter5j/Line-sticker-shop-downloader.git
// @version      0.1
// @description  one click to download the sticker
// @author       Log
// @match        https://store.line.me/stickershop/product/*
// @grant        none
// @run-at       document-end
// @create       2019-01-31
// @copyright    Log
// @license      MIT License
// @require      https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js
// @contributionURL https://paypal.me/letter5j
// @contributionAmount 1
// ==/UserScript==

(function () {
    'use strict';
    function triggerDownoad(name, url) {

        let buttonList = document.querySelector(".mdCMN08Ul")
        buttonList.insertAdjacentHTML('beforeend', `
                <li class="mdCMN08Li"><a download="${ name}" href="${url}" class="MdBtn01 mdBtn02 downloadBtn"><span class="mdBtn01Inner"><span class="mdBtn01Txt">Download stickers</span></span></a></li>
            `);
        // let aelement = document.createElement('a');
        // aelement.download = name;
        // aelement.href = url;
        // aelement.click();
    }
    let list = document.querySelectorAll(".mdCMN09ImgList span")

    let count = list.length;
    let progress = 0;

    let zip = new JSZip();


    // Generate a directory within the Zip file structure
    let title = document.querySelector(".mdCMN08Ttl").textContent
    let folder = zip.folder(title);


    let callback = function () {
        progress = progress + 1
        if (progress == count) {
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    // Force down of the Zip file
                    let name = title + ".zip";
                    let url = window.URL.createObjectURL(content);
                    triggerDownoad(name, url);
                });
        }
    }


    for (let i = 0; i < list.length; i++) {
        let url = window.getComputedStyle(list[i]).getPropertyValue("background-image").slice(4, -1).replace(/["']/g, "")
        url = url.split(";")[0]
        let stickID = url.split("/")[6]
        // you can do
        fetch(url)
            .then(response => response.blob())
            .then(images => {
                folder.file(stickID + ".png", images);
                callback()
            })

    }


})();