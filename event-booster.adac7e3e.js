!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire70a8;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequire70a8=a),a.register;var o=a("5cQgp");let l=document.querySelector(".events__list"),s=document.getElementById("js-btnsBlock"),r=1,i=async()=>{let e=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=J0g5ARVVXHxk4tqnxMbnlKhBmGVuP7cM&page=${r}&size=20`);return await e.json()};i(),console.log(i());let d=async e=>{try{l.innerHTML=(e||await i())._embedded.events.map(e=>{let t={id:e.id,img:e.images[0].url,date:e.dates.start.localDate,name:e.name,location:e._embedded.venues[0].name};return(0,o.default)(t)}).join("")}catch(e){console.log(e)}};d();let c=async()=>{s.innerHTML="",await i(),console.log(60);for(let e=1;e<=60;e++)if(1===e||60===e||e>=r-1&&e<=r+3){let t=document.createElement("button");t.classList.add("cards__btn"),t.dataset.page=e,t.textContent=e,e===r&&(t.disabled=!0,t.style.border="#DC56C5, 1px, solid",t.style.borderRadius="20px 0",t.style.color="#DC56C5"),60===e&&(t.textContent="..."),s.appendChild(t)}};c(),s.addEventListener("click",async e=>{if(console.log(e.target),e.target.classList.contains("cards__btn")){console.log("click"),console.log(r=+e.target.dataset.page);let t=await i();c(),d(t)}})}();
//# sourceMappingURL=event-booster.adac7e3e.js.map
