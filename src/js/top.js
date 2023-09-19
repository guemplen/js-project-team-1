import { TastyTreatsAPI } from './api';

const api = new TastyTreatsAPI();
const ulElement = document.querySelector('.recipes-sidebar-popular-list');

async function renderPopularRecipes() {
  const response = await api.getAllPopularRecipes();

  const isMobile = window.matchMedia('(max-width: 375px)').matches;

  const quantityOfRecipesToRender = isMobile ? 2 : response.length;

  const popularRecipesHTML = response
    .slice(0, quantityOfRecipesToRender)
    .map(recipe => {
      return `
    <li class="recipes-sidebar-popular-item">
      <img class="recipes-sidebar-popular-item-img" src="${recipe.preview}" alt="${recipe.title}" width="64" height="64">
      <div class="recipes-sidebar-popular-item-descr">
        <h3 class="subtitle">${recipe.title}</h3>
        <p class="recipes-sidebar-popular-item-descr-text">${recipe.description}</p>
      </div>
    </li>
  `;
    })
    .join('');

  ulElement.innerHTML = popularRecipesHTML;
}

renderPopularRecipes();
