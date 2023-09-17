import axios from 'axios';
import debounce from 'lodash.debounce';
import { TastyTreatsAPI } from './recipesfilter-api-js';
const selectElTime = document.querySelector('.select-time');
const selectElCountry = document.querySelector('.select-country');
const selectElIngridient = document.querySelector('.select-ingredient');
const divSelectItems = document.querySelector('.select-items');
const searchInput = document.querySelector('.search-input');
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

  tastyTreatsAPI.filterRecipes().then(response => {
    console.log(response.data.results);
  });
}

const onInputChange = debounce(event => {
  tastyTreatsAPI.title = event.target.value.trim('');
  tastyTreatsAPI.filterRecipes().then(response => {
    console.log(response.data.results);
  });
}, 300);

divSelectItems.addEventListener('change', onDivSelectItems);
searchInput.addEventListener('input', onInputChange);
