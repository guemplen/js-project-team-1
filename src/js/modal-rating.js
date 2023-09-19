export function ratingsMarkup (rating) {
    const starsArr = [];
for (let i = 1; i <= 5; i++) {
starsArr.push(`
<div class="recipes-rating-item ${i<rating ? "active" : "" }" data-value="${i}" data-rating="${rating}">
<svg class="recipes-list-item-starlist-star-svg" width="18" height="18">
  <use href="./images/sprite.svg#icon-star"></use>
</svg>
</div>`
)
}
return starsArr.join("")
}


// Кнопка лайку
const likeButton = document.querySelector('.recipes-list-item-like-btn');
const likedRecipes = JSON.parse(localStorage.getItem('BI8886EB')) || [];
const heartIcon = likeButton.querySelector('use');
const isLiked = likedRecipes.includes(recipeId);

if (isLiked) {
  heartIcon.classList.add('liked');
}

function toggleLike() {
    const index = likedRecipes.indexOf(recipeId);
    heartIcon.classList.toggle('liked');
  
    if (index === -1) {
      likedRecipes.push(recipeId);
    } else {
      likedRecipes.splice(index, 1);
    }
  
    localStorage.setItem('BI8886EB', JSON.stringify(likedRecipes));
  }
  
  likeButton.addEventListener('click', toggleLike);
