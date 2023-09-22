import { Notify } from 'notiflix/build/notiflix-notify-aio';
const modal = document.querySelector('.modal');
const ratingForm = document.getElementById('rating-form');
const ratingItems = document.querySelectorAll('.simple-rating__item');
const emailInput = document.querySelector('.rating-input');
const ratingCountDisplay = document.querySelector('.rating-count');
const btnEl = document.querySelector('.button-form-rating');
const idTitle = document.querySelector('.idTitle');

// Додати обробник події для форми рейтингу
ratingForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Отримати вибрану оцінку
  const selectedRating = document.querySelector('.simple-rating__item:checked');

  // Отримати введений email
  const email = emailInput.value.trim();

  // Валідація email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    Notify.failure('Enter a valid email');
    return;
  }

  // Валідація рейтингу
  if (!selectedRating) {
    Notify.failure('Choose a rating');
    return;
  }

  // Отправка запиту на сервер
  const data = {
    rate: +selectedRating.value,
    email,
  };

  const recipeId = idTitle.dataset.id;

  fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}/rating`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then(response => {
      if (response.ok) {
        // Закрити модальне вікно
        modal.classList.add('modal-hidden');
        modal.classList.remove('modal-visible');

        // Очистити форму
        ratingForm.reset();
        ratingCountDisplay.textContent = '0';

        // Очистити вибрану оцінку
        selectedRating.checked = false;

        // Скинути значення email
        emailInput.value = '';
        Notify.success('Thanks for the rating!');
      } else {
        // Візуалізувати помилку, якщо сервер повернув помилку
        return response.json().then(data => {
          const errorMessage = data.message || 'Something went wrong.';
          Notify.failure(errorMessage);
          emailInput.value = '';
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
});

// Додати обробник події для вибору рейтингу
ratingItems.forEach(item => {
  item.addEventListener('change', updateRatingCount);
});

// Функція, яка оновлює відображення кількості вибраних зірок
function updateRatingCount() {
  const selectedRating = document.querySelector('.simple-rating__item:checked');
  if (selectedRating) {
    const formattedRating = (selectedRating.value * 1).toFixed(1);
    ratingCountDisplay.textContent = formattedRating;
  } else {
    ratingCountDisplay.textContent = '0.0';
  }
}
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('modal-hidden')) {
    closeModal();
  }
});

// Додати обробник події для закриття модального вікна при кліку поза модальним вікном
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Функція для закриття модального вікна та очищення форми
function closeModal() {
  modal.classList.add('modal-hidden');
  modal.classList.remove('modal-visible');
  ratingForm.reset();
  ratingCountDisplay.textContent = '0.0';
  const selectedRating = document.querySelector('.simple-rating__item:checked');
  if (selectedRating) {
    selectedRating.checked = false;
  }
  emailInput.value = '';
}
