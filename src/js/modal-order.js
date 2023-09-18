const closeOrderButton = document.querySelector('.js-cross-order');
const orderNowModal = document.querySelector('.order-now-div');
console.log(orderNowModal);
closeOrderButton.addEventListener('click', () => {
  orderNowModal.style.display = 'none';
});

const openOrderNow = document.querySelector('.js-hero-order');
openOrderNow.addEventListener('click', () => {
  orderNowModal.style.display = 'block';
});
