import { TastyTreats_API } from './api';
import { openModal } from './modal-video';

const api = new TastyTreats_API();
const ulElement = document.querySelector('.recipes-sidebar-popular-list');
const recipeListEl = document.querySelector('.recipes-list');

async function renderPopularRecipes() {
  const response = await api.getAllPopularRecipes();

  const isMobile = window.matchMedia('(max-width: 375px)').matches;

  const quantityOfRecipesToRender = isMobile ? 2 : response.length;

  const popularRecipesHTML = response
    .slice(0, quantityOfRecipesToRender)
    .map(recipe => {
      return `
    <li class="popular-modal recipes-sidebar-popular-item" data-id="${recipe._id}">
      <img class="recipes-sidebar-popular-item-img" src="${recipe.preview}" alt="${recipe.title}" width="64" height="64">
      <div class="recipes-sidebar-popular-item-descr">
        <h3 class="popular-subtitle">${recipe.title}</h3>
        <p class="recipes-sidebar-popular-item-descr-text">${recipe.description}</p>
      </div>
    </li>
  `;
    })
    .join('');

  ulElement.innerHTML = popularRecipesHTML;
}

renderPopularRecipes();

ulElement.addEventListener('click', function (event) {
  if (event.target.classList.contains('popular-modal')) {
    const recipeId = event.target.getAttribute('data-id'); // Получение recipeId из атрибута data-id
    openModal(recipeId);
  }
});

recipeListEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('recipes-list-see-recipe-btn')) {
    const btnId = event.target.dataset.id;
    openModal(btnId);
  }
});
