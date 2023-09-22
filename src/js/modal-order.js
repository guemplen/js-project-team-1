import axios from 'axios';

const closeOrderButton = document.querySelector('.js-cross-order');
const orderNowModal = document.querySelector('.order-now-div');
// console.log(orderNowModal);

function closeModal() {
  orderNowModal.style.display = 'none';
  document.body.classList.remove('body-no-scroll');
}
closeOrderButton.addEventListener('click', () => {
  closeModal();
});

function closeModalOnEsc(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeModal();
  }
}
function openModalOrder(event) {
  document.body.classList.add('body-no-scroll');
  orderNowModal.style.display = 'block';
  document.addEventListener('keydown', closeModalOnEsc);
}

const openOrderNow = document.querySelector('.js-order-now');
openOrderNow.addEventListener('click', () => {

  openModalOrder();
});
const cartModal = document.querySelector('.js-cart');
cartModal.addEventListener('click', () => {
  openModalOrder();

});

//*Submit
export class TastyTreatsAPI {
  constructor() {
    this.customAxios = axios.create({
      baseURL: 'https://tasty-treats-backend.p.goit.global/api/orders',
    });
    this.page = 1;
  }
  async addOrder(orderData) {
    try {
      const response = await this.customAxios.post('/add', orderData);
      console.log('addOrder', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const sendOrderButton = document.querySelector('.order-form');
sendOrderButton.addEventListener('submit', async event => {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const comment = document.querySelector('textarea[name="comment"]').value;

  const orderData = {
    name,
    phone,
    email,
    comment,
  };

  const tastyTreatsAPI = new TastyTreatsAPI();

  try {
    const response = await tastyTreatsAPI.addOrder(orderData);

    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="phone"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('textarea[name="comment"]').value = '';

    orderNowModal.style.display = 'none';
  } catch (error) {
    console.error('Error submitting order:', error);
  }
});
