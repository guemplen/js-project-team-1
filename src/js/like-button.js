// const allLiEl = recipeList.querySelectorAll('.recipes-list-item');
// const likeButton = document.querySelector('.recipes-list-item-like-btn');
// const likedRecipes = JSON.parse(localStorage.getItem('BI8886EB')) || [];
// const isLiked = likedRecipes.includes(recipeId);
// if (isLiked) {
//   heartIcon.classList.add('liked');
// }
// function toggleLike() {
//   const index = likedRecipes.indexOf(recipeId);
//   likeButton.classList.toggle('liked');
//   if (index === -1) {
//     likedRecipes.push(recipeId);
//   } else {
//     likedRecipes.splice(index, 1);
//   }
//   localStorage.setItem('BI8886EB', JSON.stringify(likedRecipes));
// }
// likeButton.addEventListener('click', toggleLike);

// ==================
// 1.Повішуємо подію на ul і робимо перевірку що nodeName event.target = "LI".
// 2.Li елемент на який спрацювала подія - event.target
// 3.Витягувати id li-шки на яку був клік через event.target.value;
// 4.Відсилаємо значення event.target.value в LocalStorage
//5.Знайти функцію рендера і робимо там перевірку : питягуємо масив локал сторедж , якщо поточний id = id з локал сторедж то додаємо клас ектів , якщо ні , то клас інектів
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
