import { TastyTreatsAPI } from './recipesfilter-api-js';

const refs = {
  recipesSidebarSearchListEL: document.querySelector(
    '.recipes-sidebar-search-list'
  ),
  timeSelecterEl: document.querySelector('#time-select'),
  areaSelecterEl: document.querySelector('#area-select'),
  btnAllCategories: document.querySelector('.btn-all-categories'),
  recipeList: document.querySelector('.recipes-list'),
};
const newClass = new TastyTreatsAPI();
///Вішаємо подію на кнопку "Всі категорії"
refs.btnAllCategories.addEventListener('click', onbtnAllCategoriesClick);
async function onbtnAllCategoriesClick(event) {
  const btn = await newClass.getAllCategories();
  console.log(btn.data.results);
  getMarkupList(btn.data.results);
  refs.btnAllCategories.classList.add('btn-active');
}
//Викликаємо функцію для автоматичного рендеру всіх категорій при загрузці сторінки
onbtnAllCategoriesClick();
//Витягуємо з серверу значення для кнопок
async function getCategories() {
  try {
    const { data } = await newClass.getGalleryItem();
    getMarkup(data);
  } catch (er) {
    console.log(er);
  }
}
getCategories();
// Робимо розмітку по данним з серверу
function getMarkup(data) {
  const markup = data
    .map(el => {
      return `<li class = "recipes-sidebar-search-item"><button value='${el.name}' class='btn-for-filter' type="button">${el.name}</button></li>`;
    })
    .join('');
  refs.recipesSidebarSearchListEL.innerHTML = markup;
}
//Вішаємо подію на клік при якій буде відправлятися запит на сервер
refs.recipesSidebarSearchListEL.addEventListener('click', onBtnForFilterClick);
//РЕЄСТРУЄМО ПОДІЮ НА КЛІК КНОПОК КАТЕГОРІЇ
async function onBtnForFilterClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  refs.btnAllCategories.classList.remove('btn-active');
  const buttons = document.querySelectorAll('.btn-for-filter');
  buttons.forEach(button => {
    button.classList.remove('btn-active');
  });
  event.target.classList.add('btn-active');
  const list = event.target.value;
  newClass.category = list;
  console.log(newClass);
  const serverCategory = await newClass.filterRecipes();
  console.log(serverCategory.data.results);
  getMarkupList(serverCategory.data.results);
}
//РОЗМІТКА ДЛЯ СПИСКУ КАРТОК РЕЦЕПТІВ
function getMarkupList(data) {
  const formattedRating = data.map(el =>
    el.rating.toFixed(1).replace('.0', '.0')
  );
  const markup = data
    .map(el => {
      const formattedRating = el.rating.toFixed(1).replace('.0', '.0');
      return `<li class="recipes-list-item">
      <img
      src="${el.thumb}"
      alt="Зображення страви"
      class="recipes-list-item-img"
    />
  <button type="button" class="recipes-list-item-like-btn">
    <svg class="recipes-list-item-like-btn-img" width="22" height="22">
      <use href="./sprite.svg#icon-heart"></use>
    </svg>
  </button>
  <h3 class="subtitle">${el.title}</h3>
  <p class="recipes-list-item-text">
 ${el.description}
  </p>
  <div class="recipes-rating">
  <div class="recipes-rating-body">
      <div class="recipes-rating-value">${formattedRating}</div>
      <div class="recipes-rating-active"></div>
      <div class="recipes-rating-items">
          <input type="radio" class="recipes-rating-item" value="1" name="rating">
          <input type="radio" class="recipes-rating-item" value="2" name="rating">
          <input type="radio" class="recipes-rating-item" value="3" name="rating">
          <input type="radio" class="recipes-rating-item" value="4" name="rating">
          <input type="radio" class="recipes-rating-item" value="5" name="rating">
      </div>
     </div>
  </div>
    <button class="recipes-list-see-recipe-btn" type="button">
      See recipe
    </button>
  </div>
</li>`;
    })
    .join('');
  refs.recipeList.innerHTML = markup;
}
