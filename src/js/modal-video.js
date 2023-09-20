// !!! import CSS from '../css'; треба вказати імпорт з
// !!! import { getRecipeDetails } from './api';  треба вказати імпорт з деталей рецептів

// !!! import { renderIcons } from './ #'; треба вказати імпорт функції з модуля rating.js

// !!! import{ # , RecipeDB} from './ #' треба зробити імпорт функції та класів додавання в фаворит
import { TastyTreats_API } from './api';
import starImage from '/src/images/sprite.svg';
import { Notify } from 'notiflix';

const apiModal = new TastyTreats_API();

const body = document.querySelector('body');
const modalWindow = document.querySelector('.r-modal-content');
const seeModal = document.querySelector('.r-modal-backdrop');
const ratingBtn = document.querySelector('.r-modal-rating-btn');
const closeBtn = document.querySelector('.r-modal-close-btn');
const favoriteBtn = document.querySelector('.r-modal-favorite-btn');
// const recipeDB = new #(); // Створення нового екземпляра класу RecipeDB
let toId = ''; // Ініціалізація змінної toId

// Ця функція встановлює обробник подій для елементу DOM з класом 'фильтру галереї',
// який викликає функцію openModal при кліку на цей елемент.
// function eventOpenrModal() {
//   const getIdElelment = document.querySelector('#'); // !!!
//   getIdElelment.addEventListener('click', openModal);
// }

// function eventOpenrModalTwo() {
//   const getIdElelmentTwo = document.querySelector(''#''); // !!! // https://prnt.sc/9aWEweNfRDan popular recipes
//   getIdElelmentTwo.addEventListener('click', openModal);
// }

// Ця функція використовує функцію getRecipeDetails для завантаження даних рецепту на основі змінної toId.
// Після отримання даних вона вставляє вміст в модальне вікно за допомогою функції addContent.
// Якщо сталася помилка, вона логує її.
function loadContent() {
  const byId = apiModal
    .getRecipesById(toId)
    .then(data =>
      modalWindow.insertAdjacentHTML('afterbegin', addContent(data))
    )
    .catch(err => console.log(err));
  // console.log(byId);
}

// Ця частина коду визначає функцію addContent, яка генерує HTML-структуру для відображення деталей рецепту на сторінці.
// що робиться у функції
function addContent(arr) {
  const {
    title,
    instructions,
    ingredients,
    youtube,
    preview,
    rating,
    tags,
    time,
    _id,
  } = arr;
  // Ця функція приймає об'єкт рецепту arr і генерує рядок HTML, який відображає деталі рецепту. Вона розбирає об'єкт рецепту
  // і використовує його дані для створення HTML-структури, такі як назва, інструкції, інгредієнти тощо.

  // / Оголошення двох порожніх рядків для зберігання тегів і інгредієнтів
  let newTags = '';
  tags.forEach(element => {
    newTags += `<span class="r-modal-tag">#${element}</span>`;
  });

  let newIngredients = '';
  ingredients.forEach(element => {
    newIngredients += `<div class="r-modal-ingerdients-name">${element.name}<div class="r-modal-ingerdients-value">${element.measure}</div></div>`;
  });

  // Повертається рядок HTML для відображення деталей рецепт
  //зірочки в рейтингу
  return `
    <iframe 
     src="${youtube.replace('watch?v=', 'embed/')}"
    class="r-modal-video"
    type ='text/html'
    poster="${preview}"
    controls
    autoplay
    loop
    preload="auto"
    ></iframe>
    <h2 class="r-modal-name" data-id="${_id}">${title}</h2>
    <div class="r-modal-info-container">
    <div class="r-modal-rating-container"><div class="r-modal-rating">${rating.toFixed(
      1
    )}</div>
    <div class="r-modal-star-wrap">
        <svg class="r-modal-rating-icon" width="18" height="18">
            <use href="${starImage}#icon-star"></use>
        </svg>
        <svg class="r-modal-rating-icon" width="18" height="18">
            <use href=".${starImage}#icon-star"></use>
        </svg>
        <svg class="r-modal-rating-icon" width="18" height="18">
            <use href="${starImage}#icon-star"></use>
        </svg>
        <svg class="r-modal-rating-icon" width="18" height="18">
            <use href="${starImage}#icon-star"></use>
        </svg>
        <svg class="r-modal-rating-icon" width="18" height="18">
            <use href="${starImage}#icon-star"></use>
        </svg>
    </div>
    <div class="r-modal-time">${time} min</div></div></div>
    <div class="r-modal-ingerdients-container">${newIngredients}</div>
    <div class="r-modal-tags">${newTags}</div>
    <p class="r-modal-instructions">${instructions}</p>`;
}

