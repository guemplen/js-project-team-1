function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var s=r("iJYdK"),a=r("2shzp");class d{fetchPhotosByQuery(){return a.default.get(`${d.BASE_URL}/recipes/${this.query}`)}constructor(){this.query=0}}e(s)(d,"BASE_URL","https://tasty-treats-backend.p.goit.global/api");const c=document.querySelector(".recipes-list"),o=document.querySelector(".favorites-error"),l=document.querySelector(".js-div-button"),u=document.querySelector(".js-all-categories"),p=new d;p.query=0;let f=[];const g=async e=>{try{const{data:e}=await p.fetchPhotosByQuery();f.push(e)}catch(e){console.log(e)}};function v(e){const t=e.map((e=>{let t=parseFloat(e.rating.toFixed(1));return`\n          <li class="recipes-list-item" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url(${e.thumb}); background-size: cover;\n              background-position: center;\n              background-repeat: no-repeat">\n  <button type="button" class="recipes-list-item-like-btn">\n      <svg class="recipes-list-item-like-btn-img" width="22" height="22">\n          <use href="./images/icons.svg#heart"></use>\n      </svg>\n  </button>\n  <h3 class="subtitle">${e.title}</h3>\n  <p class="recipes-list-item-text">${e.description}</p>\n  <div class="recipes-rating">\n    <div class="recipes-rating-body">\n        <div class="recipes-rating-value">${t}</div>\n        <div class="recipes-rating-active"></div>\n        <div class="recipes-rating-items">\n            <input type="radio" class="recipes-rating-item" value="1" name="rating">\n            <input type="radio" class="recipes-rating-item" value="2" name="rating">\n            <input type="radio" class="recipes-rating-item" value="3" name="rating">\n            <input type="radio" class="recipes-rating-item" value="4" name="rating">\n            <input type="radio" class="recipes-rating-item" value="5" name="rating">\n        </div>\n    </div>\n</div>\n      <button class="recipes-list-see-recipe-btn" type="button">See recipe</button>\n  </div>\n</li>\n            \n `})).join("");c.innerHTML=t}(()=>{const e=["6462a8f74c3d0ddd28897fd9","6462a8f74c3d0ddd28897fe5","6462a8f74c3d0ddd28897fdd","6462a8f74c3d0ddd28897fca","6462a8f74c3d0ddd28897fc1","6462a8f74c3d0ddd28897fbc","6462a8f74c3d0ddd28897fb9","6462a8f74c3d0ddd28897fdf"];if(void 0!==e)for(const t of e)p.query=t,g();else o.classList.remove("visually-hidden")})();l.addEventListener("click",(e=>{if("BUTTON"!==e.target.nodeName)return;const t=f.filter((t=>t.category===e.target.innerText));c.innerHTML="",v(t),u.classList.remove("is-hiden")})),u.addEventListener("click",(e=>{"BUTTON"===e.target.nodeName&&(v(f),u.classList.add("is-hiden"))}));setTimeout(v,600,f),setTimeout((e=>{const t=e.flatMap((e=>e.category)).filter(((e,t,i)=>i.indexOf(e)===t)).map((e=>`\n   \n    <button class="favorites-btn">${e}</button>\n\n    `)).join("");l.innerHTML=t}),600,f);
//# sourceMappingURL=favorites.aab6fe49.js.map