import { TastyTreatsAPI } from './recipesfilter-api-js';
import { renderListItem } from './filter';

const refs = {
  recipesSidebarSearchListEL: document.querySelector(
    '.recipes-sidebar-search-list'
  ),
  timeSelecterEl: document.querySelector('#time-select'),
  areaSelecterEl: document.querySelector('#area-select'),
  btnAllCategories: document.querySelector('.btn-all-categories'),
  recipeList: document.querySelector('.recipes-list'),
  resetFilterBtn: document.querySelector('.reset-filter-container'),
};

let newClass;
if (window.innerWidth < 768) {
  newClass = new TastyTreatsAPI(6);
} else if (window.innerWidth > 768 && window.innerWidth < 1280) {
  newClass = new TastyTreatsAPI(8);
} else {
  newClass = new TastyTreatsAPI(9);
}
///Вішаємо подію на кнопку "Всі категорії"
refs.btnAllCategories.addEventListener('click', onbtnAllCategoriesClick);
async function onbtnAllCategoriesClick(event) {
  const btn = await newClass.getAllCategories();
  refs.btnAllCategories.classList.add('btn-active');
  renderListItem(btn.data.results);
  const buttons = document.querySelectorAll('.btn-for-filter');
  buttons.forEach(button => {
    button.classList.remove('btn-active');
  });
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

//РЕЄСТРУЄМО ПОДІЮ НА КЛІК КНОПОК КАТЕГОРІЇ
async function onBtnForFilterClick(event) {
  refs.btnAllCategories.classList.remove('btn-active');
  const buttons = document.querySelectorAll('.btn-for-filter');
  buttons.forEach(button => {
    button.classList.remove('btn-active');
  });
  event.target.classList.add('btn-active');
}
function onResetFilter(event) {
  refs.btnAllCategories.classList.add('btn-active');
  const buttons = document.querySelectorAll('.btn-for-filter');
  buttons.forEach(button => {
    button.classList.remove('btn-active');
  });
}

//Вішаємо подію на клік при якій буде відправлятися запит на сервер
refs.recipesSidebarSearchListEL.addEventListener('click', onBtnForFilterClick);
refs.resetFilterBtn.addEventListener('click', onResetFilter);