// Ця функція відповідає за відкриття модального вікна при кліку на певний елемент на сторінці. Вона виконує такі
//  дії, як завантаження контенту, показ вікна, блокування прокрутки та додавання обробників подій для закриття вікна.
function openModal(recipeId) {
  // Перевірка, чи був клік на елементі з ідентифікатором
  if (!recipeId) {
    return; // Якщо клік не був на елементі з ідентифікатором, функція завершується
  }

  toId = recipeId; // Збереження ідентифікатора, на якому був клік
  loadContent(); // Завантаження вмісту модального вікна
  seeModal.classList.remove('visually-hidden'); // Показ модального вікна, видалення класу visually-hidden,
  // який ховає вікно
  body.classList.add('no-scroll'); // Додавання класу no-scroll для вимкнення прокрутки сторінки
  document.addEventListener('keydown', closeOnEscape); // Додавання обробник події для закриття модального вікна
  // при натисканні клавіші "Escape"
  seeModal.addEventListener('click', closeOnTarget); // Додавання обробник події для закриття модального вікна
  // при кліку на вікно
  closeBtn.addEventListener('click', closeOnTarget); // Додавання обробник події для закриття модального вікна
  // при кліку на кнопку "Закрити"
  favoriteBtn.addEventListener('click', favoriteBtnHandleFunction); // Додавання обробник події для виклику функції
  //  "favoriteBtnHandleFunction" при кліку на кнопку "Додати в обране"
}

function closeModal(event) {
  seeModal.classList.add('visually-hidden');
  body.classList.remove('no-scroll');

  modalWindow.innerHTML = '';

  document.removeEventListener('keydown', closeOnEscape);
  seeModal.removeEventListener('click', closeModal);
  // ratingBtn.removeEventListener('click', closeOnTarget);
  closeBtn.removeEventListener('click', closeOnTarget);
  favoriteBtn.removeEventListener('click', closeOnTarget);
  // addFavouriteOnList();
}

function closeOnTarget(event) {
  if (
    event.target === closeBtn ||
    event.target.nodeName === 'use' ||
    event.target === closeBtn.firstElementChild
  ) {
    closeModal();
  }
}

function closeOnEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
function selectFavoriteRecipe(recipeInfo) {
  recipeDB.getFromDB().map(recipe => {
    if (recipe.id !== recipeInfo.id) {
      recipeDB.saveIntoDB(recipeInfo);
      favoriteBtn.textContent = 'Remove from favorites';
    } else if (recipe.id === recipeInfo.id) {
      recipeDB.removeFromDB(recipeInfo);
      favoriteBtn.textContent = 'Add to favorite';
    }
  });
}
function favoriteBtnHandleFunction(e) {
  const parentWrap = e.target.parentNode;
  const siblingWrap = parentWrap.previousElementSibling;
  recipeInfo = {
    id: siblingWrap.querySelector('.r-modal-name').dataset.id,
    name: siblingWrap.querySelector('.r-modal-name').textContent,
    image: siblingWrap.querySelector('.r-modal-video').poster,
    rating: siblingWrap.querySelector('.r-modal-rating').textContent,
    description: siblingWrap.querySelector('.r-modal-instructions').textContent,
  };
  selectFavoriteRecipe(recipeInfo);
}

export { eventOpenrModal, eventOpenrModalTwo, toId, closeModal, openModal };
