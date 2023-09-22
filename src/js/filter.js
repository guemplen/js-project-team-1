import axios from 'axios';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { TastyTreatsAPI } from './recipesfilter-api-js';
import { pagination } from './categories';
import heartImage from '/src/images/sprite.svg';
import { onbtnAllCategoriesClick } from "/src/js/categories.js";

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

pagination.on('afterMove', eventData => {
  onPageChange(eventData.page);
});

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
  // event.target.style.color = 'var(--black-05)';
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

export function onPageChange(page) {
  tastyTreatsAPI.page = page;

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
      const rating = Number.parseInt(recipe.rating);
      const isActive = isRecipeLiked(recipe._id); // Перевіряємо, чи рецепт сподобався користувачеві

      return `
              <li  class="recipes-list-item" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url(${
                recipe.preview
              });
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
;
              ;">
                    <button value = "${
                      recipe._id
                    }" type="button" class="recipes-list-item-like-btn">
                        <svg data-value = "${
                          recipe._id
                        }" class="recipes-list-item-like-btn-img" width="22" height="22">
                            <use class="${
                              isActive ? 'active-heart' : 'not-active-heart'
                            }" data-value = "${
        recipe._id
      }" href="${heartImage}#icon-heart"></use>
                        </svg>
                    </button>
                    <h3 class="subtitle">${recipe.title}</h3>
                    <p class="recipes-list-item-text">${recipe.description}</p>
                    <div class="rating-container">
                      <div class="recipes-rating">
                        <div class="recipes-rating-value">${formattedRating}</div>
                            <div class="recipes-rating-body">
                              <div class="recipes-rating-active"></div>
                              <div class="recipes-rating-items">
                                  ${starsTemplate(rating)}
                              </div>
                          </div>
                        </div>
                        <div><button class="recipes-list-see-recipe-btn" type="button" data-id="${
                          recipe._id

                        }"  style='position: relative; z-index: 0'>See recipe</button></div>
                    </div>
              </li>
    `;
    })

    .join('');
  recipesListEl.innerHTML = markup;
}

function starsTemplate(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const star = `<div class="recipes-rating-item" data-value="${i}" style="${
      i <= rating ? 'fill: var(--yellow)' : ''
    }"><svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
          <use href="${heartImage}#star-ico"></use>
        </svg>
    </div>`;
    stars.push(star);
  }
  return stars.join('');
}

function isRecipeLiked(recipeId) {
  const storedData = localStorage.getItem('BI8886EB');
  const existingData = storedData ? JSON.parse(storedData) : [];
  return existingData.includes(recipeId);
}

divSelectItems.addEventListener('change', onDivSelectItems);
searchInput.addEventListener('input', onInputChange);
sidebarList.addEventListener('click', onSideBarClick);

//---------------------------------------------------------- RESET
resetFilterBtn.addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    return;
  } else {
    onbtnAllCategoriesClick();
    //ПОВЕРТАЄ КОЛІР  СЕЛЕКТОРУ ДО ДЕФОЛТУ//
    formEl.reset();
    // iconSearchEl.style.fill = 'var(----black-rgba)';
    selectEl.forEach(el => {
      // el.style.color = 'var(----black-rgba)';
    });
    //===================================//
    tastyTreatsAPI.area = '';
    tastyTreatsAPI.time = '';
    tastyTreatsAPI.ingredient = '';
    tastyTreatsAPI.title = '';
    tastyTreatsAPI.category = '';
    recipesListEl.innerHTML = '';
  }
});
