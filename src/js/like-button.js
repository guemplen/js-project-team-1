const refs = {
  recipeList: document.querySelector('.recipes-list'),
  heartBtn: document.querySelectorAll('.recipes-list-item-like-btn'),
};

refs.recipeList.addEventListener('click', onRecipeListClick);

function onRecipeListClick(event) {
  if (event.target.nodeName !== 'use') {
    return;
  }

  const idOfListItem = event.target.getAttribute('data-value');

  // Отримуємо поточні дані з localStorage (якщо вони є)
  const storedData = localStorage.getItem('BI8886EB');
  let existingData = storedData ? JSON.parse(storedData) : [];
  const index = existingData.indexOf(idOfListItem);

  // Перевіряємо, чи містить вже масив idOfListItem
  if (index === -1) {
    existingData.push(idOfListItem);
    event.target.classList.remove('not-active-heart');
    event.target.classList.add('active-heart');
  } else {
    // Видаляємо елемент з масиву за індексом
    existingData.splice(index, 1);
    event.target.classList.remove('active-heart');
    event.target.classList.add('not-active-heart');
  }

  // Зберігаємо оновлені дані в localStorage
  localStorage.setItem('BI8886EB', JSON.stringify(existingData));
}
