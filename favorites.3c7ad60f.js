function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},s={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in s){var t=s[e];delete s[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},t.parcelRequired7c6=n),n("kyEFX").register(JSON.parse('{"246rV":"favorites.3c7ad60f.js","lp5u4":"sprite.5a4a464f.svg","gjYyB":"index.743735b9.js"}'));var i,a=n("iJYdK"),o=n("2shzp");i=new URL(n("kyEFX").resolve("lp5u4"),import.meta.url).toString();var c=n("9ZN1D");class l{fetchPhotosByQuery(){return o.default.get(`${l.BASE_URL}/recipes/${this.query}`)}constructor(){this.query=0}}e(a)(l,"BASE_URL","https://tasty-treats-backend.p.goit.global/api");const d=document.querySelector(".recipes-list"),u=document.querySelector(".favorites-error"),v=document.querySelector(".js-div-button"),p=document.querySelector(".js-all-categories"),g=document.querySelector("#order"),f=document.querySelector(".order-now-div"),y=document.querySelector(".site-nav-home"),h=document.querySelector(".site-nav-fav");y.style.color="var(--black)",h.style.color="var(--green)";const m=new l;m.query=0;let b=[];const S=async e=>{try{const{data:e}=await m.fetchPhotosByQuery();b.push(e)}catch(e){console.log(e)}};function L(t){const r=t.map((t=>{let r=parseFloat(t.rating.toFixed(1));const s=function(e){const t=localStorage.getItem("BI8886EB");return(t?JSON.parse(t):[]).includes(e)}(t._id);return`\n          <li class="recipes-list-item list" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url(${t.thumb}); background-size: cover;\n              background-position: center;\n              background-repeat: no-repeat">\n              <div class="recipes-list-wraper">\n              <button type="button" class="recipes-list-item-like-btn">\n               <svg class="recipes-list-item-like-btn-img" width="22" height="22">\n                 <use class="${s?"active-heart":"not-active-heart"}" href="${e(i)}#icon-heart" data-resept-id=${t._id}></use>\n               </svg>\n              </button>\n               <h3 class="subtitle">${t.title}</h3>\n               <p class="recipes-list-item-text">${t.description}</p>\n               <div class="rating-wraper">\n                 <div class="recipes-rating">\n               <div class="recipes-rating-body">\n\n                  <div class="recipes-rating-value">${r}</div>\n                  <div class="recipes-rating-active"></div>\n                  <div class="recipes-rating-items"> ${function(t){const r=[];for(let s=1;s<=5;s++){const n=`<div class="recipes-rating-item" data-value="${s}" style="${s<=t?"fill: var(--yellow)":""}"><svg class="recipes-list-item-starlist-star-svg" width="13" height="13">\n\n          <use href="${e(i)}#icon-star"></use>\n\n        </svg>\n\n    </div>`;r.push(n)}return r.join("")}(r)}</div>\n                  </div> <button class="recipes-list-see-recipe-btn" type="button" data-resept-id=${t._id} style='position: relative; z-index: 0'>See recipe</button>   </div>\n               \n\n               </div>\n               </div>\n               </div>\n              \n              </div>\n\n             </div>\n              \n          </li>\n            \n `})).join("");d.innerHTML=r}(()=>{const e=(e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}})("BI8886EB");if(void 0===e)return u.classList.remove("visually-hidden"),void p.add("is-hiden");if(0!==e.length)for(const t of e)m.query=t,S();else u.classList.remove("visually-hidden")})();v.addEventListener("click",(e=>{if("BUTTON"!==e.target.nodeName)return;const t=b.filter((t=>t.category===e.target.innerText));d.innerHTML="",L(t),p.classList.remove("is-hiden")})),p.addEventListener("click",(e=>{"BUTTON"===e.target.nodeName&&(L(b),p.classList.add("is-hiden"))}));setTimeout(L,600,b),setTimeout((e=>{const t=e.flatMap((e=>e.category)).filter(((e,t,r)=>r.indexOf(e)===t)).map((e=>`\n   \n    <button class="favorites-btn">${e}</button>\n\n    `)).join("");v.innerHTML=t}),600,b);const E=document.querySelector(".recipes-list");E.addEventListener("click",(e=>{if("use"!==e.target.nodeName)return;const t=localStorage.getItem("BI8886EB"),r=t?JSON.parse(t):[],s=e.target.dataset.reseptId,n=r.indexOf(s);-1===n?(e.target.classList.remove("not-active-heart"),e.target.classList.add("active-heart"),r.push(s)):(e.target.classList.remove("active-heart"),e.target.classList.add("not-active-heart"),r.splice(n,1)),((e,t)=>{try{const r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}})("BI8886EB",r)})),E.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=e.target.dataset.reseptId;console.log(t),(0,c.openModal)(t)}));g.addEventListener("click",(e=>{f.style.display="block"})),f.addEventListener("click",(()=>{f.style.display="none"}));
//# sourceMappingURL=favorites.3c7ad60f.js.map
