// ==UserScript==
// @name         Line sticker shop downloader
// @name:zh-TW   Line 貼圖下載器
// @namespace    https://github.com/letter5j/Line-sticker-shop-downloader.git
// @version      0.1
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

function triggerDownoad(e,t){document.querySelector(".mdCMN08Ul").insertAdjacentHTML("beforeend",`\n                <li class="mdCMN08Li"><a download="${e}" href="${t}" class="MdBtn01 mdBtn02 downloadBtn"><span class="mdBtn01Inner"><span class="mdBtn01Txt">Download stickers</span></span></a></li>\n            `)}let list=document.querySelectorAll(".mdCMN09ImgList span"),count=list.length,progress=0,zip=new JSZip,title=document.querySelector(".mdCMN08Ttl").textContent,folder=zip.folder(title),callback=function(){(progress+=1)==count&&zip.generateAsync({type:"blob"}).then(function(e){triggerDownoad(title+".zip",window.URL.createObjectURL(e))})};for(let e=0;e<list.length;e++){let t,n=window.getComputedStyle(list[e]).getPropertyValue("background-image").slice(4,-1).replace(/["']/g,"");window.location.href.includes("stickershop")?(n=n.split(";")[0],t=n.split("/")[6]):t=n.split("/")[8].split(".png")[0],fetch(n).then(e=>e.blob()).then(e=>{folder.file(t+".png",e),callback()})}