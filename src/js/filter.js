import axios from 'axios';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { TastyTreatsAPI } from './recipesfilter-api-js';
import { pagination } from './categories';
import heartImage from '/src/images/sprite.svg';
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

// const ratingItems = document.querySelectorAll('.recipes-rating-items');
// function starsFilling() {
//   ratingItems.forEach(item => {
//     const ratings = parseFloat(
//       item.parentElement.querySelector('.recipes-rating-value').textContent
//     );
//     const stars = item.querySelectorAll('.recipes-rating-item');

//     stars.forEach((star, index) => {
//       if (ratings === 1) {
//         star
//           .querySelector('svg use')
//           .setAttribute('href', `${heartImage}#star-ico-filled`);
//       } else {
//         star
//           .querySelector('svg use')
//           .setAttribute('href', `${heartImage}#star-ico`);
//       }
//     });
//   });
// }

export function renderListItem(data) {
  const markup = data
    .map(recipe => {
      const formattedRating = recipe.rating.toFixed(1);
      const rating = parseInt(recipe.rating);
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
                      <div class="recipes-rating">
                        <div class="recipes-rating-value">${formattedRating}</div>
                            <div class="recipes-rating-body">
                              <div class="recipes-rating-active"></div>
                              <div class="recipes-rating-items">
                                  <div class="recipes-rating-item" data-value="1">
                                      <svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
                                          <use href="${heartImage}#star-ico"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="2">
                                      <svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
                                          <use href="${heartImage}#star-ico"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="3">
                                      <svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
                                          <use href="${heartImage}#star-ico"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="4">
                                      <svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
                                          <use href="${heartImage}#star-ico"></use>
                                      </svg>
                                  </div>
                                  <div class="recipes-rating-item" data-value="5">
                                      <svg class="recipes-list-item-starlist-star-svg" width="13" height="13">
                                          <use href="${heartImage}#star-ico"></use>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <button class="recipes-list-see-recipe-btn" type="button" data-id="${
                          recipe._id
                        }">See recipe</button>
                    </div>
              </li>
    `;
    })

    .join('');
  recipesListEl.innerHTML = markup;
}
//*
function getData() {
  tastyTreatsAPI.filterRecipes().then(response => {
    starsFilling(response.data.results);
  });
}
getData();

function starsFilling(data) {
  const starsEls = {};

  // Выбираем все элементы с атрибутом data-value от 1 до 5 и сохраняем их в объект starsEls
  for (let i = 1; i <= 5; i++) {
    starsEls[i] = document.querySelectorAll(`[data-value="${i}"]`);
  }

  data.forEach(recipe => {
    const rating = parseInt(recipe.rating);
    if (rating >= 1 && rating <= 5) {
      for (let i = 1; i <= rating; i++) {
        // Меняем цвет звезд на белый (#fff)
        starsEls[i].forEach(el => {
          el.style.fill = '#fff';
        });
      }
    }
  });
}
starsFilling();
//*

// function starsFilling(data) {
//   const starsEl = document.querySelectorAll('[data-value="1"]');
//   console.log(data);
// const result = data.map(recipe => {
//   const rating = parseInt(recipe.rating);
//   if (rating === 4) {
//     starsEl.forEach(star => {
//       star.style.fill = '#fff';
//     });
//   }
// });
// return result;
// }
// function starsFilling(data) {
//   const starsElOne = document.querySelectorAll('[data-value="1"]');
//   const starsElTwo = document.querySelectorAll('[data-value="2"]');
//   const starsElThree = document.querySelectorAll('[data-value="3"]');
//   const starsElFour = document.querySelectorAll('[data-value="4"]');
//   const starsElFive = document.querySelectorAll('[data-value="5"]');
//   const star = data.map(recipe => {
//     const rating = parseInt(recipe.rating);
//     if (rating === 1) {
//       starsElOne.forEach(el => {
//         el.style.fill = '#fff';
//       });
//     } else if (rating === 2) {
//       starsElTwo.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElOne.forEach(el => {
//         el.style.fill = '#fff';
//       });
//     } else if (rating === 3) {
//       starsElTwo.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElOne.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElThree.forEach(el => {
//         el.style.fill = '#fff';
//       });
//     } else if (rating === 3) {
//       starsElTwo.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElOne.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElThree.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElFour.forEach(el => {
//         el.style.fill = '#fff';
//       });
//     } else if (rating === 3) {
//       starsElTwo.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElOne.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElThree.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElFour.forEach(el => {
//         el.style.fill = '#fff';
//       });
//       starsElFive.forEach(el => {
//         el.style.fill = '#fff';
//       });
//     }
//   });
// }
//*
// const starIcons = Array(5)
//   .fill('')
//   .map((_, index) => {
//     const starClass =
//       index < Math.floor(rating)
//         ? 'r-modal-rating-icon-fill'
//         : 'r-modal-rating-icon-empty';
//     return `
//       <svg class="${starClass}" width="18" height="18">
//         <use href="${starImage}#icon-star"></use>
//       </svg>
//     `;
//   });
//*

//*
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
