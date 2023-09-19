const ratings = document.querySelectorAll('.recipes-rating');

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    const ratingActive = rating.querySelector('.recipes-rating-active');
    const ratingValue = rating.querySelector('.recipes-rating-value');
    const ratingItems = rating.querySelectorAll('.recipes-rating-item');
    const roundedValue = Math.floor(parseFloat(ratingValue.innerHTML));

    setRatingActiveWidth();
    setRatingIconsColor();

    if (rating.classList.contains('rating-set')) {
      setRating();

      function setRating() {
        for (let index = 0; index < ratingItems.length; index++) {
          const ratingItem = ratingItems[index];
          ratingItem.addEventListener('mouseenter', function (e) {
            setRatingIconsColor();
            setRatingActiveWidth(ratingItem.getAttribute('data-value'));
          });
          ratingItem.addEventListener('mouseleave', function (e) {
            setRatingActiveWidth();
            setRatingIconsColor();
          });
          ratingItem.addEventListener('click', function (e) {
            if (rating.dataset.ajax) {
              setRatingValue(ratingItem.getAttribute('data-value'), rating);
            } else {
              ratingValue.innerHTML = index + 1;

              setRatingActiveWidth();
              setRatingIconsColor();
            }
          });
        }
      }
    }
    function setRatingIconsColor() {
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        const dataValue = parseInt(ratingItem.getAttribute('data-value'));

        if (dataValue <= roundedValue) {
          ratingItem.classList.add('active');
        } else {
          ratingItem.classList.remove('active');
        }
      }
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = (index / 5) * 100;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}

// Кнопка лайку
// const likeButton = document.querySelector('.recipes-list-item-like-btn');
// const likedRecipes = JSON.parse(localStorage.getItem('BI8886EB')) || [];
// const heartIcon = likeButton.querySelector('use');
// const isLiked = likedRecipes.includes(recipeId);

// if (isLiked) {
//   heartIcon.classList.add('liked');
// }

// function toggleLike() {
//     const index = likedRecipes.indexOf(recipeId);
//     heartIcon.classList.toggle('liked');
  
//     if (index === -1) {
//       likedRecipes.push(recipeId);
//     } else {
//       likedRecipes.splice(index, 1);
//     }
  
//     localStorage.setItem('BI8886EB', JSON.stringify(likedRecipes));
//   }
  
//   likeButton.addEventListener('click', toggleLike);
