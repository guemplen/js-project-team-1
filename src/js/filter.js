import axios from 'axios';
import debounce from 'lodash.debounce';
import { TastyTreatsAPI } from './recipesfilter-api-js';
// //---------------------------------------------------------  REFS
const selectElTime = document.querySelector('.select-time');
const selectElCountry = document.querySelector('.select-country');
const selectElIngridient = document.querySelector('.select-ingredient');
const searchInput = document.querySelector('.search-input');
const formEl = document.querySelector('.filter-form');

const divSelectItems = document.querySelector('.select-items');
const recipesListEl = document.querySelector('.recipes-list');
const resetFilterBtn = document.querySelector('.reset-filter-container');
// //---------------------------------------------------------  TIME
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
const tastyTreatsAPI = new TastyTreatsAPI();

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
        alert('Нет подходящего блюда');
      }, 500);
    }
    renderListItem(response.data.results);
  });
}

const onInputChange = debounce(event => {
  tastyTreatsAPI.title = event.target.value.trim('');
  tastyTreatsAPI.filterRecipes().then(response => {
    if (response.data.results.length === 0) {
      setTimeout(() => {
        alert('Нет подходящего блюда');
      }, 500);
    }
    renderListItem(response.data.results);
  });
}, 300);

function renderListItem(data) {
  const markup = data
    .map(recipe => {
      const formattedRating = recipe.rating.toFixed(1);
      return `
      <li class="recipes-list-item" style="background-image: url(${recipe.preview})">
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

resetFilterBtn.addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    return;
  } else {
    formEl.reset();
    recipesListEl.innerHTML = '';
    tastyTreatsAPI.area = '';
    tastyTreatsAPI.time = '';
    tastyTreatsAPI.ingredient = '';
    tastyTreatsAPI.title = '';
  }
});
