!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequired7c6=i),i("iE7OH").register(JSON.parse('{"3Z9o3":"favorites.d4e894d5.js","ee16w":"sprite.5a4a464f.svg","7RrDr":"index.3b93c65a.js"}'));var a,s=i("bpxeT"),c=i("8MBJY"),o=i("a2hTj"),l=i("hKHmD"),d=i("2TvXO"),u=i("dIxxU");a=i("aNJCr").getBundleURL("3Z9o3")+i("iE7OH").resolve("ee16w");var v=i("8c51Y"),p=function(){"use strict";function t(){e(c)(this,t),this.query=0}return e(o)(t,[{key:"fetchPhotosByQuery",value:function(){return u.default.get("".concat(t.BASE_URL,"/recipes/").concat(this.query))}}]),t}();e(l)(p,"BASE_URL","https://tasty-treats-backend.p.goit.global/api");var f=document.querySelector(".recipes-list"),g=document.querySelector(".favorites-error"),y=document.querySelector(".js-div-button"),h=document.querySelector(".js-all-categories"),m=document.querySelector(".js-cart"),b=document.querySelector(".order-now-div"),S=document.querySelector(".js-cross-order"),L=document.querySelector(".site-nav-home"),x=document.querySelector(".site-nav-fav");L.style.color="var(--black)",x.style.color="var(--green)";var E=new p;E.query=0;var k,w=[],T=(k=e(s)(e(d).mark((function t(r){var n;return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.fetchPhotosByQuery();case 3:n=e.sent.data,w.push(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),t,null,[[0,7]])}))),function(e){return k.apply(this,arguments)});function B(t){var r=t.map((function(t){var r,n,i=parseFloat(t.rating.toFixed(1)),s=(r=t._id,((n=localStorage.getItem("BI8886EB"))?JSON.parse(n):[]).includes(r));return'\n          <li class="recipes-list-item" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url('.concat(t.thumb,'); background-size: cover;\n              background-position: center;\n              background-repeat: no-repeat">\n              <div class="recipes-list-wraper">\n              <button type="button" class="recipes-list-item-like-btn">\n               <svg class="recipes-list-item-like-btn-img" width="22" height="22">\n                 <use class="').concat(s?"active-heart":"not-active-heart",'" href="').concat(e(a),'#icon-heart" data-resept-id=').concat(t._id,'></use>\n               </svg>\n              </button>\n               <h3 class="subtitle">').concat(t.title,'</h3>\n               <p class="recipes-list-item-text">').concat(t.description,'</p>\n               <div class="rating-wraper">\n                 <div class="recipes-rating">\n               <div class="recipes-rating-body">\n                <div class="recipes-rating-value">').concat(i,'</div>\n              <div class="recipes-rating-active"></div>\n              <div class="recipes-rating-items">').concat(function(t){for(var r=[],n=1;n<=5;n++){var i='<div class="recipes-rating-item" data-value="'.concat(n,'" style="').concat(n<=t?"fill: var(--yellow)":"",'"><svg class="recipes-list-item-starlist-star-svg" width="13" height="13">\n\n          <use href="').concat(e(a),'#icon-star"></use>\n\n        </svg>\n\n    </div>');r.push(i)}return r.join("")}(i),' </div>\n               </div>\n               </div>\n               <button class="recipes-list-see-recipe-btn" type="button" data-resept-id=').concat(t._id," style='position: relative; z-index: 0'>See recipe</button>\n               </div>\n              \n              </div>\n             </div>\n              \n          </li>\n            \n ")})).join("");f.innerHTML=r}!function(){var e=function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}("BI8886EB");if(void 0===e)return g.classList.remove("visually-hidden"),void h.add("is-hiden");if(0!==e.length){var t=!0,r=!1,n=void 0;try{for(var i,a=e[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var s=i.value;E.query=s,T()}}catch(e){r=!0,n=e}finally{try{t||null==a.return||a.return()}finally{if(r)throw n}}}else g.classList.remove("visually-hidden")}();y.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=w.filter((function(t){return t.category===e.target.innerText}));f.innerHTML="",B(t),h.classList.remove("is-hiden")}})),h.addEventListener("click",(function(e){"BUTTON"===e.target.nodeName&&(B(w),h.classList.add("is-hiden"))}));setTimeout(B,600,w),setTimeout((function(e){var t=e.flatMap((function(e){return e.category})).filter((function(e,t,r){return r.indexOf(e)===t})).map((function(e){return'\n   \n    <button class="favorites-btn">'.concat(e,"</button>\n\n    ")})).join("");y.innerHTML=t}),600,w);var q=document.querySelector(".recipes-list");q.addEventListener("click",(function(e){if("use"===e.target.nodeName){var t=localStorage.getItem("BI8886EB"),r=t?JSON.parse(t):[],n=e.target.dataset.reseptId,i=r.indexOf(n);-1===i?(e.target.classList.remove("not-active-heart"),e.target.classList.add("active-heart"),r.push(n)):(e.target.classList.remove("active-heart"),e.target.classList.add("not-active-heart"),r.splice(i,1)),function(e,t){try{var r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}}("BI8886EB",r)}})),q.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=e.target.dataset.reseptId;(0,v.openModal)(t)}}));m.addEventListener("click",(function(e){b.style.display="block"})),S.addEventListener("click",(function(){b.style.display="none"}))}();
//# sourceMappingURL=favorites.d4e894d5.js.map
