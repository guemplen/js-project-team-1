const closeOrderButton = document.querySelector('.js-cross-order');
const orderNowModal = document.querySelector('.order-now-div');
// console.log(orderNowModal);
closeOrderButton.addEventListener('click', () => {
  orderNowModal.style.display = 'none';
});

const openOrderNow = document.querySelector('.js-order-now');
openOrderNow.addEventListener('click', () => {
  orderNowModal.style.display = 'block';
});
const cartModal = document.querySelector('.js-cart');
cartModal.addEventListener('click', () => {
  orderNowModal.style.display = 'block';
});
