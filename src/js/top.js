import { TastyTreatsAPI } from './api';

const api = new TastyTreatsAPI();
const ulElement = document.querySelector('.recipes-sidebar-popular-list');

async function renderPopularRecipes() {
  const response = await api.getAllPopularRecipes();

  const popularRecipesHTML = response
    .map(recipe => {
      const trimDescription = trimText(recipe.description, 2);

      function trimText(text, maxLines) {
        const lines = text.split('\n');
        console.log(lines);
        if (lines.length <= maxLines) {
          return text;
        } else {
          const trimLines = lines.slice(0, maxLines);
          return console.log(trimLines.join('\n') + '...');
        }
      }

      return `
    <li class="recipes-sidebar-popular-item">
      <img class="recipes-sidebar-popular-item-img" src="${recipe.preview}" alt="${recipe.title}" width="64" height="64">
      <div class="recipes-sidebar-popular-item-descr">
        <h3 class="subtitle">${recipe.title}</h3>
        <p class="recipes-sidebar-popular-item-descr-text">${trimDescription}</p>
      </div>
    </li>
  `;
    })
    .join('');
  ulElement.innerHTML = popularRecipesHTML;
}

renderPopularRecipes();
