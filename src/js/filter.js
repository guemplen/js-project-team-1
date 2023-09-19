import axios from 'axios';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { TastyTreatsAPI } from './recipesfilter-api-js';
// //---------------------------------------------------------  REFS
const selectElTime = document.querySelector('.select-time');
const selectElCountry = document.querySelector('.select-country');
const selectElIngridient = document.querySelector('.select-ingredient');
const searchInput = document.querySelector('.search-input');
const formEl = document.querySelector('.filter-form');
const selectEl = document.querySelectorAll('select');
const iconSearchEl = document.querySelector('.icon-search-filter ');

const divSelectItems = document.querySelector('.select-items');
const recipesListEl = document.querySelector('.recipes-list');
const resetFilterBtn = document.querySelector('.reset-filter-container');
const sidebarList = document.querySelector('.recipes-sidebar-search-list');
// //---------------------------------------------------------  TIME
let tastyTreatsAPI;
if (window.innerWidth < 768) {
  tastyTreatsAPI = new TastyTreatsAPI(6);
} else if (window.innerWidth > 768 && window.innerWidth < 1280) {
  tastyTreatsAPI = new TastyTreatsAPI(8);
} else {
  tastyTreatsAPI = new TastyTreatsAPI(9);
}

function renderOptionsTime() {
  const data = [];

  for (let time = 5; time <= 120; time += 1) {
    data.push(time);
  }

  const markup = data
    .map((time, index) => {
      return `
    <option class="options" value="${time}" data-id="${index}">${time} min</option>
    `;
    })
    .join('');

  selectElTime.insertAdjacentHTML('beforeend', markup);
}
renderOptionsTime();

//---------------------------------------------------------  COUNTRY
tastyTreatsAPI
  .getCountry()
  .then(response => renderOptionsCountry(response.data))
  .catch(err => console.log(err));

function renderOptionsCountry(data) {
  const markup = data
    .map(country => {
      return `
    <option class="options" value="${country.name}" data-id="${country._id}">${country.name}</option>
    `;
    })
    .join('');
  selectElCountry.insertAdjacentHTML('beforeend', markup);
}

//---------------------------------------------------------  INGRIDIENTS
tastyTreatsAPI
  .getIngridients()
  .then(response => renderOptionsIngridients(response.data))
  .catch(err => console.log(err));

function renderOptionsIngridients(data) {
  const markup = data
    .map(ingredient => {
      return `
    <option class="options" value="${ingredient.name}" data-id="${ingredient._id}">${ingredient.name}</option>
    `;
    })
    .join('');
  selectElIngridient.insertAdjacentHTML('beforeend', markup);
}

//---------------------------------------------------------  EVENTS
function onDivSelectItems(event) {
  //МІНЯЄ КОЛІР НА СЕЛЕКТОРІ ПРИ ВИБОРІ ПЕРШОЇ І НАСТУПНИХ ОПЦІЙ
  event.target.style.color = 'var(--black)';
  //
  const { name, value } = event.target;
  switch (name) {
    case 'time':
      tastyTreatsAPI.time = value;
      break;
    case 'country':
      tastyTreatsAPI.area = value;
      break;
    case 'ingredient':
      const dataId = event.target.selectedOptions[0].getAttribute('data-id');
      if (dataId === null || dataId === '') {
        tastyTreatsAPI.ingredient = '';
      } else {
        tastyTreatsAPI.ingredient = dataId;
      }
      break;
    default:
      break;
  }
  //---------------------------------------------------------  RENDER LI
  tastyTreatsAPI.filterRecipes().then(response => {
    if (response.data.results.length === 0) {
      setTimeout(() => {
        Notiflix.Notify.failure(
          'Sorry, no such recipe found. Please try again.'
        );
      }, 500);
    }
    renderListItem(response.data.results);
  });
}

const onInputChange = debounce(event => {
  const inputValue = event.target.value.trim();

  if (inputValue === '') {
    iconSearchEl.style.fill = 'rgba(5, 5, 5, 0.5)';
  } else {
    iconSearchEl.style.fill = '#9bb537';
  }

  tastyTreatsAPI.title = event.target.value.trim('');

  tastyTreatsAPI.filterRecipes().then(response => {
    if (response.data.results.length === 0) {
      setTimeout(() => {
        Notiflix.Notify.failure(
          'Sorry, no recipe was found for your request. Please try again.'
        );
      }, 500);
    }
    renderListItem(response.data.results);
  });
}, 300);

function onSideBarClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  tastyTreatsAPI.category = event.target.value;

  tastyTreatsAPI.filterRecipes().then(response => {
    if (response.data.results.length === 0) {
      setTimeout(() => {
        Notiflix.Notify.failure(
          'Sorry, no such recipe found. Please try again.'
        );
      }, 500);
    }
    renderListItem(response.data.results);
  });
}

export function renderListItem(data) {
  const markup = data
    .map(recipe => {
      const formattedRating = recipe.rating.toFixed(1);
      return `
              <li class="recipes-list-item" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url(${recipe.preview});
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
;
              ;">
                    <button type="button" class="recipes-list-item-like-btn">
                        <svg class="recipes-list-item-like-btn-img" width="22" height="22">
                            <use href="./images/sprite.svg#icon-heart"></use>
                        </svg>
                    </button>
                    <h3 class="subtitle">${recipe.title}</h3>
                    <p class="recipes-list-item-text">${recipe.description}</p>
                      <div class="recipes-rating">
                        <div class="recipes-rating-value">${formattedRating}</div>
                            <div class="recipes-rating-body">
                              <div class="recipes-rating-active"></div>
                              <div class="recipes-rating-items">
                                  <div class="recipes-rating-item" data-value="1">
                                      <svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
                                          <use href="./images/sprite.svg#icon-star"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="2">
                                      <svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
                                          <use href="./images/sprite.svg#icon-star"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="3">
                                      <svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
                                          <use href="./images/sprite.svg#icon-star"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="4">
                                      <svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
                                          <use href="./images/sprite.svg#icon-star"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="5">
                                      <svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
                                          <use href="./images/sprite.svg#icon-star"></use>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <button class="recipes-list-see-recipe-btn" type="button">See recipe</button>
                    </div>
              </li>
    `;
    })
    .join('');

  recipesListEl.innerHTML = markup;
}

divSelectItems.addEventListener('change', onDivSelectItems);
searchInput.addEventListener('input', onInputChange);
sidebarList.addEventListener('click', onSideBarClick);

//---------------------------------------------------------- RESET
resetFilterBtn.addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    return;
  } else {
    //ПОВЕРТАЄ КОЛІР  СЕЛЕКТОРУ ДО ДЕФОЛТУ//
    formEl.reset();
    iconSearchEl.style.fill = 'rgba(5, 5, 5, 0.5)';
    selectEl.forEach(el => {
      el.style.color = 'rgba(5, 5, 5, 0.50)';
    });
    //===================================//
    tastyTreatsAPI.area = '';
    tastyTreatsAPI.time = '';
    tastyTreatsAPI.ingredient = '';
    tastyTreatsAPI.title = '';
    tastyTreatsAPI.category = '';
  }
});