!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i),i("iE7OH").register(JSON.parse('{"3Z9o3":"favorites.a6451f25.js","ee16w":"sprite.5a4a464f.svg","7RrDr":"index.8454d32c.js"}'));var a,s=i("bpxeT"),c=i("8MBJY"),o=i("a2hTj"),l=i("hKHmD"),d=i("2TvXO"),u=i("dIxxU");a=i("aNJCr").getBundleURL("3Z9o3")+i("iE7OH").resolve("ee16w");var v=i("8c51Y"),p=function(){"use strict";function t(){e(c)(this,t),this.query=0}return e(o)(t,[{key:"fetchPhotosByQuery",value:function(){return u.default.get("".concat(t.BASE_URL,"/recipes/").concat(this.query))}}]),t}();e(l)(p,"BASE_URL","https://tasty-treats-backend.p.goit.global/api");var f=document.querySelector(".recipes-list"),g=document.querySelector(".favorites-error"),y=document.querySelector(".js-div-button"),h=document.querySelector(".js-all-categories"),m=document.querySelector("#order"),b=document.querySelector(".order-now-div"),S=document.querySelector(".site-nav-home"),L=document.querySelector(".site-nav-fav");S.style.color="var(--black)",L.style.color="var(--green)";var x=new p;x.query=0;var E,k=[],w=(E=e(s)(e(d).mark((function t(n){var r;return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.fetchPhotosByQuery();case 3:r=e.sent.data,k.push(r),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),t,null,[[0,7]])}))),function(e){return E.apply(this,arguments)});function T(t){var n=t.map((function(t){var n,r,i=parseFloat(t.rating.toFixed(1)),s=(n=t._id,((r=localStorage.getItem("BI8886EB"))?JSON.parse(r):[]).includes(n));return'\n          <li class="recipes-list-item list" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url('.concat(t.thumb,'); background-size: cover;\n              background-position: center;\n              background-repeat: no-repeat">\n              <div class="recipes-list-wraper">\n              <button type="button" class="recipes-list-item-like-btn">\n               <svg class="recipes-list-item-like-btn-img" width="22" height="22">\n                 <use class="').concat(s?"active-heart":"not-active-heart",'" href="').concat(e(a),'#icon-heart" data-resept-id=').concat(t._id,'></use>\n               </svg>\n              </button>\n               <h3 class="subtitle">').concat(t.title,'</h3>\n               <p class="recipes-list-item-text">').concat(t.description,'</p>\n               <div class="rating-wraper">\n                 <div class="recipes-rating">\n               <div class="recipes-rating-body">\n\n                  <div class="recipes-rating-value">').concat(i,'</div>\n                  <div class="recipes-rating-active"></div>\n                  <div class="recipes-rating-items"> ').concat(function(t){for(var n=[],r=1;r<=5;r++){var i='<div class="recipes-rating-item" data-value="'.concat(r,'" style="').concat(r<=t?"fill: var(--yellow)":"",'"><svg class="recipes-list-item-starlist-star-svg" width="13" height="13">\n\n          <use href="').concat(e(a),'#icon-star"></use>\n\n        </svg>\n\n    </div>');n.push(i)}return n.join("")}(i),'</div>\n                  </div> <button class="recipes-list-see-recipe-btn" type="button" data-resept-id=').concat(t._id," style='position: relative; z-index: 0'>See recipe</button>   </div>\n               \n\n               </div>\n               </div>\n               </div>\n              \n              </div>\n\n             </div>\n              \n          </li>\n            \n ")})).join("");f.innerHTML=n}!function(){var e=function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}("BI8886EB");if(void 0===e)return g.classList.remove("visually-hidden"),void h.add("is-hiden");if(0!==e.length){var t=!0,n=!1,r=void 0;try{for(var i,a=e[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var s=i.value;x.query=s,w()}}catch(e){n=!0,r=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw r}}}else g.classList.remove("visually-hidden")}();y.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=k.filter((function(t){return t.category===e.target.innerText}));f.innerHTML="",T(t),h.classList.remove("is-hiden")}})),h.addEventListener("click",(function(e){"BUTTON"===e.target.nodeName&&(T(k),h.classList.add("is-hiden"))}));setTimeout(T,600,k),setTimeout((function(e){var t=e.flatMap((function(e){return e.category})).filter((function(e,t,n){return n.indexOf(e)===t})).map((function(e){return'\n   \n    <button class="favorites-btn">'.concat(e,"</button>\n\n    ")})).join("");y.innerHTML=t}),600,k);var B=document.querySelector(".recipes-list");B.addEventListener("click",(function(e){if("use"===e.target.nodeName){var t=localStorage.getItem("BI8886EB"),n=t?JSON.parse(t):[],r=e.target.dataset.reseptId,i=n.indexOf(r);-1===i?(e.target.classList.remove("not-active-heart"),e.target.classList.add("active-heart"),n.push(r)):(e.target.classList.remove("active-heart"),e.target.classList.add("not-active-heart"),n.splice(i,1)),function(e,t){try{var n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}}("BI8886EB",n)}})),B.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=e.target.dataset.reseptId;console.log(t),(0,v.openModal)(t)}}));m.addEventListener("click",(function(e){b.style.display="block"})),b.addEventListener("click",(function(){b.style.display="none"}))}();
//# sourceMappingURL=favorites.a6451f25.js.map
