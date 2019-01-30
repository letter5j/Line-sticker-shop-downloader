// ==UserScript==
// @name         Line sticker shop downloader
// @name:zh-TW   Line 貼圖下載器
// @namespace    https://github.com/letter5j/Line-sticker-shop-downloader.git
// @version      0.2
// @description  one click to download the sticker
// @description:zh-TW  一鍵下載整頁貼圖
// @author       Log
// @match        https://store.line.me/stickershop/product/*
// @match        https://store.line.me/emojishop/product/*
// @grant        none
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js
// @create       2019-01-31
// @copyright    Log
// @license      MIT License
// @supportURL   https://github.com/letter5j/Line-sticker-shop-downloader/issues
// @contributionURL https://paypal.me/letter5j
// @contributionAmount 1
// ==/UserScript==

!function(){"use strict";let e=document.querySelectorAll(".mdCMN09ImgList span"),t=e.length,n=0,l=new JSZip,o=document.querySelector(".mdCMN08Ttl").textContent,s=l.folder(o),c=function(){(n+=1)==t&&l.generateAsync({type:"blob"}).then(function(e){!function(e,t){document.querySelector(".mdCMN08Ul").insertAdjacentHTML("beforeend",`\n                <li class="mdCMN08Li"><a download="${e}" href="${t}" class="MdBtn01 mdBtn02 downloadBtn"><span class="mdBtn01Inner"><span class="mdBtn01Txt">Download stickers</span></span></a></li>\n            `)}(o+".zip",window.URL.createObjectURL(e))})};for(let t=0;t<e.length;t++){let n,l=window.getComputedStyle(e[t]).getPropertyValue("background-image").slice(4,-1).replace(/["']/g,"");window.location.href.includes("stickershop")?(l=l.split(";")[0],n=l.split("/")[6]):n=l.split("/")[8].split(".png")[0],fetch(l).then(e=>e.blob()).then(e=>{s.file(n+".png",e),c()})}}();